package middleware

import (
	"net/http"
	"github.com/dgrijalva/jwt-go"
)

func Authenticate(fn http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
    log.Println("Executing auth middleware")
    if r.URL.Path != "/" {
      return
    }
    fn.ServeHTTP(w, req)
    log.Println("Executing middlewareTwo again")
  })

}

func refreshTkn() {

}

func Authorize(w http.ResponseWriter, r *http.Request) {

}