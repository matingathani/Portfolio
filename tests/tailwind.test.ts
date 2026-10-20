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
