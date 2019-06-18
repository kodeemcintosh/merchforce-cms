package data

import (
	"time"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/kvmac/merchforce-cms/mf-auth/models"
)

func (db *Db) InsertAuthUser(creds models.Credentials) (error) {

	db.GetContext()
	db.Connect()
	defer db.Disconnect()

	userFilter := bson.M{ "$or":
									bson.M[]{
										bson.M{"username", username},
										bson.M{"email", email}
									}
								}

	ctx := *db.Context
	collection := db.Database.Collection("users")

	isValid, err := collection.Find(ctx, userFilter).limit(1).size()
	if !bool(isValid) || err != nil {
		log.Fatal(err)
		return err
	}

	user := &models.AuthUser{
		UserId:				string(uuid.New()),
		Username:			creds.Username,
		Password:			creds.Password,
		UserRole:			0,
		CreatedAt:		time.Now(),
		ModifiedAt:		time.Now(),
	}

	_, err := collection.InsertOne(ctx, user)
	if err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}


func (db *Db) InsertAdminAuthUser(creds models.Credentials, role int) (error) {

	db.GetContext()
	db.Connect()
	defer db.Disconnect()

	adminUser := &models.AuthUser{
		UserId:				string(uuid.New()),
		Username:			creds.Username,
		Password:			creds.Password,
		UserRole:			role,
		CreatedAt:		time.Now(),
		ModifiedAt:		time.Now(),
	}

	ctx := *db.Context
	collection := db.Database.Collection("users")

	_, err := collection.InsertOne(ctx, adminUser)
	if err != nil {
		log.Fatal(err)
		return err
	}

	return adminUser
}
