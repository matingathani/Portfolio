"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "../lib/types";

const filters = ["All", "Backend", "AI", "Full-stack"] as const;

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filtered = projects.filter((project) =>
    active === "All" ? true : project.category === active
  );

  return (
    <div>
      <div className="mt-6 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={active === filter ? "btn-primary" : "btn-secondary"}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
