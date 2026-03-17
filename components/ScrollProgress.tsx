"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!barRef.current) return;
      const documentHeight = document.documentElement.scrollHeight;
      const progress = window.scrollY / (documentHeight - window.innerHeight);
      barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-accent via-accent2 to-accent"
        style={{ width: "100%", transformOrigin: "left center", transform: "scaleX(0)" }}
      />
    </div>
  );
}
