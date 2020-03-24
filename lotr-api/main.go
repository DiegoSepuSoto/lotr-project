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

const postgresInfo = "host=db port=5432 user=postgres dbname=lotr password=password sslmode=disable"

func allCharacters(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("postgres", postgresInfo)

	if err != nil {
		panic("Database connection failed")
	}

	enableCors(&w)

	defer db.Close()

	var characters []Character
	db.Find(&characters)
	fmt.Println("[Lord Of The Rings Characters] Len: ", len(characters))

	json.NewEncoder(w).Encode(characters)
}

func lotrCharacters(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("postgres", postgresInfo)

	if err != nil {
		panic("Database connection failed")
	}

	enableCors(&w)

	defer db.Close()

	var characters []Character
	db.Where("category = ?", "lotr_char").Find(&characters)
	fmt.Println("[Lord Of The Rings Characters] Len: ", len(characters))

	json.NewEncoder(w).Encode(characters)
}

func hobbCharacters(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("postgres", postgresInfo)

	if err != nil {
		panic("Database connection failed")
	}

	enableCors(&w)

	defer db.Close()

	var characters []Character
	db.Where("category = ?", "hobb_char").Find(&characters)
	fmt.Println("[Hobbit Characters] Len: ", len(characters))

	json.NewEncoder(w).Encode(characters)
}

func silmCharacters(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("postgres", postgresInfo)

	if err != nil {
		panic("Database connection failed")
	}

	enableCors(&w)

	defer db.Close()

	var characters []Character
	db.Where("category = ?", "silm_char").Find(&characters)
	fmt.Println("[Silmarillion Characters] Len: ", len(characters))

	json.NewEncoder(w).Encode(characters)
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/characters", allCharacters).Methods("GET")
	myRouter.HandleFunc("/lotr", lotrCharacters).Methods("GET")
	myRouter.HandleFunc("/hobbit", hobbCharacters).Methods("GET")
	myRouter.HandleFunc("/silmarillion", silmCharacters).Methods("GET")
	log.Fatal(http.ListenAndServe(":8081", myRouter))
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func main() {
	fmt.Println("[Lord Of The Rings API] Running in port 8081")

	// Handle Subsequent requests
	handleRequests()
}
