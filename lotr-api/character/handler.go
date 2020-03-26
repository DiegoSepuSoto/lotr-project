package character

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// HandleRequests ...
func HandleRequests() {
	rout := mux.NewRouter().StrictSlash(true)
	rout.HandleFunc("/characters", allCharacters).Methods("GET")
	rout.HandleFunc("/lotr", lotrCharacters).Methods("GET")
	rout.HandleFunc("/hobbit", hobbCharacters).Methods("GET")
	rout.HandleFunc("/silmarillion", silmCharacters).Methods("GET")
	rout.HandleFunc("/up_vote/{id}", upVote).Methods("PUT")

	f.Println("[Lord Of The Rings API] Running in port 8081")
	log.Fatal(http.ListenAndServe(":8081", rout))
}
