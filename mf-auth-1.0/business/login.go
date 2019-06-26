package business

import (
	"net/http"
	// "log"
	// "fmt"
	"time"
	"os"
	
	jwt "github.com/dgrijalva/jwt-go"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
)


func Login(creds models.Credentials) (*models.User, *http.Cookie, int) {
	//PROD
	jwtKey := []byte(os.Getenv("JWT_KEY"))
	// jwtKey = []byte(jwtKey)


	var db = &models.Db{}
	// Get the expected password from our in memory map
	expectedPassword, ok := users[creds.Username]

	//PROD
	isValid := db.ValidateCredentials(creds)
	if !isValid {
		return nil, nil, http.StatusUnauthorized
	}


	//PROD
	user, err := db.SelectUser(creds)
	if err != nil {
		log.Fatal(err)
		return nil, nil, http.StatusInternalServerError
	}


	//PROD
	// Declare the expiration time of the token
	// here, we have kept it as 5 minutes
	expTime := time.Now().Add(5 * time.Minute)
	// Create the JWT claims, which includes the username and expiry time
	claims := &models.Claims{
		UserId: user.UserId,
		Username: user.Username,
		Username: user.Email,
		Role: user.Role,

		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expTime.Unix(),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	tkn := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)


	tknStr, err := tkn.SignedString(jwtKey)
	if err != nil {
		return nil, nil, http.StatusInternalServerError
	}

	newCookie := &http.Cookie{
		Name:    "tkn",
		Value:   tknStr,
		Expires: expTime,
	}

	return user, newCookie, 0
}