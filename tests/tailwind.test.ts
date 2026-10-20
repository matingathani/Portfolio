import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import config from "../tailwind.config";

describe("tailwind font families", () => {
  const families = (config.theme?.extend?.fontFamily ?? {}) as Record<string, string[]>;

  it("defines heading, body and mono families", () => {
    expect(Object.keys(families).sort()).toEqual(["body", "heading", "mono"]);
  });

  it("quotes every multi-word family so the CSS stays valid", () => {
    for (const [role, list] of Object.entries(families)) {
      for (const family of list) {
        if (family.startsWith("var(")) continue;
        if (/\s/.test(family)) {
          expect(family, `${role}: ${family}`).toMatch(/^"[^"]+"$/);
        }
      }
    }
  });
});

describe("heading font", () => {
  const families = (config.theme?.extend?.fontFamily ?? {}) as Record<string, string[]>;

  it("loads Fraunces for headings in the layout", () => {
    const layout = readFileSync("app/layout.tsx", "utf8");
    expect(layout).toContain("Fraunces");
    expect(layout).not.toContain("Source_Serif_4");
  });

  it("lists Fraunces first in the heading stack, with a serif fallback", () => {
    const heading = families.heading;
    expect(heading[0]).toBe("var(--font-heading)");
    expect(heading).toContain("Fraunces");
    expect(heading[heading.length - 1]).toBe("serif");
  });
});
