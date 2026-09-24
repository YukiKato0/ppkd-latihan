package main

import (
	"01-go/internal/router"
	"fmt"
)

func main() {
	r := router.SetupRouter()

	fmt.Println("Server berjalan di port 8080...")
	// Menjalankan server di localhost:8080
	r.Run(":8080")
}