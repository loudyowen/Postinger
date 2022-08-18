package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Post struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	Username  string             `json:"userName,omitempty" validate:"required"`
	Image     string             `json:"selectedFile,omitempty"`
	PostText  string             `json:"postText,omitempty"`
	CreatedAt string             `json:"createdAt,omitempty"`
	Like      []string           `json:"likeUID,omitempty"`
}
