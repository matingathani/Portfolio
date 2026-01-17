"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../lib/hooks";

export default function AnimatedText({ text }: { text: string }) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <span>{text}</span>;
  }

  return (
    <span className="inline-flex flex-wrap gap-x-2">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
