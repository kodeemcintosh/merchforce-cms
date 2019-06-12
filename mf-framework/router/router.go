package router

import (
	"github.com/gorilla/mux"
	"net/http"
)

//Router is the big, bad router that gets called in the main function to do the heavy lifting
func Router() *mux.Router {
	// create new router
	r := mux.NewRouter()

	for _, route := range appRoutes {
		// var handler http.Handler

		// handler = route.HandlerFunc
		// handler = Logger(handler, route.Name)

		r.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)
	}

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	// r.Path("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./static")))
	// r.Handler("/", http.StripPrefix("/", http.FileServer(http.Dir("./static"))))

	return r
}