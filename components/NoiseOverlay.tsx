"use client";

import { useEffect, useState } from "react";

export default function NoiseOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const idle = "requestIdleCallback" in window;
    if (idle) {
      (window as any).requestIdleCallback(() => setShow(true));
      return;
    }
    const timeout = setTimeout(() => setShow(true), 900);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;
  return <div className="noise" aria-hidden />;
}
