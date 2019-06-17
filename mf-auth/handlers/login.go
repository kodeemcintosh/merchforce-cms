package handlers

import (
	"net/http"
	// "log"
	// "fmt"
	"encoding/json"
	
	// "github.com/dgrijalva/jwt-go"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
	"github.com/kvmac/merchforce-cms/mf-auth/business"
	"github.com/kvmac/merchforce-cms/mf-auth/utils"
)

// https://www.sohamkamani.com/blog/golang/2019-01-01-jwt-authentication/

func Login(w http.ResponseWriter, req *http.Request) {
	var creds models.Credentials

	// Get the JSON body and decode into credentials
	err := json.NewDecoder(req.Body).Decode(&creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	creds.Password = HashAndSalt(creds.Password)

	// Create the JWT string
	// newCookie, err := business.Login(creds)
	user, newCookie, err := business.Login(creds)
	if err != 0 {
		// If there is an error in creating the JWT return an internal server error
		w.WriteHeader(err)
		return
	}

	// Finally, we set the client cookie for "token" as the JWT we just generated
	// we also set an expiry time which is the same as the token itself
	http.SetCookie(w, newCookie)

	w.Write([]byte(user))
}