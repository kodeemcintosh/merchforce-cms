package data

import (
	"database/sql"
	"fmt"
	"os"
	"context"
	"time"
	// "github.com/kvmac/Doggo/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"


	"github.com/kvmac/merchforce-cms/mf-auth/models"
)

type Key string

const (
	hostKey     = Key("hostKey")
	usernameKey = Key("usernameKey")
	passwordKey = Key("passwordKey")
	databaseKey = Key("databaseKey")
)


type Db struct {
	*context.Context
	*mongo.Database
}

// type Config struct {
// 	Host		string
// 	Port		string
// 	User		string
// 	Pswd		string
// 	DbName	string
// }

func (d *Db) GetContext() {
	ctx := context.WithTimeout(context.Background(), 10 * time.Second)
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	ctx = context.WithValue(ctx, hostKey, os.Getenv("MF_AUTH_HOST"))
	ctx = context.WithValue(ctx, usernameKey, os.Getenv("MF_AUTH_USER"))
	ctx = context.WithValue(ctx, passwordKey, os.Getenv("MF_AUTH_PASS"))
	ctx = context.WithValue(ctx, databaseKey, os.Getenv("MF_AUTH_DB_NAME"))

	*d.Context = ctx
}

func (db *Db) Connect() {
	ctx := *db.Context
	uri := fmt.Sprintf(`mongodb://%s:%s@%s/%s`,
		ctx.Value(usernameKey).(string),
		ctx.Value(passwordKey).(string),
		ctx.Value(hostKey).(string),
		ctx.Value(databaseKey).(string),
	)

	client, err := mongo.NewClient(options.Client().ApplyURI(uri))
	if err != nil {

		fmt.Errorf("MF-Auth: couldn't connect to mongo: %v", err)
	}

	err = client.Connect(ctx)
	if err != nil {
		fmt.Errorf("todo: mongo client couldn't connect with background context: %v", err)
	}

	// Check the connection
	err = client.Ping(ctx, nil)
	if err != nil {
			log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")
	*db.Database	= client.Database("mf-auth")
}


func (db *Db) Disconnect() {
	err := *db.Database.Disconnect(*db.Context)
	if err != nil {
			log.Fatal(err)
	}

	fmt.Println("Connection to MongoDB closed.")
}





































func () Initialize() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

}
// const (
	// host =	"localhost"
	// port =	2020

// )
// func init() {

	// These are for testing purposes
// 	os.SetEnv("DoggoHost", "localhost")
// 	os.SetEnv("DoggoPort", ":5432")
// 	os.SetEnv("DoggoUser", "Doggo")
// 	os.SetEnv("DoggoPass", "123456")
// 	os.SetEnv("DoggoDB", "DoggoDBdev")
// }

func configEnv() (models.Config) {
	config := models.Config{}
	config.Host	= os.GetEnv("DoggoHost")
	config.Port	= os.GetEnv("DoggoPort")
	config.User	= os.GetEnv("DoggoUser")
	config.Pswd	= os.GetEnv("DoggoPass")
	config.DbName	= os.GetEnv("DoggoDB")
	return config
}

func (d *Database) EnvConfig() {
	*d.Config = &models.Config{
		Host: 			os.Getenv("MF-Auth-Host"),
		Port: 			os.Getenv("MF-Auth-Port"),
		User: 			os.Getenv("MF-Auth-User"),
		Pswd: 			os.Getenv("MF-Auth-Pass"),
		DbName: 		os.Getenv("MF-Auth-DB"),
	}
}

func (d	*Database)Build() {
	c := *d.Config

	// *d.ConnectionStr = fmt.Sprintf("user=%s password=%s dbname=%s", c.User , c.Pswd, c.DbName)
	*d.ConnectionStr = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s", c.Host, c.Port, c.User , c.Pswd, c.DbName)
}

//Initialize is used to open a connection to the postgres db
// func (a *App) Initialize() {
func (d *models.Database) Initialize() {
	// const user, password, dbname = os.GetEnv("DoggoDBUser"), os.GetEnv("DoggoDBPass"), os.GetEnv("DoggoDB")
	d.Db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

}

// Close is used to close the connection after query execution
func (d *models.Database) Finalize() {
	var err error

	a.DB, err = sql.Close("postgres", connectionString)
	if err != nil {
		log.Fatal(err)
	}
}