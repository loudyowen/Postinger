package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Post struct {
	Id        primitive.ObjectID `json:"id"`
	UID       primitive.ObjectID `json:"uId"`
	PostImage string             `json:"postImage,omitempty"`
	PostText  string             `json:"postText,omitempty"`
	CreatedAt time.Time          `json:"createdAt"`
	Like      []string           `json:"likeUID,omitempty"`
}

type PostCard struct {
	Id        primitive.ObjectID `bson:"id"`
	Image     string             `bson:"postimage,omitempty"`
	PostText  string             `bson:"posttext,omitempty"`
	Like      []string           `bson:"like,omitempty"`
	CreatedAt time.Time          `bson:"createdat"`
	UserData  UserPost           `bson:"userData"`
}

// type SkipStep struct {
// 	Skip int `json: "skip"`
// }

type SkipId struct {
	Skip   int    `json: "skip"`
	UserId string `json: "userId"`
}
