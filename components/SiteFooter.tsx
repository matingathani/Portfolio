import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { content } from "../lib/content";
import { navLinks } from "../lib/site";

const links = [...navLinks.map((link) => ({ href: link.href, label: link.label })), { href: "/oss", label: "Open source" }];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-content px-6 py-14">
        <p className="font-heading text-4xl font-semibold tracking-tight text-primary md:text-5xl">{content.name}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-secondary">
          Software and data engineer, studying AI and financial analytics in London. Looking for graduate analyst
          programmes in banking.
        </p>
        <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </Link>
          ))}
          <a href={`mailto:${content.contact.email}`} className="hover:text-accent">
            Email
          </a>
        </nav>
        <div className="mt-6">
          <SocialLinks />
        </div>
        <p className="mt-8 font-mono text-xs text-muted">(c) {new Date().getFullYear()} :: London, UK :: [EOF]</p>
      </div>
    </footer>
  );
}
