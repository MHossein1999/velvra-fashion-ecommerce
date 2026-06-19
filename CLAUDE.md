# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

VELVRA is a single-page, marketing-style fashion
e-commerce demo for women's clothing. It is **frontend-only**: there is no backend,
database, cart logic, or checkout. Product/category data is hardcoded inline in each
section component. The emphasis is editorial visual design, responsive layout, and
animation polish — treat design fidelity as the primary concern when editing.

## Commands

```bash
pnpm dev      # run dev server (http://localhost:3000)
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # eslint
```

There are no tests in this repo.

**Package manager:** prefer `pnpm` (the README documents the project standardizing on
it). Both `pnpm-lock.yaml` and `package-lock.json` are present — don't add a third
lockfile and avoid switching managers; React 19 peer-dependency conflicts were the
reason for past lockfile churn.

## Architecture

- **Next.js 15 App Router + React 19**, TypeScript, Tailwind CSS **v4**.
- The entire site is one route: `app/page.tsx` composes ordered section components
  (`Header → Hero → CategoryGrid → FeaturedProducts → Lookbook → Newsletter → Footer`).
  Adding a section means creating a component in `components/` and inserting it here.
- `app/layout.tsx` loads the two fonts (Cormorant → `--font-serif`, Inter →
  `--font-sans`) via `next/font/google` and wires Vercel Analytics. Use `font-serif`
  for editorial headings and `font-sans` (default) for body.
- **Section components** live in `components/*.tsx` (e.g. `hero.tsx`,
  `featured-products.tsx`). Each owns its own hardcoded data array and markup. Mark a
  component `"use client"` only when it uses hooks/interactivity (e.g. `header.tsx`);
  keep the rest as server components.
- **`components/ui/`** is shadcn/ui (new-york style, ~57 generated primitives). These
  are vendored library code — regenerate via the shadcn CLI rather than hand-editing.
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge); use it for conditional classes.
- `hooks/` holds `use-mobile` and `use-toast` (paired with the sonner/toast UI).

## Styling conventions

- **Tailwind v4 is CSS-configured, not via `tailwind.config`.** The source of truth is
  `app/globals.css`: theme tokens are CSS variables in `oklch()` under `:root`/`.dark`,
  exposed to Tailwind through the `@theme inline` block. To add/change a color, edit the
  variable and its `--color-*` mapping there. (`styles/globals.css` is a stale duplicate;
  the imported one is `app/globals.css`.)
- Palette is a warm beige/bronze luxury theme; a `.dark` variant exists but no theme
  toggle is currently wired into the page.
- Custom entrance animations (`animate-fade-in-up`, `animate-scale-in`, etc.) and
  `animation-delay-*` utilities are defined in `globals.css`. They include a
  `prefers-reduced-motion` fallback — preserve it when adding motion.
- Path alias: `@/*` maps to the repo root (e.g. `@/components/ui/button`).

## Important config caveats

`next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`.
Type errors will **not** fail the build — run `tsc`/your editor to catch them, and don't
rely on `pnpm build` for type safety. Images are unoptimized and served from `public/`
(referenced by literal filename strings in component data).
