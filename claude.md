# Portfolio

## Stack

- Frontend: React + TypeScript, HTML, CSS — in `[frontend/]`
- Backend: Go — in `[backend/]`

## Commands

- Frontend dev: `[npm run dev]` → http://localhost:[port]
- Frontend build: `[npm run build]`
- Type check: `npx tsc --noEmit`
- Lint: `[npm run lint]`
- Backend run: `[go run ./cmd/server]`
- Backend checks: `go vet ./...` and `go test ./...`

## Never break (hard rules)

- Routes: keep every existing frontend route path and every backend endpoint
  (path, method, request/response shape) exactly as they are
- No changes to environment variables, ports, config files or deployment setup
  unless I explicitly ask
- No new dependencies without telling me why first
- Content (text, project data) stays the same unless I ask

## Code standards

- TypeScript strict, no `any` unless justified in a comment
- Design tokens (colors, fonts, spacing) as CSS variables in [path/to/tokens.css]; never hardcode
- CSS over JS for animations and effects
- Accessibility: WCAG AA contrast, visible focus states, prefers-reduced-motion respected
- Responsive down to 360px
- Go: idiomatic, errors handled, `gofmt` clean

## Workflow

- Explore before editing; plan before large changes
- After visual changes: open the site in the browser, screenshot, compare to
  `design/compcon-ref.png`
- Before saying a task is done: type check, lint, build, `go vet`, `go test` all pass
- Small, focused commits: one concern per commit
