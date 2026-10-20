# Light Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark, animation-heavy scroll-story at matingathani.me with a simple, light, recruiter-first site made of real pages (`/`, `/work`, `/writing`, `/about`, `/resume`, `/contact`, `/oss`).

**Architecture:** Keep Next.js 14 App Router and the existing data files (`lib/content.ts`, `lib/oss.ts`, `lib/blog.ts`). Add `lib/work.ts` (project list), `lib/site.ts` (nav and sitemap paths) and `lib/stats.ts`. New design tokens live in CSS variables in `styles/globals.css`, mapped in `tailwind.config.ts`. Pages are small server components built from a handful of single-purpose components. All 3D, canvas, cursor, loader and motion code and its npm packages are deleted at the end.

**Tech Stack:** Next.js 14.2, React 18.2, Tailwind 3.4, TypeScript 5.1, `next/font` (Source Serif 4, Inter, JetBrains Mono), Vitest 1.6 (new, for data and route checks), react-pdf (kept for `/resume`).

**Spec:** `docs/superpowers/specs/2026-10-20-light-redesign-design.md`

## Global Constraints

- Branch `redesign/light-site`; nothing is merged to `main` or pushed without the user's go-ahead.
- Palette tokens: bg `#fafaf7`, surface `#ffffff`, ink `#1a1a1a`, secondary `#4a4a45`, muted `#6b6b64`, accent `#1f4fd8`, accent-soft `#eef2fd`, border `#e4e2da`. Body text must meet WCAG AA on the bg.
- Fonts: headings Source Serif 4 (`--font-heading`), body Inter (`--font-body`), mono JetBrains Mono (`--font-mono`) only for tags, years, eyebrow labels and stats labels.
- Max content width `72rem` (Tailwind `max-w-content`).
- No animation: no framer-motion, no scroll reveals, counters, parallax, loader, custom cursor, glow or noise. Hover/focus colour transitions of 150ms or less only. Respect `prefers-reduced-motion`.
- Nav is exactly: Work, Writing, About, Resume, Contact, all real paths (never `#hash` links).
- `/blog` and `/blog/:slug` permanently redirect (308) to `/writing` and `/writing/:slug`.
- Keep: SEO metadata, JSON-LD, sitemap, robots, Google verification file, Vercel SpeedInsights, `/api/contact`, `/api/github-contributions` (left in place, now unused).
- Facts: the new resume PDF is the source of truth. Use "28 merged" Cloudflare PRs (verified with `gh`, 2026-10-20). Programme text: "MSc Artificial Intelligence (Financial Analytics)", Imperial Business School, Sep 2026 - Jan 2028. Capstone is "5th at ASU's Capstone Showcase" with no denominator and no student count. No CNN AUC number anywhere.
- Never publish links to private repos (`uk-grocer`, `career-ops`, `nexusguard`). UK Grocer and CityMart are not shown.
- Commit messages end with the line `Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k`.
- CSP in `next.config.js` sets `frame-ancestors 'none'` on every response, so the PDF can never be shown in an `<iframe>`; `/resume` uses the react-pdf viewer only.
- JSX text must escape apostrophes (`&apos;`) or the lint step fails.
- Until Task 10 deletes the old files, `.eslintrc.json` makes plain `npm run build` fail on lint errors in files that are about to be removed. Run builds as `npm run build -- --no-lint` in Tasks 0-9, lint new files with `npx next lint --file <path>`, and use plain `npm run build` and whole-project `npx next lint` from Task 10 on. `next/font/google` can fail transiently with `Cannot read properties of null (reading '1')`; re-run the build once before treating it as a real failure. Baseline before redesign: `/` First Load JS = 174 kB.

## Review Focus

- Old links `/blog/<slug>` must redirect to `/writing/<slug>` (not 404): pinned in Task 1 (`tests/site.test.ts`) and Task 3.
- Contact form with SMTP env vars unset (the local and preview default): server returns 500 "Email configuration missing."; the page must show the friendly message and a visible `mailto:` link, not a dead form: checked in Task 8.
- `/resume` on a 375px phone: the old mobile `<iframe>` is blocked by CSP; the page must show the rendered PDF or the download buttons: Task 8.
- Private repos or unverified metrics leaking onto the site (`uk-grocer`, `91%`, `500+`, `of 150`, `30+ teams`, old "Business Analytics and AI"): pinned in Task 1 and Task 9 tests.
- JavaScript disabled or slow: `/work` must still list every project in the server HTML (filter defaults to "All"): checked in Task 6 with `curl`.

---

### Task 0: Install dependencies and lint config

**Files:**
- Create: `.eslintrc.json`
- Modify: `package.json` (add `test` script, vitest devDependency)
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: `npm test` (runs `vitest run`), `npx next lint` non-interactive, `node_modules` installed.

- [ ] **Step 1: Install existing dependencies**

Run: `cd ~/Portfolio && npm install`
Expected: completes without error (postinstall copies the PDF worker). `ls node_modules/.bin | grep -E "^(next|tsc)$"` prints both.

- [ ] **Step 2: Add Vitest**

Run: `npm install -D vitest@1.6.0`
Expected: `vitest` appears under `devDependencies` in `package.json`.

- [ ] **Step 3: Add the test script**

In `package.json` `scripts`, add after `"lint": "next lint",`:

```json
    "test": "vitest run",
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});
```

- [ ] **Step 5: Create `.eslintrc.json`**

```json
{
  "extends": "next/core-web-vitals"
}
```

- [ ] **Step 6: Record the baseline**

Run: `npm run build 2>&1 | tail -15`
Expected: build succeeds on the untouched old site (this is the baseline; if it fails, stop and report the error before changing anything).

Run: `npx next lint 2>&1 | tail -15`
Expected: runs without an interactive prompt. Note any pre-existing warnings; do not fix them unless a later task touches that file.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts .eslintrc.json
git commit -m "chore: add vitest and eslint config

Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k"
```

---

### Task 1: Site routes and work data (with tests)

**Files:**
- Create: `lib/site.ts`
- Create: `lib/work.ts`
- Create: `tests/site.test.ts`
- Create: `tests/work.test.ts`
- Modify: `next.config.js` (add `redirects`)

**Interfaces:**
- Produces:
  - `navLinks: readonly { href: string; label: string }[]` and `sitePaths: string[]` from `lib/site.ts`.
  - `type WorkGroup = "open-source" | "product" | "data-ml"`, `type WorkLink = { label: string; url: string }`, `type WorkItem = { slug: string; name: string; group: WorkGroup; years?: string; tags: string[]; summary: string; links: WorkLink[]; featured: boolean }`, `workGroups: { id: WorkGroup; label: string; blurb: string }[]`, `workItems: WorkItem[]`, `featuredByGroup(group: WorkGroup): WorkItem[]` from `lib/work.ts`.
  - `next.config.js` `redirects()` returning the two `/blog` rules.

- [ ] **Step 1: Write the failing route tests**

Create `tests/site.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { createRequire } from "node:module";
import { navLinks, sitePaths } from "../lib/site";

const req = createRequire(import.meta.url);
const nextConfig = req("../next.config.js");

describe("site routes", () => {
  it("nav uses real paths, never hash links", () => {
    expect(navLinks.map((l) => l.label)).toEqual(["Work", "Writing", "About", "Resume", "Contact"]);
    for (const link of navLinks) expect(link.href).toMatch(/^\/[a-z]+$/);
  });

  it("sitemap paths include home, every nav link and /oss", () => {
    expect(sitePaths).toContain("");
    for (const link of navLinks) expect(sitePaths).toContain(link.href);
    expect(sitePaths).toContain("/oss");
  });

  it("has no duplicate sitemap paths", () => {
    expect(new Set(sitePaths).size).toBe(sitePaths.length);
  });

  it("redirects /blog and /blog/:slug permanently to /writing", async () => {
    const redirects = await nextConfig.redirects();
    expect(redirects).toContainEqual({ source: "/blog", destination: "/writing", permanent: true });
    expect(redirects).toContainEqual({
      source: "/blog/:slug",
      destination: "/writing/:slug",
      permanent: true,
    });
  });
});
```

- [ ] **Step 2: Write the failing work-data tests**

Create `tests/work.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { workItems, workGroups, featuredByGroup } from "../lib/work";

describe("work data", () => {
  it("has unique slugs", () => {
    const slugs = workItems.map((i) => i.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("puts every item in a defined group", () => {
    const ids = workGroups.map((g) => g.id);
    for (const item of workItems) expect(ids).toContain(item.group);
  });

  it("features exactly two items per group for the homepage", () => {
    for (const group of workGroups) expect(featuredByGroup(group.id)).toHaveLength(2);
  });

  it("gives every item a summary and at least one tag", () => {
    for (const item of workItems) {
      expect(item.summary.length).toBeGreaterThan(20);
      expect(item.summary.length).toBeLessThan(300);
      expect(item.tags.length).toBeGreaterThan(0);
    }
  });

  it("uses absolute https links only", () => {
    for (const item of workItems) {
      for (const link of item.links) expect(link.url).toMatch(/^https:\/\//);
    }
  });

  it("never links private repos or shows private projects", () => {
    const text = JSON.stringify(workItems);
    expect(text).not.toMatch(/uk-grocer|career-ops|nexusguard|citymart/i);
  });

  it("makes no unverified metric claims", () => {
    const text = JSON.stringify(workItems);
    expect(text).not.toMatch(/91%|0\.9\d\d|500\+|of 150|30\+ teams/);
  });

  it("states the verified Cloudflare count", () => {
    const cloudflare = workItems.find((i) => i.slug === "cloudflare-workers-sdk");
    expect(cloudflare?.summary).toContain("28 merged");
  });
});
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm test 2>&1 | tail -20`
Expected: FAIL, "Cannot find module '../lib/site'" and "'../lib/work'".

- [ ] **Step 4: Create `lib/site.ts`**

```ts
export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

// Every public page, used by the sitemap. "/oss" is linked from /work, not the nav.
export const sitePaths: string[] = ["", ...navLinks.map((link) => link.href), "/oss"];
```

- [ ] **Step 5: Create `lib/work.ts`**

```ts
export type WorkGroup = "open-source" | "product" | "data-ml";

export type WorkLink = { label: string; url: string };

export type WorkItem = {
  slug: string;
  name: string;
  group: WorkGroup;
  years?: string;
  tags: string[];
  summary: string;
  links: WorkLink[];
  featured: boolean;
};

export const workGroups: { id: WorkGroup; label: string; blurb: string }[] = [
  { id: "open-source", label: "Open source", blurb: "Bug fixes merged into tools other developers rely on." },
  { id: "product", label: "Products I built", blurb: "Full-stack projects, from class platforms to small apps." },
  { id: "data-ml", label: "Data & ML", blurb: "Pipelines and models, evaluated honestly." },
];

export const workItems: WorkItem[] = [
  {
    slug: "cloudflare-workers-sdk",
    name: "Cloudflare developer toolkit",
    group: "open-source",
    years: "Mar 2026 - Present",
    tags: ["TypeScript", "Wrangler", "Miniflare", "Vitest"],
    summary:
      "28 merged fixes to Cloudflare's open-source developer toolkit. Traced a Workflows crash on large step outputs to a SQLite row-size limit and shipped the fix.",
    links: [
      {
        label: "Merged PRs",
        url: "https://github.com/cloudflare/workers-sdk/pulls?q=is%3Apr+author%3Amatingathani+is%3Amerged",
      },
    ],
    featured: true,
  },
  {
    slug: "prisma-adapter-fixes",
    name: "Prisma ORM adapter fixes",
    group: "open-source",
    years: "2026",
    tags: ["TypeScript", "Prisma", "PostgreSQL"],
    summary:
      "Pull requests to Prisma ORM fixing typed error mapping, TIMESTAMPTZ conversion and constraint violations across the Neon, pg, libsql, MariaDB and MSSQL driver adapters.",
    links: [{ label: "Pull requests", url: "https://github.com/prisma/orm/pulls?q=is%3Apr+author%3Amatingathani" }],
    featured: true,
  },
  {
    slug: "vercel-blob-fixes",
    name: "Vercel Blob storage fixes",
    group: "open-source",
    years: "2026",
    tags: ["TypeScript", "Vercel Blob", "Web Streams"],
    summary:
      "Fixed a multipart upload deadlock on empty streams, fixed TransformStream backpressure and enforced size limits client-side in vercel/storage. 2 merged.",
    links: [
      { label: "Pull requests", url: "https://github.com/vercel/storage/pulls?q=is%3Apr+author%3Amatingathani" },
    ],
    featured: false,
  },
  {
    slug: "lexical-fixes",
    name: "Lexical editor fixes",
    group: "open-source",
    years: "2026",
    tags: ["TypeScript", "Lexical", "React"],
    summary:
      "Pull requests to Meta's Lexical text-editor framework, including a fix for a false onChange event on initial autofocus with code highlighting.",
    links: [{ label: "Pull requests", url: "https://github.com/facebook/lexical/pulls?q=is%3Apr+author%3Amatingathani" }],
    featured: false,
  },
  {
    slug: "capstone-sponsor-platform",
    name: "ASU Capstone sponsor platform",
    group: "product",
    years: "Jan 2025 - Dec 2025",
    tags: ["Next.js", "TypeScript", "MySQL", "Docker", "GitHub Actions"],
    summary:
      "Matching platform that scores and ranks student compatibility with sponsor projects. Placed 5th at ASU's Capstone Showcase; shipped CI/CD and contained a malware incident on the build pipeline.",
    links: [],
    featured: true,
  },
  {
    slug: "kanban-taskboard",
    name: "Kanban task board",
    group: "product",
    tags: ["React", "TypeScript", "Supabase"],
    summary:
      "Real-time Kanban board built with React, TypeScript and Supabase, with drag-and-drop columns and live persistence across sessions.",
    links: [{ label: "Source", url: "https://github.com/matingathani/kanban-taskboard" }],
    featured: true,
  },
  {
    slug: "medical-record-system",
    name: "Medical record management system",
    group: "product",
    tags: ["JavaScript", "SQL", "Docker"],
    summary:
      "Containerized full-stack platform for managing 1,000+ simulated patient records with role-based access, with SQL schemas and queries tuned for reporting.",
    links: [{ label: "Source", url: "https://github.com/matingathani/medical-records" }],
    featured: false,
  },
  {
    slug: "rest-api-integration",
    name: "REST API data integration",
    group: "product",
    tags: ["REST", "JSON", "Postman"],
    summary:
      "Data integration system with five REST endpoints for ingestion and retrieval, with structured error handling and response validation.",
    links: [{ label: "Source", url: "https://github.com/matingathani/rest-api-integration" }],
    featured: false,
  },
  {
    slug: "innovation-devs-hackathon",
    name: "Innovation Devs hackathon app",
    group: "product",
    tags: ["TypeScript", "HTML", "CSS"],
    summary: "Full-stack TypeScript application built and delivered under hackathon time limits.",
    links: [{ label: "Source", url: "https://github.com/matingathani/InnovationDevsHackathon" }],
    featured: false,
  },
  {
    slug: "cancer-cnn-pipeline",
    name: "CNN cancer detection pipeline",
    group: "data-ml",
    years: "Feb 2026",
    tags: ["Python", "CNN", "PatchCamelyon"],
    summary:
      "Open-source CNN pipeline that classifies histopathology image patches from the PatchCamelyon dataset. Reports sensitivity and specificity alongside AUC-ROC, and is built to be reproduced and extended.",
    links: [{ label: "Source", url: "https://github.com/matingathani/medical-cancer-AIModel" }],
    featured: true,
  },
  {
    slug: "nlp-pipeline-musikaar",
    name: "NLP pipeline training at Musikaar",
    group: "data-ml",
    years: "2024",
    tags: ["Python", "NLP", "Classification"],
    summary:
      "Trained and evaluated ML models on HRMS data: preprocessing, tokenization and production NLP pipelines for real-world HR datasets.",
    links: [],
    featured: true,
  },
];

export const featuredByGroup = (group: WorkGroup): WorkItem[] =>
  workItems.filter((item) => item.group === group && item.featured);
```

- [ ] **Step 6: Add the redirects to `next.config.js`**

In `next.config.js`, add this method to `nextConfig` directly after the `webpack` function:

```js
  async redirects() {
    return [
      { source: "/blog", destination: "/writing", permanent: true },
      { source: "/blog/:slug", destination: "/writing/:slug", permanent: true },
    ];
  },
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm test 2>&1 | tail -20`
Expected: PASS, 12 tests across 2 files.

- [ ] **Step 8: Commit**

```bash
git add lib/site.ts lib/work.ts tests next.config.js
git commit -m "feat: add site routes, work data and /blog redirects

Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k"
```

---

### Task 2: Design tokens, layout shell, header and footer

**Files:**
- Modify (full rewrite): `styles/globals.css`
- Modify (full rewrite): `tailwind.config.ts`
- Modify (full rewrite): `app/layout.tsx`
- Create: `components/SiteHeader.tsx`
- Create: `components/SiteFooter.tsx`
- Create: `components/SectionHeading.tsx`

**Interfaces:**
- Consumes: `navLinks` from `lib/site.ts`; `content` from `lib/content.ts`.
- Produces:
  - CSS classes `.card`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.tag`, `.eyebrow`, `.link` and Tailwind colours `background`, `surface`, `primary`, `secondary`, `muted`, `accent`, `accent-soft`, `border`.
  - `<SectionHeading as?: "h1" | "h2"; id?: string; eyebrow?: string; title: string; children?: string />`.
  - `<SiteHeader />`, `<SiteFooter />`.

- [ ] **Step 1: Replace `styles/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
  --color-bg: #fafaf7;
  --color-surface: #ffffff;
  --color-primary: #1a1a1a;
  --color-secondary: #4a4a45;
  --color-muted: #6b6b64;
  --color-accent: #1f4fd8;
  --color-accent-soft: #eef2fd;
  --color-border: #e4e2da;
  --font-heading: "Source Serif 4";
  --font-body: "Inter";
  --font-mono: "JetBrains Mono";
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  @apply font-body antialiased;
  background-color: var(--color-bg);
  color: var(--color-primary);
  min-height: 100vh;
  overflow-x: hidden;
}

::selection { background: var(--color-accent-soft); color: var(--color-primary); }

a { color: inherit; text-decoration: none; }

:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

.link { color: var(--color-accent); text-underline-offset: 3px; }
.link:hover { text-decoration: underline; }

.eyebrow {
  font-family: var(--font-mono), "JetBrains Mono", ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.tag {
  font-family: var(--font-mono), "JetBrains Mono", ui-monospace, monospace;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-secondary);
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.15s, border-color 0.15s;
}
.btn-primary {
  background: var(--color-accent);
  color: #ffffff;
  border: 1px solid var(--color-accent);
}
.btn-primary:hover { background: #1a43b8; border-color: #1a43b8; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-secondary {
  background: var(--color-surface);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
}
.btn-secondary:hover { border-color: var(--color-accent); }

.input-field {
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-primary);
  padding: 10px 12px;
  font-size: 14px;
  transition: border-color 0.15s;
}
.input-field::placeholder { color: var(--color-muted); }
.input-field:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}
```

- [ ] **Step 2: Replace `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        border: "var(--color-border)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Source Serif 4", "Georgia", "serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "SFMono-Regular"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Create `components/SectionHeading.tsx`**

```tsx
type Props = {
  as?: "h1" | "h2";
  id?: string;
  eyebrow?: string;
  title: string;
  children?: string;
};

export default function SectionHeading({ as = "h2", id, eyebrow, title, children }: Props) {
  const Heading = as;
  return (
    <div className="mb-8">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <Heading id={id} className="font-heading text-2xl font-semibold text-primary md:text-3xl">
        {title}
      </Heading>
      {children && <p className="mt-3 max-w-2xl leading-relaxed text-secondary">{children}</p>}
    </div>
  );
}
```

- [ ] **Step 4: Create `components/SiteHeader.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "../lib/site";
import { content } from "../lib/content";

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    isActive(pathname, href)
      ? "text-sm font-medium text-primary underline underline-offset-8 decoration-accent decoration-2"
      : "text-sm text-secondary hover:text-primary";

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-lg font-semibold text-primary" onClick={() => setOpen(false)}>
          {content.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-primary md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border px-6 py-3 md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2.5 ${linkClass(link.href)}`}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 5: Create `components/SiteFooter.tsx`**

```tsx
import { content } from "../lib/content";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-6 py-8 text-sm text-secondary md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {content.name}
        </p>
        <ul className="flex flex-wrap gap-6">
          <li>
            <a href={`mailto:${content.contact.email}`} className="hover:text-primary">
              Email
            </a>
          </li>
          <li>
            <a href={content.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              GitHub
            </a>
          </li>
          <li>
            <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AccessibilitySkipLink from "../components/AccessibilitySkipLink";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { content } from "../lib/content";

const headingFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "600"],
  display: "swap",
});
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: `${content.name} | ${content.role}`,
    template: `%s | ${content.name}`,
  },
  description: content.summary,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: `${content.name} | ${content.role}`,
    description: content.summary,
    url: baseUrl,
    siteName: content.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.name} | ${content.role}`,
    description: content.summary,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        <Script id="json-ld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${baseUrl}/#person`,
                name: content.name,
                jobTitle: content.role,
                url: baseUrl,
                sameAs: [content.contact.linkedin, content.contact.github],
                alumniOf: content.education.map((e) => ({
                  "@type": "CollegeOrUniversity",
                  name: e.school,
                })),
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Tempe",
                  addressRegion: "AZ",
                },
              },
              {
                "@type": "WebSite",
                "@id": `${baseUrl}/#website`,
                url: baseUrl,
                name: content.name,
                description: content.summary,
              },
            ],
          })}
        </Script>
        <AccessibilitySkipLink />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Build to verify nothing is broken**

Run: `npm run build 2>&1 | tail -25`
Expected: build succeeds. (The old homepage still renders with its own dark inline styles; that is expected until Task 5.)

- [ ] **Step 8: Commit**

```bash
git add styles/globals.css tailwind.config.ts app/layout.tsx components/SiteHeader.tsx components/SiteFooter.tsx components/SectionHeading.tsx
git commit -m "feat: add light design tokens and new site shell

Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k"
```

---

### Task 3: Writing pages (rename /blog) and sitemap

**Files:**
- Move: `app/blog/` to `app/writing/`
- Modify (full rewrite): `app/writing/page.tsx`, `app/writing/[slug]/page.tsx`
- Modify (full rewrite): `app/sitemap.ts`
- Create: `tests/sitemap.test.ts`

**Interfaces:**
- Consumes: `posts` from `lib/blog.ts`; `sitePaths` from `lib/site.ts`; `SectionHeading`.
- Produces: routes `/writing` and `/writing/[slug]`; sitemap listing `sitePaths` plus `/writing/<slug>` for every post.

- [ ] **Step 1: Write the failing sitemap test**

Create `tests/sitemap.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import sitemap from "../app/sitemap";
import { posts } from "../lib/blog";
import { sitePaths } from "../lib/site";

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lists every site path", () => {
    for (const path of sitePaths) expect(urls.some((u) => u.endsWith(path))).toBe(true);
  });

  it("lists every post under /writing and nothing under /blog", () => {
    for (const post of posts) expect(urls).toContain(`http://localhost:3000/writing/${post.slug}`);
    expect(urls.some((u) => u.includes("/blog"))).toBe(false);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test 2>&1 | tail -15`
Expected: FAIL, the sitemap still emits `/blog` URLs.

- [ ] **Step 3: Move the route directory**

Run: `git mv app/blog app/writing`

- [ ] **Step 4: Replace `app/writing/page.tsx`**

```tsx
import Link from "next/link";
import SectionHeading from "../../components/SectionHeading";
import { posts } from "../../lib/blog";

export const metadata = { title: "Writing" };

const readingTime = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).length / 200));

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeading as="h1" eyebrow="Writing" title="Notes from building things">
        Short write-ups on pipelines, tooling and what I learned shipping them.
      </SectionHeading>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/writing/${post.slug}`} className="block h-full">
            <article className="card h-full transition-colors hover:border-accent">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">{post.date}</p>
                <span className="tag">{post.category}</span>
              </div>
              <h2 className="mt-3 font-heading text-xl font-semibold text-primary">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{post.summary}</p>
              <p className="mt-4 text-xs text-muted">{readingTime(post.content)} min read</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Replace `app/writing/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "../../../lib/blog";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.summary };
}

const readingTime = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).length / 200));

export default function WritingPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/writing" className="link mb-8 inline-block text-sm">
        &larr; All writing
      </Link>
      <article>
        <p className="eyebrow mb-3">
          {post.date} &middot; {post.category} &middot; {readingTime(post.content)} min read
        </p>
        <h1 className="font-heading text-3xl font-semibold text-primary md:text-4xl">{post.title}</h1>
        <div className="mt-8 whitespace-pre-line leading-relaxed text-secondary">{post.content}</div>
      </article>
    </div>
  );
}
```

- [ ] **Step 6: Replace `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { posts } from "../lib/blog";
import { sitePaths } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = sitePaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes];
}
```

- [ ] **Step 7: Run tests and build**

Run: `npm test 2>&1 | tail -15`
Expected: PASS (all test files).

Run: `npm run build 2>&1 | tail -25`
Expected: build succeeds and the route table lists `/writing` and `/writing/[slug]` but not `/blog`.

- [ ] **Step 8: Verify the redirect against a running build**

```bash
npx next start -p 3100 > /dev/null 2>&1 &
SERVER=$!
sleep 4
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3100/blog
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3100/blog/reliable-nlp-pipelines
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/writing/reliable-nlp-pipelines
kill $SERVER
```
Expected: `308 http://localhost:3100/writing`, `308 http://localhost:3100/writing/reliable-nlp-pipelines`, `200`.

- [ ] **Step 9: Commit**

```bash
git add -A app/writing app/blog app/sitemap.ts tests/sitemap.test.ts
git commit -m "feat: move blog to /writing with redirects and update sitemap

Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k"
```

---

### Task 4: Carry over old-site content and add new resume content

The old site had sections the first draft of this plan dropped (what I do, toolkit, impact numbers, Musikaar role, testimonials). The new resume adds items the old site never had (Imperial modules, export market research, skill levels, languages, a maths certificate). This task puts all of it in `lib/content.ts` as data, test-first. Later tasks render it.

**Files:**
- Create: `tests/carryover.test.ts`
- Modify: `lib/types.ts`
- Modify: `lib/content.ts`
- Modify: `lib/stats.ts` (add `impactStats`; this file is created in Task 5 if absent, so create it here)

**Interfaces:**
- Consumes: existing `content` (`experience`, `testimonials`, `impactMetrics`, `education`, `achievements`).
- Produces:
  - `Education.modules?: string[]`
  - `content.expertise: { title: string; description: string; tags: string[] }[]` (3 items)
  - `content.toolkit: string[]`
  - `content.skillLevels: { level: "Advanced" | "Intermediate" | "Basic"; skills: string[] }[]`
  - `content.languages: { name: string; level: string }[]`
  - `impactStats(): { value: string; label: string }[]` from `lib/stats.ts`, giving `["28","180+","1,000+","10,000+"]` for values.

- [ ] **Step 1: Write the failing tests**

Create `tests/carryover.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { content } from "../lib/content";
import { impactStats } from "../lib/stats";

describe("content carried over from the old site", () => {
  it("keeps all four past roles", () => {
    const roles = content.experience.map((e) => e.role);
    for (const role of [
      "Open-Source Contributor",
      "Software Engineering Specialist",
      "Engineering Tutor",
      "Data Intern",
    ]) {
      expect(roles).toContain(role);
    }
  });

  it("keeps the three testimonials", () => {
    expect(content.testimonials).toHaveLength(3);
  });

  it("keeps the three 'what I do' areas", () => {
    expect(content.expertise.map((e) => e.title)).toEqual([
      "Data & Analytics",
      "Open-Source Engineering",
      "AI & Full-Stack Delivery",
    ]);
    for (const area of content.expertise) expect(area.tags.length).toBeGreaterThan(0);
  });

  it("keeps the toolkit list", () => {
    expect(content.toolkit).toEqual(expect.arrayContaining(["Python", "TypeScript", "Docker", "Power BI"]));
  });

  it("formats the impact numbers with separators", () => {
    expect(impactStats().map((s) => s.value)).toEqual(["28", "180+", "1,000+", "10,000+"]);
  });
});

describe("new content from the Imperial resume", () => {
  it("adds the relevant Imperial modules", () => {
    expect(content.education[0].modules).toEqual([
      "Advanced Machine Learning",
      "Generative AI and Large Language Models",
      "Causal Modelling for Business Analytics",
    ]);
  });

  it("adds the export market research role", () => {
    const role = content.experience.find((e) => e.company.includes("Stainless"));
    expect(role?.dates).toBe("May 2026 - Aug 2026");
    expect(role?.action).toContain("Germany, UAE, Singapore");
  });

  it("adds the resume skill levels", () => {
    const level = (name: string) => content.skillLevels.find((l) => l.level === name)?.skills ?? [];
    expect(level("Advanced")).toEqual(
      expect.arrayContaining(["C++", "Python", "SQL", "Power BI", "Excel", "Tableau"])
    );
    expect(level("Intermediate")).toEqual(
      expect.arrayContaining(["JavaScript / TypeScript", "Java", "Docker", "GitHub Actions CI/CD", "PostgreSQL", "MySQL"])
    );
    expect(level("Basic")).toEqual(["AWS (EC2, S3, Lambda)"]);
  });

  it("adds spoken languages", () => {
    expect(content.languages.map((l) => l.name)).toEqual(["Gujarati", "Hindi", "English"]);
  });

  it("adds the Imperial maths certificate", () => {
    expect(content.achievements.map((a) => a.title)).toContain("Mathematics for Machine Learning");
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test 2>&1 | tail -20`
Expected: FAIL. `tests/carryover.test.ts` errors on a missing export `impactStats` from `../lib/stats` (module not found), and nothing else regresses.

- [ ] **Step 3: Extend the types in `lib/types.ts`**

In the `Education` type, add after `gpa?: string;`:

```ts
  modules?: string[];
```

In `SiteContent`, add after the `skillProficiencies` array type (anywhere inside the type is fine; keep it next to the other list fields):

```ts
  expertise: {
    title: string;
    description: string;
    tags: string[];
  }[];
  toolkit: string[];
  skillLevels: {
    level: "Advanced" | "Intermediate" | "Basic";
    skills: string[];
  }[];
  languages: {
    name: string;
    level: string;
  }[];
```

- [ ] **Step 4: Add the new data to `lib/content.ts`**

Insert the following block directly before the line `  contact: {` (two-space indent):

```ts
  expertise: [
    {
      title: "Data & Analytics",
      description:
        "Turning messy data into decisions: SQL modelling, Power BI dashboards, Python pipelines, and the analytics coursework behind an Imperial MSc.",
      tags: ["Power BI", "SQL", "Python", "Pandas", "Excel"],
    },
    {
      title: "Open-Source Engineering",
      description:
        "28 merged bug fixes to Cloudflare's developer toolkit (Wrangler CLI, Miniflare and the Vite plugin), plus ongoing work across the ecosystem.",
      tags: ["TypeScript", "Node.js", "Cloudflare Workers", "Vitest", "Git"],
    },
    {
      title: "AI & Full-Stack Delivery",
      description:
        "Production NLP pipelines and full-stack platforms, Next.js and TypeScript front to back, with CI/CD, monitoring and incident response.",
      tags: ["Next.js", "NLP", "LLMs", "Docker", "CI/CD"],
    },
  ],
  toolkit: [
    "Python", "TypeScript", "JavaScript", "Java", "C++", "SQL", "React", "Next.js", "Node.js", "Docker",
    "Power BI", "Excel", "Pandas", "NumPy", "NLP", "PostgreSQL", "AWS", "REST APIs", "Git", "CI/CD",
  ],
  skillLevels: [
    {
      level: "Advanced",
      skills: ["C++", "Python", "SQL", "Power BI", "Excel", "Tableau"],
    },
    {
      level: "Intermediate",
      skills: [
        "JavaScript / TypeScript",
        "Java",
        "Docker",
        "GitHub Actions CI/CD",
        "PostgreSQL",
        "MySQL",
      ],
    },
    {
      level: "Basic",
      skills: ["AWS (EC2, S3, Lambda)"],
    },
  ],
  languages: [
    { name: "Gujarati", level: "Native" },
    { name: "Hindi", level: "Native" },
    { name: "English", level: "Fluent" },
  ],
```

Then, in the first `education` entry (Imperial), use the Edit tool to replace the single line

```ts
      degree: "MSc Business Analytics and AI",
```

with:

```ts
      degree: "MSc Business Analytics and AI",
      modules: [
        "Advanced Machine Learning",
        "Generative AI and Large Language Models",
        "Causal Modelling for Business Analytics",
      ],
```

(Task 10 later renames this degree string; the `modules` line stays.)

Next, add the export-research role to `experience`, directly after the Cloudflare entry. Use the Edit tool to replace

```ts
      tools: ["TypeScript", "Node.js", "Wrangler", "Miniflare", "Vitest", "Cloudflare Workers"],
    },
```

with:

```ts
      tools: ["TypeScript", "Node.js", "Wrangler", "Miniflare", "Vitest", "Cloudflare Workers"],
    },
    {
      role: "Export Market Research",
      company: "Family Stainless Steel Manufacturing Business",
      location: "Ahmedabad, India",
      dates: "May 2026 - Aug 2026",
      problem: "Exploring export markets for a family stainless steel manufacturing business.",
      action:
        "Conducted market research and export buyer analysis, identifying target buyers across Germany, UAE, Singapore, and the US using trade data and competitive benchmarking.",
      impact: "Identified target buyers across four export markets: Germany, UAE, Singapore and the US.",
      tools: ["Market research", "Trade data analysis", "Competitive benchmarking"],
    },
```

Finally, add the certificate to `achievements`, directly after the IBM entry. Use the Edit tool to replace

```ts
      description: "Professional Certificate (Coursera)",
      date: "2026",
      category: "certification",
      icon: "📜",
    },
```

with:

```ts
      description: "Professional Certificate (Coursera)",
      date: "2026",
      category: "certification",
      icon: "📜",
    },
    {
      title: "Mathematics for Machine Learning",
      description: "Specialisation, Imperial College London via Coursera",
      date: "2026",
      category: "certification",
      icon: "📐",
    },
```

- [ ] **Step 5: Create `lib/stats.ts` with `impactStats`**

Create `lib/stats.ts` (Task 5 appends `homeStats` to this file):

```ts
import { content } from "./content";

export const impactStats = (): { value: string; label: string }[] =>
  content.impactMetrics.map((metric) => ({
    value: `${metric.value.toLocaleString("en-US")}${metric.suffix ?? ""}`,
    label: metric.label,
  }));
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test 2>&1 | tail -20`
Expected: PASS, every file green (site, work, sitemap, carryover).

Run: `npx tsc --noEmit 2>&1 | tail -15`
Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add tests/carryover.test.ts lib/types.ts lib/content.ts lib/stats.ts
git commit -m "feat: carry over old-site content and add new resume content

Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k"
```

---

### Task 5: Homepage (hero, stats, what I do, featured work, latest writing)

**Files:**
- Modify: `lib/types.ts` (extend `SiteContent`)
- Modify: `lib/content.ts` (add `hero`, `lookingFor`)
- Modify: `lib/stats.ts` (created in Task 4; add `homeStats`)
- Create: `tests/stats.test.ts`
- Create: `components/StatsStrip.tsx`
- Create: `components/WorkCard.tsx`
- Modify (full rewrite): `app/page.tsx`

**Interfaces:**
- Consumes: `featuredByGroup`, `workGroups` from `lib/work.ts`; `SectionHeading`; `ossRepos` from `lib/oss.ts`.
- Produces: `content.hero: { currently: string; headline: string; intro: string }`, `content.lookingFor: string`, `homeStats: { value: string; label: string }[]`, `<WorkCard item: WorkItem />`, `<StatsStrip stats: { value: string; label: string }[] />`.

- [ ] **Step 1: Write the failing stats test**

Create `tests/stats.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { homeStats } from "../lib/stats";
import { ossRepos } from "../lib/oss";
import { content } from "../lib/content";

describe("home stats", () => {
  it("shows four stats", () => {
    expect(homeStats).toHaveLength(4);
  });

  it("pins the verified Cloudflare count", () => {
    expect(homeStats[0]).toMatchObject({ value: "28" });
  });

  it("derives the OSS project count from the data", () => {
    expect(homeStats[1].value).toBe(String(ossRepos.length));
  });

  it("derives the GPA from education data", () => {
    const gpa = content.education.find((e) => e.gpa)?.gpa;
    expect(homeStats[2].value).toBe(gpa);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test 2>&1 | tail -12`
Expected: FAIL, "Cannot find module '../lib/stats'".

- [ ] **Step 3: Extend the `SiteContent` type**

In `lib/types.ts`, inside `export type SiteContent = {`, add these two fields directly after the `recruiterIntro: string;` line:

```ts
  hero: {
    currently: string;
    headline: string;
    intro: string;
  };
  lookingFor: string;
```

- [ ] **Step 4: Add the copy to `lib/content.ts`**

In `lib/content.ts`, directly after the `recruiterIntro: ...,` property (it ends with `...clean, tested, well-documented code.",`), add:

```ts
  hero: {
    currently: "MSc at Imperial Business School · Open to internships and graduate roles",
    headline: "I build and fix the tools developers rely on.",
    intro:
      "I'm Matin Gathani, a software and data engineer. I've had 28 pull requests merged into Cloudflare's developer toolkit, built a student-matching platform for ASU's capstone program, and I'm now studying AI and financial analytics at Imperial in London.",
  },
  lookingFor:
    "I'm looking for internships and graduate roles in software engineering, data and applied AI, where I can ship clean, tested code. Email is the quickest way to reach me.",
```

- [ ] **Step 5: Replace `lib/stats.ts` (keeps `impactStats` from Task 4, adds `homeStats`)**

```ts
import { content } from "./content";
import { ossRepos } from "./oss";

export const impactStats = (): { value: string; label: string }[] =>
  content.impactMetrics.map((metric) => ({
    value: `${metric.value.toLocaleString("en-US")}${metric.suffix ?? ""}`,
    label: metric.label,
  }));

const gpa = content.education.find((entry) => entry.gpa)?.gpa ?? "";

export const homeStats: { value: string; label: string }[] = [
  { value: "28", label: "merged PRs in Cloudflare's workers-sdk" },
  { value: String(ossRepos.length), label: "open-source projects contributed to" },
  { value: gpa, label: "GPA, B.S. Computer Science, ASU" },
  { value: "4×", label: "Dean's List at ASU" },
];
```

- [ ] **Step 6: Create `components/StatsStrip.tsx`**

```tsx
type Stat = { value: string; label: string };

export default function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-6 border-y border-border py-6 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse">
          <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
          <dd className="font-heading text-3xl font-semibold text-primary">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
```

- [ ] **Step 7: Create `components/WorkCard.tsx`**

```tsx
import type { WorkItem } from "../lib/work";

export default function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="card flex h-full flex-col">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold text-primary">{item.name}</h3>
        {item.years && <span className="eyebrow whitespace-nowrap">{item.years}</span>}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">{item.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
        {item.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
      {item.links.length > 0 && (
        <p className="mt-4 flex flex-wrap gap-4 text-sm">
          {item.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="link">
              {link.label} &#8599;
            </a>
          ))}
        </p>
      )}
    </article>
  );
}
```

- [ ] **Step 8: Replace `app/page.tsx`**

```tsx
import Link from "next/link";
import SectionHeading from "../components/SectionHeading";
import StatsStrip from "../components/StatsStrip";
import WorkCard from "../components/WorkCard";
import { content } from "../lib/content";
import { posts } from "../lib/blog";
import { homeStats } from "../lib/stats";
import { featuredByGroup, workGroups } from "../lib/work";

export default function HomePage() {
  const { hero, lookingFor } = content;

  return (
    <div className="mx-auto max-w-content px-6">
      <section className="py-16 md:py-24">
        <p className="eyebrow mb-4">{hero.currently}</p>
        <h1 className="max-w-3xl font-heading text-4xl font-semibold leading-tight text-primary md:text-6xl">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">{hero.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work" className="btn-primary">
            See my work
          </Link>
          <Link href="/resume" className="btn-secondary">
            View resume
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact
          </Link>
        </div>
      </section>

      <StatsStrip stats={homeStats} />

      <section className="pt-14" aria-labelledby="what-i-do">
        <SectionHeading id="what-i-do" eyebrow="What I do" title="Where I work" />
        <div className="grid gap-6 md:grid-cols-3">
          {content.expertise.map((area) => (
            <div key={area.title} className="card">
              <h3 className="font-heading text-lg font-semibold text-primary">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{area.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Topics">
                {area.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {workGroups.map((group) => (
        <section key={group.id} className="pt-14" aria-labelledby={`group-${group.id}`}>
          <SectionHeading id={`group-${group.id}`} eyebrow="Selected work" title={group.label}>
            {group.blurb}
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredByGroup(group.id).map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      ))}

      <p className="mt-10">
        <Link href="/work" className="link text-sm">
          See all work &rarr;
        </Link>
      </p>

      <section className="pt-14" aria-labelledby="latest-writing">
        <SectionHeading id="latest-writing" eyebrow="Writing" title="Latest writing" />
        <ul className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="card block h-full transition-colors hover:border-accent"
              >
                <p className="eyebrow">{post.date}</p>
                <p className="mt-2 font-heading text-lg font-semibold text-primary">{post.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/writing" className="link text-sm">
            All writing &rarr;
          </Link>
        </p>
      </section>

      <section className="mt-16 rounded-xl border border-border bg-accent-soft p-8" aria-labelledby="looking-for">
        <h2 id="looking-for" className="font-heading text-2xl font-semibold text-primary">
          What I&apos;m looking for
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-secondary">{lookingFor}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">
            Get in touch
          </Link>
          <Link href="/resume" className="btn-secondary">
            View resume
          </Link>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 9: Run tests and build**

Run: `npm test 2>&1 | tail -12`
Expected: PASS.

Run: `npm run build 2>&1 | tail -20`
Expected: build succeeds.

- [ ] **Step 10: Visual check of the homepage**

Run: `npx next start -p 3100 > /dev/null 2>&1 & SERVER=$!; sleep 4; curl -s http://localhost:3100/ | grep -oE "(I build and fix the tools developers rely on\.|Where I work|Latest writing|Selected work|What I&#x27;m looking for|Cloudflare developer toolkit|CNN cancer detection pipeline)" | sort | uniq -c; kill $SERVER`
Expected: each phrase appears at least once. Then open `http://localhost:3100` in a browser (run the server again) and confirm: light background, no animation, hero readable at 375px and 1280px, no horizontal scroll.

- [ ] **Step 11: Commit**

```bash
git add lib/types.ts lib/content.ts lib/stats.ts tests/stats.test.ts components/StatsStrip.tsx components/WorkCard.tsx app/page.tsx
git commit -m "feat: new light homepage with hero, stats and featured work

Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k"
```

---

### Task 6: Work page with filter

**Files:**
- Create: `components/WorkGrid.tsx`
- Create: `app/work/page.tsx`

**Interfaces:**
- Consumes: `workItems`, `workGroups`, `WorkGroup` from `lib/work.ts`; `WorkCard`; `SectionHeading`.
- Produces: route `/work`; `<WorkGrid />` (client component, no props).

- [ ] **Step 1: Create `components/WorkGrid.tsx`**

```tsx
"use client";

import { useState } from "react";
import WorkCard from "./WorkCard";
import { workGroups, workItems, type WorkGroup } from "../lib/work";

type Filter = WorkGroup | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...workGroups.map((group) => ({ id: group.id as Filter, label: group.label })),
];

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? workItems : workItems.filter((item) => item.group === filter);

  return (
    <div>
      <div role="group" aria-label="Filter work" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === f.id
                ? "border-accent bg-accent-soft text-accent"
                : "border-border bg-surface text-secondary hover:border-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {visible.length} projects shown
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/work/page.tsx`**

```tsx
import Link from "next/link";
import SectionHeading from "../../components/SectionHeading";
import WorkGrid from "../../components/WorkGrid";

export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeading as="h1" eyebrow="Work" title="Things I've built and fixed">
        Open-source fixes, products and data projects. Filter by type.
      </SectionHeading>
      <WorkGrid />
      <p className="mt-10 text-sm text-secondary">
        Looking for pull-request details?{" "}
        <Link href="/oss" className="link">
          See the open-source page
        </Link>
        .
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Build and verify the server HTML lists every project (JS-off check)**

Run:
```bash
npm run build 2>&1 | tail -15
npx next start -p 3100 > /dev/null 2>&1 &
SERVER=$!
sleep 4
for name in "Cloudflare developer toolkit" "Prisma ORM adapter fixes" "Vercel Blob storage fixes" "Lexical editor fixes" "ASU Capstone sponsor platform" "Kanban task board" "Medical record management system" "REST API data integration" "Innovation Devs hackathon app" "CNN cancer detection pipeline" "NLP pipeline training at Musikaar"; do
  printf "%s: " "$name"; curl -s http://localhost:3100/work | grep -c "$name"
done
kill $SERVER
```
Expected: build succeeds and every project prints a count of at least 1.

- [ ] **Step 4: Commit**

```bash
git add components/WorkGrid.tsx app/work/page.tsx
git commit -m "feat: add /work page with group filter

Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k"
```

---

### Task 7: About and Open-source pages

**Files:**
- Modify (full rewrite): `app/about/page.tsx`
- Modify (full rewrite): `app/oss/page.tsx`

**Interfaces:**
- Consumes: `content` (`summary`, `contact`, `education`, `experience`, `skills`, `achievements`); `ossRepos`, `OssPR`, `OssRepo` from `lib/oss.ts`; `SectionHeading`.
- Produces: routes `/about` and `/oss`, both server components.

- [ ] **Step 1: Replace `app/about/page.tsx`**

```tsx
import Image from "next/image";
import SectionHeading from "../../components/SectionHeading";
import StatsStrip from "../../components/StatsStrip";
import { content } from "../../lib/content";
import { impactStats } from "../../lib/stats";

export const metadata = { title: "About" };

const H2 = "font-heading text-2xl font-semibold text-primary";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeading as="h1" eyebrow="About" title="Hi, I'm Matin.">
        {content.summary}
      </SectionHeading>

      <div className="mb-14">
        <StatsStrip stats={impactStats()} />
      </div>

      <div className="grid gap-12 md:grid-cols-[260px_1fr]">
        <aside className="space-y-4">
          <Image
            src="/matin-gathani.webp"
            alt="Portrait of Matin Gathani"
            width={640}
            height={800}
            className="h-auto w-full rounded-xl border border-border object-cover"
            priority
          />
          <div className="text-sm text-secondary">
            <p className="font-medium text-primary">{content.role}</p>
            <p>{content.contact.location}</p>
          </div>
          <ul className="space-y-1 text-sm">
            <li>
              <a href={`mailto:${content.contact.email}`} className="link">
                {content.contact.email}
              </a>
            </li>
            <li>
              <a href={content.contact.github} target="_blank" rel="noopener noreferrer" className="link">
                GitHub
              </a>
            </li>
            <li>
              <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                LinkedIn
              </a>
            </li>
          </ul>
          <div>
            <p className="eyebrow mb-2">Languages</p>
            <ul className="space-y-1 text-sm text-secondary">
              {content.languages.map((language) => (
                <li key={language.name}>
                  {language.name} <span className="text-muted">({language.level})</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-14">
          <section aria-labelledby="education">
            <h2 id="education" className={H2}>
              Education
            </h2>
            <div className="mt-4 space-y-6">
              {content.education.map((edu) => (
                <div key={edu.school}>
                  <p className="font-medium text-primary">{edu.degree}</p>
                  <p className="text-sm text-secondary">
                    {edu.school}, {edu.location}
                  </p>
                  <p className="eyebrow mt-1">
                    {edu.dates}
                    {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                  </p>
                  {edu.modules && (
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Relevant modules">
                      {edu.modules.map((module) => (
                        <li key={module} className="tag">
                          {module}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="experience">
            <h2 id="experience" className={H2}>
              Experience
            </h2>
            <div className="mt-4 space-y-8">
              {content.experience.map((item) => (
                <div key={`${item.company}-${item.role}`}>
                  <p className="font-medium text-primary">
                    {item.role}, {item.company}
                  </p>
                  <p className="eyebrow mt-1">
                    {item.dates} &middot; {item.location}
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-secondary">
                    <li>{item.action}</li>
                    <li>{item.impact}</li>
                  </ul>
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tools">
                    {item.tools.map((tool) => (
                      <li key={tool} className="tag">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="skills">
            <h2 id="skills" className={H2}>
              Skills
            </h2>
            <div className="mt-4 space-y-3">
              {content.skillLevels.map((group) => (
                <div key={group.level} className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
                  <p className="w-32 shrink-0 text-sm font-medium text-primary">{group.level}</p>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="tag">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {content.skills.map((group) => (
                <div key={group.title} className="card">
                  <h3 className="font-medium text-primary">{group.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="tag">
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-secondary">{group.proof}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="toolkit">
            <h2 id="toolkit" className={H2}>
              Tools I use
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {content.toolkit.map((tool) => (
                <li key={tool} className="tag">
                  {tool}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="highlights">
            <h2 id="highlights" className={H2}>
              Highlights
            </h2>
            <ul className="mt-4 space-y-3">
              {content.achievements.map((item) => (
                <li key={item.title} className="text-sm">
                  <span className="font-medium text-primary">{item.title}</span>
                  <span className="text-secondary"> &mdash; {item.description}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="kind-words">
            <h2 id="kind-words" className={H2}>
              Kind words
            </h2>
            <div className="mt-4 grid gap-6">
              {content.testimonials.map((item) => (
                <figure key={item.quote} className="card">
                  <blockquote className="text-sm leading-relaxed text-secondary">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="eyebrow mt-3">
                    {item.author}, {item.role}
                    {item.company ? `, ${item.company}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace `app/oss/page.tsx`**

```tsx
import SectionHeading from "../../components/SectionHeading";
import { ossRepos, type OssPR, type OssRepo } from "../../lib/oss";

export const metadata = { title: "Open source" };

const STATUS: Record<OssPR["status"], { label: string; className: string }> = {
  merged: { label: "Merged", className: "bg-[#e6f4ec] text-[#1a6b3c]" },
  open: { label: "Open", className: "bg-accent-soft text-accent" },
  closed: { label: "Closed", className: "bg-[#eeeeea] text-[#5a5a54]" },
};

function PullRequest({ pr }: { pr: OssPR }) {
  const status = STATUS[pr.status];
  return (
    <a
      href={pr.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card block transition-colors hover:border-accent"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow">#{pr.number}</span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}>{status.label}</span>
      </div>
      <p className="mt-3 text-sm font-medium leading-snug text-primary">{pr.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-secondary">{pr.description}</p>
      <p className="link mt-3 text-sm">View PR &#8599;</p>
    </a>
  );
}

function Repo({ repo }: { repo: OssRepo }) {
  return (
    <section className="mt-14" aria-labelledby={`repo-${repo.displayName}`}>
      <h2 id={`repo-${repo.displayName}`} className="font-heading text-2xl font-semibold text-primary">
        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          {repo.displayName} &#8599;
        </a>
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-secondary">{repo.description}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {repo.prs.map((pr) => (
          <PullRequest key={pr.number} pr={pr} />
        ))}
      </div>
    </section>
  );
}

export default function OssPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeading as="h1" eyebrow="Open source" title="Pull requests to tools I use">
        Highlights from each project. Each heading links to the full list on GitHub.
      </SectionHeading>
      {ossRepos.map((repo) => (
        <Repo key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Type-check and build**

Run: `npx tsc --noEmit 2>&1 | tail -20`
Expected: no output (no type errors). If `content.skills` or `achievements` fields differ from `lib/types.ts`, fix the page to match the type, do not change the type.

Run: `npm run build 2>&1 | tail -20`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx app/oss/page.tsx
git commit -m "feat: restyle /about and /oss in the light theme

Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k"
```

---

### Task 8: Resume and Contact pages

**Files:**
- Modify: `components/ResumeViewer.tsx` (remove the mobile `<iframe>` branch)
- Modify: `components/ContactForm.tsx` (remove framer-motion, light-theme colours)
- Create: `app/resume/page.tsx`
- Create: `app/contact/page.tsx`
- Replace: `public/resume.pdf`, `public/MatinGathaniResume2026.pdf`

**Interfaces:**
- Consumes: `LazyResume` (`{ fileUrl: string }`) from `components/LazyResume.tsx`; `ContactForm` (no props); `content.contact`; `SectionHeading`.
- Produces: routes `/resume` and `/contact`.

- [ ] **Step 1: Copy the new resume into both public files (kept in sync)**

Run:
```bash
cp /Users/matingathani/Downloads/Matin_Gathani_Resume_imperial.pdf public/resume.pdf
cp /Users/matingathani/Downloads/Matin_Gathani_Resume_imperial.pdf public/MatinGathaniResume2026.pdf
cmp public/resume.pdf public/MatinGathaniResume2026.pdf && echo SYNCED
```
Expected: `SYNCED`.

- [ ] **Step 2: Remove the CSP-blocked mobile iframe from `components/ResumeViewer.tsx`**

Remove this import line:

```tsx
import { useMediaQuery } from "../lib/hooks";
```

Remove this line:

```tsx
  const isMobile = useMediaQuery("(max-width: 768px)");
```

Remove this whole block:

```tsx
  if (isMobile) {
    return (
      <div className="card min-h-[520px]">
        <iframe
          title="Resume PDF"
          src={fileUrl}
          className="h-[520px] w-full rounded-xl border border-border"
        />
      </div>
    );
  }

```

- [ ] **Step 3: Drop framer-motion from `components/ContactForm.tsx`**

Remove the line `import { motion } from "framer-motion";`.

Replace this block:

```tsx
        {status === "success" && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-accent"
          >
            Message sent. I will reply soon.
          </motion.span>
        )}
```

with:

```tsx
        {status === "success" && (
          <span role="status" className="text-sm text-accent">
            Message sent. I will reply soon.
          </span>
        )}
```

Replace `text-red-300` with `text-red-700` (one occurrence, on the error `<p>`).

- [ ] **Step 4: Create `app/resume/page.tsx`**

```tsx
import LazyResume from "../../components/LazyResume";
import SectionHeading from "../../components/SectionHeading";

export const metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading as="h1" eyebrow="Resume" title="Resume">
        One page, updated October 2026.
      </SectionHeading>
      <div className="mb-6 flex flex-wrap gap-3">
        <a href="/resume.pdf" download className="btn-primary">
          Download PDF
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
          Open in new tab
        </a>
      </div>
      <LazyResume fileUrl="/resume.pdf" />
    </div>
  );
}
```

- [ ] **Step 5: Create `app/contact/page.tsx`**

```tsx
import ContactForm from "../../components/ContactForm";
import SectionHeading from "../../components/SectionHeading";
import { content } from "../../lib/content";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeading as="h1" eyebrow="Contact" title="Let's talk">
        The quickest way to reach me is email. I usually reply within a couple of days.
      </SectionHeading>

      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div>
            <p className="eyebrow mb-1">Email</p>
            <a href={`mailto:${content.contact.email}`} className="link text-lg">
              {content.contact.email}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-1">Elsewhere</p>
            <ul className="space-y-1 text-sm">
              <li>
                <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={content.contact.github} target="_blank" rel="noopener noreferrer" className="link">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-1">Based in</p>
            <p className="text-sm text-secondary">{content.contact.location}</p>
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4 font-heading text-xl font-semibold text-primary">Send a message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Build and run the pages**

Run: `npx tsc --noEmit 2>&1 | tail -15`
Expected: no output.

Run: `npm run build 2>&1 | tail -20`
Expected: build succeeds; route table lists `/resume` and `/contact`.

- [ ] **Step 7: Check the contact failure path (SMTP unset)**

```bash
npx next start -p 3100 > /dev/null 2>&1 &
SERVER=$!
sleep 4
curl -s -o /dev/null -w "contact page: %{http_code}\n" http://localhost:3100/contact
curl -s -o /dev/null -w "resume page: %{http_code}\n" http://localhost:3100/resume
curl -s -X POST http://localhost:3100/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"test@example.com","message":"This is a test message."}' -w "\nstatus: %{http_code}\n"
curl -s http://localhost:3100/contact | grep -c "mailto:mg3246@imperial.ac.uk"
kill $SERVER
```
Expected: `200`, `200`, then `{"message":"Email configuration missing."}` with `status: 500`, and a `mailto:` count of at least 1. The form maps that 500 message to "Email delivery is being configured. Please use the direct email link." (existing logic in `ContactForm.tsx`), and the email link is on the same page.

- [ ] **Step 8: Visual check of the resume at phone width**

Start the server again (`npx next start -p 3100`), open `http://localhost:3100/resume` at 375px width (browser devtools device mode). Expected: the PDF renders as an image (no blank iframe), the two buttons are visible, no horizontal scroll. Stop the server.

- [ ] **Step 9: Commit**

```bash
git add public/resume.pdf public/MatinGathaniResume2026.pdf components/ResumeViewer.tsx components/ContactForm.tsx app/resume/page.tsx app/contact/page.tsx
git commit -m "feat: add /resume and /contact pages, update resume PDF

Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k"
```

---

### Task 9: Content facts, 404 page and social images

**Files:**
- Modify: `lib/content.ts` (summary, education, "5th" claims)
- Create: `tests/content.test.ts`
- Modify (full rewrite): `app/not-found.tsx`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`

**Interfaces:**
- Consumes: `content` from `lib/content.ts`.
- Produces: corrected facts everywhere the site reads `content`; light-theme 404 and OG/Twitter images.

- [ ] **Step 1: Write the failing content test**

Create `tests/content.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { content } from "../lib/content";

const everything = JSON.stringify(content);

describe("content facts (resume is the source of truth)", () => {
  it("uses the resume programme wording and dates", () => {
    const imperial = content.education[0];
    expect(imperial.school).toBe("Imperial Business School");
    expect(imperial.degree).toBe("MSc Artificial Intelligence (Financial Analytics)");
    expect(imperial.dates).toBe("Sep 2026 - Jan 2028");
  });

  it("no longer mentions the old programme name", () => {
    expect(everything).not.toContain("Business Analytics and AI");
  });

  it("drops the unconfirmed capstone denominator", () => {
    expect(everything).not.toMatch(/30\+ teams|of 150|500\+/);
  });

  it("keeps the verified Cloudflare count and the resume email", () => {
    expect(content.summary).toContain("28 pull requests");
    expect(content.contact.email).toBe("mg3246@imperial.ac.uk");
  });

  it("has no CNN AUC claim", () => {
    expect(everything).not.toMatch(/91%|AUC/);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test 2>&1 | tail -20`
Expected: FAIL on programme wording, "Business Analytics and AI" and "30+ teams".

- [ ] **Step 3: Fix the capstone wording and programme text in `lib/content.ts`**

Run this exact script from `~/Portfolio`:

```bash
python3 -I - <<'EOF'
from pathlib import Path
p = Path("lib/content.ts")
s = p.read_text()
s = s.replace("5th of 30+ teams at ASU's Capstone Showcase", "5th at ASU's Capstone Showcase")
s = s.replace("5th of 30+ teams", "5th place")
s = s.replace("MSc Business Analytics and AI", "MSc Artificial Intelligence (Financial Analytics)")
s = s.replace("Imperial College Business School", "Imperial Business School")
s = s.replace("Sep 2026 - Aug 2027", "Sep 2026 - Jan 2028")
p.write_text(s)
EOF
grep -nE "30\+ teams|Business Analytics and AI|Aug 2027|Imperial College Business" lib/content.ts
```
Expected: the `grep` still prints lines for the prose sentences that mention the old programme (`summary`, `recruiterIntro`, and a couple of achievement descriptions). Fix those next.

- [ ] **Step 4: Rewrite the `summary` and `recruiterIntro` strings**

In `lib/content.ts`, replace the whole `summary:` string with:

```ts
  summary:
    "Software and data engineer. I've had 28 pull requests merged into Cloudflare's developer toolkit, built a student-matching platform for ASU's capstone program, and engineered NLP pipelines that move data reliably end to end. Studying MSc Artificial Intelligence (Financial Analytics) at Imperial Business School.",
```

and the whole `recruiterIntro:` string with:

```ts
  recruiterIntro:
    "Hi, I'm Matin Gathani. I build across the stack and the data pipeline: 28 merged pull requests to Cloudflare's open-source toolkit (Wrangler, Miniflare, Vite plugin), full-stack platform delivery, and production ML and NLP work. I'm studying MSc Artificial Intelligence (Financial Analytics) at Imperial Business School and looking for software, data and analytics roles.",
```

Then re-run: `grep -nE "30\+ teams|Business Analytics and AI|Aug 2027|Imperial College Business|500\+|of 150|91%|AUC" lib/content.ts`
Expected: no output. If a line remains (for example an achievement description such as "MSc Business Analytics and AI, 2026 intake"), edit that string by hand to `MSc Artificial Intelligence (Financial Analytics), Imperial Business School`.

- [ ] **Step 5: Run the tests**

Run: `npm test 2>&1 | tail -15`
Expected: PASS for all test files.

- [ ] **Step 6: Replace `app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-content flex-col items-start justify-center px-6 py-24">
      <p className="eyebrow mb-3">404</p>
      <h1 className="font-heading text-4xl font-semibold text-primary md:text-5xl">This page isn&apos;t here.</h1>
      <p className="mt-4 max-w-md leading-relaxed text-secondary">
        It may have moved. Try the work page or head back home.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/work" className="btn-secondary">
          See my work
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Replace `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Matin Gathani | Data, AI & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fafaf7",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          borderLeft: "16px solid #1f4fd8",
        }}
      >
        <div style={{ color: "#1f4fd8", fontSize: 28, marginBottom: 16 }}>matingathani.me</div>
        <div style={{ color: "#1a1a1a", fontSize: 72, fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Matin Gathani
        </div>
        <div style={{ color: "#4a4a45", fontSize: 32 }}>Data, AI &amp; Software Engineer</div>
        <div style={{ color: "#6b6b64", fontSize: 22, marginTop: 40 }}>
          CS @ ASU · MSc Artificial Intelligence @ Imperial
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 8: Replace `app/twitter-image.tsx`**

Same file as Step 7 with exactly one change: the component name is `TwitterImage` instead of `OGImage`. (Next.js needs the `runtime`, `alt`, `size` and `contentType` exports written out in each file, so the file is duplicated on purpose, matching the existing pattern.)

- [ ] **Step 9: Build and check the images render**

```bash
npm run build 2>&1 | tail -15
npx next start -p 3100 > /dev/null 2>&1 &
SERVER=$!
sleep 4
curl -s -o /dev/null -w "og: %{http_code} %{content_type}\n" http://localhost:3100/opengraph-image
curl -s -o /dev/null -w "twitter: %{http_code} %{content_type}\n" http://localhost:3100/twitter-image
curl -s -o /dev/null -w "404 page: %{http_code}\n" http://localhost:3100/does-not-exist
kill $SERVER
```
Expected: both images `200 image/png`; the 404 URL returns `404`.

- [ ] **Step 10: Commit**

```bash
git add lib/content.ts tests/content.test.ts app/not-found.tsx app/opengraph-image.tsx app/twitter-image.tsx
git commit -m "feat: sync facts with new resume, light 404 and social images

Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k"
```

---

### Task 10: Delete the old design and unused packages

**Files:**
- Delete: `components/story/` (whole directory) and the unused components listed in Step 1
- Delete: `lib/utils.ts`
- Modify: `package.json` / `package-lock.json` (remove packages)

**Interfaces:**
- Consumes: nothing new. After this task no file imports `three`, `@react-three/*` or `framer-motion`.

- [ ] **Step 1: Delete the unused files**

Run from `~/Portfolio`:

```bash
git rm -r components/story
git rm components/AchievementBadge.tsx components/AnimatedText.tsx components/BackgroundLayers.tsx \
  components/ColorShiftText.tsx components/CopyButton.tsx components/CursorGlow.tsx \
  components/DataNetworkBackground.tsx components/ExperienceCard.tsx components/FlowingCodeBackground.tsx \
  components/Footer.tsx components/GitContribSnapshot.tsx components/GitHubActivity.tsx \
  components/Hero3D.tsx components/Hero3DScene.tsx components/ImmersiveCanvas.tsx \
  components/ImpactBars.tsx components/KeyboardShortcuts.tsx components/LazyContactForm.tsx \
  components/MetricCounter.tsx components/Navbar.tsx components/NeuralNetwork3D.tsx \
  components/NeuralUniverse.tsx components/NoiseOverlay.tsx components/PageTransition.tsx \
  components/ProjectCard.tsx components/ProjectFilter.tsx components/ProjectsSection.tsx \
  components/RecentAiTrainingCard.tsx components/ScrollProgress.tsx components/ScrollReset.tsx \
  components/ScrollReveal.tsx components/ScrollToTop.tsx components/SectionHeader.tsx \
  components/Signal3D.tsx components/SkillGroupCard.tsx components/SkillLogo.tsx \
  components/SkillProficiencyBar.tsx components/Stagger.tsx components/TestimonialCard.tsx \
  components/Tooltip.tsx components/Typewriter.tsx lib/utils.ts
ls components
```
Expected: `ls components` shows only `AccessibilitySkipLink.tsx`, `ContactForm.tsx`, `LazyResume.tsx`, `ResumeViewer.tsx`, `SectionHeading.tsx`, `SiteFooter.tsx`, `SiteHeader.tsx`, `StatsStrip.tsx`, `WorkCard.tsx`, `WorkGrid.tsx`.

- [ ] **Step 2: Confirm nothing still imports the heavy packages**

Run: `grep -rnE "framer-motion|from \"three\"|@react-three|@types/three" app components lib tests || echo CLEAN`
Expected: `CLEAN`. If any file shows up, replace that usage with static markup before continuing.

- [ ] **Step 3: Remove the packages**

Run: `npm uninstall three @react-three/fiber @react-three/drei @types/three framer-motion`
Expected: all five removed from `package.json`.

- [ ] **Step 4: Type-check, lint, test and build**

Run:
```bash
npx tsc --noEmit 2>&1 | tail -15
npx next lint 2>&1 | tail -25
npm test 2>&1 | tail -15
npm run build 2>&1 | tail -30
```
Expected: no type errors; lint reports no errors (fix any `react/no-unescaped-entities` by using `&apos;`); all tests pass; build succeeds and the route table shows `/`, `/work`, `/writing`, `/writing/[slug]`, `/about`, `/resume`, `/contact`, `/oss` plus the API routes and image routes.

- [ ] **Step 5: Check the bundle got lighter**

Run: `npm run build 2>&1 | grep -E "First Load JS|^\s*[┌├└] ○ /( |$)" | head -5`
Expected: the `/` route's First Load JS is well below the pre-redesign figure from Task 0 Step 6 (the three.js bundle is gone). Note both numbers in the commit message body.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove old dark design, 3D scenes and unused packages

Claude-Session: https://claude.ai/code/session_01QUqXuwUfbwrbF1cqsXMU7k"
```

---

### Task 11: Final verification and hand-off

**Files:**
- None created. Verification only.

**Interfaces:**
- Consumes: the production build from Task 10.

- [ ] **Step 1: Check every route**

```bash
npm run build 2>&1 | tail -5
npx next start -p 3100 > /dev/null 2>&1 &
SERVER=$!
sleep 4
for route in / /work /writing /writing/reliable-nlp-pipelines /about /resume /contact /oss /sitemap.xml /robots.txt /resume.pdf; do
  printf "%-40s " "$path"; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100$path
done
printf "%-40s " "/blog (expect 308)"; curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" http://localhost:3100/blog
printf "%-40s " "/missing (expect 404)"; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/missing
echo "--- dark colours left in served pages?"
for route in / /work /about /contact; do curl -s http://localhost:3100$path | grep -c "050810"; done
kill $SERVER
```
Expected: every listed route `200`, `/blog` `308 -> .../writing`, `/missing` `404`, and `0` dark-colour matches for each page.

- [ ] **Step 2: Lighthouse on mobile for the two key pages**

Run:
```bash
npx next start -p 3100 > /dev/null 2>&1 &
SERVER=$!
sleep 4
for route in / /work; do
  npx --yes lighthouse@12.2.1 "http://localhost:3100$path" --only-categories=performance,accessibility \
    --quiet --chrome-flags="--headless" --output=json --output-path=stdout 2>/dev/null \
    | python3 -I -c "import json,sys; d=json.load(sys.stdin); print('$path', {k: round(v['score']*100) for k,v in d['categories'].items()})"
done
kill $SERVER
```
Expected: Performance at least 90 and Accessibility at least 95 for both. If Lighthouse cannot launch Chrome, run the same audit from Chrome DevTools (Lighthouse tab, Mobile) against `http://localhost:3100` and report the scores. Fix any accessibility failure (usually contrast or a missing label) in the component that owns it, then re-run Steps 1-2.

- [ ] **Step 3: Manual check at 375px and 1280px**

With the server running, open each page (`/`, `/work`, `/writing`, `/about`, `/resume`, `/contact`, `/oss`) at 375px and 1280px. Expected: light theme everywhere, no horizontal scroll, the mobile menu opens and closes and navigates, Tab key reaches every link and button with a visible focus ring, and nothing animates.

- [ ] **Step 4: Report and ask before pushing**

Show the user: the route results, Lighthouse scores, the before/after First Load JS, and the list of items to double-check by hand (OSS counts on `/oss` were removed on purpose; Musikaar item is kept from the old site but is not on the new resume; `/api/github-contributions` is now unused and was left in place).

Ask: "Branch `redesign/light-site` is ready. May I push it so Vercel builds a preview URL for you to review? Nothing goes live until you approve a merge to `main`."

- [ ] **Step 5: After approval only, push the branch**

```bash
git push -u origin redesign/light-site
```
Expected: branch pushed; Vercel posts a preview deployment. Share the preview URL. Merging to `main` (which deploys to production) waits for a separate explicit go-ahead from the user.
