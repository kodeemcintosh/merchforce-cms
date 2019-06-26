package router

import (
	// "net/http"

	"github.com/gorilla/mux"

	"github.com/kvmac/merchforce-cms/mf-framework/handlers"
	"github.com/kvmac/merchforce-cms/mf-framework/middleware"
)

//Router is the big, bad router that gets called in the main function to do the heavy lifting
func (r *mux.Router)MerchRouter() {
	// create new router
	account := r.
					PathPrefix("/auth/api/v1").
					Subrouter()

	account.
		Name("Merch").
		HandleFunc("/", handlers.MerchHandler).
		Method("GET")

	account.
		Name("Merch").
		HandleFunc("/{merchId}", handlers.MerchDetailsHandler).
		Method("GET")
	

}