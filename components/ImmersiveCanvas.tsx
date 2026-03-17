"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import NeuralUniverse from "./NeuralUniverse";
import {
  useMediaQuery,
  usePageVisibility,
  usePrefersReducedMotion,
} from "../lib/hooks";
import { isWebGLAvailable } from "../lib/utils";

interface ImmersiveCanvasProps {
  isAmbient?: boolean; // for about/blog pages — gentle camera drift
}

export default function ImmersiveCanvas({ isAmbient = false }: ImmersiveCanvasProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isPageVisible = usePageVisibility();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / max)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // WebGL availability check (client-side only)
  useEffect(() => {
    setWebGLAvailable(isWebGLAvailable());
  }, []);

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    background: "#060b18",
  };

  // CSS fallback when WebGL is not available
  if (!webGLAvailable) {
    return (
      <div
        style={{
          ...containerStyle,
          background:
            "radial-gradient(ellipse at top, rgba(59,130,246,0.15), transparent), radial-gradient(ellipse at bottom, rgba(16,185,129,0.1), transparent), #060b18",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div style={containerStyle} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          powerPreference: "high-performance",
          antialias: !isMobile,
          alpha: false,
        }}
        camera={{ position: [0, 0, 28], fov: 50, near: 0.1, far: 200 }}
        frameloop={isPageVisible && !prefersReducedMotion ? "always" : "demand"}
      >
        <NeuralUniverse
          scrollProgress={prefersReducedMotion ? 0 : scrollProgress}
          isAmbient={prefersReducedMotion ? true : isAmbient}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
}
