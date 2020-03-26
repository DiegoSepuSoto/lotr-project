package character

import (
	"github.com/gorilla/mux"
)

// HandleRequests ...
func HandleRequests(r *mux.Router) {
	r.HandleFunc("/characters", allCharacters).Methods("GET")
	r.HandleFunc("/lotr", lotrCharacters).Methods("GET")
	r.HandleFunc("/hobbit", hobbCharacters).Methods("GET")
	r.HandleFunc("/silmarillion", silmCharacters).Methods("GET")
	r.HandleFunc("/up_vote/{id}", upVote).Methods("PUT")
}
