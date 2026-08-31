export type OssPR = {
  number: number;
  title: string;
  description: string;
  status: "open" | "merged" | "closed";
  url: string;
};

export type OssRepo = {
  name: string;
  displayName: string;
  description: string;
  url: string;
  prs: OssPR[];
};

export const ossRepos: OssRepo[] = [
  {
    name: "cloudflare/workers-sdk",
    displayName: "Cloudflare",
    description:
      "Cloudflare's open-source developer toolkit — Wrangler CLI, Miniflare, Vite plugin. 28 merged fixes; selected highlights below.",
    url: "https://github.com/cloudflare/workers-sdk/pulls?q=is%3Apr+author%3Amatingathani",
    prs: [
      {
        number: 14134,
        title: "Prevent SQLITE_TOOBIG crash when a Workflows step returns a large Uint8Array",
        description: "Traced a Cloudflare Workflows crash on large step outputs to a SQLite row-size limit and chunked the write so long-running workflows no longer fail.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/14134",
      },
      {
        number: 14059,
        title: "Remove \"Success!\" from stdout in `kv bulk get`",
        description: "A status line was being written to stdout, corrupting the JSON output that automation scripts piped downstream.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/14059",
      },
      {
        number: 14041,
        title: "Fix `wrangler complete` printing AI skills prompt into shell completion output",
        description: "Shell autocomplete was polluted with an unrelated prompt string, breaking tab completion in zsh and bash.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/14041",
      },
      {
        number: 14027,
        title: "Gracefully handle EMFILE when the assets watcher exceeds the directory limit",
        description: "Large asset directories crashed `wrangler dev` with an unhandled EMFILE; now falls back to polling with a clear warning.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/14027",
      },
      {
        number: 14026,
        title: "Show login URL when the browser cannot be opened in headless/container environments",
        description: "OAuth login silently hung in Docker and CI; now prints the URL so the user can complete auth manually.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/14026",
      },
      {
        number: 14316,
        title: "Don't crash `wrangler dev` when source-mapping a truncated error chunk",
        description: "A partial stack chunk threw inside the source-map lookup; now handled so the original error surfaces instead.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/14316",
      },
      {
        number: 14568,
        title: "Fix Windows CI flakes: local-explorer ECONNRESET retry, hyperdrive e2e EPIPE",
        description: "Two long-standing Windows-only test flakes fixed with a connection retry and EPIPE tolerance.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/14568",
      },
      {
        number: 14218,
        title: "Allow Node.js built-ins in resolve.external for Worker environments (Vite plugin)",
        description: "The Vite plugin rejected valid `node:` externals, breaking builds that depend on nodejs_compat.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/14218",
      },
      {
        number: 13763,
        title: "Show a clear error for DO migrations on service-worker format Workers",
        description: "Durable Object migrations failed with an opaque message on the service-worker format; now explains the module-format requirement.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/13763",
      },
      {
        number: 13777,
        title: "Throw a clear error when _routes.json contains invalid JSON",
        description: "A malformed _routes.json produced a stack trace instead of pointing at the file and parse position.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/13777",
      },
      {
        number: 13834,
        title: "Make hotkeys work with Caps Lock enabled",
        description: "`wrangler dev` hotkeys compared raw key case, so nothing responded while Caps Lock was on.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/13834",
      },
      {
        number: 13750,
        title: "Auto-delete Wrangler logs older than 7 days and add WRANGLER_LOG_DISK opt-out",
        description: "Wrangler's log directory grew unbounded; added retention with an env-var escape hatch.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/13750",
      },
      {
        number: 14409,
        title: "vitest-pool-workers: reset() now clears ratelimit binding state between tests",
        description: "Rate-limit binding state leaked across tests, causing order-dependent failures.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/14409",
      },
      {
        number: 13838,
        title: "Handle a deleted entry point during hot-reload without an unhandled rejection",
        description: "Removing the entry file mid-session crashed the dev server instead of waiting for it to reappear.",
        status: "merged",
        url: "https://github.com/cloudflare/workers-sdk/pull/13838",
      },
      {
        number: 14330,
        title: "Preserve multiple Set-Cookie headers on WebSocket 101 upgrade responses (Miniflare)",
        description: "Miniflare collapsed repeated Set-Cookie headers on upgrade responses, dropping all but the last cookie.",
        status: "open",
        url: "https://github.com/cloudflare/workers-sdk/pull/14330",
      },
      {
        number: 14598,
        title: "Report a non-zero exit code when Wrangler is killed by a signal (e.g. OOM)",
        description: "Wrangler exited 0 after an OOM kill, so CI pipelines treated crashed builds as successful.",
        status: "open",
        url: "https://github.com/cloudflare/workers-sdk/pull/14598",
      },
    ],
  },
  {
    name: "prisma/orm",
    displayName: "Prisma",
    description: "Next-gen Node.js and TypeScript ORM (formerly prisma/prisma)",
    url: "https://github.com/prisma/orm",
    prs: [
      {
        number: 29426,
        title: "Serialize unknown driver adapter error cause as JSON",
        description: "Replaced a bare template literal with safeJsonStringify so unknown cause.kind no longer renders as [object Object] in production errors.",
        status: "merged",
        url: "https://github.com/prisma/orm/pull/29426",
      },
      {
        number: 29468,
        title: "Serialize concurrent pg transaction queries",
        description: "Added a mutex to adapter-pg so concurrent queries within a transaction are serialized correctly instead of racing.",
        status: "open",
        url: "https://github.com/prisma/orm/pull/29468",
      },
      {
        number: 29469,
        title: "Add TIMETZ_ARRAY (OID 1270) type mapping to adapter-pg",
        description: "TIMETZ_ARRAY was missing from the OID type map, causing unhandled type errors on arrays of time-with-timezone columns.",
        status: "open",
        url: "https://github.com/prisma/orm/pull/29469",
      },
      {
        number: 29470,
        title: "Handle MariaDB SET column type in adapter-mariadb",
        description: "mapColumnType and mapRow now correctly handle SET columns instead of throwing on an unrecognized type.",
        status: "open",
        url: "https://github.com/prisma/orm/pull/29470",
      },
      {
        number: 29472,
        title: "Restore meta.target on P2002/P2011 errors in the JS driver-adapter path",
        description: "Unique and null constraint errors lost meta.target when routed through JS adapters; now populated correctly from the error context.",
        status: "open",
        url: "https://github.com/prisma/orm/pull/29472",
      },
      {
        number: 29481,
        title: "Fix TIMESTAMPTZ reads/writes on non-UTC servers in adapter-pg",
        description: "Timestamps were shifted by the server timezone offset; now always converted to/from UTC regardless of server locale.",
        status: "open",
        url: "https://github.com/prisma/orm/pull/29481",
      },
      {
        number: 29482,
        title: "Enforce UTC timezone unconditionally in adapter-mariadb",
        description: "The MariaDB adapter respected the server timezone, causing silent datetime drift on non-UTC database hosts.",
        status: "open",
        url: "https://github.com/prisma/orm/pull/29482",
      },
      {
        number: 29484,
        title: "Fix P2011 NullConstraintViolation column extraction in adapter-pg",
        description: "Was using a fragile regex to extract the column name; now reads error.column directly from the pg error object.",
        status: "open",
        url: "https://github.com/prisma/orm/pull/29484",
      },
      {
        number: 29491,
        title: "Fix socket errors bypassing isDriverError in adapter-mssql",
        description: "MSSQL socket errors were thrown raw instead of being wrapped as a typed MappedError, breaking error-handling consumers.",
        status: "open",
        url: "https://github.com/prisma/orm/pull/29491",
      },
    ],
  },
  {
    name: "vercel/storage",
    displayName: "Vercel Storage",
    description: "Vercel Blob and Edge Config SDKs",
    url: "https://github.com/vercel/storage/pulls?q=is%3Apr+author%3Amatingathani",
    prs: [
      {
        number: 1037,
        title: "Resolve multipart deadlock on empty streams, fix TransformStream backpressure",
        description: "resolve() was never called when a stream produced no parts, permanently blocking the upload promise with no error or timeout.",
        status: "merged",
        url: "https://github.com/vercel/storage/pull/1037",
      },
      {
        number: 1036,
        title: "Enforce maximumSizeInBytes client-side for multipart uploads",
        description: "Oversized multipart uploads were only rejected server-side after transfer; now checked before the first part is sent.",
        status: "merged",
        url: "https://github.com/vercel/storage/pull/1036",
      },
      {
        number: 1041,
        title: "Normalize contentDisposition to the original filename when addRandomSuffix is enabled",
        description: "The download filename kept the random suffix; now preserves the caller's original filename in the Content-Disposition header.",
        status: "open",
        url: "https://github.com/vercel/storage/pull/1041",
      },
      {
        number: 1042,
        title: "Include HTTP status in the error when client token retrieval fails",
        description: "Token-retrieval failures surfaced a generic message with no status code, making them hard to diagnose.",
        status: "open",
        url: "https://github.com/vercel/storage/pull/1042",
      },
      {
        number: 1043,
        title: "Respect server pathname in handleUpload",
        description: "handleUpload ignored a server-provided pathname, so uploads landed at the client-supplied path instead.",
        status: "open",
        url: "https://github.com/vercel/storage/pull/1043",
      },
      {
        number: 1044,
        title: "Infer callback URL from Node request headers",
        description: "The upload callback URL had to be passed explicitly; now inferred from x-forwarded headers when omitted.",
        status: "open",
        url: "https://github.com/vercel/storage/pull/1044",
      },
    ],
  },
  {
    name: "facebook/lexical",
    displayName: "Lexical",
    description: "Extensible text editor framework by Meta",
    url: "https://github.com/facebook/lexical",
    prs: [
      {
        number: 8433,
        title: "Prevent false onChange event on initial autofocus with code highlighting",
        description: "hasSeenFirstChangeRef was not initialized before HistoryPlugin mounted, causing a spurious onChange on every autofocus.",
        status: "closed",
        url: "https://github.com/facebook/lexical/pull/8433",
      },
      {
        number: 8438,
        title: "Preserve pasted paragraph alignment when merging into the destination block",
        description: "Pasting rich text lost block-level alignment; fixed by reading the source node's format before insertion.",
        status: "closed",
        url: "https://github.com/facebook/lexical/pull/8438",
      },
      {
        number: 8452,
        title: "Prevent crash converting a HeadingNode selection to a code block",
        description: "formatCode() called $findParagraphParent, which only handles ParagraphNode, throwing when the selection was inside a HeadingNode.",
        status: "closed",
        url: "https://github.com/facebook/lexical/pull/8452",
      },
    ],
  },
  {
    name: "stripe/stripe-js",
    displayName: "Stripe.js",
    description: "Stripe's browser-side JavaScript library",
    url: "https://github.com/stripe/stripe-js",
    prs: [
      {
        number: 910,
        title: "Narrow update() type, document the Apple Pay WebKit bug, add SECURITY.md",
        description: "StripePaymentElementUpdateOptions used a broad type allowing invalid options; narrowed to Pick to block illegal update() calls at compile time.",
        status: "closed",
        url: "https://github.com/stripe/stripe-js/pull/910",
      },
    ],
  },
];
