# Portfolio

Vue portfolio frontend built with Vite and served by the Go server. The server
supports client-side routes such as `/about` when they are opened directly.

## Run the frontend locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Run with the Go server

Build the Vue app first, then start the Go server:

```bash
npm run build
go run main.go
```

Then open `http://localhost:8080`. The Go server serves the Vite `dist` output
and falls back to Vue's `index.html` for routes such as `/about`.
