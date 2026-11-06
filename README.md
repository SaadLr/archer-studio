# ARCHER STUDIO® — Design that hits the target

> 设计直击痛点® — Brand, film, web and marketing, shaped with an archer's precision.

A dark, editorial digital-agency site built around one idea: **aiming**. Every visual
metaphor — the preloader that calibrates and fires an arrow into the bullseye, the
rotating target rings, the arrow-streak canvas, the scroll-depth HUD — serves the
brand's promise of design that hits its mark.

## ✦ Highlights

- **Cinematic preloader** — concentric rings calibrate while a counter climbs 0→100,
  then an arrow fires into the bullseye before the curtain lifts
- **Smooth scrolling** — Lenis-powered inertia scrolling with a scroll-progress HUD
- **Parallax everywhere** — hero headline drift, image inner-parallax, rotating
  background target rings
- **Living background** — a canvas of faint arrow streaks crossing the viewport, a
  mouse-trailing flame spotlight, and animated film grain
- **Bilingual typographic system** — Anton display type paired with Noto Sans SC,
  mixing EN/CN labels like `AIM — 瞄准`, `DRAW — 开弓`, `HIT — 命中`
- **Custom reticle cursor** with magnetic buttons and hover labels
- **Accessibility-conscious** — WCAG-checked contrast, `prefers-reduced-motion`
  support, semantic landmarks

## ✦ Tech stack

| Layer | Tool |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering) |
| Database | Prisma + SQLite (studio contact locations) |

## ✦ Getting started

```bash
# install dependencies
bun install        # or: npm install

# run the dev server
bun run dev        # or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and watch the arrow fly.

## ✦ Project structure

```
src/
├── app/                  # App Router entry, fonts, global styles
├── components/
│   ├── fx/               # Preloader, smooth scroll, cursor, background FX
│   └── sections/         # Hero, Manifesto, GovProject, Services,
│                         # Projects, Studio, Footer, Header
```

## ✦ Sections

1. **Hero** — "Design that hits the target®" with an animated archery target
2. **Manifesto** — the studio's philosophy with animated counters
3. **Government** — SINOMACH environmental signage & brand identity work
4. **Services** — four arrows, one target: web/3D, film, brand, growth
5. **Projects** — international case work with parallax imagery
6. **Studio** — bases in Kiruna, Beijing and Guangzhou with live local time

---

© 2026 ARCHER STUDIO — 北极圈造，为命中而生。*Built beyond the Arctic Circle, born to hit.*
