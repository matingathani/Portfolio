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
    expect((content.achievements ?? []).map((a) => a.title)).toContain("Mathematics for Machine Learning");
  });
});
