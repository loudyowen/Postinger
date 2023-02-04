package controllers

import (
	"backend/auth"
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

// var jwtkey = []byte("supersecretkey") //should be stored in env
// type JWTClaim struct {
// 	Email string `json:"email,omitempty" validate:"required"`
// 	// FirstName string `json:"firstName,omitempty" validate:"required"`
// 	// LastName  string `json:"lastName,omitempty"`
// 	Username string `json:"firstName"+"lastName"`
// 	jwt.StandardClaims
// }

// func GenerateJWT(email, username string) (tokenString string, err error) {
// 	expirationTime := time.Now().Add(1 * time.Hour)
// 	claims := &JWTClaim{
// 		Email:    email,
// 		Username: username,
// 		StandardClaims: jwt.StandardClaims{
// 			ExpiresAt: expirationTime.Unix(),
// 		},
// 	}
// 	token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)
// 	tokenString, err = token.SignedString(jwtkey)
// 	return
// }

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

		var userPost models.UserPost

		if err := userCollection.FindOne(ctx, bson.M{"_id": result.InsertedID}).Decode(&userPost); err != nil {
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

		c.JSON(
			http.StatusCreated,
			responses.UserResponse{
				Data:    map[string]interface{}{"data": userPost},
				Message: "User Created!",
				Status:  http.StatusCreated,
			},
		)
	}
}

func GetUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

		var reqUser models.User
		var user models.User
		defer cancel()

		if err := c.BindJSON(&reqUser); err != nil {
			ReqValidate(c, err, "Request Error")
			return
		}

		// check if user exist
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

		// check if password is correct
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

		tokenString, err := auth.GenerateJWT(user.Email)
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.UserResponse{
					Data:    map[string]interface{}{"error": err.Error()},
					Message: "Token Invalid!",
					Status:  http.StatusInternalServerError,
				},
			)
			return
		}
		userPost := models.UserPost{
			Id:           user.Id,
			FirstName:    user.FirstName,
			LastName:     user.LastName,
			Email:        user.Email,
			ProfileImage: user.ProfileImage,
		}
		// cookie := c.SetCookie("token", tokenString, 60*60*24, "/", "http://127.0.0.1:3000", false, false)
		//  c.SetCookie()
		// c.Cookie(tokenString)
		// cookie := c.Cookie{
		// 	Name:     "token",
		// 	Value:    tokenString,
		// 	Expires:  time.Now().Add(time.Hour * 24),
		// 	HTTPOnly: true,
		// }

		c.JSON(
			http.StatusOK,
			responses.UserResponse{
				Data:    map[string]interface{}{"userData": userPost, "token": tokenString},
				Message: "Authenticated!",
				Status:  http.StatusOK,
			},
		)

		// c.JSON(http.StatusOK, gin.H{"token": tokenString})

		// cookie_token, err := c.Cookie("token")

		// if err != nil {
		// 	cookie_token = tokenString
		// 	// c.SetCookie("token", cookie_token, 3600, "/", "127.0.0.1", true, true)
		// 	c.SetCookie("token", cookie_token, 60*60*24, "/", "localhost:3000", true, false)
		// }
		// cookie, err := c.Cookie("gin_cookie")

		// if err != nil {
		// cookie = "NotSet"
		// c.SetCookie("cookie1", "test", 3600, "/", "localhost:3000", false, false)
		// c.SetCookie("cookie2", "test", 3600, "/", "localhost:3000", true, false)
		// c.SetCookie("cookie3", "test", 3600, "/", "localhost:3000", false, true)
		// c.SetCookie("cookie4", "test", 3600, "/", "localhost:3000", true, true)
		// c.SetCookie("token", "1234", 3600, "/", "localhost:3000", true, true)
		// }

		// c.Header("result", cookie_token)
		// cookie := http.Cookie{
		// 	Name:  "session_token",
		// 	Value: tokenString,
		// }
		// http.SetCookie(c.Writer, &cookie)
		// c.Cookie(
		// 	http.Cookie{
		// 		Name:  "session_token",
		// 		Value: tokenString,
		// 	},
		// )

	}
}

func UpdateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var user models.UserPost
		defer cancel()

		//validation request body
		if err := c.BindJSON(&user); err != nil {
			ReqValidate(c, err, "Request Error")
			return
		}
		userId, _ := primitive.ObjectIDFromHex(user.Id.Hex())

		// using validator to validate the required request field
		if validationErr := validate.Struct(&user); validationErr != nil {
			ReqValidate(c, validationErr, "Validation Error")
			return
		}

		// if user is not found
		if err := userCollection.FindOne(ctx, bson.M{"id": userId}).Err(); err != nil {
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
			"profileimage": user.ProfileImage,
			"email":        user.Email,
			"firstname":    user.FirstName,
			"lastname":     user.LastName,
		}

		result, err := userCollection.UpdateOne(c, bson.M{"id": userId}, bson.M{"$set": update})
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
			err := userCollection.FindOne(ctx, bson.M{"id": userId}).Decode(&updatedUser)
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
