package main

import (
	"context"
	// "crypto/tls"
	"flag"
	"log"
	"time"
	// "fmt"
	"io"
	"os"
	"os/signal"
	// "log"
	"net/http"
	// "time"

	"github.com/kvmac/merchforce-cms/mf-framework/models"
	"github.com/kvmac/merchforce-cms/mf-framework/router"
)

var (
	flagProduction = false
	redirectHttpToTls	= false
)

func main() {
	var wait time.Duration
	os.Setenv("JWT_KEY", "secret_key")

	flag.BoolVar(&flagProduction, "prod", false, "if true, we start HTTPS server")
	flag.BoolVar(&redirectHttpToTls, "redirect", false, "if true, we redirect HTTP to HTTPS")
	flag.DurationVar(&wait, "graceful-timeout", time.Second * 15, "The duration for which the server gracefully wait for existing connections to finish - e.g. 15s or 1m")
	flag.Parse()

	var tlsServer models.TlsServer
	if flagProduction {
		tlsServer.Serve()
	}

	var httpServer models.HttpServer
	httpServer.Serve()


	// GRACEFUL SHUTDOWN
	c := make(chan os.Signal, 1)
	// We'll accept graceful shutdowns when quit via SIGINT (Ctrl+C)
	// SIGKILL, SIGQUIT or SIGTERM (Ctrl+/) will not be caught.
	signal.Notify(c, os.Interrupt)

	// Block until we receive our signal.
	<-c

	// Create a deadline to wait for.
	ctx, cancel := context.WithTimeout(context.Background(), wait)
	defer cancel()
	// Doesn't block if no connections, but will otherwise wait
	// until the timeout deadline.
	tlsServer.Shutdown(ctx)
	httpServer.Shutdown(ctx)

	// Optionally, you could run srv.Shutdown in a goroutine and block on
	// <-ctx.Done() if your application should wait for other services
	// to finalize based on context cancellation.
	log.Println("shutting down")
	os.Exit(0)
}