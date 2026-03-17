import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiDocker, SiGit, SiGithub, SiLinux,
  SiPostman, SiPandas, SiNumpy, SiHtml5, SiCss,
  SiMysql, SiCplusplus, SiTailwindcss, SiVercel,
} from "react-icons/si";
import { FaJava, FaDatabase, FaCode, FaCog, FaServer } from "react-icons/fa";
import type { IconType } from "react-icons";

const iconMap: Record<string, { icon: IconType; color: string }> = {
  // Languages
  "Python":       { icon: SiPython,       color: "#3776AB" },
  "JavaScript":   { icon: SiJavascript,   color: "#F7DF1E" },
  "TypeScript":   { icon: SiTypescript,   color: "#3178C6" },
  "Java":         { icon: FaJava,         color: "#ED8B00" },
  "C++":          { icon: SiCplusplus,    color: "#00599C" },
  "HTML5":        { icon: SiHtml5,        color: "#E34F26" },
  "CSS3":         { icon: SiCss,          color: "#1572B6" },
  // Frameworks / Libraries
  "React":        { icon: SiReact,        color: "#61DAFB" },
  "Next.js":      { icon: SiNextdotjs,    color: "#ffffff" },
  "Node.js":      { icon: SiNodedotjs,    color: "#339933" },
  "Tailwind":     { icon: SiTailwindcss,  color: "#06B6D4" },
  "Pandas":       { icon: SiPandas,       color: "#150458" },
  "NumPy":        { icon: SiNumpy,        color: "#013243" },
  // DevOps / Tools
  "Docker":       { icon: SiDocker,       color: "#2496ED" },
  "Git":          { icon: SiGit,          color: "#F05032" },
  "GitHub":       { icon: SiGithub,       color: "#ffffff" },
  "Linux":        { icon: SiLinux,        color: "#FCC624" },
  "Postman":      { icon: SiPostman,      color: "#FF6C37" },
  "Vercel":       { icon: SiVercel,       color: "#ffffff" },
  // Data
  "SQL":          { icon: SiMysql,        color: "#4479A1" },
  "MySQL":        { icon: SiMysql,        color: "#4479A1" },
  // Generics (no specific icon)
  "NLP":          { icon: FaCode,         color: "#22d3ee" },
  "REST APIs":    { icon: FaServer,       color: "#22d3ee" },
  "API":          { icon: FaServer,       color: "#22d3ee" },
  "Agile":        { icon: FaCog,          color: "#22d3ee" },
  "CI/CD":        { icon: FaCog,          color: "#22d3ee" },
  "Testing":      { icon: FaCode,         color: "#22d3ee" },
  "Debugging":    { icon: FaCode,         color: "#22d3ee" },
  "JUnit":        { icon: FaCode,         color: "#22d3ee" },
  "Shell":        { icon: SiLinux,        color: "#FCC624" },
  "Database":     { icon: FaDatabase,     color: "#22d3ee" },
};

interface TechIconProps {
  name: string;
  size?: number;
  showLabel?: boolean;
  labelStyle?: React.CSSProperties;
}

export function TechIcon({ name, size = 18, showLabel = false, labelStyle }: TechIconProps) {
  const entry = iconMap[name];
  if (!entry) {
    return showLabel ? (
      <span style={{ fontSize: size * 0.7, color: "#22d3ee", ...labelStyle }}>◆</span>
    ) : null;
  }
  const Icon = entry.icon;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: showLabel ? 6 : 0 }}>
      <Icon size={size} color={entry.color} style={{ flexShrink: 0 }} />
      {showLabel && <span style={labelStyle}>{name}</span>}
    </span>
  );
}

export function TechTag({ name, accent = "#22d3ee" }: { name: string; accent?: string }) {
  const entry = iconMap[name];
  const Icon = entry?.icon;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 12, padding: "5px 12px", borderRadius: 100,
      border: `1px solid ${accent}30`,
      color: "#eae5ec",
      background: "rgba(255,255,255,0.02)",
    }}>
      {Icon && <Icon size={12} color={entry.color} />}
      {name}
    </span>
  );
}

export default TechIcon;
