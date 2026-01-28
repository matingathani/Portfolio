import Link from "next/link";
import SectionHeader from "../../components/SectionHeader";
import { posts } from "../../lib/blog";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeader title="Blog" subtitle="Notes and insights" />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((post) => {
          const readingTime = Math.ceil(post.content.split(" ").length / 200);
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="card space-y-3 hover:scale-105 transition-transform cursor-pointer h-full">
                <div className="flex items-center justify-between">
                  <p className="section-subtitle">{post.date}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent3/20 text-accent2 font-semibold">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-lg font-heading text-primary">{post.title}</h2>
                <p className="text-sm text-secondary">{post.summary}</p>
                <p className="text-xs text-muted">{readingTime} min read →</p>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
