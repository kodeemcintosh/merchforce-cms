package server

import (
	"context"
	"crypto/tls"
	// "flag"
	"fmt"
	// "io"
	"log"
	"net/http"
	"time"

	"golang.org/x/crypto/acme/autocert"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
	"github.com/kvmac/merchforce-cms/mf-auth/router"
	// "github.com/kvmac/merchforce-cms/mf-framework/middleware"
)

const (
	httpPort  = "127.0.0.1:8080"
)

var m *autocert.Manager

func (s *models.TlsServer)Serve() {
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

	// *s = &http.Server{
	s = http.Server{
		ReadTimeout:		5 * time.Second,
		WriteTimeout:		5 * time.Second,
		IdleTimeout:		120 * time.Second,
		Addr:						":443",
		TLSConfig:			&tls.Config{GetCertificate: m.GetCertificate},
		Handler:				router.Router(),
	}
	// *s.Handler = Router()
	// *s.ReadTimeout = 5 * time.Second
	// *s.WriteTimeout = 5 * time.Second
	// *s.IdleTimeout = 120 * time.Second
	// *s.Addr = ":443"
	// *s.TLSConfig = &tls.Config{GetCertificate: m.GetCertificate}

	go func() {
		fmt.Printf("Starting HTTPS server on %s\n", tlsServe.Addr)
		err := tlsServe.ListenAndServeTLS("", "")
		if err != nil {
			log.Fatalf("httpsSrv.ListendAndServeTLS() failed with %s", err)
		}
	}()
}

func (s *models.HttpServer)Serve() {
	s = http.Server{
	// *s = http.Server{
		ReadTimeout:		5 * time.Second,
		WriteTimeout:		5 * time.Second,
		IdleTimeout:		120 * time.Second,
		Handler:				router.Router(),
	}
	// *s.ReadTimeout = 5 * time.Second
	// *s.WriteTimeout = 5 * time.Second
	// *s.IdleTimeout = 120 * time.Second
	// *s.Handler = Router()

	if redirectHttpToTls {
		r.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
			newURI := "https://" + req.Host + req.URL.String()
			http.Redirect(w, req, newURI, http.StatusFound)
		})

		s.Handler = r
	}

	s.Addr = httpPort
	fmt.Printf("Starting HTTP server on %s\n", httpPort)
	err := s.ListenAndServe()
	if err != nil {
		log.Fatalf("httpServe.ListenAndServe() failed with %s", err)
	}


	// allow autocert handle Let's Encrypt callbacks over http
	if m != nil {
		s.Handler = m.HTTPHandler(s.Handler)
	}
}
