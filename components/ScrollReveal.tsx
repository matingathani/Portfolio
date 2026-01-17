"use client";

import { motion } from "framer-motion";
import { useInView, usePrefersReducedMotion } from "../lib/hooks";

export default function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0.2 : 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
