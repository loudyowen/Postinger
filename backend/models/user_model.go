package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id           primitive.ObjectID `json:"id"`
	FirstName    string             `json:"firstName,omitempty" validate:"required"`
	LastName     string             `json:"lastName,omitempty"`
	Email        string             `json:"email,omitempty" validate:"required"`
	Password     string             `json:"password,omitempty" validate:"required"`
	ProfileImage string             `json:"profileImage,omitempty"`
}

type UserPost struct {
	FirstName    string `json:"firstName,omitempty" validate:"required"`
	LastName     string `json:"lastName,omitempty"`
	Email        string `json:"email,omitempty" validate:"required"`
	ProfileImage string `json:"profileImage,omitempty"`
}
