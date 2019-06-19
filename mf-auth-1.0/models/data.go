package models

import (
	"database/sql"
	"fmt"
	"os"
	// "github.com/kvmac/Doggo/utils"
	"go.mongodb.org/mongo-driver/mongo"
)

type Database struct {
	Config					*Config
	ConnectionStr		string
	*sql.Db
}

type Config struct {
	Host	string
	Port	string
	User	string
	Pswd	string
	DbName	string
}

type Key string