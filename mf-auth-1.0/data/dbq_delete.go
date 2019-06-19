package data

import (
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
)

func (db *Db) DeleteAuthUser(cred models.Credentials) (error) {
	db.GetContext()
	db.Connect()
	defer db.Disconnect()

	filter := bson.M{ "$or":
									bson.M[]{
										bson.M{"username", creds.Username},
										bson.M{"email", creds.Email}
									}
								}

	collection := db.Database.Collection("users")
	_, err := collection.DeleteOne(*db.Context, filter)
	if !bool(isValid) || err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}