import { content } from "./content";
import { ossRepos } from "./oss";

export const impactStats = (): { value: string; label: string }[] =>
  content.impactMetrics.map((metric) => ({
    value: `${metric.value.toLocaleString("en-US")}${metric.suffix ?? ""}`,
    label: metric.label,
  }));

const gpa = content.education.find((entry) => entry.gpa)?.gpa ?? "";

export const homeStats: { value: string; label: string }[] = [
  { value: "28", label: "merged PRs in Cloudflare's workers-sdk" },
  { value: String(ossRepos.length), label: "open-source projects contributed to" },
  { value: gpa, label: "GPA, B.S. Computer Science, ASU" },
  { value: "4×", label: "Dean's List at ASU" },
];
