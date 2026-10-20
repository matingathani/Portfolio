import { content } from "./content";
import { ossRepos } from "./oss";

export const impactStats = (): { value: string; label: string }[] =>
  content.impactMetrics.map((metric) => ({
    value: `${metric.value.toLocaleString("en-US")}${metric.suffix ?? ""}`,
    label: metric.label,
  }));

const gpa = content.education.find((entry) => entry.gpa)?.gpa ?? "";

export const homeStats: { value: string; label: string }[] = [
  { value: "28", label: "merged PRs, Cloudflare" },
  { value: String(ossRepos.length), label: "OSS projects" },
  { value: gpa, label: "GPA, ASU B.S." },
  { value: "4×", label: "Dean's List, ASU" },
];
