import type { WorkItem } from "../lib/work";

type Props = { item: WorkItem; headingLevel?: "h2" | "h4" };

export default function WorkRow({ item, headingLevel = "h4" }: Props) {
  const Heading = headingLevel;
  return (
    <article className="grid gap-4 border-t border-border py-8 md:grid-cols-[1fr_1.6fr] md:gap-10">
      <div>
        <Heading className="font-heading text-2xl font-semibold text-primary">{item.name}</Heading>
        {item.years && <p className="eyebrow mt-2">{item.years}</p>}
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
          {item.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="leading-relaxed text-secondary">{item.summary}</p>
        {item.links.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-4 text-sm">
            {item.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="link">
                {link.label} &#8599;
              </a>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}
