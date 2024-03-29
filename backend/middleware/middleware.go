package middlewares

import (
	"backend/auth"
	"backend/responses"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Auth() gin.HandlerFunc {
	return func(context *gin.Context) {
		tokenString := context.GetHeader("authorization")
		if tokenString == "" {
			context.JSON(
				http.StatusUnauthorized,
				responses.UserResponse{
					Data:    map[string]interface{}{"data": nil},
					Message: "request does not contain an access token",
					Status:  http.StatusUnauthorized,
				},
			)
			context.Abort()
			return
		}
		err := auth.ValidateToken(tokenString)
		if err != nil {
			context.JSON(
				http.StatusUnauthorized,
				responses.UserResponse{
					Data:    map[string]interface{}{"error": err},
					Message: "Invalid Token",
					Status:  http.StatusUnauthorized,
				},
			)
			context.Abort()
			return
		}
		context.Next()
	}
}
