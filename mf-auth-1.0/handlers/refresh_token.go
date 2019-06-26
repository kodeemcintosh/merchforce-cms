package handlers

import (
	"net/http"
	// "log"
	"fmt"
	"time"
	
	jwt "github.com/dgrijalva/jwt-go"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
	"github.com/kvmac/merchforce-cms/mf-auth/business"
)


func RefreshToken(w http.ResponseWriter, req *http.Request) {

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
	// checks to see if the token is valid or not
	// tkn, err := business.ValidateTkn(tnkStr)
	// if err != nil {
	// 	w.WriteHeader(err)
	// 	return
	// }

	// Create the JWT string
	// tknStr, err := business.RefreshTkn(tkn.Claims)
	// tknStr.RefreshTkn(tkn.Claims)
	newCookie, err := business.RefreshToken(tknStr)
	if err != 0 {
		// If there is an error in creating the JWT return an internal server error
		w.WriteHeader(err)
		return
	}

	// Finally, we set the client cookie for "token" as the JWT we just generated
	// we also set an expiry time which is the same as the token itself
	http.SetCookie(w, newCookie)
}