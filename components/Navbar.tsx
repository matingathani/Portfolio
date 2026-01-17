"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-lg font-semibold text-primary">
          MG<span className="text-accent">.</span>
        </Link>
        <button
          className="md:hidden text-sm text-secondary"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm text-secondary transition hover:text-primary"
              >
                <span className={active ? "text-primary" : ""}>{link.label}</span>
                {active && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background/90 px-6 py-4">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-secondary hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
