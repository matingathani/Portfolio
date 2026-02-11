"use client";

import { motion } from "framer-motion";

interface RecentAiTraining {
  title: string;
  description: string;
  date: string;
  modelType?: string;
  metrics?: string;
}

export default function RecentAiTrainingCard({ training }: { training: RecentAiTraining }) {
  return (
    <motion.div
      className="card space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl" aria-hidden>🤖</span>
        <h3 className="text-lg font-heading text-primary">Recent AI model training</h3>
      </div>
      <p className="text-sm font-medium text-primary">{training.title}</p>
      <p className="text-sm text-secondary">{training.description}</p>
      {training.modelType && (
        <p className="text-xs text-muted">
          <span className="font-medium text-secondary">Type:</span> {training.modelType}
        </p>
      )}
      {training.metrics && (
        <p className="text-xs text-muted">
          <span className="font-medium text-secondary">Metrics:</span> {training.metrics}
        </p>
      )}
      <p className="text-xs text-muted">{training.date}</p>
    </motion.div>
  );
}
