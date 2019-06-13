package router

import (

	"github.com/kvmac/merchforce-cms/mf-framework/models"
	"github.com/kvmac/merchforce-cms/mf-framework/handlers"
	// "github.com/kvmac/merchforce-cms/mf-framework/middleware"
)


var appRoutes = models.Routes{
	models.Route{
		"User",
		"GET",
		"/user",
		handlers.User,
	},
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