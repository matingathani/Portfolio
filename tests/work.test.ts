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
