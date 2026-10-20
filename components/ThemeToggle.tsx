"use client";

import { useEffect, useRef, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { THEME_ANIMATION_MS, THEME_KEY, THEME_SWITCH_MS, nextTheme, type Theme } from "../lib/theme";

// Fixed positions so the night sky is the same every time.
const STARS = [
  [6, 12, 0], [14, 34, 120], [22, 8, 300], [31, 22, 60], [39, 40, 220], [47, 14, 400], [55, 30, 140], [63, 9, 80],
  [71, 26, 340], [78, 16, 200], [86, 38, 20], [93, 11, 260], [10, 52, 180], [58, 48, 100], [84, 55, 320], [27, 58, 40],
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [scene, setScene] = useState<Theme | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const apply = (next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the theme still switches for this visit.
    }
    setTheme(next);
  };

  const toggle = () => {
    if (scene) return;
    const next = nextTheme(theme);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(next);
      return;
    }
    setScene(next);
    timers.current.push(
      window.setTimeout(() => apply(next), THEME_SWITCH_MS),
      window.setTimeout(() => setScene(null), THEME_ANIMATION_MS)
    );
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        title={label}
        className="flex h-9 w-9 items-center justify-center rounded border border-border text-secondary transition-colors hover:border-accent hover:text-accent"
      >
        <span key={theme} className="theme-icon flex">
          {theme === "dark" ? <FiSun aria-hidden size={16} /> : <FiMoon aria-hidden size={16} />}
        </span>
      </button>

      {scene && (
        <div aria-hidden="true" className={`theme-veil theme-veil--${scene}`}>
          {scene === "light" ? (
            <div className="theme-orb theme-orb--sun" />
          ) : (
            <>
              <div className="theme-orb theme-orb--moon" />
              {STARS.map(([left, top, delay]) => (
                <span
                  key={`${left}-${top}`}
                  className="theme-star"
                  style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}ms` }}
                />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
