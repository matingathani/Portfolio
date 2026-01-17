"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Experience } from "../lib/types";

export default function ExperienceCard({
  item,
  detailsHref,
}: {
  item: Experience;
  detailsHref?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-lg font-heading text-primary">{item.role}</h3>
          <p className="text-sm text-secondary">
            {item.company} - {item.location}
          </p>
        </div>
        <span className="text-xs text-muted">{item.dates}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tools.map((tool) => (
          <span key={tool} className="rounded-full border border-border px-3 py-1 text-xs text-secondary">
            {tool}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-accent">
        <button onClick={() => setOpen((prev) => !prev)} aria-expanded={open}>
          {open ? "Hide details" : "View details"}
        </button>
        {detailsHref && (
          <a href={detailsHref} className="text-xs font-semibold text-accent">
            Jump to full notes
          </a>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3 text-sm text-secondary">
              <p>
                <span className="font-semibold text-primary">Challenge:</span> {item.problem}
              </p>
              <p>
                <span className="font-semibold text-primary">Action:</span> {item.action}
              </p>
              <p className="flex items-start gap-2">
                <span className="signal-dot mt-1" />
                <span>
                  <span className="font-semibold text-primary">Impact:</span> {item.impact}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
