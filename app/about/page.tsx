import Image from "next/image";
import SectionHeading from "../../components/SectionHeading";
import StatsStrip from "../../components/StatsStrip";
import { content } from "../../lib/content";
import { impactStats } from "../../lib/stats";

export const metadata = { title: "About" };

const H2 = "font-heading text-2xl font-semibold text-primary";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeading as="h1" eyebrow="About" title="Hi, I'm Matin.">
        {content.summary}
      </SectionHeading>

      <div className="mb-14">
        <StatsStrip stats={impactStats()} />
      </div>

      <div className="grid gap-12 md:grid-cols-[260px_1fr]">
        <aside className="space-y-4">
          <Image
            src="/matin-gathani.webp"
            alt="Portrait of Matin Gathani"
            width={640}
            height={800}
            className="h-auto w-full rounded-xl border border-border object-cover"
            priority
          />
          <div className="text-sm text-secondary">
            <p className="font-medium text-primary">{content.role}</p>
            <p>{content.contact.location}</p>
          </div>
          <ul className="space-y-1 text-sm">
            <li>
              <a href={`mailto:${content.contact.email}`} className="link">
                {content.contact.email}
              </a>
            </li>
            <li>
              <a href={content.contact.github} target="_blank" rel="noopener noreferrer" className="link">
                GitHub
              </a>
            </li>
            <li>
              <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                LinkedIn
              </a>
            </li>
          </ul>
          <div>
            <p className="eyebrow mb-2">Languages</p>
            <ul className="space-y-1 text-sm text-secondary">
              {content.languages.map((language) => (
                <li key={language.name}>
                  {language.name} <span className="text-muted">({language.level})</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-14">
          <section aria-labelledby="education">
            <h2 id="education" className={H2}>
              Education
            </h2>
            <div className="mt-4 space-y-6">
              {content.education.map((edu) => (
                <div key={edu.school}>
                  <p className="font-medium text-primary">{edu.degree}</p>
                  <p className="text-sm text-secondary">
                    {edu.school}, {edu.location}
                  </p>
                  <p className="eyebrow mt-1">
                    {edu.dates}
                    {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                  </p>
                  {edu.modules && (
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Relevant modules">
                      {edu.modules.map((module) => (
                        <li key={module} className="tag">
                          {module}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="experience">
            <h2 id="experience" className={H2}>
              Experience
            </h2>
            <div className="mt-4 space-y-8">
              {content.experience.map((item) => (
                <div key={`${item.company}-${item.role}`}>
                  <p className="font-medium text-primary">
                    {item.role}, {item.company}
                  </p>
                  <p className="eyebrow mt-1">
                    {item.dates} &middot; {item.location}
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-secondary">
                    <li>{item.action}</li>
                    <li>{item.impact}</li>
                  </ul>
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tools">
                    {item.tools.map((tool) => (
                      <li key={tool} className="tag">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="skills">
            <h2 id="skills" className={H2}>
              Skills
            </h2>
            <div className="mt-4 space-y-3">
              {content.skillLevels.map((group) => (
                <div key={group.level} className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
                  <p className="w-32 shrink-0 text-sm font-medium text-primary">{group.level}</p>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="tag">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {content.skills.map((group) => (
                <div key={group.title} className="card">
                  <h3 className="font-medium text-primary">{group.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="tag">
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-secondary">{group.proof}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="toolkit">
            <h2 id="toolkit" className={H2}>
              Tools I use
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {content.toolkit.map((tool) => (
                <li key={tool} className="tag">
                  {tool}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="highlights">
            <h2 id="highlights" className={H2}>
              Highlights
            </h2>
            <ul className="mt-4 space-y-3">
              {(content.achievements ?? []).map((item) => (
                <li key={item.title} className="text-sm">
                  <span className="font-medium text-primary">{item.title}</span>
                  <span className="text-secondary"> &mdash; {item.description}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="kind-words">
            <h2 id="kind-words" className={H2}>
              Kind words
            </h2>
            <div className="mt-4 grid gap-6">
              {(content.testimonials ?? []).map((item) => (
                <figure key={item.quote} className="card">
                  <blockquote className="text-sm leading-relaxed text-secondary">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="eyebrow mt-3">
                    {item.author}, {item.role}
                    {item.company ? `, ${item.company}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
