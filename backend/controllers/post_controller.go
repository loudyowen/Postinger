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
	paginate "github.com/gobeam/mongo-go-pagination"
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
			// panic(err)
		}

		// return the newest data
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

		// d := 1
		// for _, i := range showsLoaded {
		// 	fmt.Print(d, ". ")
		// 	fmt.Println(i.Id)
		// 	d++
		// }

		c.JSON(
			http.StatusOK,
			&showsLoaded,
		)

		// add 1 new data when loaded
		// 		submit
		// 		-> postStatus(frontend,postAction)
		// 		-> CreatePost(backend, post_controller)
		// 		-> get data to postStatus(frontend,postAction)
		// 		-> dispatch CRATE (frontend, reducers/posts.js)
		// 		-> display in frontend

		// cara 1
		// ikutin youtube, tampilkan 2 data awal, lanjut 2 data berikutnya dengan skipp yg di berikan
		// perlu await yang menunggu perintah query berikutnya, disini bisa menggunakan goroutine dan channel

		//cara 2
		// -first call, call getAllPost with limit 2 and no skipp
		// -page will scroll down, there is 2 way:
		// 1. using the youtube way, calculate the height, if react the total height then add more data
		// 2. using element visibility, when element is visible then call the getAllPost again
		// - when all data is loaded the print no data with data.length == 0
		// 3. using 2 api, 1 api is the calling of 2 first data, then other api will do the post with skip data
	}
}

func GetMorePost() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()
		var showLoadedCursor *mongo.Cursor
		var step int

		if err := c.BindJSON(&step); err != nil {
			// ReqValidate(c, err, "Request Error")
			fmt.Println("error bind")
			return
		}

		// fmt.Println("SkipStep:", step)

		lookupStage := bson.D{{"$lookup", bson.D{{"from", "Users"}, {"localField", "uid"}, {"foreignField", "id"}, {"as", "userData"}}}}
		unwindStage := bson.D{{"$unwind", bson.D{{"path", "$userData"}, {"preserveNullAndEmptyArrays", false}}}}
		limit := bson.D{{"$limit", 1}}
		skip := bson.D{{"$skip", step}}
		sort := bson.D{{"$sort", bson.D{{"id", -1}}}}
		showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage, sort, skip, limit})
		// showLoadedCursor, err := postCollection.Aggregate(ctx, mongo.Pipeline{lookupStage, unwindStage})
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

func Paginate() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()
		// filter := bson.M{}
		// limit, page := int64(2), int64(1)
		data, err := paginate.New(postCollection).Context(ctx).Find()
		if err != nil {
			fmt.Print("Paginate error")
		}
		fmt.Println(data)
		// var list []models.PostCard
		// for _, raw := range data.Data {
		// var product models.PostCard
		// if marshallErr := bson.Unmarshal(raw, &product); marshallErr == nil {
		// 	list = append(list, product)
		// }
		// fmt.Println(raw)

		// }
		// fmt.Println("Paginate data:", list)

	}
}

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
