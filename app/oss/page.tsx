import SectionHeading from "../../components/SectionHeading";
import { ossRepos, type OssPR, type OssRepo } from "../../lib/oss";

export const metadata = { title: "Open source" };

const STATUS: Record<OssPR["status"], { label: string; className: string }> = {
  merged: { label: "Merged", className: "bg-ok-bg text-ok-text" },
  open: { label: "Open", className: "bg-accent-soft text-accent" },
  closed: { label: "Closed", className: "bg-neutral-bg text-neutral-text" },
};

function PullRequest({ pr }: { pr: OssPR }) {
  const status = STATUS[pr.status];
  return (
    <a
      href={pr.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card block transition-colors hover:border-accent"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow">#{pr.number}</span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}>{status.label}</span>
      </div>
      <p className="mt-3 text-sm font-medium leading-snug text-primary">{pr.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-secondary">{pr.description}</p>
      <p className="link mt-3 text-sm">View PR &#8599;</p>
    </a>
  );
}

function Repo({ repo }: { repo: OssRepo }) {
  return (
    <section className="mt-14" aria-labelledby={`repo-${repo.displayName}`}>
      <h2 id={`repo-${repo.displayName}`} className="font-heading text-2xl font-semibold text-primary">
        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          {repo.displayName} &#8599;
        </a>
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-secondary">{repo.description}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {repo.prs.map((pr) => (
          <PullRequest key={pr.number} pr={pr} />
        ))}
      </div>
    </section>
  );
}

export default function OssPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeading as="h1" eyebrow="Open source" title="Pull requests to tools I use">
        Highlights from each project. Each heading links to the full list on GitHub.
      </SectionHeading>
      {ossRepos.map((repo) => (
        <Repo key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
