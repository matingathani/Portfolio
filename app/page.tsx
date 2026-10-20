import Link from "next/link";
import Hero from "../components/Hero";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import WhyIBuild from "../components/WhyIBuild";
import WorkRow from "../components/WorkRow";
import { content } from "../lib/content";
import { posts } from "../lib/blog";
import { featuredByGroup, workGroups } from "../lib/work";

export default function HomePage() {
  const { lookingFor } = content;

  return (
    <>
      <Hero />
      <WhyIBuild />

      <Section labelledBy="what-i-do">
        <SectionHeading id="what-i-do" eyebrow="02 / What I do" title="Where I work" />
        <div className="grid gap-6 md:grid-cols-3">
          {content.expertise.map((area) => (
            <div key={area.title} className="card">
              <h3 className="font-heading text-xl font-semibold text-primary">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">{area.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Topics">
                {area.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="selected-work">
        <SectionHeading id="selected-work" eyebrow="03 / Selected work" title="Things I've built and fixed" />
        {workGroups.map((group) => (
          <div key={group.id} className="mb-12 last:mb-0">
            <h3 className="font-heading text-xl font-semibold text-primary">{group.label}</h3>
            <p className="mb-4 mt-1 text-sm text-muted">{group.blurb}</p>
            {featuredByGroup(group.id).map((item) => (
              <WorkRow key={item.slug} item={item} />
            ))}
          </div>
        ))}
        <p className="mt-6">
          <Link href="/work" className="link text-sm">
            See all work &rarr;
          </Link>
        </p>
      </Section>

      <Section band labelledBy="latest-writing">
        <SectionHeading id="latest-writing" eyebrow="04 / Writing" title="Latest writing" />
        <ul className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="card block h-full transition-colors hover:border-accent"
              >
                <p className="eyebrow">{post.date}</p>
                <p className="mt-2 font-heading text-lg font-semibold text-primary">{post.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/writing" className="link text-sm">
            All writing &rarr;
          </Link>
        </p>
      </Section>

      <Section labelledBy="looking-for">
        <div className="rounded-xl border border-border bg-accent-soft p-8 md:p-10">
          <h2 id="looking-for" className="font-heading text-3xl font-semibold tracking-tight text-primary">
            What I&apos;m looking for
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-secondary">{lookingFor}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Get in touch
            </Link>
            <Link href="/resume" className="btn-secondary">
              View resume
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
