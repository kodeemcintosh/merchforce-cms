package models

import (
	"net/http"
)

//Route is a structure for the api router call
type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

//Routes because Route objects have to go somewhere
type Routes []Route

type SubRoutes 