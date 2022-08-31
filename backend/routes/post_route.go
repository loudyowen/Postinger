package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func PostRoute(r *gin.Engine) {
	r.POST("/post", controllers.CreatePost())
	r.GET("/post", controllers.GetAllPosts())
	r.DELETE("/post/:id", controllers.DeletePost())

}
