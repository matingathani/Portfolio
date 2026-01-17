"use client";

import { useInView, useCountUp } from "../lib/hooks";

export default function MetricCounter({
  value,
  label,
  suffix = "+",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const count = useCountUp(inView ? value : 0);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-2xl font-heading text-primary">
        <span className="signal-dot" />
        <span>{count.toLocaleString()}{suffix}</span>
      </div>
      <p className="text-sm text-secondary">{label}</p>
    </div>
  );
}
