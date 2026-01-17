"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { isWebGLAvailable } from "../lib/utils";
import { useMediaQuery } from "../lib/hooks";

const Hero3DScene = dynamic(() => import("./Hero3DScene"), { ssr: false });

export default function Hero3D() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const canRender = useMemo(() => isWebGLAvailable(), []);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = "requestIdleCallback" in window;
    if (idle) {
      (window as any).requestIdleCallback(() => setReady(true));
      return;
    }
    const timeout = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  if (!canRender || isMobile) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-card border border-border bg-[#0b1220]">
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M120 22L207 70V170L120 218L33 170V70L120 22Z"
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M120 22L120 218"
            stroke="#22D3EE"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="120" cy="120" r="42" stroke="#3B82F6" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-card border border-border bg-[#0b1220]">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted">Loading</span>
      </div>
    );
  }

  return <Hero3DScene />;
}
