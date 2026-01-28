"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import ColorShiftText from "./ColorShiftText";

const links = [
  { href: "/", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-[rgba(255,255,255,0.95)] backdrop-blur-xl shadow-lg">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-xl font-bold hover:scale-105 transition-transform">
          <ColorShiftText speed={0.4}>Matin Gathani</ColorShiftText>
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
            const active = !link.href.startsWith("/#") && pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold text-secondary transition-all hover:text-accent hover:scale-105"
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
