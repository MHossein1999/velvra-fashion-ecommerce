# VELVRA — Fashion E-Commerce Demo

An editorial, marketing-style storefront for a women's Autumn/Winter fashion
label. Built to showcase frontend craft: distinctive visual design, luxury
branding, fluid motion, and a responsive, accessible layout.

> **Frontend-only demo.** There is no backend or real checkout — product data is
> local and the cart/auth/newsletter flows are simulated client-side. The focus
> is design fidelity and interaction polish.

**Live demo →** [velvra-fashion-ecom.vercel.app](https://velvra-fashion-ecom.vercel.app)

---

## ✨ Features

- **Editorial hero** — campaign-style backdrop (warm gallery wall, diamond-lattice
  monogram, oversized "V" watermark, framing arch) with a scroll-driven parallax
  on the model image.
- **Animated cart drawer** — add to bag, adjust quantities, live subtotal, badge
  "pop" on add, and **localStorage persistence** across reloads.
- **Search overlay** — full-screen, keyboard-dismissible (Esc), filters the
  catalog live by name/colour with body-scroll locking.
- **Wishlist & authentication pages** — `/wishlist` and a sign-in/register
  `/login` page with a segmented toggle, all matching the brand system.
- **Scroll-spy navigation** — the header highlights the in-view section via an
  `IntersectionObserver`, with smooth in-page anchor scrolling.
- **Motion system** — reusable Framer Motion primitives (`Reveal`, `RevealGroup`,
  `Tilt`) for entrance, stagger, and pointer-reactive effects, all gated by
  `prefers-reduced-motion`.
- **Responsive & accessible** — mobile-first layout, focus-visible rings, ARIA
  labels, and a screen-reader live region announcing icon interactions.

---

## 🛠️ Tech Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** — CSS-first config via `@theme` in `app/globals.css`
  (theme tokens in `oklch()`); no `tailwind.config`
- **Framer Motion** — entrance, parallax, and micro-interactions
- **shadcn/ui** (new-york) + **lucide-react** + **sonner** toasts
- **next/font/google** — Cormorant, Inter, Playfair Display, and Yellowtail
- Deployed on **Vercel** (with `next/image` optimization + Analytics)

---

## 🎨 Design Decisions

- **Palette** — a warm beige/bronze luxury theme (`#F4EDE1` cream ground,
  `#2B2622` brown-black ink, `#8C7350` bronze accent), defined as `oklch()` tokens.
- **Type system** — Playfair Display for editorial display headings, Cormorant for
  serif body, Inter for UI, and Yellowtail script reserved for the wordmark.
- **Texture** — a fine printed-paper grain and registration crop-marks carry a
  consistent "fashion lookbook" feel across sections.

---

## ⚡ Performance Notes

- Hero art served as an alpha **WebP** (3.8 MB PNG → ~0.48 MB) at full resolution
  for retina sharpness; `next/image` re-encodes to AVIF/WebP per request.
- Google fonts pinned to the weights actually used.
- All scroll/parallax motion is motion-value driven (no React re-renders per
  frame); the header avoids a per-frame `backdrop-filter` repaint.

---

## 🚀 Getting Started

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

```bash
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # eslint (next/core-web-vitals + next/typescript)
```

This project standardizes on **pnpm** (`pnpm-lock.yaml`).

---

## 📁 Structure

```
app/            # App Router — single marketing page, plus /login and /wishlist
components/     # section components (hero, category-grid, featured-products, …)
components/ui/  # shadcn/ui primitives
lib/            # cart context, product data, motion + scroll helpers
hooks/          # use-mobile, use-toast
```

---

## 📬 Contact

Open to frontend work — especially fashion, editorial, and luxury branding.
Let's connect: **geniuspeople78@gmail.com**
