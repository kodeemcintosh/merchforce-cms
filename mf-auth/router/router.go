package router

import (
	// "net/http"

	"github.com/gorilla/mux"

	"github.com/kvmac/merchforce-cms/mf-auth/handlers"
	"github.com/kvmac/merchforce-cms/mf-auth/middleware"
)

//Router is the big, bad router that gets called in the main function to do the heavy lifting
func Router() *mux.Router {
	// create new router
	r := mux.NewRouter().
				PathPrefix("/auth/api/v1")

	r.
		Name("Login").
		HandleFunc("/login", handlers.LoginHandler).
		Method("POST").

	r.
		Name("Register").
		HandleFunc("/register", handlers.LoginHandler).
		Method("POST")
	
	r.
		Name("Logout").
		HandleFunc("/logout", handlers.LogoutHandler).
		Method("POST")

	// r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	// r.Path("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./static")))
	// r.Handler("/", http.StripPrefix("/", http.FileServer(http.Dir("./static"))))

	return r
}