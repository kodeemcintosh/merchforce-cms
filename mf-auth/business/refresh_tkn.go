package business

import (
	"net/http"
	// "log"
	// "fmt"
	"os"
	"time"
	
	jwt "github.com/dgrijalva/jwt-go"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
)


func RefreshTkn(tknStr string) (*http.Cookie, int) {
	jwtKey := os.Getenv("JWT_KEY")
	// jwtKey = []byte(jwtKey)
	prevClaims := &models.Claims{}

	tkn, err := jwt.ParseWithClaims(tknStr, prevClaims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if !tkn.Valid {
		return nil, http.StatusUnauthorized
	}
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return nil, http.StatusUnauthorized
		}

		return nil, http.StatusBadRequest
	}


	// Declare the expiration time of the token
	// here, we have kept it as 5 minutes
	expTime := time.Now().Add(5 * time.Minute)

	// Create the JWT claims, which includes the username and expiry time

	newClaims := &models.Claims{
		// UserId: tkn.Claims.UserId,
		Username: prevClaims.Username,
		// Role: tkn.Claims.Role,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expTime.Unix(),
		},
	}

	// prevClaims.StandardClaims = jwt.StandardClaims{
	// 		// In JWT, the expiry time is expressed as unix milliseconds
	// 		ExpiresAt: expTime.Unix(),
	// 	},


	// Declare the token with the algorithm used for signing, and the claims
	// tkn := jwt.NewWithClaims(jwt.SigningMethodHS256, newClaims)
	tkn = jwt.NewWithClaims(jwt.SigningMethodHS256, newClaims)
	// tkn = c.NewTkn(userRole)

	tknStr, err = tkn.SignedString(jwtKey)
	if err != nil {
		return nil, http.StatusInternalServerError
	}

	newCookie := &http.Cookie{
		Name:    "tkn",
		Value:   tknStr,
		Expires: expTime,
	}

	return newCookie, 0
}