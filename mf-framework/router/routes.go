package router

import (

	"github.com/kvmac/merchforce-cms/mf-framework/models"
	"github.com/kvmac/merchforce-cms/mf-framework/handlers"
	// "github.com/kvmac/merchforce-cms/mf-framework/middleware"
)


func (r *mux.Router) Accounts() {
	acct := r.
						PathPrefix("/accounts").
						Subrouter()
	acct.
		HandleFunc("/", AccountsHandler).
		Method("POST")

	acct.
		HandleFunc("/details", UsersHandler).
		Method("POST")

	acct.
		HandleFunc("/shipping", ShippingHandler).
		Method("POST")
}











// func (r *mux.Router) MerchRoutes() {
// 	merch := r.PathPrefix("/merch").Subrouter()

// }

var authRoutes = models.Routes{
	models.Route{
		"Login",
		"POST",
		"/login",
		handlers.Login,
	},
}

var appRoutes = models.Routes{
	models.Route{
		"User",
		"GET",
		"/user",
		handlers.User,
	},
	models.Route{
		"Account",
		"GET",
		"/account",
		handlers.Account,
	}
	// models.Route{
	// 	"Cart",
	// 	"GET",
	// 	"/cart",
	// 	handlers.Cart,
	// },
	// models.Route{
	// 	"Merch",
	// 	"GET",
	// 	"/merch",
	// 	// middleware.Authenticate(handlers.Merch),
	// 	handlers.Merch
	// },
}

var accountRoutes = models.Routes{
	models.Route{

	}
}