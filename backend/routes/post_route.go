package routes

import (
	"backend/controllers"
	middlewares "backend/middleware"

	"github.com/gin-gonic/gin"
)

func PostRoute(r *gin.Engine) {
	// r.GET("/paginate", controllers.Paginate())
	auth := r.Use(middlewares.Auth())
	{
		auth.POST("/post", controllers.CreatePost())
		auth.GET("/post", controllers.GetAllPosts())
		auth.POST("/postMore", controllers.GetMorePost())
		auth.DELETE("/post/:id", controllers.DeletePost())
		auth.POST("/post/:id", controllers.UpdatePost())
	}

}
