# Portfolio

## Stack

- Frontend: Vue 3 (JavaScript) + Vite, plain CSS. Lives at the repo root:
  `index.html`, `src/main.js`, `src/App.vue`, `src/styles/`, `public/images/`
- Backend: Go (stdlib only) in `main.go`, module `portfolio` (`go.mod`), tests in `main_test.go`

## Commands

- Frontend dev: `npm run dev` → http://localhost:5173
- Frontend build: `npm run build` (outputs `dist/`)
- Backend run: `go run .` → http://localhost:8080 (serves `dist/`, falls back to `index.html`)
- Backend checks: `go vet ./...`, `go test ./...`, `gofmt -l .` (must print nothing)
- Not set up yet: type check (no TypeScript) and lint (no ESLint). Don't add them without asking.

## Never break (hard rules)

- Routes: keep every existing frontend route path and every backend endpoint
  (path, method, request/response shape) exactly as they are.
  Frontend routes: `/`, `/skills`, `/experience`, `/about`. Backend: one `GET /` handler
  serving static files plus the SPA fallback; hidden paths (`/.git/...`) return 404
- No changes to environment variables, ports, config files or deployment setup
  unless I explicitly ask
- No new dependencies without telling me why first
- Content (text, project data) stays the same unless I ask. The only exception is the
  aria-hidden `boot` lines in each `Hero`, which are decorative

## Code standards

- JavaScript today. If files move to `.ts/.tsx`: TypeScript strict, no `any` unless justified in a comment
- Design tokens (colors, fonts, spacing, shape, motion) are CSS variables in
  `src/styles/tokens.css`; never hardcode them in `src/styles/base.css` or JSX
- CSS over JS for animations and effects
- Accessibility: WCAG AA contrast, visible focus states, prefers-reduced-motion respected
- Responsive down to 360px with no horizontal scroll
- Go: idiomatic, errors handled, `gofmt` clean

## Design system: "Signal Crimson"

The visual direction comes only from the screenshots in `design/` (the COMP/CON main
menu and Compendium). Use them for mood. Don't copy their logos, icons or exact layouts.

### Palette (`src/styles/tokens.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--c-bg` | `#141922` | page background |
| `--c-surface` / `-2` / `-3` | `#1b212c` / `#212836` / `#29313f` | panels, buttons, hover |
| `--c-primary` | `#8f3242` | crimson bars, active tab, primary button |
| `--c-primary-hover` | `#a03b4b` | primary hover |
| `--c-primary-hi` | `#ea7a8b` | highlights, `>` prompts, links, focus ring |
| `--c-accent` | `#e9bd66` | gold: terminal values, dates, single gold CTA |
| `--c-text` / `--c-muted` / `--c-faint` | `#e6e8ed` / `#a1aab9` / `#6b7484` | text tiers (faint = decorative only) |
| `--c-tint-{crimson,teal,violet,moss}` | `#2a1d25` `#1a3335` `#262239` `#1f2e27` | category tile backgrounds |
| `--c-mark-{crimson,teal,violet,moss}` | `#ea7a8b` `#6cc4b6` `#b19cec` `#8ec897` | tile notch, tag text, list markers |

All text pairs pass AA (checked: muted on every tint ≥ 5.7, marks on their tints ≥ 5.8).

Category mapping:
- Projects: Security, Go·APIs → crimson, Networking → teal, Game → violet, Design → moss
- Skills: technical → teal, professional → violet, challenge/training → crimson with a gold label

### Fonts (Google Fonts `<link>` in `index.html`)

- `--font-display` Barlow Condensed 600/700: headings, tab labels, tile titles (uppercase)
- `--font-mono` IBM Plex Mono 400/500: eyebrows, terminal, tags, buttons, dates
- `--font-body` IBM Plex Sans 400/600: paragraphs

### Motifs (classes in `base.css`)

- `.page-bg`: fixed dotted grid with `+` crosshairs (SVG mask, colored by `--c-grid-cross`)
- `.slash-bar` + `.slash-bar-body`: crimson bar with a diagonal cut and two parallel
  slashes (`--cut`, `--slash-w`, `--slash-gap`). Used for the hero eyebrow
- Header: full-bleed crimson brand block with a diagonal end, plus skewed nav tabs with
  a `> sub-label`. The active tab is crimson with a `--c-primary-hi` underline
- `.terminal`: mono "boot log" with ruler ticks on both edges and a blinking caret
  (disabled under reduced motion). Stats render as `> value ··· label` rows
- `.notched` + `data-tint="…"`: tile with a triangular top-left notch in `--mark`
- `.eyebrow`: wide-tracked mono caption prefixed with `> `
- `.content-section::before`: divider line with a centred `◆`
- `.section-heading`: crimson left rule
- `.button`: footer-style segment with a thick left accent (`-primary` crimson,
  `-accent` gold). No clip-path on focusable elements, so focus rings stay visible
- Experience: ruler-tick timeline spine with diamond markers
- About CTA: buttons sit on a crimson strip like the reference footer bar

## Workflow

- Explore before editing; plan before large changes
- After visual changes: build, run `go run .`, screenshot every route at 1440px and 360px,
  and compare against the `design/` screenshots
- Before saying a task is done: `npm run build`, `go vet ./...`, `go test ./...` and
  `gofmt -l .` all pass
- Small, focused commits: one concern per commit

### Softness (tokens)

- Radius: `--radius-sm` 6px (buttons, nav tabs), `--radius-md` 10px (insets), `--radius-lg` 14px (cards),
  `--radius-pill` (chips/tags). The `.notched` mark inherits the card's top-left radius
- Elevation: `--shadow-sm` on cards and buttons, `--shadow-md` on hover
- Motion: 220/380/600ms with a soft ease, `--lift` -2px, nav `--skew` -12deg; `.page-shell` fades in on
  route change (keyed by path), off under reduced motion
- Background: soft crimson/teal radial glows under a faint grid; header is translucent with blur
