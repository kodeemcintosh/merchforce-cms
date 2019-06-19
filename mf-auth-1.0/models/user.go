package models

import (
	"time"
)

type AuthUser struct {
	UserId			string
	Username		string
	Email				string
	Password		string
	Role				int
	CreatedAt		time.Time
	ModifiedAt	time.Time
}

type User struct {
	UserId		string `bson: "userId"`
	Username	string `bson: "username"`
	Email			string `bson: "email"`
	Role			int `bson: "role"`
}