import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "../../../lib/blog";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.summary };
}

const readingTime = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).length / 200));

export default function WritingPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/writing" className="link mb-8 inline-block text-sm">
        &larr; All writing
      </Link>
      <article>
        <p className="eyebrow mb-3">
          {post.date} &middot; {post.category} &middot; {readingTime(post.content)} min read
        </p>
        <h1 className="font-heading text-3xl font-semibold text-primary md:text-4xl">{post.title}</h1>
        <div className="mt-8 whitespace-pre-line leading-relaxed text-secondary">{post.content}</div>
      </article>
    </div>
  );
}
