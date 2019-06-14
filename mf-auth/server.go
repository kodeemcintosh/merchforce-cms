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
	// "github.com/kvmac/merchforce-cms/mf-framework/middleware"
)

const (
	httpPort  = "127.0.0.1:8080"
)

var (
	flagProduction = false
	redirectHttpToTls	= false
)

func ServeAuth() {
	flag.BoolVar(&flagProduction, "prod", false, "if true, we start HTTPS server")
	flag.BoolVar(&redirectHttpToTls, "redirect", false, "if true, we redirect HTTP to HTTPS")
	flag.Parse()

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

		tlsServe.HttpServer()
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


	var server *http.Server
	if redirectHttpToTls {
		server.RedirectHttpToTls()
	} else {
		server.HttpServer()
	}

	// allow autocert handle Let's Encrypt callbacks over http
	if m != nil {
		server.Handler = m.HTTPHandler(httpServe.Handler)
	}

	server.Addr = httpPort
	fmt.Printf("Starting HTTP server on %s\n", httpPort)
	err := server.ListenAndServe()
	if err != nil {
		log.Fatalf("httpServe.ListenAndServe() failed with %s", err)
	}
}

func (s *http.Server)HttpServer() {
	// set timeouts so that a slow or malicious client doesn't
	// hold resources forever
	r := Router()

	// *s = &http.Server{
	// 	ReadTimeout:  5 * time.Second,
	// 	WriteTimeout: 5 * time.Second,
	// 	IdleTimeout:  120 * time.Second,
	// 	Handler:      r,
	// }
	*s.ReadTimeout = 5 * time.Second
	*s.WriteTimeout = 5 * time.Second
	*s.IdleTimeout = 120 * time.Second
	*s.Handler = r
}


func (s *http.Server)RedirectHttpToTls() {
	handleRedirect := func(w http.ResponseWriter, req *http.Request) {
		newURI := "https://" + req.Host + req.URL.String()
		http.Redirect(w, req, newURI, http.StatusFound)
	}
	// set timeouts so that a slow or malicious client doesn't
	// hold resources forever
	r := Router()

	r.HandleFunc("/", handleRedirect)
	
	// *s = &http.Server{
	// 	ReadTimeout:  5 * time.Second,
	// 	WriteTimeout: 5 * time.Second,
	// 	IdleTimeout:  120 * time.Second,
	// 	Handler:      r,
	// }
	*s.ReadTimeout = 5 * time.Second
	*s.WriteTimeout = 5 * time.Second
	*s.IdleTimeout = 120 * time.Second
	*s.Handler = r
}
