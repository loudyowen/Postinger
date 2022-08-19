package controllers

import (
	"backend/configs"
	"backend/models"
	"backend/responses"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var postCollection *mongo.Collection = configs.GetCollection(configs.DB, "Posts")

func CreatePost() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var post models.Post
		defer cancel()

		if err := c.BindJSON(&post); err != nil {
			ReqValidate(c, err, "Request Error")
			return
		}

		if validationErr := validate.Struct(&post); validationErr != nil {
			ReqValidate(c, validationErr, "Validation Error")
			return
		}

		newPost := models.Post{
			Id:        primitive.NewObjectID(),
			Username:  post.Username,
			UserImage: post.UserImage,
			Image:     post.Image,
			PostText:  post.PostText,
			CreatedAt: time.Now(),
			Like:      []string{""},
		}

		result, err := postCollection.InsertOne(ctx, newPost)
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Data:    map[string]interface{}{"data": err.Error()},
					Message: "error",
					Status:  http.StatusInternalServerError,
				},
			)
			return
		}

		c.JSON(
			http.StatusCreated,
			responses.UserResponse{
				Data:    map[string]interface{}{"data": result},
				Message: "Post Created!",
				Status:  http.StatusCreated,
			},
		)
	}
}
