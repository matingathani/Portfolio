import Link from "next/link";
import { Project } from "../lib/types";

export default function ProjectCard({
  project,
  detailsHref,
}: {
  project: Project;
  detailsHref?: string;
}) {
  return (
    <Link
      href={detailsHref ?? "/#projects"}
      className="card hover-tilt pixel-ripple flex h-full flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
          {project.category}
        </span>
        <span className="text-xs text-muted">{project.dates}</span>
      </div>
      <div>
        <h3 className="text-lg font-heading text-primary">{project.name}</h3>
        <p className="mt-2 text-sm text-secondary">{project.overview}</p>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        {project.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-3 py-1 text-xs text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>
      {detailsHref && (
        <span className="mt-2 text-xs font-semibold text-accent">View details</span>
      )}
    </Link>
  );
}
