"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "../lib/types";

type FilterOption = "All" | "Backend" | "AI" | "Full-stack";

export default function ProjectFilter({
  projects,
  onFilterChange,
}: {
  projects: Project[];
  onFilterChange: (filtered: Project[]) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

  const categories: FilterOption[] = ["All", "Backend", "AI", "Full-stack"];

  const handleFilter = (category: FilterOption) => {
    setActiveFilter(category);
    const filtered =
      category === "All" ? projects : projects.filter((p) => p.category === category);
    onFilterChange(filtered);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilter(category)}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
            activeFilter === category
              ? "bg-accent text-white shadow-lg scale-105"
              : "bg-surface border-2 border-border text-secondary hover:border-accent hover:text-primary"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
