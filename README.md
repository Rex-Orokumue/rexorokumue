# Rex Orokumue — AI-First Product Builder Portfolio

This is my personal portfolio website built with modern Next.js.

I am documenting this project publicly as I build it to demonstrate:
- Technical growth
- Consistency
- Execution
- Real-world development workflow

---

## 🚀 Project Goal

To build a clean, fast, and scalable portfolio website that:
- Showcases my AI-first product thinking
- Documents my build process
- Serves as a foundation for future products

---

## 🏗 Tech Stack (Day 1 Setup)

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint

---

## 🧠 Why I Chose This Setup

Even as a beginner, I wanted to start with a modern and scalable foundation.

### TypeScript
For type safety and long-term maintainability.

### Tailwind CSS
For fast, responsive, utility-first styling.

### ESLint
To enforce clean coding standards.

### App Router
Because it is the future of Next.js routing and avoids migration later.

---

## 📅 Build Log

### Day 1 – Project Initialization

- Installed Node.js (LTS)
- Created project using:
  ```
  npx create-next-app@latest rexorokumue
  ```
- Selected recommended defaults:
  - TypeScript
  - Tailwind CSS
  - ESLint
  - App Router
- Opened project in VS Code
- Ran development server:
  ```
  npm run dev
  ```
- Verified project running at:
  http://localhost:3000
- Resolved initial GitHub merge conflict
- Successfully pushed project to GitHub

## Day 1 – Project Foundation & Homepage Structure

Today I:

- Created a Next.js project using the App Router
- Enabled TypeScript for scalability
- Set up TailwindCSS for styling
- Connected the project to GitHub
- Resolved a remote merge conflict manually
- Removed the default Next.js template
- Built the foundational homepage layout (not just a hero section)
- Recorded my build process

### Thought Process

I am intentionally building the structural foundation first:
- Clear positioning
- Logical content flow
- Scalability in mind
- Clean Git workflow

Design polish will come later. Right now, the focus is structure and architecture.

### Day 1 – Homepage Components Refactor

- Separated homepage into reusable components:
  - Hero
  - What I Do
  - Projects
  - Build In Public
  - Final CTA
- Cleaned up `page.tsx` to render imported components only
- Foundation is now modular and scalable

### Day 1 – Navbar Integration

- Imported NavBar component to all pages
- Wrapped each page’s content with <NavBar />
- Tested navigation across all pages
- Ensured consistent header experience

### Day 2 – Contact Form Functionality

- Added EmailJS to Contact page
- Users can now send messages directly from the website
- Success and error messages implemented
- Client-side form with validation

### Day 3 – Projects Page Interactivity

- Created `projects.ts` data file for easy project management
- Added project images/screenshots
- Added View Project button linking to live demo
- Added hover effects for project cards

---

## 🔥 Development Philosophy

Build in public.
Ship fast.
Document everything.
Improve daily.

---

## 📖 This README Will Be Updated Daily

This file serves as a live build log of the entire project.

---

## Environment

### GITHUB_TOKEN

`GITHUB_TOKEN` is a read-only GitHub fine-grained personal access token (public repository read access only). It powers the live GitHub activity panel on the site, which displays public repository count, weekly commits, and current contribution streak.

- The token is fetched server-side in `app/api/github/route.ts` and the response is cached for **1 hour** (ISR revalidate).
- It is stored in `.env.local` at the project root, which is listed in `.gitignore` and is **never committed** to version control.
- Without this token the API route returns `{ ok: false, error: "no-token" }` and the activity panel gracefully degrades.