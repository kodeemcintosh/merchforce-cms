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
// func (c models.Credentials) NewTkn(r Role) jwt.Token {
func RefreshTkn() jwt.Token {

	tkn = c.NewTkn()
	// tkn = c.NewTkn(userRole)

	tknStr, err := token.SignedString(jwtKey)
	if err != nil {
		return nil, http.StatusInternalServerError
	}

	return tknStr, http.StatusOK
}