package handlers

import (
	"net/http"
	// "log"
	"fmt"

	// "github.com/kvmac/merchforce-cms/mf-framework/models"
)



func AccountHandler(w http.ResponseWriter, req *http.Request) {
	fmt.Println("Account handler")
}

func UpdateShippingHandler(w http.ResponseWriter, req *http.Request) {
	fmt.Println("Update Shipping handler")
}

func UpdateProfileHandler(w http.ResponseWriter, req *http.Request) {
	fmt.Println("Update Profile handler")
}