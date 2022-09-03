package controllers

import (
	"backend/configs"
	"backend/models"
	"backend/responses"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
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
			UID:       post.UID,
			PostImage: post.PostImage,
			PostText:  post.PostText,
			CreatedAt: time.Now(),
		}

		res, err := postCollection.InsertOne(ctx, newPost)
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
		fmt.Println(res.InsertedID)

		matchStage := bson.D{{"$match", bson.D{{"_id", res.InsertedID}}}}
		lookupStage := bson.D{{"$lookup", bson.D{{"from", "Users"}, {"localField", "uid"}, {"foreignField", "id"}, {"as", "userData"}}}}
		unwindStage := bson.D{{"$unwind", bson.D{{"path", "$userData"}, {"preserveNullAndEmptyArrays", false}}}}
		showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{matchStage, lookupStage, unwindStage})
		if err != nil {
			panic(err)
		}
		var postCard []models.PostCard
		if err = showLoadedCursor.All(ctx, &postCard); err != nil {
			fmt.Println("ERROR DI CURSOR")
			panic(err)
		}

		// if err := postCollection.FindOne(ctx, bson.M{"_id": res.InsertedID}).Decode(&postCard); err != nil {
		// 	fmt.Println("SOMETHING WRONG")
		// }
		// fmt.Println(postCard)
		c.JSON(
			http.StatusCreated,
			responses.UserResponse{
				Data:    map[string]interface{}{"data": postCard[0]},
				Message: "Post Created!",
				Status:  http.StatusCreated,
			},
		)
	}
}
func GetAllPosts() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()
		var showLoadedCursor *mongo.Cursor

		lookupStage := bson.D{{"$lookup", bson.D{{"from", "Users"}, {"localField", "uid"}, {"foreignField", "id"}, {"as", "userData"}}}}
		unwindStage := bson.D{{"$unwind", bson.D{{"path", "$userData"}, {"preserveNullAndEmptyArrays", false}}}}
		showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage})
		if err != nil {
			panic(err)
		}
		var showsLoaded []models.PostCard
		if err = showLoadedCursor.All(ctx, &showsLoaded); err != nil {
			panic(err)
		}
		c.JSON(
			http.StatusOK,
			&showsLoaded,
		)
		fmt.Println("DATA PASSSED")

		// Cursor, err := postCollection.Find(ctx, bson.M{})
		// if err != nil {
		// 	c.JSON(
		// 		http.StatusInternalServerError,
		// 		responses.UserResponse{
		// 			Data:    map[string]interface{}{"data": err.Error()},
		// 			Message: "Data ERROR!",
		// 			Status:  http.StatusInternalServerError,
		// 		},
		// 	)
		// 	return
		// }
		// defer Cursor.Close(ctx)
		// var data []bson.M
		// for Cursor.Next(ctx) {
		// 	if err = Cursor.All(ctx, &data); err != nil {
		// 		c.JSON(
		// 			http.StatusInternalServerError,
		// 			responses.UserResponse{
		// 				Data:    map[string]interface{}{"data": err.Error()},
		// 				Message: "CURSOR MAP ERROR!",
		// 				Status:  http.StatusInternalServerError,
		// 			},
		// 		)
		// 	}
		// }
		// c.JSON(
		// 	http.StatusOK,
		// 	&data,
		// )

	}
}

func DeletePost() gin.HandlerFunc {
	return func(c *gin.Context) {

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		postId := c.Param("id")

		objId, _ := primitive.ObjectIDFromHex(postId)
		fmt.Println("OBJECT ID:", objId)

		result, err := postCollection.DeleteOne(ctx, bson.M{"id": objId})
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Data:    map[string]interface{}{"data": err.Error()},
					Message: "Post Not Found",
					Status:  http.StatusInternalServerError,
				})
			return
		}
		c.JSON(
			http.StatusOK,
			responses.UserResponse{
				Data:    map[string]interface{}{"data": result},
				Message: "Post Deleted!",
				Status:  http.StatusInternalServerError,
			})
	}
}
