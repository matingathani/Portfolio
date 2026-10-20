export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

// Every public page, used by the sitemap. "/oss" is linked from /work, not the nav.
export const sitePaths: string[] = ["", ...navLinks.map((link) => link.href), "/oss"];
