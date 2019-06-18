package models

import (
)

type AuthUser struct {
	UserId			string
	Username		string
	Password		string
	UserRole		int
	CreatedAt		time.Time
	ModifiedAt	time.Time
}

type User struct {
	UserId		string `bson: "userId"`
	Username	string `bson: "username"`
	UserRole	string `bson: "userRole"`
}