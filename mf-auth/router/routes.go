package router

import (
	"github.com/kvmac/merchforce-cms/mf-auth/models"
	"github.com/kvmac/merchforce-cms/mf-auth/handlers"
	// "github.com/kvmac/merchforce-cms/mf-auth/middleware"
)


var appRoutes = models.Routes{
	models.Route{
		"Login",
		"POST",
		"/login",
		handlers.Login,
	},
	models.Route{
		"Logout",
		"POST",
		"/logout",
		handlers.Logout,
	},
	models.Route{
		"Merch",
		"POST",
		"/register",
		handlers.Register,
	},
	models.Route{
		"Tkn",
		"POST",
		"/tkn",
		handlers.Tkn,
	},
}