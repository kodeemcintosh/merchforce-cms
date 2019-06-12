package router

import (
	"net/http"

	"github.com/kvmac/merchforce-cms/mf-framework/models"
	"github.com/kvmac/merchforce-cms/mf-framework/handlers"
	"github.com/kvmac/merchforce-cms/mf-framework/middleware"
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
		"GET",
		"/merch",
		middleware.Authenticate(handlers.Merch),
	},
}