package business

import (
	"net/http"
	"log"
	"fmt"
	"time"
	
	"github.com/dgrijalva/jwt-go"

	"github.com/kvmac/merchforce-cms/mf-auth/data"
	"github.com/kvmac/merchforce-cms/mf-auth/models"
)


func Register(authUser models.AuthUser) (*models.User, *http.Cookie, int) {
	jwtKey := []byte(os.Getenv("JWT_KEY"))
	// TODO: create user with existing db connection
	var db = &models.Db{}

	err := db.InsertAuthtUser(authUser)
	if err != nil {
		log.Fatal(err)
		return nil, nil, http.StatusInternalServerError
	}


	// Declare the expiration time of the token
	// here, we have kept it as 5 minutes
	expTime := time.Now().Add(5 * time.Minute)
	// Create the JWT claims, which includes the username and expiry time
	claims := &models.Claims{
		UserId: userId,
		Username: authUser.Username,
		Email:		authUser.Email,
		Role: authUser.Role,

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

	user := &models.User{
		UserId: authUser.UserId,
		Username: authUser.Username,
		Email:		authUser.Email,
		UserRole:	authUser.Role,
	}

	newCookie := &http.Cookie{
		Name:    "tkn",
		Value:   tknStr,
		Expires: expTime,
	}

	// return newCookie, nil
	return user, newCookie, 0
}