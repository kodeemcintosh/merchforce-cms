package handlers

import (
	"net/http"
	// "log"
	"fmt"
	
	"github.com/dgrijalva/jwt-go"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
	"github.com/kvmac/merchforce-cms/mf-auth/utils"
)

func Register(w http.ResponseWriter, req *http.Request) {
	var authUser models.AuthUser
	// Get the JSON body and decode into credentials
	err := json.NewDecoder(r.Body).Decode(&authUser)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	authUser.Password = utils.HashAndSalt(authUser.Password)

	// remove this once you know what user1 password hash is
	// DO NOT FORGET TO REMOVE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	fmt.Sprintf("Password Hash is:  %s", authUser.Password) //////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Create the JWT string
	user, newCookie, err := business.Register(authUser)
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