package handler

import (
	"01-go/internal/model"
	"01-go/internal/repository"
	"net/http"
	"github.com/gin-gonic/gin"
)

func GetBooks(c *gin.Context) {
	books := repository.GetAllBooks()
	
	// Mengembalikan response JSON yang sukses
	c.JSON(http.StatusOK, gin.H{
		"message": "berhasil mengambil data buku",
		"data":    books,
	})
}

func GetBookByID(c *gin.Context) {
	id := c.Param("id") // Mengambil ID dari URL
	
	book, err := repository.GetBookByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "berhasil mengambil detail buku",
		"data":    book,
	})
}

func CreateBook(c *gin.Context) {
	var newBook model.Book
	
	// Validasi dan *binding* JSON body ke struct 'newBook'
	if err := c.ShouldBindJSON(&newBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	createdBook := repository.CreateBook(newBook)
	
	c.JSON(http.StatusCreated, gin.H{
		"message": "berhasil menambahkan buku baru",
		"data":    createdBook,
	})
}