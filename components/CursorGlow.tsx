"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 300,
        height: 300,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 2,
        background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        willChange: "transform",
        transform: "translate(-9999px, -9999px)", // hide until first mousemove
      }}
    />
  );
}
