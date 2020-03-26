package character

import (
	"github.com/gorilla/mux"
)

// HandleRequests ...
func HandleRequests() *mux.Router {
	rout := mux.NewRouter().StrictSlash(true)
	rout.HandleFunc("/characters", allCharacters).Methods("GET")
	rout.HandleFunc("/lotr", lotrCharacters).Methods("GET")
	rout.HandleFunc("/hobbit", hobbCharacters).Methods("GET")
	rout.HandleFunc("/silmarillion", silmCharacters).Methods("GET")
	rout.HandleFunc("/up_vote/{id}", upVote).Methods("PUT")

	return rout
}
