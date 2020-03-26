package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	c "lotr-api/character"
)

func main() {

	r := mux.NewRouter().StrictSlash(true)

	c.HandleRequests(r)

	fmt.Println("[Lord Of The Rings API] Running in port 8081")

	log.Fatal(http.ListenAndServe(":8081", r))
}
