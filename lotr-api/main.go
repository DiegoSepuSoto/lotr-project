package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	c "lotr-api/character"

	_ "lotr-api/docs"

	httpSwagger "github.com/swaggo/http-swagger"
)

// @title LOTR Project API
// @version 1.0
// @description This API will send data related to The Lord of The Rings.

// @contact.name Diego Sepúlveda
// @contact.url http://www.github.com/diegosepusoto
// @contact.email diego.sepulvedas@utem.cl

// @host localhost:8081
// @BasePath /

func main() {

	r := mux.NewRouter().StrictSlash(true)

	r.PathPrefix("/documentation/").Handler(httpSwagger.WrapHandler)

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
