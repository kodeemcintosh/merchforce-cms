package handlers

import (
	"net/http"
	// "log"
	"fmt"

	"github.com/gorilla/mux"

	// "github.com/kvmac/merchforce-cms/mf-framework/models"
)

func MerchHandler(w http.ResponseWriter, req *http.Request) {
	fmt.Println("Merch handler")
	v := req.URL.Query()

	category := v.Get("category")
	gender := v.Get("gender")
	brand := v.Get("brand")
}

func MerchDetailsHandler(w http.ResponseWriter, req *http.Request) {
	fmt.Println("Merch Details handler")
	vars := mux.Vars(req)

	merchId := vars["merchId"]
}