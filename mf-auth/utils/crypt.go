package utils

import (
	"log"

	"golang.org/x/crypto/bcrypt"
)

func HashAndSalt(p string) (string) {
	pwd := []byte(p)

	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}

	return string(hash)
}