# pavanseshukumar.github.io

Personal portfolio for **Pavan Seshu Kumar** — a full-stack engineer in
Visakhapatnam, India.

Built as a single scrolling experience: a pointer-lit wordmark, a manifesto
that resolves word by word as you read it, skills set as a typographic ledger,
a horizontally-scrolling project reel, and a year odometer for the career
timeline.

**Live:** https://pavanseshukumar.github.io

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Component motion | Motion (`motion/react`) |
| Scroll choreography | GSAP + ScrollTrigger |
| Smooth scrolling | Lenis |
| Icons | Lucide |
| Contact delivery | EmailJS, with a `mailto:` fallback |

The site is a **static export** (`output: "export"` in `next.config.ts`).
GitHub Pages serves plain files, so there is no Node runtime, no image
optimisation server and no server actions. `images.unoptimized` is required
for the same reason.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into ./out
npm run typecheck
```

`npm run build` writes the whole site to `out/`, including `robots.txt`,
`sitemap.xml`, the 404 page and a generated Open Graph image.

## Project layout

```
src/
  app/
    layout.tsx        metadata, fonts, JSON-LD Person schema, page chrome
    page.tsx          section order
    globals.css       design tokens, fluid type scale, motion fallbacks
    og.png/route.tsx  Open Graph image, generated at build time
    robots.ts         /robots.txt
    sitemap.ts        /sitemap.xml
    not-found.tsx     exported as 404.html
  components/
    chrome/           Navigation, Preloader, ScrollProgress, SectionRail, Footer
    motion/           Reveal, TextReveal, MagneticButton, Parallax,
                      SectionHeading, Counter, Marquee, CustomCursor, SmoothScroll
    sections/         Hero, Index, Stack, Work, Trajectory, Contact
    visuals/          ProjectPlate (generated per-project SVG motifs)
  lib/
    data/             site, projects, skills, experience, socials
    hooks/            useMediaQuery, useGSAP, useLocalTime, …
    scroll.ts         Lenis handle + anchor scrolling
```

### Editing content

All copy and data live in `src/lib/data/` — nothing is hardcoded in the
components. To change what the site says, edit these and nothing else:

- `site.ts` — name, role, contact details, location, ticker strips, the
  manifesto statement and which phrases it highlights
- `projects.ts` — the work reel; `motif` picks one of seven generated SVG
  plates (`arc`, `grid`, `wave`, `orbit`, `strata`, `pulse`, `mesh`)
- `skills.ts` — the stack ledger, grouped by where each tool sits
- `experience.ts` — the trajectory entries and their odometer years
- `socials.ts` — profile links

Counters in the Index section are derived, not typed in: years of experience
come from `CAREER_START_YEAR`, and the product and tool counts come from the
lengths of `projects` and `skills`.

## Contact form

The form posts through EmailJS using three public keys, read at build time:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

Put them in `.env.local` for local development. **If they are absent the form
still works** — it falls back to opening a prefilled `mailto:` instead of
failing, so a fresh clone always has a working route to the inbox.

The EmailJS template receives `from_name`, `from_email`, `subject`, `message`
and `to_name`.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes
`out/` to the `gh-pages` branch.

Two details matter for GitHub Pages:

- **`.nojekyll`** is written into `out/` by the workflow. Without it Pages
  strips the `_next` directory, because Jekyll ignores paths beginning with an
  underscore, and the site loads with no CSS or JavaScript.
- **The Open Graph image is served from `/og.png`**, not from Next's
  conventional `opengraph-image` route. That route exports to a file with no
  extension, which Pages serves as `application/octet-stream` — enough for
  most social crawlers to reject the preview.

The workflow reads the new `NEXT_PUBLIC_EMAILJS_*` repository secrets and
falls back to the original `REACT_APP_EMAILJS_*` names, so existing secrets
keep working.

## Accessibility and motion

- `prefers-reduced-motion` is honoured throughout: the preloader is skipped,
  the horizontal pin is not installed, scroll-linked parallax is disabled and
  the pointer-lit wordmark renders as solid type.
- The custom cursor is desktop-only, and only on fine pointers.
- Split-text animations keep their full string available to screen readers via
  `aria-label`, with the per-character markup hidden.
- The page has one `h1`, a skip link, and visible focus rings.
