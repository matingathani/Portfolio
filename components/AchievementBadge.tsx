"use client";

import { motion } from "framer-motion";
import { Achievement } from "../lib/types";

const categoryColors = {
  certification: "bg-accent4",
  award: "bg-accent3",
  hackathon: "bg-accent5",
  other: "bg-accent",
};

const categoryIcons = {
  certification: "🏆",
  award: "⭐",
  hackathon: "🚀",
  other: "✨",
};

export default function AchievementBadge({ achievement, index }: { achievement: Achievement; index: number }) {
  return (
    <motion.div
      className="card hover:scale-105 transition-transform cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.4, type: "spring", bounce: 0.4 }}
      whileHover={{ y: -5 }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl ${categoryColors[achievement.category]} flex items-center justify-center text-2xl flex-shrink-0`}>
          {achievement.icon || categoryIcons[achievement.category]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-bold text-primary">{achievement.title}</h4>
            <span className="text-xs text-muted">{achievement.date}</span>
          </div>
          <p className="text-xs text-secondary">{achievement.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
