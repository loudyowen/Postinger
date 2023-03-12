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
var commentColletion *mongo.Collection = configs.GetCollection(configs.DB, "Comments")

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

		// lookup for the newest data with inserted id
		matchStage := bson.D{{"$match", bson.D{{"_id", res.InsertedID}}}}
		lookupStage := bson.D{{"$lookup", bson.D{{"from", "Users"}, {"localField", "uid"}, {"foreignField", "id"}, {"as", "userData"}}}}
		unwindStage := bson.D{{"$unwind", bson.D{{"path", "$userData"}, {"preserveNullAndEmptyArrays", false}}}}
		showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{matchStage, lookupStage, unwindStage})
		if err != nil {
			panic(err)
		}
		var postCard []models.PostCard
		if err = showLoadedCursor.All(ctx, &postCard); err != nil {
			fmt.Println(err)
		}

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

func CreateComment() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var commentPost models.CommentPost
		defer cancel()

		if err := c.BindJSON(&commentPost); err != nil {
			ReqValidate(c, err, "Request Error")
			return
		}

		if validationErr := validate.Struct(&commentPost); validationErr != nil {
			ReqValidate(c, validationErr, "Validation Error")
			return
		}

		newCommentPost := models.CommentPost{
			Id:        primitive.NewObjectID(),
			UID:       commentPost.UID,
			PID:       commentPost.PID,
			PostImage: commentPost.PostImage,
			PostText:  commentPost.PostText,
			CreatedAt: time.Now(),
		}

		res, err := commentColletion.InsertOne(ctx, newCommentPost)
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
		// lookup for the newest data with inserted id
		matchStage := bson.D{{"$match", bson.D{{"_id", res.InsertedID}}}}
		lookupStage := bson.D{{"$lookup", bson.D{{"from", "Users"}, {"localField", "uid"}, {"foreignField", "id"}, {"as", "userData"}}}}
		unwindStage := bson.D{{"$unwind", bson.D{{"path", "$userData"}, {"preserveNullAndEmptyArrays", false}}}}
		showLoadedCursor, err := commentColletion.Aggregate(ctx, mongo.Pipeline{matchStage, lookupStage, unwindStage})
		if err != nil {
			panic(err)
		}
		var CommentData []models.CommentData
		if err = showLoadedCursor.All(ctx, &CommentData); err != nil {
			fmt.Println(err)
		}

		c.JSON(
			http.StatusCreated,
			responses.UserResponse{
				Data:    map[string]interface{}{"data": CommentData[0]},
				Message: "Comment Created!",
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

		limit := bson.D{{"$limit", 2}}
		sort := bson.D{{"$sort", bson.D{{"id", -1}}}}
		showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage, sort, limit})
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
	}
}

func GetAllPostsProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()
		userId := c.Param("id")
		objId, _ := primitive.ObjectIDFromHex(userId)
		var showLoadedCursor *mongo.Cursor
		lookupStage := bson.D{{"$lookup", bson.D{{"from", "Users"}, {"localField", "uid"}, {"foreignField", "id"}, {"as", "userData"}}}}
		unwindStage := bson.D{{"$unwind", bson.D{{"path", "$userData"}, {"preserveNullAndEmptyArrays", false}}}}
		matchStage := bson.D{{"$match", bson.D{{"uid", objId}}}}
		limit := bson.D{{"$limit", 2}}
		sort := bson.D{{"$sort", bson.D{{"id", -1}}}}
		showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage, matchStage, sort, limit})
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
	}
}

func GetMorePost() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()
		var skipId models.SkipId
		if err := c.BindJSON(&skipId); err != nil {
			fmt.Println(err)
			return
		}

		uid, _ := primitive.ObjectIDFromHex(skipId.UserId)
		lookupStage := bson.D{}
		unwindStage := bson.D{}
		limit := bson.D{}
		skip := bson.D{}
		sort := bson.D{}
		matchStage := bson.D{}

		//look data from users with post.uid == user.id as userData
		lookupStage = bson.D{{"$lookup", bson.D{{"from", "Users"}, {"localField", "uid"}, {"foreignField", "id"}, {"as", "userData"}}}}
		unwindStage = bson.D{{"$unwind", bson.D{{"path", "$userData"}, {"preserveNullAndEmptyArrays", false}}}}
		limit = bson.D{{"$limit", 1}}
		sort = bson.D{{"$sort", bson.D{{"id", -1}}}}
		skip = bson.D{{"$skip", skipId.Skip}}

		//join table post and user
		if skipId.UserId != "" {
			var showLoadedCursor *mongo.Cursor
			matchStage = bson.D{{"$match", bson.D{{"uid", uid}}}}
			showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, matchStage, unwindStage, sort, skip, limit})
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
		} else {
			var showLoadedCursor *mongo.Cursor
			showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage, sort, skip, limit})
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
		}
	}
}

func UpdatePost() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var post models.Post
		postId := c.Param("id")
		objId, _ := primitive.ObjectIDFromHex(postId)

		if err := c.BindJSON(&post); err != nil {
			ReqValidate(c, err, "Request Error")
			return
		}
		if validationErr := validate.Struct(&post); validationErr != nil {
			ReqValidate(c, validationErr, "Validation Error")
			return
		}
		updateData := bson.M{
			"postimage": post.PostImage,
			"posttext":  post.PostText,
		}
		result, err := postCollection.UpdateOne(c, bson.M{"id": objId}, bson.M{"$set": updateData})
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Status:  http.StatusInternalServerError,
					Message: "error",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		if result.MatchedCount == 1 {
			matchStage := bson.D{{"$match", bson.D{{"id", objId}}}}
			lookupStage := bson.D{{"$lookup", bson.D{{"from", "Users"}, {"localField", "uid"}, {"foreignField", "id"}, {"as", "userData"}}}}
			unwindStage := bson.D{{"$unwind", bson.D{{"path", "$userData"}, {"preserveNullAndEmptyArrays", false}}}}
			showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{matchStage, lookupStage, unwindStage})
			if err != nil {
				panic(err)
			}
			var postCard []models.PostCard
			if err = showLoadedCursor.All(ctx, &postCard); err != nil {
				panic(err)
			}

			c.JSON(
				http.StatusOK,
				responses.UserResponse{
					Status:  http.StatusOK,
					Message: "Update Success!!!",
					Data:    map[string]interface{}{"data": postCard[0]},
				},
			)
		}

	}
}

func DeletePost() gin.HandlerFunc {
	return func(c *gin.Context) {

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		postId := c.Param("id")

		objId, _ := primitive.ObjectIDFromHex(postId)

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
