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

func (db *Db) InsertUser(creds models.Credentials) (models.User, error) {
	// userId := string(uuid.New())

	user := &models.AuthUser{
		UserId:				string(uuid.New()),
		Username:			creds.Username,
		Password:			creds.Password,
		UserRole:			0,
		CreatedAt:		time.Now(),
		ModifiedAt:		time.Now(),
	}

	db.GetContext()
	db.Connect()
	defer db.Disconnect()

	ctx := *db.Context
	collection := db.Database.Collection("users").InsertOne(ctx, user)
	// collection := db.Database.Collection("users").InsertOne(ctx, bson.D{
	// 	{"userId", userId},
	// 	{"username", username},
	// 	{"userRole", 0},
	// 	{"createdAt", primitive.DateTime(timeMillis(time.Now()))}
	// 	{"modifiedAt", primitive.DateTime(timeMillis(time.Now()))}
	// })



}

func (db *Db) InsertAdminUser(creds models.Credentials, role int) (models.User, error) {
	// userId := string(uuid.New())

	// user := &models.User{

	// }

	// ctx := *db.Context
	// collection := db.Database.Collection("users").InsertOne(ctx, bson.D{
	// 	{"userId", userId},
	// 	{"username", username},
	// 	{"createdAt", primitive.DateTime(timeMillis())}

	// })

	adminUser := &models.AuthUser{
		UserId:				string(uuid.New()),
		Username:			creds.Username,
		Password:			creds.Password,
		UserRole:			role,
		CreatedAt:		time.Now(),
		ModifiedAt:		time.Now(),
	}

	db.GetContext()
	db.Connect()
	defer db.Disconnect()

	ctx := *db.Context
	collection := db.Database.Collection("users").InsertOne(ctx, adminUser)


}
