"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../lib/hooks";

export default function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: reduced ? 0 : 0.12,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 12 },
      show: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.45, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);
