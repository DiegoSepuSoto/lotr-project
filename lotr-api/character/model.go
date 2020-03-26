package character

import "github.com/jinzhu/gorm"

// Character representation for database
type Character struct {
	gorm.Model
	Title    string `json:"title"`
	Link     string `json:"link"`
	Image    string `json:"image"`
	Category string `json:"category"`
	UpVotes  int    `json:"up_votes"`
}
