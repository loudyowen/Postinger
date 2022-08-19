package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Post struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	Username string             `json:"userName,omitempty" validate:"required"`
	// remove userImage -> change to get from user database
	UserImage string    `json:"userImage,omitempty"`
	Image     string    `json:"image,omitempty"`
	PostText  string    `json:"postText,omitempty"`
	CreatedAt time.Time `json:"createdAt,omitempty"`
	Like      []string  `json:"likeUID,omitempty"`
}
