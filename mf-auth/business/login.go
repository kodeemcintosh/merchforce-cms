package business

import (
	"net/http"
	// "log"
	"fmt"
	
	"github.com/dgrijalva/jwt-go"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
)

// https://www.sohamkamani.com/blog/golang/2019-01-01-jwt-authentication/

var users = map[string]string {
	"user1": "password1",
	"user2": "password2"
}

func Login(c models.Credentials) string, error {

	// TODO: create a database connection with our user auth storage
	// Get the expected password from our in memory map
	expectedPassword, ok := users[c.Username]
	// userRole, ok :=userRoles[c.Username]

	// If a password exists for the given user
	// AND, if it is the same as the password we received, the we can move ahead
	// if NOT, then we return an "Unauthorized" status
	if !ok || expectedPassword != creds.Password {
		return nil, http.StatusUnautherized
	}

	tkn = c.NewTkn()
	// tkn = c.NewTkn(userRole)

	tknStr, err := token.SignedString(jwtKey)
	if err != nil {
		return nil, http.StatusInternalServerError
	}

	return tknStr, http.StatusOK
}