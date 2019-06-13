package main

import (
	"context"
	"crypto/tls"
	"flag"
	"fmt"
	// "io"
	"log"
	"net/http"
	"time"

	"golang.org/x/crypto/acme/autocert"
	"github.com/kvmac/merchforce-cms/mf-auth/router"
	// "github.com/kvmac/merchforce-cms/mf-framework/middleware"
)
// https://github.com/kjk/go-cookbook/blob/master/free-ssl-certificates/main.go

const (
	htmlIndex = `<html><body>Welcome!</body></html>`
	httpPort  = "127.0.0.1:8080"
)
var (
	flagProduction = false
	redirectHttpToTls	= false
)

func main() {
	parseFlags()
	var m *autocert.Manager

	var tlsServe *http.Server
	if flagProduction {
		hostPolicy := func(ctx context.Context, host string) error {
			// Note: change to your real host
			allowedHost := "www.ts-app.kvmac.com"
			if host == allowedHost {
				return nil
			}
			return fmt.Errorf("acme/autocert: only %s host is allowed", allowedHost)
		}

		certDir := "."
		m = &autocert.Manager{
			Prompt:     autocert.AcceptTOS,
			HostPolicy: hostPolicy,
			Cache:      autocert.DirCache(certDir),
		}

		tlsServe = generateHttpServer()
		tlsServe.Addr = ":443"
		tlsServe.TLSConfig = &tls.Config{GetCertificate: m.GetCertificate}

		go func() {
			fmt.Printf("Starting HTTPS server on %s\n", tlsServe.Addr)
			err := tlsServe.ListenAndServeTLS("", "")
			if err != nil {
				log.Fatalf("httpsSrv.ListendAndServeTLS() failed with %s", err)
			}
		}()
	}

	var httpServe *http.Server
	if redirectHttpToTls {
		httpServe = generateTlsServer()
	} else {
		httpServe = generateHttpServer()
	}

	// allow autocert handle Let's Encrypt callbacks over http
	if m != nil {
		httpServe.Handler = m.HTTPHandler(httpServe.Handler)
	}

	httpServe.Addr = httpPort
	fmt.Printf("Starting HTTP server on %s\n", httpPort)
	err := httpServe.ListenAndServe()
	if err != nil {
		log.Fatalf("httpServe.ListenAndServe() failed with %s", err)
	}
}




func parseFlags() {
	flag.BoolVar(&flagProduction, "prod", false, "if true, we start HTTPS server")
	flag.BoolVar(&redirectHttpToTls, "redirect", false, "if true, we redirect HTTP to HTTPS")
	flag.Parse()
}

func generateTlsServer() *http.Server {
	handleRedirect := func(w http.ResponseWriter, req *http.Request) {
		newURI := "https://" + req.Host + req.URL.String()
		http.Redirect(w, req, newURI, http.StatusFound)
	}
	// set timeouts so that a slow or malicious client doesn't
	// hold resources forever
	r := router.Router()


	r.HandleFunc("/", handleRedirect)
	
	return &http.Server{
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
		IdleTimeout:  120 * time.Second,
		Handler:      r,
	}
}

func generateHttpServer() *http.Server {
	// set timeouts so that a slow or malicious client doesn't
	// hold resources forever
	r := router.Router()

	return &http.Server{
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
		IdleTimeout:  120 * time.Second,
		Handler:      r,
	}
}
