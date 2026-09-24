package router

import (
	"01-go/internal/handler"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	// Membuat router bawaan Gin
	r := gin.Default()

	// Membuat pengelompokan API (Versioning)
	api := r.Group("/api/v1")
	{
		api.GET("/books", handler.GetBooks)
		api.GET("/books/:id", handler.GetBookByID)
		api.POST("/books", handler.CreateBook)
	}

	return r
}