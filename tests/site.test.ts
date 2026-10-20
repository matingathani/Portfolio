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
