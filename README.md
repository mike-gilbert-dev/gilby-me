# gilby.me

Mike Gilbert's portfolio — SvelteKit + Tailwind CSS, deployed on Vercel.

## Stack

- **SvelteKit 2** (Svelte 5, runes mode) + TypeScript
- **Tailwind CSS 4** — design tokens live in `@theme` in [src/routes/layout.css](src/routes/layout.css);
  intricate pieces (custom cursor, gallery overlays, canvas, card tilt) use scoped component CSS
- **@sveltejs/adapter-vercel**
- Prettier + ESLint

## Commands

```bash
npm run dev       # dev server
npm run build     # production build
npm run preview   # preview the production build
npm run check     # svelte-check / typecheck
npm run lint      # prettier --check + eslint
npm run format    # prettier --write
```

## Structure

```
src/
  app.html                  Google Fonts, no-JS reveal fallback
  routes/
    layout.css              @theme design tokens + global base/component layers
    +layout.svelte          Grain + CustomCursor overlays
    +page.svelte            the single-page composition
  lib/
    actions/
      motion.ts             prefers-reduced-motion / pointer:fine gates
      reveal.ts             use:reveal — IntersectionObserver scroll reveal
      tilt.ts               use:tilt — Labs card 3D tilt
    data/site.ts            all copy, gallery pieces, case studies, labs, socials
    components/             one component per section + shared primitives
    assets/images/          design gallery artwork (hashed at build time)
docs/
  HANDOFF.md                design handoff spec — read before changing art direction
  prototype-reference.html  the original single-file HTML prototype
```

## Ground rules from the handoff

Read [docs/HANDOFF.md](docs/HANDOFF.md) before changing anything visual. Short version:

- Every custom animation is gated on **both** `prefers-reduced-motion` and `pointer: fine`.
  Touch and reduced-motion users get resting states — no exceptions.
- Section backgrounds stay **plain and static**. No parallax backgrounds, no dot/line/cross grids.
- Design gallery images are always **full colour** in a **uniform square grid** — no desaturation,
  no masonry, no staggered offsets.
- Labs card 003 (Field Grid) is the _only_ continuous animation loop on the site. It pauses
  off-screen and renders a single static frame under reduced-motion.
- A list of things explicitly decided against lives at the bottom of the handoff. Ask before
  re-adding any of them.

## Content edits

Copy, stats, gallery pieces, and links are all in [src/lib/data/site.ts](src/lib/data/site.ts) —
no component edits needed for routine content changes. The CollegeSoccer.io stat figures are
deliberately rounded static copy; bump them by hand as they drift.
