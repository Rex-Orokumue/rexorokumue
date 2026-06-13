# Rex OS Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage as "Rex OS" — a dashboard-first build-in-public operating system with an optional interactive terminal, live GitHub data, a dual-theme design system, and recruiter-grade content.

**Architecture:** A homepage shell (`RexOS`) composes a menubar + a grid of focused panels. Pure logic (GitHub transform, terminal interpreter) is unit-tested with vitest. Visual panels are verified by eye. GitHub data comes from a cached server route so the token stays secret. Theming is token-only via a `data-theme` attribute (dark "amber phosphor" default + light "paper").

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, vitest (new, logic tests only), GitHub GraphQL+REST.

**Spec:** `docs/superpowers/specs/2026-06-12-rex-os-portfolio-design.md`

**Branch:** `rex-os-redesign` (already created).

**Note on testing scope:** Per the spec, only the two logic modules (`lib/github`, terminal `commands`) are unit-tested. Panels/layout/theme are verified manually (`npm run dev`) — visual correctness can't be meaningfully asserted in unit tests.

---

## File Structure

**Create:**
- `vitest.config.ts` — test runner config
- `app/lib/github.ts` — GitHub types + pure transform (`summarizeContributions`)
- `app/lib/github.test.ts` — transform tests
- `app/api/github/route.ts` — cached server route (token from env)
- `app/components/os/terminal/commands.ts` — pure command interpreter
- `app/components/os/terminal/commands.test.ts` — interpreter tests
- `app/components/os/ThemeProvider.tsx` — theme state + `data-theme` + persistence
- `app/components/os/RexOS.tsx` — shell composing menubar + panel grid
- `app/components/os/MenuBar.tsx`
- `app/components/os/IdentityPanel.tsx`
- `app/components/os/ActivityPanel.tsx`
- `app/components/os/MissionsPanel.tsx`
- `app/components/os/ProjectsPanel.tsx`
- `app/components/os/LogsPanel.tsx`
- `app/components/os/ContactPanel.tsx`
- `app/components/os/Terminal.tsx`
- `app/components/os/os.css` — design tokens (both themes) + panel/menubar styles

**Modify:**
- `package.json` — add `test` script + vitest devDeps
- `app/layout.tsx` — add display font, set default `data-theme`, drop hardcoded body bg
- `app/page.tsx` — replace AI-ish homepage with `<RexOS />`

---

## Task 1: Test runner + design tokens

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`, `app/components/os/os.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add vitest devDeps and test script**

Run: `npm i -D vitest@^2`
Then in `package.json` `scripts` add: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { environment: 'node', include: ['app/**/*.test.ts'] },
});
```

- [ ] **Step 3: Create `app/components/os/os.css` with dual-theme tokens**

```css
/* Rex OS design tokens — dark "amber phosphor" default, light "paper" toggle */
:root, [data-theme='dark'] {
  --bg:        #0a0a0a;
  --panel:     #111111;
  --panel-2:   #161616;
  --border:    #232323;
  --text:      #ededed;
  --muted:     #8a8a8a;
  --accent:    #ffb000;          /* amber */
  --accent-ink:#0a0a0a;          /* text on accent */
  --grid:      rgba(255,255,255,0.03);
  --ok:        #4ade80;
}
[data-theme='light'] {
  --bg:        #f4f1ea;          /* paper */
  --panel:     #fffdf8;
  --panel-2:   #f0ece2;
  --border:    #ddd6c8;
  --text:      #1a1714;
  --muted:     #6b6356;
  --accent:    #b4500a;          /* deepened amber for legibility on paper */
  --accent-ink:#fffdf8;
  --grid:      rgba(0,0,0,0.03);
  --ok:        #1a7f37;
}
* { box-sizing: border-box; }
body {
  background:
    linear-gradient(var(--grid) 1px, transparent 1px) 0 0 / 100% 28px,
    var(--bg);
  color: var(--text);
}
.os-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.os-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
.os-panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1.1rem 1.2rem;
}
.os-accent { color: var(--accent); }
```

- [ ] **Step 4: Load display font + set default theme in `app/layout.tsx`**

In the Google Fonts `<link href>`, append `&family=Space+Grotesk:wght@500;600;700`.
Change `<html lang="en" ...>` to `<html lang="en" data-theme="dark" suppressHydrationWarning>`.
Remove the hardcoded `background`/`color` from the `<body style={...}>` (keep `margin/padding/overflowX`) — colors now come from `os.css`. Import the stylesheet by adding `import './components/os/os.css';` after `import './globals.css';`.

- [ ] **Step 5: Verify build compiles**

Run: `npm run build`
Expected: build succeeds (no TS/CSS errors). Tokens unused yet — that's fine.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts app/components/os/os.css app/layout.tsx
git commit -m "feat(os): add vitest + Rex OS dual-theme design tokens"
```

---

## Task 2: GitHub data transform (TDD)

**Files:**
- Create: `app/lib/github.ts`, `app/lib/github.test.ts`

- [ ] **Step 1: Write failing test `app/lib/github.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { summarizeContributions, type ContributionCalendar } from './github';

const day = (date: string, count: number) => ({ date, contributionCount: count });

describe('summarizeContributions', () => {
  it('sums commits in the last 7 days and computes current streak', () => {
    // today = 2026-06-12; build 8 trailing days
    const cal: ContributionCalendar = {
      totalContributions: 30,
      weeks: [{
        contributionDays: [
          day('2026-06-05', 0), day('2026-06-06', 2), day('2026-06-07', 0),
          day('2026-06-08', 1), day('2026-06-09', 3), day('2026-06-10', 4),
          day('2026-06-11', 2), day('2026-06-12', 1),
        ],
      }],
    };
    const s = summarizeContributions(cal, new Date('2026-06-12T12:00:00Z'));
    expect(s.commitsThisWeek).toBe(1 + 2 + 4 + 3 + 1 + 0 + 2); // last 7 days incl today
    expect(s.currentStreakDays).toBe(5); // 06-08..06-12 consecutive non-zero
    expect(s.totalThisYear).toBe(30);
  });

  it('streak is 0 when today has no contributions', () => {
    const cal: ContributionCalendar = {
      totalContributions: 5,
      weeks: [{ contributionDays: [day('2026-06-11', 4), day('2026-06-12', 0)] }],
    };
    const s = summarizeContributions(cal, new Date('2026-06-12T12:00:00Z'));
    expect(s.currentStreakDays).toBe(0);
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npm test`
Expected: FAIL — `summarizeContributions` not exported.

- [ ] **Step 3: Implement `app/lib/github.ts`**

```ts
export interface ContributionDay { date: string; contributionCount: number; }
export interface ContributionWeek { contributionDays: ContributionDay[]; }
export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface ActivitySummary {
  commitsThisWeek: number;
  currentStreakDays: number;
  totalThisYear: number;
  days: ContributionDay[]; // flattened, chronological — for the heat-strip
}

function flatten(cal: ContributionCalendar): ContributionDay[] {
  return cal.weeks.flatMap((w) => w.contributionDays)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function summarizeContributions(
  cal: ContributionCalendar,
  now: Date = new Date(),
): ActivitySummary {
  const days = flatten(cal);
  const todayStr = now.toISOString().slice(0, 10);

  // commits in the last 7 calendar days (inclusive of today)
  const weekAgo = new Date(now);
  weekAgo.setUTCDate(weekAgo.getUTCDate() - 6);
  const weekAgoStr = weekAgo.toISOString().slice(0, 10);
  const commitsThisWeek = days
    .filter((d) => d.date >= weekAgoStr && d.date <= todayStr)
    .reduce((sum, d) => sum + d.contributionCount, 0);

  // current streak: walk backwards from today while count > 0
  let currentStreakDays = 0;
  const byDate = new Map(days.map((d) => [d.date, d.contributionCount]));
  const cursor = new Date(now);
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    const count = byDate.get(key) ?? 0;
    if (count > 0) { currentStreakDays++; cursor.setUTCDate(cursor.getUTCDate() - 1); }
    else break;
  }

  return {
    commitsThisWeek,
    currentStreakDays,
    totalThisYear: cal.totalContributions,
    days,
  };
}
```

- [ ] **Step 4: Run test, verify it passes**

Run: `npm test`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add app/lib/github.ts app/lib/github.test.ts
git commit -m "feat(os): add GitHub contribution transform with tests"
```

---

## Task 3: GitHub API route (cached, token server-side)

**Files:**
- Create: `app/api/github/route.ts`
- Modify: `.env.local` (add `GITHUB_TOKEN`), `README.md` (document env var)

- [ ] **Step 1: Add a read-only token to `.env.local`**

Add line: `GITHUB_TOKEN=` then a fine-grained PAT with **public read** access (no scopes needed beyond public). Generate at https://github.com/settings/tokens. (This is a manual one-time step; ask Rex for the token if absent. Never commit it — `.env.local` is gitignored.)

- [ ] **Step 2: Implement `app/api/github/route.ts`**

```ts
import { NextResponse } from 'next/server';
import { summarizeContributions, type ContributionCalendar } from '@/app/lib/github';

const USERNAME = 'Rex-Orokumue';
export const revalidate = 3600; // cache 1h

const QUERY = `query($login:String!){
  user(login:$login){
    public_repos: repositories(privacy:PUBLIC){ totalCount }
    contributionsCollection{
      contributionCalendar{
        totalContributions
        weeks{ contributionDays{ date contributionCount } }
      }
    }
  }
}`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ ok: false, error: 'no-token' }, { status: 200 });
  }
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
      next: { revalidate },
    });
    if (!res.ok) throw new Error(`github ${res.status}`);
    const json = await res.json();
    const user = json?.data?.user;
    const cal: ContributionCalendar = user.contributionsCollection.contributionCalendar;
    const summary = summarizeContributions(cal);
    return NextResponse.json({
      ok: true,
      publicRepos: user.public_repos.totalCount,
      ...summary,
      profileUrl: `https://github.com/${USERNAME}`,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'fetch-failed' }, { status: 200 });
  }
}
```

Note: always returns 200 with `ok:false` on failure so the panel renders a graceful fallback instead of throwing.

- [ ] **Step 3: Verify route returns data**

Run: `npm run dev`, then in another shell `curl http://localhost:3000/api/github`
Expected: JSON with `ok:true` and numbers (or `ok:false,"no-token"` if token not set yet — acceptable; panel handles it).

- [ ] **Step 4: Document env var in `README.md`**

Add a short "Environment" note: `GITHUB_TOKEN` (read-only PAT) powers the live activity panel; cached hourly; never committed.

- [ ] **Step 5: Commit (route + README only — NOT `.env.local`)**

```bash
git add app/api/github/route.ts README.md
git commit -m "feat(os): add cached GitHub activity API route"
```

---

## Task 4: Terminal interpreter (TDD)

**Files:**
- Create: `app/components/os/terminal/commands.ts`, `app/components/os/terminal/commands.test.ts`

- [ ] **Step 1: Write failing test `commands.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { runCommand, COMMANDS } from './commands';

const slugs = ['zolarux', 'foodgram'];

describe('runCommand', () => {
  it('help lists known commands', () => {
    const r = runCommand('help', slugs);
    expect(r.lines.join(' ')).toContain('projects');
  });
  it('open <slug> navigates when slug exists', () => {
    const r = runCommand('open zolarux', slugs);
    expect(r.navigate).toBe('/projects/zolarux');
  });
  it('open <unknown> reports not found, no navigation', () => {
    const r = runCommand('open nope', slugs);
    expect(r.navigate).toBeUndefined();
    expect(r.lines.join(' ').toLowerCase()).toContain('not found');
  });
  it('theme returns a toggle action', () => {
    expect(runCommand('theme', slugs).action).toBe('toggle-theme');
  });
  it('clear returns a clear action', () => {
    expect(runCommand('clear', slugs).action).toBe('clear');
  });
  it('unknown command is friendly', () => {
    expect(runCommand('xyz', slugs).lines.join(' ')).toContain('help');
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npm test`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `commands.ts`**

```ts
export interface CommandResult {
  lines: string[];
  navigate?: string;                 // router push target
  action?: 'clear' | 'toggle-theme'; // side-effects handled by the UI
  external?: string;                 // open in new tab (resume/social)
}

export const COMMANDS: Record<string, string> = {
  help: 'list commands',
  whoami: 'who is Rex',
  projects: 'list projects',
  'open <slug>': 'open a project',
  about: 'about page',
  logs: 'build logs',
  blog: 'writing',
  contact: 'how to reach me',
  resume: 'download resume',
  theme: 'toggle light/dark',
  clear: 'clear the screen',
};

export function runCommand(input: string, slugs: string[]): CommandResult {
  const [cmd, ...rest] = input.trim().split(/\s+/);
  const arg = rest.join(' ');
  switch (cmd) {
    case 'help':
      return { lines: Object.entries(COMMANDS).map(([k, v]) => `  ${k.padEnd(14)} ${v}`) };
    case 'whoami':
      return { lines: ['Rex Orokumue — full-stack developer. Next.js · Flutter · Supabase.'] };
    case 'projects':
      return { lines: ['projects:', ...slugs.map((s) => `  - ${s}  (open ${s})`)] };
    case 'open':
      return slugs.includes(arg)
        ? { lines: [`opening ${arg}…`], navigate: `/projects/${arg}` }
        : { lines: [`open: '${arg}' not found. try 'projects'.`] };
    case 'about':   return { lines: ['→ /about'], navigate: '/about' };
    case 'logs':    return { lines: ['→ /build-logs'], navigate: '/build-logs' };
    case 'blog':    return { lines: ['→ /blog'], navigate: '/blog' };
    case 'contact': return { lines: ['→ /about#contact'], navigate: '/about#contact' };
    case 'resume':  return { lines: ['downloading resume…'], external: '/Rex-Orokumue-Resume.pdf' };
    case 'theme':   return { lines: ['toggling theme…'], action: 'toggle-theme' };
    case 'clear':   return { lines: [], action: 'clear' };
    case '':        return { lines: [] };
    default:        return { lines: [`command not found: ${cmd}. type 'help'.`] };
  }
}
```

- [ ] **Step 4: Run test, verify it passes**

Run: `npm test`
Expected: PASS (all interpreter tests).

- [ ] **Step 5: Commit**

```bash
git add app/components/os/terminal/commands.ts app/components/os/terminal/commands.test.ts
git commit -m "feat(os): add terminal command interpreter with tests"
```

---

## Task 5: Theme provider + MenuBar + shell skeleton

**Files:**
- Create: `app/components/os/ThemeProvider.tsx`, `app/components/os/MenuBar.tsx`, `app/components/os/RexOS.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: `ThemeProvider.tsx`** — client component exposing `theme` + `toggle()`.

Reads `localStorage['rex-theme']` (or `prefers-color-scheme` on first visit), sets `document.documentElement.dataset.theme`, persists on change, and provides a `useTheme()` hook (`{ theme, toggle }`). Guard all `window`/`document` access in `useEffect`.

- [ ] **Step 2: `MenuBar.tsx`** — top bar: `◉ Rex OS` mark, a live `● shipping — day N` status (N = `currentStreakDays` from props, fallback "build in public"), nav links (Work/Logs/Writing/About), a clock (`useEffect` interval, HH:MM), and a theme toggle button calling `useTheme().toggle()`.

- [ ] **Step 3: `RexOS.tsx`** — client shell. Wrap in `ThemeProvider`. Render `<MenuBar streak={...}/>` then a CSS-grid of `.os-panel`s. For now render placeholder panels (`<div className="os-panel">Identity</div>` etc.) in the grid positions from the spec layout. Fetch `/api/github` in a `useEffect`, hold in state, pass to MenuBar + (later) ActivityPanel.

- [ ] **Step 4: Replace `app/page.tsx` body with the shell**

```tsx
import RexOS from './components/os/RexOS';
export default function Home() { return <RexOS />; }
```

(Delete the old AI-ish GlobalStyles/Hero homepage markup. Existing section components under `app/components/` that are unused by the new home can stay for now — sub-pages may still use them; remove only what `page.tsx` imported and nothing else references.)

- [ ] **Step 5: Verify visually**

Run: `npm run dev` → open `/`. Expected: dark amber dashboard with menubar, clock ticking, theme toggle flips to paper and persists on reload, placeholder panels in a grid. No console errors.

- [ ] **Step 6: Commit**

```bash
git add app/components/os/ThemeProvider.tsx app/components/os/MenuBar.tsx app/components/os/RexOS.tsx app/page.tsx
git commit -m "feat(os): add theme provider, menubar, and dashboard shell"
```

---

## Task 6: Activity, Projects, Missions, Logs panels

**Files:**
- Create the five panel components; wire them into `RexOS.tsx`.

- [ ] **Step 1: `ActivityPanel.tsx`** — props: the `/api/github` JSON (or null while loading). States: loading (skeleton), `ok:false` (curated fallback: "Building in public — see GitHub →" link), `ok:true` (render `commitsThisWeek`, `currentStreakDays` 🔥, `publicRepos`, and a heat-strip from `days` — small squares colored by `contributionCount` buckets using `--accent` opacity). Link to `profileUrl`.

- [ ] **Step 2: `ProjectsPanel.tsx`** — import `projects` from `app/data/projectsData.ts`; render a card per project (name, tagline, status chip, tech) linking to `/projects/<slug>`. Reuse existing data only.

- [ ] **Step 3: `MissionsPanel.tsx`** — filter `projects` where `status === 'building'`; show as "active missions" with status. If none, show the most recent live project as "latest ship".

- [ ] **Step 4: `LogsPanel.tsx`** — render the latest few build-log/tech-serial entries as a feed linking to `/build-logs`. (If logs come from Supabase/a file, read the existing source used by `app/build-logs`; otherwise link out with the 3 most recent titles. Inspect `app/build-logs/BuildLogs.tsx` for the data source and reuse it.)

- [ ] **Step 5: Wire all four into `RexOS.tsx`** grid positions per spec layout; pass GitHub data to `ActivityPanel`.

- [ ] **Step 6: Verify visually + build**

Run: `npm run dev` (check panels render real project/log data, activity shows numbers or fallback) then `npm run build`.
Expected: dev looks correct, build passes.

- [ ] **Step 7: Commit**

```bash
git add app/components/os/ActivityPanel.tsx app/components/os/ProjectsPanel.tsx app/components/os/MissionsPanel.tsx app/components/os/LogsPanel.tsx app/components/os/RexOS.tsx
git commit -m "feat(os): add activity, projects, missions, and logs panels"
```

---

## Task 7: Terminal UI + Identity + Contact (content)

**Files:**
- Create: `app/components/os/Terminal.tsx`, `IdentityPanel.tsx`, `ContactPanel.tsx`; wire into shell.

- [ ] **Step 1: `Terminal.tsx`** — client. Controlled input + scrollback array. On Enter: call `runCommand(input, slugs)`, append `$ input` and result `lines` to scrollback; if `navigate` → `useRouter().push`; if `action==='clear'` → reset scrollback; if `action==='toggle-theme'` → `useTheme().toggle()`; if `external` → `window.open`. Blinking cursor, autofocus on click, monospace. `slugs` from `projectsData`. Header label clarifies it's optional ("terminal — type `help`").

- [ ] **Step 2: `IdentityPanel.tsx`** — REAL content. Name, avatar, the positioning line (draft: **"Full-stack developer building production-ready web & mobile apps with Next.js, Flutter & Supabase. Founder of Zolarux."**), an explicit availability line (**"○ Open to remote full-stack roles · freelance welcome · WAT, overlaps EU/US mornings"**), and buttons: Resume, Email, GitHub, LinkedIn (reuse sameAs URLs from `layout.tsx`). Mark the resume link with a `TODO:` comment if the PDF isn't in `/public` yet.

- [ ] **Step 3: `ContactPanel.tsx`** — frictionless hire CTA: primary "Email me" (existing email), Resume download, optional Cal.com placeholder (`TODO` until Rex provides a link), and a "typically replies within 24h" line. Reuse the existing contact/email mechanism (check `app/components/FinalCTA.tsx`).

- [ ] **Step 4: Wire Terminal + Identity + Contact into `RexOS.tsx`**; remove placeholders. Terminal sits in its spec grid slot (collapsible/launch button on mobile — see Task 8).

- [ ] **Step 5: Verify the recruiter path + terminal**

Run: `npm run dev`. Confirm: (a) everything is reachable by clicking with the terminal ignored; (b) typing `help`, `projects`, `open zolarux`, `theme`, `clear` all behave; (c) positioning + availability read clearly.

- [ ] **Step 6: Commit**

```bash
git add app/components/os/Terminal.tsx app/components/os/IdentityPanel.tsx app/components/os/ContactPanel.tsx app/components/os/RexOS.tsx
git commit -m "feat(os): add terminal UI, identity, and contact panels with real content"
```

---

## Task 8: Mobile reflow + final verification

**Files:**
- Modify: `app/components/os/os.css`, `RexOS.tsx`

- [ ] **Step 1: Responsive grid** — in `os.css`, panel grid is multi-column on `min-width: 900px`, single column below. On mobile the Terminal renders as a collapsed "Open terminal" button that expands on tap (so it never blocks scroll).

- [ ] **Step 2: Accessibility/contrast pass** — verify text/accent contrast in BOTH themes (amber-on-black and deep-amber-on-paper), focus rings on interactive elements, and that the theme toggle has an aria-label.

- [ ] **Step 3: Full verification**

Run: `npm test` (all logic tests pass), then `npm run build` (passes), then `npm run dev` and check `/` at desktop + mobile widths, both themes, with and without `GITHUB_TOKEN`.
Expected: all green; recruiter can see work + hire CTA in one screen without typing.

- [ ] **Step 4: Commit**

```bash
git add app/components/os/os.css app/components/os/RexOS.tsx
git commit -m "feat(os): responsive reflow and final a11y/contrast pass"
```

---

## Inputs to collect from Rex during execution

Surface these at the relevant task (not all upfront):
- **Task 3:** the `GITHUB_TOKEN` (read-only PAT).
- **Task 7:** resume PDF for `/public` (or a link); confirm/refine the positioning + availability wording; optional Cal.com link.
- **Selected Work copy (Task 6/7):** for Zolarux + 2 others — one-line real outcome each (real numbers or concrete qualitative result; no fabrication). Any genuine testimonial.

## Out of scope (next plan)
Per-project case-study pages (deep Problem→Result), and reskinning `/about`, `/blog`, `/projects`, `/build-logs`, `/bootcamp`, `/tech-serial` to the Rex OS design system.
