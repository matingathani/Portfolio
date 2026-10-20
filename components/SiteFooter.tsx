import SocialLinks from "./SocialLinks";
import { content } from "../lib/content";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-6 py-8 text-sm text-secondary md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {content.name}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
