package handlers

import (
	"net/http"
	// "log"
	"fmt"
	
	"github.com/dgrijalva/jwt-go"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
	"github.com/kvmac/merchforce-cms/mf-auth/business"
)

// https://www.sohamkamani.com/blog/golang/2019-01-01-jwt-authentication/

var users = map[string]string {
	"user1": "password1",
	"user2": "password2"
}



func Login(w http.ResponseWriter, req *http.Request) {
	// We can obtain the session token from the requests cookies, which come with every request
	c, err := req.Cookie("tkn")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Get the JWT string from the cookie
	tknStr := c.Value

	// Initialize a new instance of `Claims`
	claims := &Claims{}

	// Parse the JWT string and store the result in `claims`.
	// Note that we are passing the key in this method as well. This method will return an error
	// if the token is invalid (if it has expired according to the expiry time we set on sign in),
	// or if the signature does not match
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if !tkn.Valid {
		// || tkn.Role < r {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}


	// Create the JWT string
	tknStr, err := business.RefreshTkn(creds)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		w.WriteHeader(err)
		return
	}

	// Finally, we set the client cookie for "token" as the JWT we just generated
	// we also set an expiry time which is the same as the token itself
	http.SetCookie(w, &http.Cookie{
		Name:    "tkn",
		Value:   tokenString,
		Expires: expirationTime,
	})

}