package data

import (
	"log"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
)

func (db *Db) SelectUser(username string, email string) (models.User, error) {

	db.GetContext()
	db.Connect()
	defer db.Disconnect()

	ctx := *db.Context
	collection := db.Database.Collection("users")

	userFilter := bson.M{ "$or":
									bson.M[]{
										bson.M{"username", username},
										bson.M{"email", email}
									}
								}

	user := &models.User{}
	_, err := collection.FindOne(ctx, userFilter).Decode(&user)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return user, nil
}

func (db *Db) ValidateCredentials(inputCreds models.Credentials) (bool) {

	db.GetContext()
	db.Connect()
	defer db.Disconnect()

	ctx := *db.Context
	collection := db.Database.Collection("users")

	credsFilter := bson.M{ "$or":
									bson.M[]{
										bson.M{"username", inputCreds.Username},
										bson.M{"email", inputCreds.Email}
									}
								}

	storedCreds := &models.Credentials{}
	_, ok := collection.FindOne(ctx, credsFilter).Decode(&storedCreds)
	if !ok || inputCreds.Password != storedCreds.Password {
		return false
	}

	return true
}