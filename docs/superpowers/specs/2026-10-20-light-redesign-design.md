# Portfolio redesign: simple, light, recruiter-first

Date: 2026-10-20. Branch: `redesign/light-site`. Site: matingathani.me (Next.js 14 App Router, Vercel auto-deploy from `main`).

## Goal and audience

Replace the dark, animation-heavy scroll-story with a simple, light, human site. Primary audience: recruiters and hiring managers. A visitor should understand who Matin is, what he has built and shipped, and how to contact him within about 10 seconds. Secondary: engineers and OSS maintainers.

## Requirements (from the user)

- Simpler design. Not dark. Little or no animation.
- Appealing to people, not just technical readers.
- Do not look copied from divkix.me. Borrow only: separate pages in the nav, short hero with a stats strip, selected-work cards, and a light nod to a terminal look (monospace tags).
- Do not copy: figlet/ASCII banner, `$ whoami` / `--stats` prompts, page order or wording.
- Show more of Matin's own work, not four cards.
- Add a real contact page (today `/contact` is a 404; contact is only the `#contact` section on `/`, and the nav `#contact`/`#about` links break on inner pages).

## Out of scope

- New content beyond the resume and existing `lib/*` data.
- CMS, auth, analytics changes, blog post content.
- Changing the domain, hosting or Vercel project settings.

## Information architecture

| Route | Purpose |
|---|---|
| `/` | Intro, "Currently" line, stats strip, featured work in 3 groups, "What I'm looking for", CTA to resume and contact. |
| `/work` | All projects. Filter by group: Open source, Products I built, Data & ML. |
| `/writing` | Existing blog list, restyled. `/blog` and `/blog/[slug]` redirect (308) to `/writing` and `/writing/[slug]`, so old links and sitemap entries keep working. |
| `/about` | Existing page, restyled: experience, education, skills, achievements. |
| `/resume` | Embedded PDF plus download button. |
| `/contact` | New. Email, LinkedIn, GitHub, form posting to existing `/api/contact`, `mailto:` fallback as today. |
| `/oss` | Kept and restyled. Linked from Work and the homepage. |

Nav (all real links, no hash links): Work, Writing, About, Resume, Contact. Mobile: simple disclosure menu, no animation.

## Visual language

- Background warm off-white (`#FAFAF7`), surface white, ink near-black (`#1A1A1A`), muted gray for secondary text, one accent colour (default deep blue `#1F4FD8`; swappable via one CSS variable).
- Headings in a serif (Fraunces or Source Serif 4 via `next/font`), body in Inter, monospace (JetBrains Mono, already loaded) only for small tags, years, stats labels.
- Light terminal nod: tech tags and year labels in mono; section labels like `// work`. No prompts, no banner, no glow.
- Cards: 1px border, small radius, no heavy shadows. Max content width 72rem (existing `maxWidth.content`).
- Contrast: body text meets WCAG AA on the off-white background.
- Motion: none beyond hover/focus colour transitions (<=150ms). No scroll reveals, counters, parallax, loader or cursor effects. Respect `prefers-reduced-motion`.

## Homepage content

1. Intro: plain-language one-liner (MSc at Imperial; builds and fixes developer tools), "Currently" line, buttons Resume and Contact.
2. Stats strip with real, verifiable numbers: 28 merged PRs to cloudflare/workers-sdk (verified via `gh`, 2026-10-20), OSS repos contributed to, Dean's List years.
3. Featured work, grouped, 2 items each:
   - Open source: Cloudflare workers-sdk and Prisma ORM adapter fixes. Vercel Blob, Lexical and Stripe sync-engine appear on `/work` and `/oss`.
   - Products I built: ASU Capstone Sponsor Platform and Kanban Task Board. Medical Record System, REST API Data Integration and Hackathon app appear on `/work`. UK Grocer and CityMart appear on `/work` only if the user confirms (see conflicts).
   - Data & ML: CNN cancer-detection pipeline and NLP pipeline training at Musikaar.
4. "What I'm looking for": two lines for recruiters.

## Architecture and code changes

- New design tokens in `styles/globals.css` and `tailwind.config.ts` (replace the dark `--color-*` values and the unused keyframes/animations).
- Content stays in `lib/content.ts`, `lib/oss.ts`, `lib/blog.ts`. Add `lib/work.ts` as a single typed list of projects (group, years, tech, summary, links) used by `/` and `/work`.
- New small components, each one purpose: `SiteHeader`, `SiteFooter`, `Hero`, `StatsStrip`, `WorkCard`, `WorkGrid` (with filter), `PageShell`/`SectionHeading`, `ContactPanel`. Reuse `ContactForm` logic and `/api/contact`.
- Replace `Navbar`/`Footer`; remove `PageTransition`, `ScrollProgress`, `ScrollToTop`, `KeyboardShortcuts` if only used for effects.
- Delete: `components/story/*`, 3D/canvas/background components (`Hero3D*`, `NeuralNetwork3D`, `NeuralUniverse`, `ImmersiveCanvas`, `Signal3D`, `DataNetworkBackground`, `FlowingCodeBackground`, `BackgroundLayers`, `NoiseOverlay`, `CursorGlow`), and their now-unused helpers (`AnimatedText`, `ColorShiftText`, `ScrollReveal`, `Stagger`, `MetricCounter`, etc.) after confirming no remaining imports.
- Remove dependencies `three`, `@react-three/fiber`, `@react-three/drei`; remove `framer-motion` if no import remains.
- Keep: metadata and JSON-LD in `app/layout.tsx`, `sitemap.ts` (add new routes), `robots.ts`, Google verification file, Vercel SpeedInsights. Restyle `app/opengraph-image.tsx` and `app/twitter-image.tsx` to the light theme.
- Resume: copy the new PDF to both `public/resume.pdf` and `public/MatinGathaniResume2026.pdf` (kept in sync).
- Accessibility: skip link kept, semantic landmarks, visible focus rings, one `h1` per page.

## Content source of truth and conflicts

The new resume (`Matin_Gathani_Resume_imperial.pdf`) is the source of truth. It disagrees with the current site/notes in these places; the build will use the value shown in the "Used in build" column, all editable in `lib/content.ts` / `lib/work.ts`, and the user confirms at spec review.

| Item | Resume PDF | Current site / notes | Used in build |
|---|---|---|---|
| MSc programme | "MSc Artificial Intelligence, Financial Analytics", Sep 2026 - Jan 2028 | "MSc Business Analytics and AI", 2026 intake (notes: Sep 2026 - Aug 2027) | Resume PDF wording |
| Cloudflare merged PRs | "25+" | 28 (verified via `gh`) | "28" |
| Capstone result | "5th out of 150 projects", "500+ students" | "5th of 30+ teams" | "5th at ASU's Capstone Showcase" (no denominator or student count until confirmed) |
| CNN cancer pipeline AUC | "91% AUC-ROC" | Notes: a label-order bug was found 2026-10-13; fixed-code retrain gave 0.923, old checkpoint invalid | Describe the project without a metric until the numbers are settled |
| Contact email | `mg3246@imperial.ac.uk` | same | same |

Projects drawn from notes rather than the repo (UK Grocer, CityMart): included only if the user confirms they are public and fine to show.

## Error handling and edge cases

- Contact form: same behaviour as today (POST `/api/contact`, `mailto:` fallback on failure), plus visible success/error text.
- `/resume`: if the PDF viewer fails to load, show the download link.
- Old URLs: `/blog*` redirects; `/#contact` and other hash links need no redirect.
- No JS animation, so no layout shift from reveal effects.

## Verification

- `next build` and `next lint` pass; no import of deleted files or removed packages.
- Every route in the table returns 200 locally; `/blog` redirects to `/writing`.
- Lighthouse on `/` and `/work`: Performance >= 90, Accessibility >= 95 on mobile.
- Manual check at 375px and 1280px: no horizontal scroll, nav works with keyboard.
- Vercel preview URL reviewed by the user before merging to `main`.
- Sitemap lists the new routes; OG image renders in the light theme.

## Rollout

Work on `redesign/light-site`, push, review the Vercel preview, then merge to `main` (auto-deploys). Rollback: revert the merge commit.
