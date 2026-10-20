"use client";

import { useState } from "react";
import WorkCard from "./WorkCard";
import { workGroups, workItems, type WorkGroup } from "../lib/work";

type Filter = WorkGroup | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...workGroups.map((group) => ({ id: group.id as Filter, label: group.label })),
];

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? workItems : workItems.filter((item) => item.group === filter);

  return (
    <div>
      <div role="group" aria-label="Filter work" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === f.id
                ? "border-accent bg-accent-soft text-accent"
                : "border-border bg-surface text-secondary hover:border-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {visible.length} projects shown
      </p>
    </div>
  );
}
