# Nik Farees — Portfolio

A premium, Apple-inspired personal portfolio for **Nik Farees, Software Engineer**.
Built with **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion**, and Docker-ready for VPS deployment.


---

## Features

- **Single-page flow** — Hero, About, Projects, Experience, Contact
- **Split hero** with a live terminal typing effect and tech badges
- **Tabbed projects** (Client / Personal) with hover-lift cards
- **Dynamic project detail pages** at `/projects/[slug]` (statically generated)
- **Sticky glass navigation** with scroll-triggered blur
- **Lightweight motion** — fade-in on scroll, smooth hover, smooth scroll
- **SEO metadata** + Open Graph, responsive layout, accessible markup
- **Docker + docker-compose** for one-command deploys

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build && npm start
```

Requires **Node.js 20+**.

---

## Run with Docker

```bash
# Build + run with docker-compose
docker compose up --build -d
# → http://localhost:3000

# Stop
docker compose down
```

Or with plain Docker:

```bash
docker build -t fareeslab-portfolio .
docker run -p 3000:3000 fareeslab-portfolio
```

The image uses Next.js **standalone output** (`output: "standalone"` in `next.config.mjs`) for a small runtime image.

### Deploying on a VPS

1. Copy this folder to the server (or `git clone`).
2. Run `docker compose up --build -d`.
3. Put a reverse proxy (Nginx / Caddy / Traefik) in front, terminating TLS for `fareeslab.dev` and forwarding to `localhost:3000`.

---

## Project structure

```
app/
  layout.tsx              # Root layout, fonts (Geist), SEO metadata
  page.tsx                # Home — assembles all sections
  globals.css             # Tailwind layers + base styles
  not-found.tsx           # 404 page
  projects/
    [slug]/page.tsx       # Dynamic project detail page

components/
  Navbar.tsx              # Sticky glass nav
  Hero.tsx                # Split hero
  Terminal.tsx            # Typing effect (client component)
  About.tsx
  Projects.tsx            # Tabbed Client / Personal (client component)
  ProjectCard.tsx         # Card + GhostCard
  Experience.tsx
  Contact.tsx
  Footer.tsx
  Reveal.tsx              # Framer Motion fade-up wrapper
  SectionTag.tsx          # "01 — ABOUT" markers
  Badge.tsx               # Tech badge

data/
  site.ts                 # Name, copy, contact, experience, terminal lines
  projects.ts             # Project list + types (drives cards AND detail pages)

Dockerfile
docker-compose.yml
tailwind.config.ts        # Design tokens (colors, fonts, shadows)
```

---

## Editing content

Almost everything is data-driven — **you rarely need to touch the components**:

- **Personal info, copy, contact, experience** → `data/site.ts`
- **Projects** → `data/projects.ts`
  Add an object to the `projects` array and a card **and** a `/projects/[slug]`
  detail page are generated automatically.
  - Private projects: set `visibility: "Private"` and omit `links`.
  - Public projects: set `visibility: "Public"` and fill in `links.github` / `links.live`.
- **Colors / fonts / shadows** → `tailwind.config.ts` (the `accent` color is the
  warm orange `#D97757`).

Replace the `project preview` / `screens` placeholders in `ProjectCard.tsx` and
`app/projects/[slug]/page.tsx` with a real `next/image` when you have artwork.

---

## For developers

This repository is a **working starter**, intentionally simple and easy to extend.

**Conventions**
- Server Components by default; only `Navbar`, `Projects`, `Terminal`, and `Reveal`
  are client components (they need state, effects, or motion).
- All design values are Tailwind tokens defined in `tailwind.config.ts` — prefer
  editing tokens over hard-coding new colors.
- Content lives in `data/` so copy changes never require touching JSX.

**Good next steps**
- Add real project artwork (`next/image`) and an OG image in `public/`.
- Add a `app/sitemap.ts` / `robots.ts` for SEO.
- Wire the contact section to a form + email service if you want inbound messages.
- Commit a `package-lock.json` (run `npm install` once) for reproducible Docker builds.

---

© 2026 Nik Farees. Built with Next.js.
