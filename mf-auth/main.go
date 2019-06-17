package main

import (
	// "context"
	// "crypto/tls"
	"flag"
	"os"
	// "fmt"
	// "io"
	// "log"
	"net/http"
	// "time"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
	"github.com/kvmac/merchforce-cms/mf-auth/router"
)
// https://github.com/kjk/go-cookbook/blob/master/free-ssl-certificates/main.go

var (
	flagProduction = false
	redirectHttpToTls	= false
)


func main() {
	os.Setenv("JWT_KEY", "secret_key")
	flag.BoolVar(&flagProduction, "prod", false, "if true, we start HTTPS server")
	flag.BoolVar(&redirectHttpToTls, "redirect", false, "if true, we redirect HTTP to HTTPS")
	flag.Parse()

	var tlsServer models.TlsServer
	if flagProduction {
		tlsServer.Serve()
	}

	var httpServer models.HttpServer
	httpServer.Serve()



	ServeAuth()

}


