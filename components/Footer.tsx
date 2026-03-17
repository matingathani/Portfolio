import Link from "next/link";
import { content } from "../lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-blue-500/10 backdrop-blur-sm" style={{ background: 'rgba(6, 11, 24, 0.85)' }}>
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-lg text-primary">{content.name}</p>
          <p className="text-sm text-secondary">{content.role}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-secondary">
          <Link href="/#projects" className="hover:text-primary">
            Projects
          </Link>
          <Link href="/#experience" className="hover:text-primary">
            Experience
          </Link>
          <Link href="/#resume" className="hover:text-primary">
            Resume
          </Link>
          <Link href="/#contact" className="hover:text-primary">
            Contact
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
        </div>
        <div className="flex gap-4 text-sm text-secondary">
          <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">
            LinkedIn
          </a>
          <a href={content.contact.github} target="_blank" rel="noreferrer" className="hover:text-primary">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
