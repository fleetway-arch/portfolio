package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	http.HandleFunc("/", serveFrontend)

	log.Println("Server starting on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func serveFrontend(w http.ResponseWriter, r *http.Request) {
	root := "."
	if _, err := os.Stat("dist"); err == nil {
		root = "dist"
	}

	requestPath := filepath.Clean(r.URL.Path)
	if requestPath == "/" {
		requestPath = "/index.html"
	}

	filePath := filepath.Join(root, requestPath)
	if info, err := os.Stat(filePath); err == nil && !info.IsDir() {
		http.ServeFile(w, r, filePath)
		return
	}

	http.ServeFile(w, r, filepath.Join(root, "index.html"))
}
