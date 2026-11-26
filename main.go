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
	absRoot, err := filepath.Abs(root)
	if err != nil {
		absRoot = root
	}
	absRoot = filepath.Clean(absRoot)
	index := filepath.Join(absRoot, "index.html")

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		name := path.Clean("/" + r.URL.Path)
		if hasHiddenSegment(name) {
			http.NotFound(w, r)
			return
		}

		if name != "/" {
			rel := strings.TrimPrefix(name, "/")
			candidate := filepath.Join(absRoot, filepath.FromSlash(rel))
			filePath, err := filepath.Abs(candidate)
			if err == nil && isWithinBase(absRoot, filePath) {
				if info, err := os.Stat(filePath); err == nil && !info.IsDir() {
					http.ServeFile(w, r, filePath)
					return
				}
			}
		}

		http.ServeFile(w, r, index)
	})
}

// isWithinBase reports whether target is inside base (or equal to base).
func isWithinBase(base, target string) bool {
	rel, err := filepath.Rel(base, target)
	if err != nil {
		return false
	}
	if rel == "." {
		return true
	}
	return !strings.HasPrefix(rel, ".."+string(os.PathSeparator)) && rel != ".."
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
