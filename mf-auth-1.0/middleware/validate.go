package middleware

import (
	"net/http"
	"os"
	// "log"

	"github.com/dgrijalva/jwt-go"
)

func ValidateTkn(next http.Handler) http.Handler {

  return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {

		jwtKey := []byte(os.Getenv("JWT_KEY"))
		// jwtKey = []byte(jwtKey)

		// We can obtain the session token from the requests cookies, which come with every request
		c, err := req.Cookie("tkn")
		if err != nil {
			if err == http.ErrNoCookie {
				// If the cookie is not set, return an unauthorized status
				w.Header().Set("Location", "/login")
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			// For any other type of error, return a bad request status
			w.Header().Set("Location", "/login")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		// Get the JWT string from the cookie
		tknStr := c.Value

		// Parse the JWT string and store the result in `claims`.
		// Note that we are passing the key in this method as well. This method will return an error
		// if the token is invalid (if it has expired according to the expiry time we set on sign in),
		// or if the signature does not match
		tkn, err := jwt.Parse(tknStr, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})
		if tkn.Valid {
			// || tkn.Role < r {
			w.WriteHeader(http.StatusOK)
			return
		}

		// run the handler if tkn is valid
    next.ServeHTTP(w, req)
  })
}