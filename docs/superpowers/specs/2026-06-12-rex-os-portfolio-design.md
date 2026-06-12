# Rex OS — Build-in-Public Portfolio Redesign

**Date:** 2026-06-12
**Status:** Approved design, pending implementation plan
**Owner:** Rex Orokumue (`Rex-Orokumue`)

---

## 1. Problem

The current portfolio (Next.js 16, App Router, Tailwind v4) looks generic and
"AI-generated": dark-slate background, blue glow, gradient mesh, noise texture,
glassmorphism, Syne/DM Sans fonts, "AI-First Product Builder" tagline. It is
clean but indistinguishable from thousands of generated portfolios and is not
strong enough to make Rex memorable to recruiters and clients.

## 2. Goal

A unique, ownable portfolio concept — **"Rex OS"**, a build-in-public operating
system — that:

- Is **dashboard-first** so recruiters/clients see all work instantly (no forced
  interaction).
- Includes a **real interactive terminal** as an optional, delightful navigation
  path for technical visitors.
- Surfaces **live GitHub data** so the site proves Rex actively ships and can't
  go stale.
- Escapes the "AI-ish" aesthetic with a distinctive design system and a
  dual-theme (dark amber-phosphor default + light editorial "paper") toggle.

Success = a first-time visitor immediately understands who Rex is and what he has
built, *and* remembers the site as distinctive ("the one that's a little OS").

## 3. Scope

**In scope (this spec):** the centerpiece —
1. New homepage = the Rex OS dashboard shell + panels.
2. Design-system tokens (dual theme) replacing the current global styles.
3. Interactive terminal component.
4. Live GitHub data integration (server route + caching).

**Out of scope (fast follow-up specs):** reskinning sub-pages (`/about`,
`/blog`, `/projects`, `/build-logs`, `/bootcamp`, `/tech-serial`, `/admin`) to
match the new design system. They keep working; only the homepage changes in
this phase. Existing routes and data (`projectsData.ts`, blog, Supabase) are
untouched except where panels read from them.

## 4. Concept

**Rex OS** — a personal operating system for building in public. The homepage is
the "desktop": a top menubar plus a grid of focused panels. The same content is
reachable two ways — by clicking panels (default, recruiter-safe) or by typing in
the embedded terminal (optional, for fun). Live GitHub activity keeps it alive.

## 5. Architecture

### 5.1 Layout

```
┌─ MENUBAR ───────────────────────────────────────────────┐
│ ◉ Rex OS   ● shipping — day N        [☀/☾]  nav  clock   │
├─────────────────────────────────────────────────────────┤
│ ┌ Identity ─────┐ ┌ Live Activity (GitHub) ───────────┐ │
│ │ avatar, name, │ │ commits/wk · streak · heat-strip  │ │
│ │ one-liner,    │ │ last push · public repos          │ │
│ │ availability, │ └───────────────────────────────────┘ │
│ │ contact btns  │ ┌ Active Missions ──────────────────┐ │
│ └───────────────┘ │ current builds from projectsData  │ │
│ ┌ Projects ─────────────────┐ └─────────────────────────┘ │
│ │ project cards → /projects │ ┌ Build Logs feed ────────┐ │
│ └───────────────────────────┘ │ latest log entries      │ │
│ ┌ Terminal (optional) ──────┐ └─────────────────────────┘ │
│ │ $ _  type help            │ ┌ Contact / CTA ──────────┐ │
│ └───────────────────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

Responsive: panels reflow to a single column on mobile; the terminal collapses
to a launchable panel rather than always-open on small screens.

### 5.2 Components (each focused, independently testable)

- `RexOS` (homepage shell) — composes menubar + panel grid, owns theme state.
- `MenuBar` — logo, live shipping-day status, theme toggle, nav, clock.
- `IdentityPanel` — static/curated identity + contact buttons.
- `ActivityPanel` — consumes GitHub JSON; renders commits, streak, heat-strip,
  last-push, repo count; has loading + error/fallback states.
- `MissionsPanel` — reads `data/projectsData.ts` for "active" items.
- `ProjectsPanel` — reuses existing project card data → links to project pages.
- `LogsPanel` — latest build-log/tech-serial entries.
- `Terminal` — interactive command interpreter (see 5.4).
- `ContactPanel` — CTA + contact (reuse existing email/contact mechanism).
- `theme/tokens.css` (or token layer in `globals.css`) — design tokens.

Each component answers: what it does, what props it takes, what it depends on.
GitHub data is fetched once at the shell level (or via a server component) and
passed down, so panels stay dumb and testable.

### 5.3 GitHub data flow

- **Server route:** `app/api/github/route.ts` (Next route handler), runs on the
  server, reads `GITHUB_TOKEN` (read-only, public scope) from `.env.local`.
- **Queries:**
  - GraphQL `contributionsCollection` → contribution calendar + current streak
    (requires token; this is the impressive, accurate part).
  - REST `/users/Rex-Orokumue/repos` + recent push event → public repo count,
    last-push timestamp.
- **Caching:** response cached with `revalidate` ~3600s (hourly) to stay fast
  and well under rate limits. Token never reaches the client.
- **Output:** a small clean JSON shape, e.g.
  `{ commitsThisWeek, currentStreakDays, lastPushAt, publicRepos, weeks: [...heatmap] }`.
- **Failure:** if GitHub is down or token missing, `ActivityPanel` shows a
  graceful curated fallback (last-known/placeholder) rather than breaking the
  page. The route returns a typed error the panel can detect.

### 5.4 Terminal

A controlled input + scrollback. Command set (v1):

| Command | Action |
|---|---|
| `help` | list commands |
| `whoami` | identity blurb |
| `projects` | list projects (with slugs) |
| `open <slug>` | route to that project page |
| `logs` | route to /build-logs |
| `blog` | route to /blog |
| `about` | route to /about |
| `contact` | reveal contact / route to contact |
| `resume` | open/download resume |
| `theme` | toggle dark/light |
| `clear` | clear scrollback |

Plus 1–2 easter eggs (e.g. `sudo`, `ls`). Unknown command → friendly
"command not found, try `help`". Navigation uses Next's router. The terminal is
**never a gate** — all destinations are also reachable by clicking panels.

### 5.5 Design system (de-AI-ifying)

Remove: gradient mesh, blue glow, noise texture, glassmorphism, Syne.
Replace with CSS design tokens on a `data-theme` attribute (default `dark`).

**Dark — "Amber phosphor" (default):**
- canvas `#0a0a0a` near-black; accent warm amber `#ffb000`; text near-white;
  muted grays; **hairline** borders; subtle grid lines (no glow).
- Type: JetBrains Mono (data/labels) + a characterful display font for headings.

**Light — "Paper" (toggle):**
- canvas warm off-white `#f4f1ea`; ink `#111`; accent = deepened amber/bold ink
  so it stays legible on paper; editorial spacing.

Theme is toggled via menubar switch and the terminal `theme` command; preference
persisted in `localStorage`; respects `prefers-color-scheme` on first visit.
All color/spacing/font decisions flow through tokens so both themes are one set
of variables each — no duplicated component styles.

## 6. Data & dependencies

- New env var: `GITHUB_TOKEN` (read-only). Document in README; never committed.
- New fonts (JetBrains Mono + chosen display) via `next/font` (self-hosted,
  faster than the current Google Fonts `@import`).
- No new heavy libraries required; terminal and panels are plain React.
- Reuses: `data/projectsData.ts`, existing project/blog routes, existing
  contact/email mechanism, Supabase (unchanged).

## 7. Testing

- **ActivityPanel:** unit-test rendering against mock GitHub JSON; loading,
  populated, and error/fallback states.
- **Terminal:** unit-test the command interpreter — each command maps to the
  right action; unknown command handling; `clear`.
- **GitHub route:** test JSON shape against a mocked fetch; verify token is not
  exposed and failure returns a typed fallback.
- **Theme toggle:** verify `data-theme` flips and persists.
- Manual: verify dashboard is fully usable with the terminal ignored
  (recruiter path) and on mobile reflow.

## 8. Risks & mitigations

- **Concept distracts recruiters** → dashboard-first; terminal optional; all
  content one click away.
- **GitHub rate limits / downtime** → server-side token + hourly cache +
  graceful fallback panel.
- **Scope creep** → sub-page reskins explicitly deferred to a follow-up spec.
- **Two themes = double work** → mitigated by token-only theming (no per-theme
  component code).

## 9. Open items (decide during planning)

- Exact display font for headings (pair with JetBrains Mono).
- Whether "active mission" is a new flag in `projectsData.ts` or inferred.
- Resume source (link vs file in `/public`).
