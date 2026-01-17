"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

export default function Typewriter({ text }: { text: string }) {
  const reduced = usePrefersReducedMotion();
  const [displayed, setDisplayed] = useState(reduced ? text : "");

  useEffect(() => {
    if (reduced) return;
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [text, reduced]);

  return (
    <span className="relative">
      {displayed}
      {!reduced && (
        <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-accent align-middle" />
      )}
    </span>
  );
}
