package data

import (
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
)

func (db *Db) ValidateUser(cred models.Credentials) (bool, error) {

}

func (db *Db) UpdatePassword(username string, newPassword string) (models.User, error) {

}
