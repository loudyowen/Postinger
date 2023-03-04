package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoute(r *gin.Engine) {
	r.POST("/user/signUp", controllers.Createuser()) // back to sign in
	r.POST("/user/signIn", controllers.GetUser())
	r.POST("/user/editAccount", controllers.UpdateUser())
}
