package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Post struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	UID       string             `json:"uId,omitempty"`
	Image     string             `json:"image,omitempty"`
	PostText  string             `json:"postText,omitempty"`
	CreatedAt time.Time          `json:"createdAt,omitempty"`
	Like      []string           `json:"likeUID,omitempty"`
}
