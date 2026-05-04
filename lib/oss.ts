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
    name: "prisma/prisma",
    displayName: "Prisma",
    description: "Next-gen Node.js and TypeScript ORM",
    url: "https://github.com/prisma/prisma",
    prs: [
      {
        number: 29426,
        title: "Serialize unknown driver adapter error cause as JSON",
        description: "Replaced bare template literal with safeJsonStringify so unknown cause.kind no longer renders as [object Object] in production errors.",
        status: "merged",
        url: "https://github.com/prisma/prisma/pull/29426",
      },
      {
        number: 29468,
        title: "Serialize concurrent pg transaction queries",
        description: "Added mutex to adapter-pg so concurrent queries within a transaction are serialized correctly instead of racing.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29468",
      },
      {
        number: 29469,
        title: "Add TIMETZ_ARRAY (OID 1270) type mapping to adapter-pg",
        description: "TIMETZ_ARRAY was missing from the OID type map, causing unhandled type errors on arrays of time-with-timezone columns.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29469",
      },
      {
        number: 29470,
        title: "Handle MariaDB SET column type in adapter-mariadb",
        description: "mapColumnType and mapRow now correctly handle SET columns instead of throwing on unrecognized type.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29470",
      },
      {
        number: 29471,
        title: "Fix JSON Decimal serialization regression (Prisma 7.4.0)",
        description: "Decimal values were being double-serialized as strings; fixed the regression introduced in 7.4.0.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29471",
      },
      {
        number: 29472,
        title: "Restore meta.target on P2002/P2011 errors in JS driver-adapter path",
        description: "Unique and null constraint errors lost meta.target when routed through JS adapters; now populated correctly from the error context.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29472",
      },
      {
        number: 29481,
        title: "Fix TIMESTAMPTZ reads/writes on non-UTC servers in adapter-pg",
        description: "Timestamps were shifted by the server timezone offset; now always converted to/from UTC regardless of server locale.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29481",
      },
      {
        number: 29482,
        title: "Enforce UTC timezone unconditionally in adapter-mariadb",
        description: "MariaDB adapter respected the server timezone, causing silent datetime drift on non-UTC database hosts.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29482",
      },
      {
        number: 29484,
        title: "Fix P2011 NullConstraintViolation column extraction in adapter-pg",
        description: "Was using a fragile regex to extract column name; now reads error.column directly from the pg error object.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29484",
      },
      {
        number: 29486,
        title: "Fix TIMESTAMPTZ conversion and TIMETZ_ARRAY mapping in adapter-neon",
        description: "Port of the pg-adapter timezone fix and OID 1270 mapping to the Neon serverless adapter.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29486",
      },
      {
        number: 29489,
        title: "Fix TLS/socket errors, NullConstraintViolation, and ColumnNotFound in adapter-neon",
        description: "TLS and socket errors bypassed isDriverError and were thrown raw; now consistently wrapped as typed MappedError.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29489",
      },
      {
        number: 29490,
        title: "Fix socket errors slipping through isDriverError in adapter-libsql",
        description: "Network errors were misclassified as SQLite extendedCode=1 instead of being surfaced with the correct error type.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29490",
      },
      {
        number: 29491,
        title: "Fix socket errors bypassing isDriverError in adapter-mssql",
        description: "MSSQL socket errors were thrown raw instead of being wrapped as typed MappedError, breaking error handling consumers.",
        status: "open",
        url: "https://github.com/prisma/prisma/pull/29491",
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
        title: "Fix onChange firing on autofocus in HistoryPlugin",
        description: "hasSeenFirstChangeRef was not initialized before HistoryPlugin mounted, causing spurious onChange on every autofocus.",
        status: "open",
        url: "https://github.com/facebook/lexical/pull/8433",
      },
      {
        number: 8435,
        title: "Fix block equation markdown parsing",
        description: "Block equation nodes were not recognized by the markdown parser when preceded by certain block types.",
        status: "open",
        url: "https://github.com/facebook/lexical/pull/8435",
      },
      {
        number: 8438,
        title: "Preserve text alignment on paste",
        description: "Pasting rich text lost block-level alignment; now preserved by reading the source node's format before insertion.",
        status: "open",
        url: "https://github.com/facebook/lexical/pull/8438",
      },
      {
        number: 8440,
        title: "Fix nested table paste corrupting document structure",
        description: "Pasting nested tables caused the outer table to merge cells incorrectly; fixed by isolating paste targets per table level.",
        status: "open",
        url: "https://github.com/facebook/lexical/pull/8440",
      },
      {
        number: 8452,
        title: "Fix heading→code format crash in formatCode()",
        description: "formatCode() called $findParagraphParent which only handles ParagraphNode, throwing when the selection was inside a HeadingNode.",
        status: "open",
        url: "https://github.com/facebook/lexical/pull/8452",
      },
    ],
  },
  {
    name: "vercel/storage",
    displayName: "Vercel Storage",
    description: "Vercel Blob and Edge Config SDKs",
    url: "https://github.com/vercel/storage",
    prs: [
      {
        number: 1036,
        title: "Fix multipart upload deadlock on empty/boundary ReadableStream",
        description: "resolve() was never called when a stream produced no parts, permanently blocking the upload promise with no error or timeout.",
        status: "open",
        url: "https://github.com/vercel/storage/pull/1036",
      },
      {
        number: 1037,
        title: "Add unit tests for createChunkTransformStream + fix queueMicrotask backpressure",
        description: "Tests cover chunk accumulation, progress callbacks, and trailing-byte flush; removed queueMicrotask wrappers that broke stream backpressure.",
        status: "open",
        url: "https://github.com/vercel/storage/pull/1037",
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
        title: "Fix TypeScript types for Payment Element update()",
        description: "StripePaymentElementUpdateOptions used a broad type allowing invalid options; narrowed to Pick to block illegal update() calls at compile time.",
        status: "open",
        url: "https://github.com/stripe/stripe-js/pull/910",
      },
    ],
  },
];
