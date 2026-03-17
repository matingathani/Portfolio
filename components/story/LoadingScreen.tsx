"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const steps = 100;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => setDone(true), 350);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#050810",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            pointerEvents: "all",
          }}
        >
          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "clamp(12px, 1.2vw, 15px)",
              fontWeight: 400,
              letterSpacing: "8px",
              textTransform: "uppercase",
              color: "#22d3ee",
            }}
          >
            MATIN GATHANI
          </motion.p>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ display: "flex", alignItems: "baseline", gap: 6 }}
          >
            <span
              style={{
                fontSize: "clamp(64px, 10vw, 120px)",
                fontWeight: 700,
                fontFamily: "Space Grotesk, sans-serif",
                color: "#eae5ec",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
                minWidth: "3ch",
                textAlign: "right",
                display: "inline-block",
              }}
            >
              {count}
            </span>
            <span
              style={{
                fontSize: "clamp(20px, 2.5vw, 36px)",
                color: "#6b6475",
                fontWeight: 300,
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              %
            </span>
          </motion.div>

          {/* Progress bar */}
          <div
            style={{
              width: "clamp(180px, 28vw, 380px)",
              height: 1,
              background: "rgba(34,211,238,0.1)",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${count}%`,
                background: "linear-gradient(to right, #22d3ee, #14b8a6)",
                transition: "width 0.02s linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
