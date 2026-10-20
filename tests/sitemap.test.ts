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
