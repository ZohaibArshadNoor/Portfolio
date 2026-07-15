# Zohaib Arshad Noor — Portfolio

Premium AI/ML software engineer portfolio built with Next.js 15, React 19, Three.js, GSAP, Framer Motion, and Lenis.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add environment variables (see below).
4. Deploy.

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key for the contact form |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `Portfolio <hello@yourdomain.com>` |

Without `RESEND_API_KEY`, the contact API logs submissions in development and still returns success so you can test the UI.

## Quick content edits (search phrases)

In Cursor / VS Code, search these markers to jump straight to editable data:

| Search phrase | What you edit |
|---------------|----------------|
| `@EDIT PROJECTS` | All project cards / case studies |
| `@EDIT EXPERIENCE` | Education & work timeline |
| `@EDIT SERVICES` | Services offered |
| `@EDIT ACHIEVEMENTS` | Achievement cards |
| `@EDIT TESTIMONIALS` | Testimonials (placeholders) |
| `@EDIT SKILLS` | Skill galaxy categories |
| `@EDIT SITE_INFO` | Name, email, phone, social links |
| `@EDIT AVATAR` | Profile photo component / filters |
| `@EDIT TARGET_ROLES` | “Actively targeting” role chips |

To **add a new project**: find `@EDIT PROJECT_MARKETING_AI`, copy that object, change the `slug` + fields.

## Where to swap real assets

| Asset | Path | Notes |
|-------|------|-------|
| Résumé PDF | `public/resume/Zohaib_Arshad_Noor_Resume.pdf` | Button already points here |
| Avatar photo | `public/images/avatar.png` | Replace illustrated placeholder |
| Logo / icons | `public/icons/zn-logo.png` | Also used for PWA icons |
| OG image | `public/images/og-image.png` | 1200×630 recommended |
| Project visuals | `public/images/projects/*.svg` | Replace with JPG/PNG/WebP; update `src/data/projects.ts` if filenames change |
| 3D models | `public/models/` | Optional GLB (Draco-compressed) |
| LinkedIn | `src/data/site.ts` → `linkedin` | Already set |
| Testimonials | `src/data/experience.ts` → `testimonials` | Marked as placeholders |
| Project GitHub / demos | `src/data/projects.ts` | Fill `github` / `liveDemo` |
| Site URL | `src/data/site.ts` → `url` | Update before production SEO |

## Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 design tokens in `src/app/globals.css`
- **3D:** `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Scroll / timelines:** GSAP 3 + ScrollTrigger + Lenis
- **UI motion:** Framer Motion
- **Contact:** Resend (`src/app/api/contact/route.ts`)
- **Icons:** React Icons

## Animation ownership

- **GSAP** — loader/hero timelines, scroll reveals, pinned/scrubbed work
- **Framer Motion** — page/component hover, layout, modal-style transitions

## Accessibility & performance

- `prefers-reduced-motion` skips the cinematic loader and heavy 3D scenes
- Mobile uses simplified / static fallbacks for Hero, Skills galaxy, Spotlight, and Contact globe
- Three.js resources are disposed on unmount via `src/lib/three-manager.ts`
- Semantic HTML, skip link, keyboard-focus styles, and JSON-LD Person schema included

## Analytics hook

In `src/app/layout.tsx`, a commented Plausible/GA slot is ready — uncomment and set your domain when you want analytics.

## Project structure

```
src/
  app/                 # App Router pages, API, SEO
  components/          # Feature sections + three/ + ui/
  data/                # Content (projects, skills, site, experience)
  hooks/               # useLenis, useScrollTrigger, useMagnetic, …
  lib/                 # animation-manager, three-manager
  types/
public/                # Static assets & placeholders
```
