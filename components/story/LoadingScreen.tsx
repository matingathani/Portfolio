"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Lock scroll and force top position while loading
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    }

    const duration = 1800;
    const steps = 100;
    const intervalMs = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(timer);
        // Restore scroll, ensure at top, then fade
        document.body.style.overflow = "";
        window.scrollTo(0, 0);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => setHidden(true), 700);
        }, 200);
      }
    }, intervalMs);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
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
        opacity: fading ? 0 : 1,
        transition: "opacity 0.65s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Name */}
      <p
        style={{
          fontSize: "clamp(12px, 1.2vw, 15px)",
          fontWeight: 400,
          letterSpacing: "8px",
          textTransform: "uppercase",
          color: "#22d3ee",
        }}
      >
        MATIN GATHANI
      </p>

      {/* Counter */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
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
      </div>

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
    </div>
  );
}
