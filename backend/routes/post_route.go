package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func PostRoute(r *gin.Engine) {
	r.POST("/home/post", controllers.CreatePost())
}
