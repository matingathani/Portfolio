import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const read = (file: string) => readFileSync(file, "utf8");

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? sourceFiles(full) : /\.tsx?$/.test(name) ? [full] : [];
  });

describe("portrait", () => {
  it("uses the new portrait on the hero and the About page", () => {
    expect(read("components/Hero.tsx")).toContain('src="/portrait.jpg"');
    expect(read("app/about/page.tsx")).toContain('src="/portrait.jpg"');
  });

  it("no longer references the old portrait", () => {
    for (const file of [...sourceFiles("app"), ...sourceFiles("components")]) {
      expect(read(file), file).not.toContain("matin-gathani.webp");
    }
  });

  it("only references image files that exist in public/", () => {
    for (const file of [...sourceFiles("app"), ...sourceFiles("components")]) {
      for (const match of Array.from(read(file).matchAll(/src="(\/[^"]+\.(?:jpg|jpeg|png|webp|svg))"/g))) {
        expect(existsSync(join("public", match[1])), `${file} -> ${match[1]}`).toBe(true);
      }
    }
  });
});
