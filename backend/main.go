package main

import (
	"backend/configs"
	"backend/routes"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	var r *gin.Engine
	r = gin.Default()
	configs.ConnectDB()
	r.Use(CORSMiddleware())
	routes.UserRoute(r)
	routes.PostRoute(r)
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(
			http.StatusOK,
			gin.H{
				"data": "It Works!",
			},
		)
	})
	r.Run(":5000")
}
