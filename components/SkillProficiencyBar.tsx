"use client";

import { motion } from "framer-motion";

interface SkillProficiency {
  name: string;
  value: number;
}

export default function SkillProficiencyBar({ skill }: { skill: SkillProficiency }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-secondary">
        <span>{skill.name}</span>
        <span className="text-primary font-bold">{skill.value}%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-3 rounded-full bg-gradient-to-r from-accent via-accent4 to-accent3"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.value}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ willChange: 'width' }}
        />
      </div>
    </div>
  );
}
