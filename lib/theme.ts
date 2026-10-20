export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

// Light is the default; only a saved "dark" switches it.
export const resolveTheme = (stored: string | null | undefined): Theme => (stored === "dark" ? "dark" : "light");

// Runs before first paint so the page never flashes the wrong theme.
export const themeInitScript = `(function(){var t="light";try{if(localStorage.getItem("${THEME_KEY}")==="dark"){t="dark";}}catch(e){}document.documentElement.setAttribute("data-theme",t);})();`;

// Total length of the sunrise/moonrise animation, and the moment (while the veil is opaque) the theme swaps.
// Keep THEME_ANIMATION_MS in step with the keyframe durations in styles/globals.css.
export const THEME_ANIMATION_MS = 1250;
export const THEME_SWITCH_MS = 560;

export const nextTheme = (current: Theme): Theme => (current === "dark" ? "light" : "dark");
