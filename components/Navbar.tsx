"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#career", label: "Career" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "/oss", label: "OSS" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "20px 0",
        transition: "background 0.3s, backdrop-filter 0.3s",
        background: scrolled ? "rgba(5,8,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(34,211,238,0.08)" : "none",
      }}
    >
      <nav style={{
        width: "var(--cWidth)", maxWidth: "var(--cMaxWidth)",
        margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="#home" style={{
          fontSize: 16, fontWeight: 700,
          fontFamily: "Space Grotesk, sans-serif",
          color: "#eae5ec", letterSpacing: "0.5px",
          textDecoration: "none",
        }}>
          MG
          <span style={{ color: "#22d3ee", marginLeft: 2 }}>.</span>
        </a>

        {/* Desktop links */}
        <ul style={{
          display: "flex", gap: 36, listStyle: "none",
          margin: 0, padding: 0, alignItems: "center",
        }}
          className="nav-desktop"
        >
          {links.map(link => {
            const navStyle = {
              fontSize: 13, color: "#a89fad",
              letterSpacing: "1px", fontWeight: 500,
              textDecoration: "none",
              transition: "color 0.2s",
            } as const;
            const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#22d3ee");
            const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#a89fad");
            return (
              <li key={link.href}>
                {link.href.startsWith("#") ? (
                  <a href={link.href} style={navStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} style={navStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11, letterSpacing: "2px", fontWeight: 500,
                textTransform: "uppercase", textDecoration: "none",
                color: "#22d3ee",
                border: "1px solid rgba(34,211,238,0.3)",
                borderRadius: 6,
                padding: "7px 16px",
                transition: "all 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,211,238,0.1)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,211,238,0.6)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,211,238,0.3)";
              }}
            >
              Résumé
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(p => !p)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#a89fad", fontSize: 13, letterSpacing: "1px",
            display: "none",
          }}
          className="nav-mobile-btn"
          aria-label="Toggle menu"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          background: "rgba(5,8,16,0.97)",
          borderTop: "1px solid rgba(34,211,238,0.08)",
          padding: "24px",
        }}>
          {links.map(link => {
            const mobileStyle = {
              display: "block", padding: "12px 0",
              fontSize: 15, color: "#a89fad",
              borderBottom: "1px solid rgba(34,211,238,0.05)",
              textDecoration: "none",
            } as const;
            return link.href.startsWith("#") ? (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} style={mobileStyle}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={mobileStyle}>
                {link.label}
              </Link>
            );
          }
          )}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block", padding: "14px 0",
              fontSize: 13, color: "#22d3ee",
              letterSpacing: "2px", textTransform: "uppercase",
              textDecoration: "none", fontWeight: 500,
            }}
          >
            Résumé ↗
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
