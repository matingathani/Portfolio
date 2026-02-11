"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CONTRIB_GOAL = 600;
const LINES_GOAL = 25000;

interface GitHubContribData {
  contributionsLastYear: number;
  contributionsThisYear: number;
  totalContributions: number;
  estimatedLinesOfCode: number;
}

export default function GitHubActivity({ username }: { username: string }) {
  const [data, setData] = useState<GitHubContribData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/github-contributions?username=${encodeURIComponent(username)}`);
        if (!res.ok) throw new Error("Fetch failed");
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [username]);

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-border rounded w-3/4" />
          <div className="h-8 bg-border rounded" />
          <div className="h-2 bg-border rounded w-full" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="card">
        <h3 className="text-lg font-heading text-primary mb-4 flex items-center gap-2">
          <span>🐙</span> GitHub Activity
        </h3>
        <p className="text-sm text-muted">Unable to load contribution data.</p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
        >
          View Profile →
        </a>
      </div>
    );
  }

  const contribPercent = Math.min(100, (data.totalContributions / CONTRIB_GOAL) * 100);
  const linesPercent = Math.min(100, (data.estimatedLinesOfCode / LINES_GOAL) * 100);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-heading text-primary mb-4 flex items-center gap-2">
        <span>🐙</span> GitHub Activity
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">{data.totalContributions}+</p>
          <p className="text-xs text-muted mt-1">Contributions</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent3">
            {data.estimatedLinesOfCode >= 1000
              ? `${(data.estimatedLinesOfCode / 1000).toFixed(1)}k`
              : data.estimatedLinesOfCode}
          </p>
          <p className="text-xs text-muted mt-1">Est. lines committed</p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div>
          <div className="flex justify-between text-xs text-secondary mb-1">
            <span>Contributions progress</span>
            <span>{data.totalContributions} / {CONTRIB_GOAL}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#e2e8f0] dark:bg-[#334155] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
              initial={{ width: 0 }}
              animate={{ width: `${contribPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-secondary mb-1">
            <span>Lines committed (est.)</span>
            <span>{data.estimatedLinesOfCode.toLocaleString()} / {LINES_GOAL.toLocaleString()}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#e2e8f0] dark:bg-[#334155] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent3 to-accent4"
              initial={{ width: 0 }}
              animate={{ width: `${linesPercent}%` }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
      >
        View Profile →
      </a>
    </motion.div>
  );
}
