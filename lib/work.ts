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
