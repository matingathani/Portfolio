"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DataNetworkBackground = dynamic(() => import("./DataNetworkBackground"), { ssr: false });

export default function BackgroundLayers() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = "requestIdleCallback" in window;
    if (idle) {
      (window as any).requestIdleCallback(() => setReady(true));
      return;
    }
    const timeout = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(timeout);
  }, []);

  if (!ready) {
    return (
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.2), transparent 40%), radial-gradient(circle at 80% 40%, rgba(34,211,238,0.15), transparent 40%)",
        }}
      />
    );
  }

  return <DataNetworkBackground />;
}
