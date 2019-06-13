package models

import (
	"database/sql"
)

type App struct {
	DB	*sql.DB
}

type Config struct {
	Host	string
	Port	string
	User	string
	Pswd	string
	DbName	string
}