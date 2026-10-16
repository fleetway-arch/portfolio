package main

import (
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
)

func writeFile(t *testing.T, path, content string) {
	t.Helper()
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatal(err)
	}
}

func TestFrontendHandler(t *testing.T) {
	base := t.TempDir()
	root := filepath.Join(base, "dist")
	writeFile(t, filepath.Join(root, "index.html"), "INDEX")
	writeFile(t, filepath.Join(root, "images", "net_cat.jpeg"), "IMAGE")
	writeFile(t, filepath.Join(root, ".git", "config"), "SECRET")
	writeFile(t, filepath.Join(root, ".env"), "SECRET")
	writeFile(t, filepath.Join(base, "main.go"), "OUTSIDE")

	handler := newFrontendHandler(root)

	tests := []struct {
		name       string
		path       string
		wantStatus int
		wantBody   string
	}{
		{"root serves index", "/", http.StatusOK, "INDEX"},
		{"client route falls back to index", "/about", http.StatusOK, "INDEX"},
		{"nested client route falls back to index", "/skills/", http.StatusOK, "INDEX"},
		{"static file is served", "/images/net_cat.jpeg", http.StatusOK, "IMAGE"},
		{"directory falls back to index", "/images", http.StatusOK, "INDEX"},
		{"hidden directory is not served", "/.git/config", http.StatusNotFound, ""},
		{"hidden file is not served", "/.env", http.StatusNotFound, ""},
		// http.ServeFile rejects raw ".." paths; ServeMux cleans them earlier in real traffic.
		{"traversal is rejected", "/../main.go", http.StatusBadRequest, ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/", nil)
			req.URL.Path = tt.path
			rec := httptest.NewRecorder()

			handler.ServeHTTP(rec, req)

			if rec.Code != tt.wantStatus {
				t.Fatalf("status = %d, want %d", rec.Code, tt.wantStatus)
			}
			body, _ := io.ReadAll(rec.Body)
			if tt.wantBody != "" && string(body) != tt.wantBody {
				t.Fatalf("body = %q, want %q", body, tt.wantBody)
			}
			if string(body) == "SECRET" || string(body) == "OUTSIDE" {
				t.Fatalf("served protected content for %s", tt.path)
			}
		})
	}
}
