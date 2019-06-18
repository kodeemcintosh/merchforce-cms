package business

import (
	"net/http"
	// "log"
	"fmt"
	"time"
	
	"github.com/dgrijalva/jwt-go"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
)


func Register(c models.Credentials) (*models.User, *http.Cookie, int) {

	// TODO: create a database connection with our user auth storage
	// Check to see if already a user
	userExists, ok := users[c.Username]
	fmt.Print(userExists)
	// userRole, ok :=userRoles[c.Username]

	// If a password exists for the given user
	// AND, if it is the same as the password we received, the we can move ahead
	// if NOT, then we return an "Unauthorized" status
	if ok {
		return nil, nil, http.StatusConflict
	}

	// TODO: create user with existing db connection


	// Declare the expiration time of the token
	// here, we have kept it as 5 minutes
	expTime := time.Now().Add(5 * time.Minute)
	// Create the JWT claims, which includes the username and expiry time
	claims := &models.Claims{
		// UserId: userId,
		Username: c.Username,
		// Role: c.Role,
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
		// UserId: userId,
		Username: c.Username,
		// UserRole:	userRole,
	}

	newCookie := &http.Cookie{
		Name:    "tkn",
		Value:   tknStr,
		Expires: expTime,
	}

	// return newCookie, nil
	return user, newCookie, 0
}