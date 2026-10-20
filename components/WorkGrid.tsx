"use client";

import { useState } from "react";
import WorkRow from "./WorkRow";
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
      <div className="border-b border-border">
        {visible.map((item) => (
          <WorkRow key={item.slug} item={item} headingLevel="h2" />
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {visible.length} projects shown
      </p>
    </div>
  );
}
