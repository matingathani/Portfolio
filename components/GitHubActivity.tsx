"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GitHubActivity {
  contributions: number;
  streak: number;
  repos: number;
}

export default function GitHubActivity({ username }: { username: string }) {
  const [activity, setActivity] = useState<GitHubActivity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a placeholder - you can integrate with GitHub API
    // For now, we'll show a static example
    setTimeout(() => {
      setActivity({
        contributions: 1200,
        streak: 45,
        repos: 12,
      });
      setLoading(false);
    }, 500);
  }, [username]);

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-border rounded w-3/4"></div>
          <div className="h-8 bg-border rounded"></div>
        </div>
      </div>
    );
  }

  if (!activity) return null;

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
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">{activity.contributions}+</p>
          <p className="text-xs text-muted mt-1">Contributions</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent3">{activity.streak}</p>
          <p className="text-xs text-muted mt-1">Day Streak</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent4">{activity.repos}</p>
          <p className="text-xs text-muted mt-1">Repositories</p>
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
