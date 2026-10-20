import type { WorkItem } from "../lib/work";

export default function WorkCard({ item, headingLevel = "h3" }: { item: WorkItem; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="card flex h-full flex-col">
      <div className="flex items-baseline justify-between gap-3">
        <Heading className="font-heading text-lg font-semibold text-primary">{item.name}</Heading>
        {item.years && <span className="eyebrow whitespace-nowrap">{item.years}</span>}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">{item.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
        {item.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
      {item.links.length > 0 && (
        <p className="mt-4 flex flex-wrap gap-4 text-sm">
          {item.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="link">
              {link.label} &#8599;
            </a>
          ))}
        </p>
      )}
    </article>
  );
}
