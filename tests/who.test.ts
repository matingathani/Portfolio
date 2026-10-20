import { describe, it, expect } from "vitest";
import { content } from "../lib/content";
import { homeStats } from "../lib/stats";

const text = JSON.stringify({
  why: content.why,
  highlights: content.highlights,
  aboutIntro: content.aboutIntro,
  outsideCode: content.outsideCode,
});

describe("who-am-I copy", () => {
  it("has a 'why I build' statement of sensible length", () => {
    expect(content.why.length).toBeGreaterThan(120);
    expect(content.why.length).toBeLessThan(600);
  });

  it("has three highlights grounded in verified facts", () => {
    expect(content.highlights).toHaveLength(3);
    const all = content.highlights.map((h) => `${h.title} ${h.detail}`).join(" ");
    expect(all).toContain("28 merged");
    expect(all).toContain("180+");
    expect(all).toContain("5th");
  });

  it("opens the About page in the first person with the Imperial programme", () => {
    expect(content.aboutIntro.length).toBeGreaterThanOrEqual(3);
    expect(content.aboutIntro[0]).toMatch(/^I'm Matin/);
    expect(content.aboutIntro.join(" ")).toContain("Imperial Business School");
  });

  it("does not reuse the reference site's wording or projects", () => {
    expect(text).not.toMatch(/2am|Datadog|humbling|more than once|Alita|Vinext|LogWell|Clickfolio/i);
  });

  it("makes no unverified claims", () => {
    expect(text).not.toMatch(/91%|AUC|500\+|of 150|30\+ teams/);
  });

  it("leaves outside-of-code empty until the user supplies it", () => {
    expect(content.outsideCode).toBeUndefined();
  });

  it("uses short mono-friendly stat labels with the verified values", () => {
    expect(homeStats.map((s) => s.value)).toEqual(["28", "5", "3.74", "4×"]);
    for (const stat of homeStats) expect(stat.label.length).toBeLessThanOrEqual(28);
  });
});
