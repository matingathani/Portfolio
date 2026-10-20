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
