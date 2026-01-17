import SectionHeader from "../../components/SectionHeader";

const posts = [
  {
    title: "Reliable NLP Pipelines in Production",
    date: "Jan 2026",
    summary:
      "Notes from building tokenization and preprocessing workflows for HRMS datasets, focusing on stable inputs and measurable accuracy.",
  },
  {
    title: "Debugging Loops that Teach",
    date: "Dec 2025",
    summary:
      "A simple loop for isolating defects while tutoring CS students across Java, C++, and assembly.",
  },
  {
    title: "API Contracts that Stay Predictable",
    date: "Nov 2025",
    summary:
      "Lessons learned from validating REST endpoints and improving error handling consistency.",
  },
];

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeader title="Blog" subtitle="Notes and insights" />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.title} className="card space-y-3">
            <p className="section-subtitle">{post.date}</p>
            <h2 className="text-lg font-heading text-primary">{post.title}</h2>
            <p className="text-sm text-secondary">{post.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
