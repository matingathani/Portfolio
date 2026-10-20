import Link from "next/link";
import SectionHeading from "../../components/SectionHeading";
import { posts } from "../../lib/blog";

export const metadata = { title: "Writing" };

const readingTime = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).length / 200));

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeading as="h1" eyebrow="Writing" title="Notes from building things">
        Short write-ups on pipelines, tooling and what I learned shipping them.
      </SectionHeading>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/writing/${post.slug}`} className="block h-full">
            <article className="card h-full transition-colors hover:border-accent">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">{post.date}</p>
                <span className="tag">{post.category}</span>
              </div>
              <h2 className="mt-3 font-heading text-xl font-semibold text-primary">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{post.summary}</p>
              <p className="mt-4 text-xs text-muted">{readingTime(post.content)} min read</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
