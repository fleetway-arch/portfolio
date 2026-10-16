package main

import (
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
)

func main() {
	http.Handle("/", newFrontendHandler(frontendRoot()))

	log.Println("Server starting on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// frontendRoot picks the Vite build output when it exists, otherwise the
// project directory. It is resolved once at startup rather than per request.
func frontendRoot() string {
	if info, err := os.Stat("dist"); err == nil && info.IsDir() {
		return "dist"
	}
	return "."
}

// newFrontendHandler serves static files from root and falls back to
// index.html so client-side routes such as /about work when opened directly.
// Hidden files and directories (.git, .env, ...) are never served.
func newFrontendHandler(root string) http.Handler {
	index := filepath.Join(root, "index.html")

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		name := path.Clean("/" + r.URL.Path)
		if hasHiddenSegment(name) {
			http.NotFound(w, r)
			return
		}

		if name != "/" {
			filePath := filepath.Join(root, filepath.FromSlash(name))
			if info, err := os.Stat(filePath); err == nil && !info.IsDir() {
				http.ServeFile(w, r, filePath)
				return
			}
		}

		http.ServeFile(w, r, index)
	})
}

// hasHiddenSegment reports whether any element of a cleaned URL path starts
// with a dot.
func hasHiddenSegment(name string) bool {
	for _, part := range strings.Split(name, "/") {
		if strings.HasPrefix(part, ".") {
			return true
		}
	}
	return false
}
