"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import { Project } from "../lib/types";
import { slugify } from "../lib/utils";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  return (
    <>
      <ProjectFilter projects={projects} onFilterChange={setFilteredProjects} />
      <div className="grid gap-6 md:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            detailsHref={`#project-${project.slug}`}
          />
        ))}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {filteredProjects.map((project) => (
          <div key={project.slug} id={`project-${project.slug}`} className="card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-heading text-primary">{project.name}</h3>
              <span className="text-xs text-muted">{project.dates}</span>
            </div>
            <p className="text-sm text-secondary">{project.overview}</p>
            <div className="grid gap-4 text-sm text-secondary">
              <div>
                <p className="section-subtitle">Problem</p>
                <p className="mt-2">{project.challenges[0]}</p>
              </div>
              <div>
                <p className="section-subtitle">Solution</p>
                <ul className="mt-2 list-disc space-y-2 pl-4">
                  {project.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="section-subtitle">Architecture</p>
                <ul className="mt-2 list-disc space-y-2 pl-4">
                  {project.architecture.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="section-subtitle">Impact</p>
                <ul className="mt-2 list-disc space-y-2 pl-4">
                  {project.results.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border-2 border-border px-3 py-1 text-xs font-semibold text-secondary hover:border-accent hover:text-accent transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
