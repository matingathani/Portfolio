import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { THEME_KEY, resolveTheme, themeInitScript } from "../lib/theme";

const css = readFileSync("styles/globals.css", "utf8");

const block = (opener: string): Record<string, string> => {
  const start = css.indexOf(`${opener} {`);
  expect(start, `${opener} block exists`).toBeGreaterThanOrEqual(0);
  const body = css.slice(start, css.indexOf("}", start));
  const vars: Record<string, string> = {};
  for (const m of Array.from(body.matchAll(/--([a-z-]+):\s*(#[0-9a-fA-F]{6})/g))) vars[m[1].replace(/^color-/, "")] = m[2];
  return vars;
};

const light = block(":root");
const dark = block(':root[data-theme="dark"]');

const channel = (hex: string, i: number) => {
  const c = parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const luminance = (hex: string) => 0.2126 * channel(hex, 0) + 0.7152 * channel(hex, 1) + 0.0722 * channel(hex, 2);
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe("theme tokens", () => {
  it("defines the same colour tokens in light and dark", () => {
    expect(Object.keys(dark).sort()).toEqual(Object.keys(light).sort());
    expect(Object.keys(light).length).toBeGreaterThan(10);
  });

  for (const [name, theme] of [["light", light], ["dark", dark]] as const) {
    it(`meets WCAG AA text contrast in ${name}`, () => {
      for (const text of ["primary", "secondary", "muted"]) {
        for (const surface of ["bg", "surface", "band"]) {
          expect(contrast(theme[text], theme[surface]), `${name}: ${text} on ${surface}`).toBeGreaterThanOrEqual(4.5);
        }
      }
      for (const surface of ["bg", "surface", "band", "accent-soft"]) {
        expect(contrast(theme.accent, theme[surface]), `${name}: accent on ${surface}`).toBeGreaterThanOrEqual(4.5);
      }
      expect(contrast(theme["on-accent"], theme.accent), `${name}: on-accent on accent`).toBeGreaterThanOrEqual(4.5);
      expect(contrast(theme["ok-text"], theme["ok-bg"]), `${name}: ok chip`).toBeGreaterThanOrEqual(4.5);
      expect(contrast(theme["neutral-text"], theme["neutral-bg"]), `${name}: neutral chip`).toBeGreaterThanOrEqual(4.5);
    });
  }
});

describe("theme selection", () => {
  it("defaults to light unless a valid choice was saved", () => {
    expect(resolveTheme(null)).toBe("light");
    expect(resolveTheme(undefined)).toBe("light");
    expect(resolveTheme("purple")).toBe("light");
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("dark")).toBe("dark");
  });

  it("ships an init script that cannot throw when storage is blocked", () => {
    expect(themeInitScript).toContain(THEME_KEY);
    expect(themeInitScript).toContain("data-theme");
    expect(themeInitScript).toMatch(/try\s*\{/);
    expect(themeInitScript).toMatch(/catch/);
  });
});
