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
)
// https://github.com/kjk/go-cookbook/blob/master/free-ssl-certificates/main.go


func main() {

	ServeAuth()

}