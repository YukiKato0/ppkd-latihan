package repository

import (
	"01-go/internal/model"
	"errors"
)

// Mock Data (berfungsi seperti database sementara)
var mockBooks = []model.Book{
	{ID: "1", Title: "Belajar Golang dari Nol", Author: "John Doe", Price: 120000},
	{ID: "2", Title: "Menguasai Gin Framework", Author: "Jane Smith", Price: 150000},
}

func GetAllBooks() []model.Book {
	return mockBooks
}

func GetBookByID(id string) (model.Book, error) {
	for _, book := range mockBooks {
		if book.ID == id {
			return book, nil
		}
	}
	return model.Book{}, errors.New("buku tidak ditemukan")
}

func CreateBook(book model.Book) model.Book {
	mockBooks = append(mockBooks, book)
	return book
}