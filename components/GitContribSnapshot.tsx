"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CONTRIB_GOAL = 600;
const LINES_GOAL = 25000;

interface ContribData {
  totalContributions: number;
  estimatedLinesOfCode: number;
}

export default function GitContribSnapshot({ username }: { username: string }) {
  const [data, setData] = useState<ContribData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/github-contributions?username=${encodeURIComponent(username)}`)
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (!cancelled && json)
          setData({
            totalContributions: json.totalContributions ?? 0,
            estimatedLinesOfCode: json.estimatedLinesOfCode ?? 0,
          });
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [username]);

  if (loading) {
    return (
      <div className="card">
        <h3 className="text-lg font-heading text-primary">Contribution snapshot</h3>
        <p className="mt-2 text-sm text-secondary">GitHub activity, updated regularly.</p>
        <div className="mt-4 animate-pulse space-y-3">
          <div className="h-4 bg-border rounded w-2/3" />
          <div className="h-2 bg-border rounded w-full" />
          <div className="h-2 bg-border rounded w-full" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const contribPercent = Math.min(100, (data.totalContributions / CONTRIB_GOAL) * 100);
  const linesPercent = Math.min(100, (data.estimatedLinesOfCode / LINES_GOAL) * 100);

  return (
    <div className="card">
      <h3 className="text-lg font-heading text-primary">Contribution snapshot</h3>
      <p className="mt-2 text-sm text-secondary">GitHub activity, updated regularly.</p>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between text-sm text-secondary">
          <span>Contributions</span>
          <span className="text-primary font-medium">{data.totalContributions}+</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#e2e8f0] dark:bg-[#334155] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
            initial={{ width: 0 }}
            animate={{ width: `${contribPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-sm text-secondary">
          <span>Est. lines committed</span>
          <span className="text-primary font-medium">
            {data.estimatedLinesOfCode >= 1000
              ? `${(data.estimatedLinesOfCode / 1000).toFixed(1)}k`
              : data.estimatedLinesOfCode}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#e2e8f0] dark:bg-[#334155] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent3 to-accent4"
            initial={{ width: 0 }}
            animate={{ width: `${linesPercent}%` }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
