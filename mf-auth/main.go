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
)
// https://github.com/kjk/go-cookbook/blob/master/free-ssl-certificates/main.go

var (
	flagProduction = false
	redirectHttpToTls	= false

	m *autocert.Manager
)


type TlsServer *http.Server
type HttpServer *http.Server

func main() {
	flag.BoolVar(&flagProduction, "prod", false, "if true, we start HTTPS server")
	flag.BoolVar(&redirectHttpToTls, "redirect", false, "if true, we redirect HTTP to HTTPS")
	flag.Parse()

	var tlsServer TlsServer
	if flagProduction {
		tlsServer.Serve()
	}

	var httpServer HttpServer
	httpServer.Serve()



	ServeAuth()

}