"use client";

import { useInView } from "../lib/hooks";

export default function ImpactBars({
  items,
}: {
  items: { label: string; value: number; suffix?: string }[];
}) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const max = Math.max(...items.map((item) => item.value));

  return (
    <div ref={ref} className="space-y-4">
      {items.map((item) => {
        const width = Math.round((item.value / max) * 100);
        return (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm text-secondary">
              <span>{item.label}</span>
              <span className="text-primary">
                {item.value.toLocaleString()}
                {item.suffix ?? ""}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#0f172a]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-accent to-accent2 transition-all duration-700"
                style={{ width: inView ? `${width}%` : "0%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
