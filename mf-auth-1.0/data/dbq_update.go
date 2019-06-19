package data

import (
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
)

func (db *Db) UpdatePassword(username string, email string, newPassword string) (error) {
	db.GetContext()
	db.Connect()
	defer db.Disconnect()

	filter := bson.M{ "$or":
									bson.M[]{
										bson.M{"username", username},
										bson.M{"email", email}
									}
								}

	update := bson.D{
									{"$inc":
										bson.M{"password", newPassword}
									}
								}

	collection := db.Database.Collection("users")
	_, err := collection.UpdateOne(*db.Context, filter, update)
	if !bool(isValid) || err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}
