package router

import (
	"github.com/gorilla/mux"
	"net/http"
)
var domain string = "kvmac"

//Router is the big, bad router that gets called in the main function to do the heavy lifting
func Router() *mux.Router {
	// create new router
	r := mux.NewRouter().
		PathPrefix("/api/v1")
		// Host(fmt.Printf("%s.merchforce.io", domain)

	r.Accounts()


	accountRouter := mux.NewRouter()





	// for _, route := range appRoutes {
	// 	// var handler http.Handler

	// 	// handler = route.HandlerFunc
	// 	// handler = Logger(handler, route.Name)
	// 	if (len(route.SubRoutes) > 0) {
	// 		sub := SubRouter(route.SubRoutes)
	// 	}
	// 	r.
	// 		Methods(route.Method).
	// 		Path(route.Pattern).
	// 		Name(route.Name).
	// 		Handler(route.HandlerFunc)
	// }

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	// r.Path("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./static")))
	// r.Handler("/", http.StripPrefix("/", http.FileServer(http.Dir("./static"))))

	return r
}

// func (r *mux.Router)SubRouter(routes *models.Routes) *mux.Router {
// 	sub := mux.NewRouter()

// 	for _, sub := range routes {
// 		sub.
// 			Methods(sub.Method).
// 			Path(sub.Pattern).
// 			Name(sub.Name).
// 			Handler(sub.HandlerFunc)
// 	}
// 	*r.Handle()
// 	return r
// }