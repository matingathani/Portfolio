import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { content } from "../lib/content";

const links = [
  { label: "GitHub", href: content.contact.github, Icon: FiGithub, external: true },
  { label: "LinkedIn", href: content.contact.linkedin, Icon: FiLinkedin, external: true },
  { label: "Email", href: `mailto:${content.contact.email}`, Icon: FiMail, external: false },
];

export default function SocialLinks() {
  return (
    <ul className="flex gap-3">
      {links.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            <Icon aria-hidden size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}
