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

  it("describes the hobbies the user supplied, and nothing else", () => {
    const outside = content.outsideCode ?? "";
    expect(outside).toMatch(/music/i);
    expect(outside).toMatch(/DJ/);
    expect(outside).toMatch(/history/i);
    expect(outside).toMatch(/finance books|finance and/i);
    expect(outside).toContain("Finance Club");
    expect(outside).toContain("Pickleball Club");
    expect(outside).toMatch(/gym every day/i);
    expect(outside.length).toBeLessThan(420);
  });

  it("uses short mono-friendly stat labels with the verified values", () => {
    expect(homeStats.map((s) => s.value)).toEqual(["28", "5", "3.74", "4×"]);
    for (const stat of homeStats) expect(stat.label.length).toBeLessThanOrEqual(28);
  });
});

describe("what I'm looking for", () => {
  it("says graduate programmes, analyst roles and banking", () => {
    expect(content.lookingFor).toMatch(/graduate programmes/i);
    expect(content.lookingFor).toMatch(/analyst/i);
    expect(content.lookingFor).toMatch(/banking/i);
  });

  it("mirrors the goal in the hero line", () => {
    expect(content.hero.currently).toMatch(/graduate/i);
    expect(content.hero.currently).toMatch(/analyst/i);
    expect(content.hero.currently).toMatch(/banking/i);
  });
});
