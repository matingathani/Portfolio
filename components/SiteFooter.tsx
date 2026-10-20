import { content } from "../lib/content";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-6 py-8 text-sm text-secondary md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {content.name}
        </p>
        <ul className="flex flex-wrap gap-6">
          <li>
            <a href={`mailto:${content.contact.email}`} className="hover:text-primary">
              Email
            </a>
          </li>
          <li>
            <a href={content.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              GitHub
            </a>
          </li>
          <li>
            <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
