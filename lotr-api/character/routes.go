package character

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

const pgConn = "host=db port=5432 user=postgres dbname=lotr password=password sslmode=disable"

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func allCharacters(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("postgres", pgConn)

	if err != nil {
		panic("Database connection failed")
	}

	enableCors(&w)

	defer db.Close()

	var chars []Character
	db.Order("up_votes desc, title").Find(&chars)
	fmt.Println("[Lord Of The Rings Characters] Len: ", len(chars))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(chars)
}

func lotrCharacters(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("postgres", pgConn)

	if err != nil {
		panic("Database connection failed")
	}

	enableCors(&w)

	defer db.Close()

	var chars []Character
	db.Where("category = ?", "lotr_char").Order("up_votes desc, title").Find(&chars)
	fmt.Println("[Lord Of The Rings Characters] Len: ", len(chars))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(chars)
}

func hobbCharacters(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("postgres", pgConn)

	if err != nil {
		panic("Database connection failed")
	}

	enableCors(&w)

	defer db.Close()

	var chars []Character
	db.Where("category = ?", "hobb_char").Order("up_votes desc, title").Find(&chars)
	fmt.Println("[The Hobbit Characters] Len: ", len(chars))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(chars)
}

func silmCharacters(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("postgres", pgConn)

	if err != nil {
		panic("Database connection failed")
	}

	enableCors(&w)

	defer db.Close()

	var chars []Character
	db.Where("category = ?", "silm_char").Order("up_votes desc, title").Find(&chars)
	fmt.Println("[Silmarillion Characters] Len: ", len(chars))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(chars)
}

func upVote(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("postgres", pgConn)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Database connection failed"))
		panic("Database connection failed")
	}

	vars := mux.Vars(r)
	charID, err := strconv.Atoi(vars["id"])

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Character not found"))
	}

	var char Character
	db.First(&char, charID)
	char.UpVotes++
	db.Save(&char)

	enableCors(&w)

	fmt.Println("[Character Up Vote] Character:", char.Title)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("OK"))

	defer db.Close()

}
