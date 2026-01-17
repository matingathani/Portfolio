"use client";

import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button className="btn-secondary" onClick={handleCopy} aria-live="polite">
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
