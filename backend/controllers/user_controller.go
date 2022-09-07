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
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var userCollection *mongo.Collection = configs.GetCollection(configs.DB, "Users")
var validate = validator.New()

func ReqValidate(c *gin.Context, err error, message string) {
	c.JSON(
		http.StatusBadRequest,
		responses.UserResponse{
			Data:    map[string]interface{}{"data": err.Error()},
			Message: message,
			Status:  http.StatusBadRequest,
		},
	)
}

func Createuser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var user models.User
		defer cancel()

		//validation request body
		if err := c.BindJSON(&user); err != nil {
			ReqValidate(c, err, "Request Error")
			return
		}
		// using validator to validate the required request field
		if validationErr := validate.Struct(&user); validationErr != nil {
			ReqValidate(c, validationErr, "Validation Error")
			return
		}

		password, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)

		// input new user data to new user
		newUser := models.User{
			Id:           primitive.NewObjectID(),
			FirstName:    user.FirstName,
			LastName:     user.LastName,
			Email:        user.Email,
			Password:     string(password),
			ProfileImage: user.ProfileImage,
		}

		// insert to collection "Users"
		result, err := userCollection.InsertOne(ctx, newUser)

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
				Message: "User Created!",
				Status:  http.StatusCreated,
			},
		)
	}
}

func GetUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		// reqUserEmail := c.Param("email")
		// reqUserPassword := c.Param("password")
		// fmt.Println("==>email: ", reqUserEmail)
		// fmt.Println("==>password: ", reqUserPassword)
		var reqUser models.User
		var user models.User
		defer cancel()

		if err := c.BindJSON(&reqUser); err != nil {
			ReqValidate(c, err, "Request Error")
			return
		}

		if err := userCollection.FindOne(ctx, bson.M{"email": reqUser.Email}).Decode(&user); err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Data:    map[string]interface{}{"data": err.Error()},
					Message: "Error User Not Found",
					Status:  http.StatusInternalServerError,
				},
			)
			return
		}

		// reqUserPassword, err := bcrypt.GenerateFromPassword([]byte(reqUser.Password), 10)
		// if err != nil {
		// 	log.Fatal(err)
		//
		hashPass := []byte(user.Password)
		if err := bcrypt.CompareHashAndPassword(hashPass, []byte(reqUser.Password)); err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Data:    map[string]interface{}{"data": nil},
					Message: "Wrong Password",
					Status:  http.StatusInternalServerError,
				},
			)
			return
		}

		userFoundMsg := fmt.Sprintf("User %v %v is found!!!", user.FirstName, user.LastName)
		c.JSON(
			http.StatusOK,
			responses.UserResponse{
				Data:    map[string]interface{}{"data": user},
				Message: userFoundMsg,
				Status:  http.StatusOK,
			},
		)
	}
}

func UpdateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		userId := c.Param("id")
		var user models.User
		defer cancel()
		objId, _ := primitive.ObjectIDFromHex(userId)

		//validation request body
		if err := c.BindJSON(&user); err != nil {
			ReqValidate(c, err, "Request Error")
			return
		}

		// using validator to validate the required request field
		if validationErr := validate.Struct(&user); validationErr != nil {
			ReqValidate(c, validationErr, "Validation Error")
			return
		}

		// if user is not found
		if err := userCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&user); err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Status:  http.StatusInternalServerError,
					Message: "Error User Not Found",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		update := bson.M{
			"firstName": user.FirstName,
			"lastName":  user.LastName,
			"email":     user.Email,
			"password":  user.Password,
		}
		result, err := userCollection.UpdateOne(c, bson.M{"id": objId}, bson.M{"$set": update})
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

		//return updated user detail
		var updatedUser models.User
		if result.MatchedCount == 1 {
			err := userCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&updatedUser)
			if err != nil {
				c.JSON(
					http.StatusInternalServerError,
					responses.UserResponse{
						Status:  http.StatusInternalServerError,
						Message: "Error User Not Found",
						Data:    map[string]interface{}{"data": err.Error()},
					})
				return
			}
		}
		message := fmt.Sprintf("User %v is updated!!!", updatedUser.FirstName)
		c.JSON(
			http.StatusOK,
			responses.UserResponse{
				Status:  http.StatusOK,
				Message: message,
				Data:    map[string]interface{}{"data": updatedUser},
			},
		)

	}
}

func DeleteUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		userId := c.Param("id")
		var user models.User
		defer cancel()
		objId, _ := primitive.ObjectIDFromHex(userId)

		if err := userCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&user); err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Status:  http.StatusInternalServerError,
					Message: "Error User Not Found",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}
		deletedMessage := fmt.Sprintf("User %v is deleted!!!", user.FirstName)
		result, err := userCollection.DeleteOne(ctx, bson.M{"id": objId})
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Status:  http.StatusInternalServerError,
					Message: "Error User Not Found",
					Data:    map[string]interface{}{"data": err.Error()},
				})
			return
		}

		if result.DeletedCount != 1 {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Status:  http.StatusInternalServerError,
					Message: "Error",
					Data:    map[string]interface{}{"data": err.Error()},
				})
			return
		}
		c.JSON(
			http.StatusOK,
			responses.UserResponse{
				Status:  http.StatusOK,
				Message: deletedMessage,
				Data:    map[string]interface{}{"data": nil},
			},
		)
	}
}
