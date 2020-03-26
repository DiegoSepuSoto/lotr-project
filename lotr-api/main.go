package main

import (
	"fmt"
	"log"
	c "lotr-api/character"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	mainRout := mux.NewRouter()

	cRout := c.HandleRequests()

	mainRout.Handle("/", cRout)

	fmt.Println("[Lord Of The Rings API] Running in port 8081")
	log.Fatal(http.ListenAndServe(":8081", mainRout))
}
