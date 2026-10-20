import { content } from "./content";

export const impactStats = (): { value: string; label: string }[] =>
  content.impactMetrics.map((metric) => ({
    value: `${metric.value.toLocaleString("en-US")}${metric.suffix ?? ""}`,
    label: metric.label,
  }));
