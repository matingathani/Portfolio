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
