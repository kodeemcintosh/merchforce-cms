package main

import (
	"github.com/gorilla/mux"
	"net/http"
)

//Router is the big, bad router that gets called in the main function to do the heavy lifting
func Router() *mux.Router {
	// create new router
	r := mux.NewRouter().
				PathPrefix("/auth/api/v1")

	r.
		Name("Login").
		HandleFunc("/login", LoginHandler).
		Method("POST").

	r.
		Name("Register").
		HandleFunc("/register", LoginHandler).
		Method("POST")
	
	r.
		Name("Logout").
		HandleFunc("/logout", LogoutHandler).
		Method("POST")

	// r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	// r.Path("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./static")))
	// r.Handler("/", http.StripPrefix("/", http.FileServer(http.Dir("./static"))))

	return r
}