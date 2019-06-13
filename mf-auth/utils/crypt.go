package utils

import (

	"golang.org/x/crypto/bcrypt"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
)

func (c *models.Credentials) HashAndSalt() {
	pwd := []bytes(*c.Password)

	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}

	*c.Password = string(hash)
}