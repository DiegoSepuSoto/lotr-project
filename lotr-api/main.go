package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	c "lotr-api/character"
)

func main() {

	r := mux.NewRouter().StrictSlash(true)

	c.HandleRequests(r)

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:3001"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
	})

	handler := cors.Handler(r)

	fmt.Println("[Lord Of The Rings API] Running in port 8081")

	log.Fatal(http.ListenAndServe(":8081", handler))
}
