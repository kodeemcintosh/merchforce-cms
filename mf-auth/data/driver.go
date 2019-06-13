package data

import (
	"database/sql"
	"fmt"
	"os"
	// "github.com/kvmac/Doggo/utils"
	"github.com/kvmac/merchforce-cms/mf-auth/models"
)

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

func buildConnStr(c models.Config) (string) {
	return fmt.Sprintf("user=%s password=%s dbname=%s", c.User , c.Pswd, c.DbName)
}

//Initialize is used to open a connection to the postgres db
// func (a *App) Initialize() {
func (a *models.App) Initialize() {
	config := configEnv()
	connStr := buildConnStr(config)

	// const user, password, dbname = os.GetEnv("DoggoDBUser"), os.GetEnv("DoggoDBPass"), os.GetEnv("DoggoDB")
	var err error
	a.DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

}

// Close is used to close the connection after query execution
func (a *models.App) Finalize() {
	var err error

	a.DB, err = sql.Close("postgres", connectionString)
	if err != nil {
		log.Fatal(err)
	}
}