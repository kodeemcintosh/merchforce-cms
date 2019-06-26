package router

import (
	// "net/http"

	"github.com/gorilla/mux"

	"github.com/kvmac/merchforce-cms/mf-framework/handlers"
	"github.com/kvmac/merchforce-cms/mf-framework/middleware"
)

//Router is the big, bad router that gets called in the main function to do the heavy lifting
func (r *mux.Router)AccountRouter() {
	// create new router
	account := r.
					PathPrefix("/auth/api/v1").
					Subrouter()

	account.
		Name("Account").
		HandleFunc("/{userId}", handlers.AccountHandler).
		Method("GET")

}