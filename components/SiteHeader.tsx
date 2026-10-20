"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { navLinks } from "../lib/site";
import { content } from "../lib/content";

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    isActive(pathname, href)
      ? "text-xs uppercase tracking-[0.12em] font-medium text-primary underline underline-offset-8 decoration-accent decoration-2"
      : "text-xs uppercase tracking-[0.12em] text-secondary hover:text-primary";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="block leading-tight" onClick={() => setOpen(false)}>
          <span className="eyebrow block text-[10px]">Matin &middot; Portfolio &middot; 2026</span>
          <span className="font-heading text-xl font-semibold text-primary">{content.name}</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <button
            type="button"
            className="rounded border border-border px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-primary md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border px-6 py-3 md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2.5 ${linkClass(link.href)}`}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
