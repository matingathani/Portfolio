import Link from "next/link";
import SectionHeading from "../components/SectionHeading";
import StatsStrip from "../components/StatsStrip";
import WorkCard from "../components/WorkCard";
import { content } from "../lib/content";
import { posts } from "../lib/blog";
import { homeStats } from "../lib/stats";
import { featuredByGroup, workGroups } from "../lib/work";

export default function HomePage() {
  const { hero, lookingFor } = content;

  return (
    <div className="mx-auto max-w-content px-6">
      <section className="py-16 md:py-24">
        <p className="eyebrow mb-4">{hero.currently}</p>
        <h1 className="max-w-3xl font-heading text-4xl font-semibold leading-tight text-primary md:text-6xl">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">{hero.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work" className="btn-primary">
            See my work
          </Link>
          <Link href="/resume" className="btn-secondary">
            View resume
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact
          </Link>
        </div>
      </section>

      <StatsStrip stats={homeStats} />

      <section className="pt-14" aria-labelledby="what-i-do">
        <SectionHeading id="what-i-do" eyebrow="What I do" title="Where I work" />
        <div className="grid gap-6 md:grid-cols-3">
          {content.expertise.map((area) => (
            <div key={area.title} className="card">
              <h3 className="font-heading text-lg font-semibold text-primary">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{area.description}</p>
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
      </section>

      {workGroups.map((group) => (
        <section key={group.id} className="pt-14" aria-labelledby={`group-${group.id}`}>
          <SectionHeading id={`group-${group.id}`} eyebrow="Selected work" title={group.label}>
            {group.blurb}
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredByGroup(group.id).map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      ))}

      <p className="mt-10">
        <Link href="/work" className="link text-sm">
          See all work &rarr;
        </Link>
      </p>

      <section className="pt-14" aria-labelledby="latest-writing">
        <SectionHeading id="latest-writing" eyebrow="Writing" title="Latest writing" />
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
      </section>

      <section className="mt-16 rounded-xl border border-border bg-accent-soft p-8" aria-labelledby="looking-for">
        <h2 id="looking-for" className="font-heading text-2xl font-semibold text-primary">
          What I&apos;m looking for
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-secondary">{lookingFor}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">
            Get in touch
          </Link>
          <Link href="/resume" className="btn-secondary">
            View resume
          </Link>
        </div>
      </section>
    </div>
  );
}
