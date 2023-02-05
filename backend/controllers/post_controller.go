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
			fmt.Println("ERROR DI CURSOR")

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
func GetAllPosts() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()
		var showLoadedCursor *mongo.Cursor

		lookupStage := bson.D{{"$lookup", bson.D{{"from", "Users"}, {"localField", "uid"}, {"foreignField", "id"}, {"as", "userData"}}}}
		unwindStage := bson.D{{"$unwind", bson.D{{"path", "$userData"}, {"preserveNullAndEmptyArrays", false}}}}
		limit := bson.D{{"$limit", 2}}
		// skip := bson.D{{"$skip", 2}}
		sort := bson.D{{"$sort", bson.D{{"id", -1}}}}
		showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage, sort, limit})
		// showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage})
		if err != nil {
			panic(err)
		}
		var showsLoaded []models.PostCard
		// showLoadedCursor.
		// iterate cursor then using limit, and skip & limit the next load
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
		// var showLoadedCursor *mongo.Cursor
		// var step int
		var skipId models.SkipId
		// id := c.Param("id")
		// if id != "" {
		// 	fmt.Println(id)
		// }

		if err := c.BindJSON(&skipId); err != nil {
			fmt.Println(err)
			fmt.Println("error bind skipId")
			return
		}

		uid, _ := primitive.ObjectIDFromHex(skipId.UserId)
		// fmt.Println(skipId.Skip)
		// fmt.Println(skipId.UserId)
		lookupStage := bson.D{}
		unwindStage := bson.D{}
		limit := bson.D{}
		skip := bson.D{}
		sort := bson.D{}
		matchStage := bson.D{}
		// showLoadedCursor := bson.D{}

		//look data from users with post.uid == user.id as userData
		lookupStage = bson.D{{"$lookup", bson.D{{"from", "Users"}, {"localField", "uid"}, {"foreignField", "id"}, {"as", "userData"}}}}
		unwindStage = bson.D{{"$unwind", bson.D{{"path", "$userData"}, {"preserveNullAndEmptyArrays", false}}}}
		limit = bson.D{{"$limit", 1}}
		skip = bson.D{{"$skip", skipId.Skip}}
		sort = bson.D{{"$sort", bson.D{{"id", -1}}}}

		//join table post and user
		if skipId.UserId != "" {
			var showLoadedCursor *mongo.Cursor
			matchStage = bson.D{{"$match", bson.D{{"uid", uid}}}}
			// need to fix: for now just call all post that matched uid, but it need to be called one by one
			showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, matchStage, unwindStage, sort})
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

		// showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage, sort, skip, limit})
		// if err != nil {
		// 	panic(err)
		// }
		// var showsLoaded []models.PostCard
		// if err = showLoadedCursor.All(ctx, &showsLoaded); err != nil {
		// 	panic(err)
		// }
		// c.JSON(
		// 	http.StatusOK,
		// 	&showsLoaded,
		// )
	}
}

// func GetMorePost() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
// 		defer cancel()
// 		var showLoadedCursor *mongo.Cursor
// 		var step int

// 		if err := c.BindJSON(&step); err != nil {
// 			// ReqValidate(c, err, "Request Error")
// 			fmt.Println("error bind")
// 			return
// 		}
// 		lookupStage := bson.D{{"$lookup", bson.D{{"from", "Users"}, {"localField", "uid"}, {"foreignField", "id"}, {"as", "userData"}}}}
// 		unwindStage := bson.D{{"$unwind", bson.D{{"path", "$userData"}, {"preserveNullAndEmptyArrays", false}}}}
// 		limit := bson.D{{"$limit", 1}}
// 		skip := bson.D{{"$skip", step}}
// 		sort := bson.D{{"$sort", bson.D{{"id", -1}}}}
// 		// memory := bson.D{{"$allowDiskUse", true}}

// 		showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage, sort, skip, limit})
// 		if err != nil {
// 			panic(err)
// 		}
// 		var showsLoaded []models.PostCard
// 		if err = showLoadedCursor.All(ctx, &showsLoaded); err != nil {
// 			panic(err)
// 		}
// 		c.JSON(
// 			http.StatusOK,
// 			&showsLoaded,
// 		)
// 	}
// }

// func Paginate() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
// 		defer cancel()
// 		// filter := bson.M{}
// 		// limit, page := int64(2), int64(1)
// 		data, err := paginate.New(postCollection).Context(ctx).Find()
// 		if err != nil {
// 			fmt.Print("Paginate error")
// 		}
// 		// fmt.Println(data)
// 		// var list []models.PostCard
// 		// for _, raw := range data.Data {
// 		// var product models.PostCard
// 		// if marshallErr := bson.Unmarshal(raw, &product); marshallErr == nil {
// 		// 	list = append(list, product)
// 		// }
// 		// fmt.Println(raw)

// 		// }
// 		// fmt.Println("Paginate data:", list)

// 	}
// }

func UpdatePost() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var post models.Post
		postId := c.Param("id")
		// need update only valid user ID can update the post
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
				fmt.Println("ERROR DI CURSOR")
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
