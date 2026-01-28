import { notFound } from "next/navigation";
import Link from "next/link";
import SectionHeader from "../../../components/SectionHeader";
import { posts } from "../../../lib/blog";

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.summary,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const readingTime = Math.ceil(post.content.split(" ").length / 200);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/blog" className="text-sm text-accent hover:underline mb-8 inline-block">
        ← Back to Blog
      </Link>
      <article className="card space-y-6">
        <div>
          <p className="section-subtitle mb-2">{post.date}</p>
          <h1 className="text-3xl font-heading font-bold text-primary mb-4">{post.title}</h1>
          <p className="text-sm text-muted">
            {readingTime} min read • {post.category}
          </p>
        </div>
        <div className="prose prose-invert max-w-none">
          <div className="text-secondary whitespace-pre-line leading-relaxed">{post.content}</div>
        </div>
        <div className="pt-6 border-t border-border">
          <Link href="/blog" className="btn-secondary">
            View All Posts
          </Link>
        </div>
      </article>
    </div>
  );
}
