package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoute(r *gin.Engine) {
	r.POST("/user/signUp", controllers.Createuser())
	// r.GET("/user/:id", controllers.GetUser())
	// r.PUT("/user/:id", controllers.UpdateUser())
	// r.DELETE("/user/:id", controllers.DeleteUser())
}
