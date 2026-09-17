# gilby.me — Handoff to SvelteKit Build

This package is the output of a design-prototyping session in Claude (Cowork). It is **not** the
final build — it's a high-fidelity HTML/CSS/JS reference that nailed down art direction, layout,
copy, and interaction behavior through iterative review. The next step (per the original brief)
is translating this into a real **SvelteKit + Tailwind CSS** site.

**Live reference (current, published version):** https://claude.ai/artifact/Vze83Y97MRtBzumkDmBJpo
Open it directly to see live interaction/motion behavior (reveal-on-scroll, nav scroll-spy,
custom cursor, card tilt) — screenshots in `reference-screenshots/` are static fallbacks.

## What's in this package

- `template.html` — the prototype's source. Single-file HTML/CSS/JS, `{{IMG_*}}` placeholders
  in place of images (see mapping table below). This is NOT meant to be dropped in as-is — it's
  a structural + styling reference to componentize.
- `assets/images/` — the actual image/logo assets used in the current build (real files, not
  base64), named to match the placeholder mapping below.
- `reference-screenshots/` — full-page desktop (1440px) and mobile (390px) screenshots of the
  current published state, static fallback if the live artifact isn't handy.

## Asset mapping (placeholder → file)

| Placeholder | File | Used in |
|---|---|---|
| `{{IMG_MAYDAY}}` | mayday_lg_01.jpg | Design gallery |
| `{{IMG_EAGLE}}` | eagle_stout_lg_01.jpg | Design gallery |
| `{{IMG_NOVA}}` | nova_lg_01.jpg | Design gallery |
| `{{IMG_DARKVILLE}}` | darkville_lg_02.jpg | Design gallery |
| `{{IMG_GAMEDAY}}` | gameday_lg_01.jpg | Design gallery |
| `{{IMG_CHESAPEAKE}}` | chesapeake_lg_01.jpg | Design gallery |
| `{{IMG_MARCONI}}` | marconi_lg_01.jpg | Design gallery |
| `{{IMG_SOUL}}` | soul_logo_lg_01.jpg | Design gallery |
| `{{IMG_MURPHYS}}` | murphys_lg_01.jpg | Design gallery |
| `{{IMG_COLUMBUS}}` | columbus_lg_01.jpg | Design gallery |
| `{{IMG_HORIZON}}` | horizon_lg_01.jpg | Design gallery |
| `{{IMG_GORILLA}}` | gorilla_lg_01.jpg | Design gallery |
| `{{IMG_XANDO}}` | xando_lg_01.jpg | Design gallery |
| `{{IMG_CSIO}}` | csio_logo.svg | Development section — CollegeSoccer.io card logo |

The Inside Lacrosse card (Development section) no longer uses any image — it's an info-card
(monogram badge + stats + feature list + link out), matching the CollegeSoccer.io card's layout.
See "Section-by-section notes" below.

## Design tokens

```css
--canvas:      #F1ECE0   /* page background, light sections */
--paper:       #FAF7EF   /* card/surface background */
--ink:         #17150F   /* primary text / dark-section background */
--ink-70:      rgba(23,21,15,.7)
--ink-45:      rgba(23,21,15,.45)
--line:        #DAD2BE   /* hairline borders */
--line-strong: #C7BC9F
--accent:      #DE4222   /* orange accent — used sparingly */
--accent-ink:  #FAF3EC
--accent-soft: #F3D3C2
--dark-canvas: #151310   /* Labs / Contact section background */
--dark-paper:  #1D1A15
--dark-ink:    #F3EEE2   /* text on dark sections */
--dark-line:   rgba(243,238,226,.14)
```

Fonts (Google Fonts):
- **Jost** (weights 500–900) — display/headline font, uppercase, tight letter-spacing
- **Work Sans** (400–700) — body copy
- **IBM Plex Mono** (400–600) — labels, eyebrows, tags, technical details, nav

## Site structure

Single-page layout, five sections, each anchored and in the primary nav (nav shows Work / Labs /
About / Contact — Design is a subsection reached via the Work link, no separate nav item):

1. **Hero** (`#top`) — "MIKE / GILBERT" oversized headline, eyebrow "Designer + Developer +
   Builder", short intro paragraph, two CTAs (Explore the Work / or see labs).
2. **Development** (`#work`, eyebrow "Section 01 — Development") — two case cards side by side
   (`.dev-grid`, `1.55fr 1fr` on desktop, stacks on mobile):
   - **Inside Lacrosse** — info-card style: circular "IL" monogram badge, eyebrow line, title,
     description, 3-column stat row (News & Recruiting / Rankings: Teams & Players / Community:
     Forums & Discussion), a feature-list panel (News & Recruiting–Daily, Team & Player
     Rankings–Weekly, Community & Forums–Ongoing), "Visit InsideLacrosse.com ↗" link.
   - **CollegeSoccer.io** — same card structure: SVG logo mark, eyebrow, title, description,
     stat row (600+ Teams Tracked / 20K+ Games Logged / 40K+ Player Records), feature-list panel
     (Women's Game of the Week–Live, Rankings–Weekly, Data Pipeline→Supabase–Automated), "Visit
     CollegeSoccer.io ↗" link.
   Both cards share the `.case-card` base class, differ only by `.case-il` / `.case-csio`
   background treatment (dark, subtle radial-gradient accent glow) — **keep these two visually
   parallel; that symmetry is intentional.**
3. **Design** (`#design`, eyebrow "Section 02 — Design") — uniform square grid (`.gallery`,
   `repeat(6,1fr)` desktop / 4 at 980px / 2 at 640px, `aspect-ratio:1` items), 13 real
   design/branding pieces, full color (no desaturation), hover reveals name + category overlay.
4. **Labs** (`#labs`, eyebrow "Section 03 — Labs", dark background) — three equal-height cards
   in a row (`.labs-grid`, `repeat(3,1fr)`, no offsets — deliberately reads as a clean grid):
   - LAB/001 College Soccer Scraper (tags: Data, Scraper, Supabase)
   - LAB/002 Shadow Ward (tags: Game Design, Worldbuilding)
   - LAB/003 Field Grid — a live canvas sketch, dots that displace/grow near the cursor
     (`#labCanvas`, spacing 16, orange dots near cursor, translucent paper-color dots elsewhere,
     plus a subtle ambient sine-wave wobble at rest). This is the one section that intentionally
     keeps a continuous ambient animation loop — the rest of the site's motion is reactive-only.
5. **About** (`#about`, eyebrow "Section 04 — About") — two columns: bio copy (2 paragraphs) +
   skills table (Design: Visual Identity, Branding, Editorial Layout, Print Design, Logo Design /
   Develop: SvelteKit, Tailwind CSS, Supabase, Full-Stack Products, Data Pipelines) + a small
   crosshair icon with "BALTIMORE, MD".
6. **Contact** (`#contact`, dark background) — large "Let's Build Something." headline, mailto
   link, footer with "GILBY.ME" wordmark + social icons (GitHub, LinkedIn, Instagram, email).

Header nav: fixed, becomes a blurred/opaque pill after 30px scroll. Mobile: hamburger opens a
full-screen menu with large stacked links. No "DESIGN / DEVELOP / EXPERIMENT" tagline in the nav
— it was explicitly removed.

## Interaction conventions (carry these into the Svelte build)

- **`prefers-reduced-motion` and `pointer:fine` gating** — every custom animation (reveal,
  parallax, canvas effects, cursor, card tilt) checks both before running. On reduced-motion or
  touch-only devices, elements just appear in their resting state — no exceptions.
- **Scroll reveal** — `.reveal` elements fade/translate in via `IntersectionObserver`
  (`threshold:.14`, `rootMargin:'0px 0px -60px 0px'`), once, then unobserve.
- **Nav scroll-spy** — the active nav link is computed directly from scroll position (not
  IntersectionObserver transitions, which broke on instant/jump scrolls): on every scroll frame,
  find the last of `#work/#labs/#about/#contact` whose top has passed roughly 45% of viewport
  height, default to "work" above that. This keeps the underline always correct, including for
  the Design section (folds into "Work" — no separate nav item) and for jump-scrolls.
- **Custom cursor** — a small circle that follows the pointer (`mix-blend-mode:difference`),
  grows and shows a text label on elements with `data-cursor="..."` (View / Open / Drag). Desktop
  pointer-fine only; hidden entirely on touch.
- **Card tilt** — Labs cards do a subtle 3D perspective tilt following the cursor, pointer-fine +
  motion-allowed only.
- No parallax hero background, no animated dot/line/cross-grid backgrounds — all of those were
  prototyped and explicitly removed after review. Sections currently have **plain, static
  backgrounds** (light `--canvas` or dark `--dark-canvas`/`--ink`). Don't reintroduce them by
  default; ask first if it comes up.

## Things explicitly decided against (don't re-add without asking)

- No rotating "designer/developer/builder" ring or marquee on the hero.
- No vertical/horizontal scroll-progress rail tracking section position.
- No speech-bubble decoration in the hero headline.
- No latitude/longitude coordinate text anywhere (hero, about, contact all had it removed).
- No desaturation/grayscale treatment on the Design gallery images — always full color.
- No asymmetric/masonry Design gallery — it's a uniform square grid now.
- Design gallery, Labs cards, and the two Development case cards should all read as clean,
  evenly-proportioned grids — no staggered offsets.

## Suggested component breakdown (starting point, not gospel)

```
src/lib/components/
  Nav.svelte              — fixed header + mobile menu, scroll-spy logic
  Hero.svelte
  DevelopmentSection.svelte
    CaseCard.svelte        — shared by Inside Lacrosse + CollegeSoccer.io (props: eyebrow,
                              title, description, mark/logo, stats[], features[], linkHref,
                              linkLabel, theme)
  DesignGallery.svelte
    GalleryItem.svelte
  LabsSection.svelte
    LabCard.svelte
    FieldGridCanvas.svelte  — the one persistent-animation piece; isolate it so it's easy to
                               pause off-screen and respect reduced-motion
  AboutSection.svelte
  ContactSection.svelte
  CustomCursor.svelte
```

Reduced-motion + pointer-fine checks are natural candidates for a couple of small Svelte stores
or actions (`use:revealOnScroll`, `use:tiltOnHover`) shared across components rather than
duplicated per-component.

## Open items for Mike to weigh in on before/while building

- CollegeSoccer.io stats (600+ / 20K+ / 40K+) will drift over time — decide whether to hardcode,
  fetch live from Supabase, or keep as rounded static copy.
- No IA/sitemap beyond this single homepage yet — Labs detail pages, individual case-study pages,
  and a dedicated Design gallery page aren't designed.
- Labs entry copy (001/002 descriptions) is Claude's best-guess phrasing — worth a pass to make
  sure it's accurate to the real projects.
