package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Character representation for database
type Character struct {
	gorm.Model
	Title string `json:"title"`
	Link  string `json:"link"`
	Image string `json:"image"`
}

func allCharacters(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("postgres", "host=db port=5432 user=postgres dbname=lotr password=password sslmode=disable")

	if err != nil {
		panic("Database connection failed")
	}

	enableCors(&w)

	defer db.Close()

	var characters []Character
	db.Find(&characters)
	fmt.Println("{}", characters)

	json.NewEncoder(w).Encode(characters)
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/characters", allCharacters).Methods("GET")
	log.Fatal(http.ListenAndServe(":8081", myRouter))
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func main() {
	fmt.Println("Running LOTR API")

	// Handle Subsequent requests
	handleRequests()
}
