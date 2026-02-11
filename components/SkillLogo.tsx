import Image from "next/image";

const logoMap: Record<string, string> = {
  Python: "/logos/python.svg",
  Java: "/logos/java.svg",
  "C++": "/logos/cpp.svg",
  JavaScript: "/logos/javascript.svg",
  SQL: "/logos/sql.svg",
  HTML5: "/logos/html5.svg",
  CSS3: "/logos/css3.svg",
  React: "/logos/react.svg",
  Docker: "/logos/docker.svg",
  Git: "/logos/git.svg",
};

// Brand colors for each language (original/official colors)
const brandColors: Record<string, string> = {
  Python: "#3776AB",
  Java: "#ED8B00",
  "C++": "#00599C",
  JavaScript: "#F7DF1E",
  SQL: "#CC2927",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  React: "#61DAFB",
  Docker: "#2496ED",
  Git: "#F05032",
};

export const SkillLogo = ({ name }: { name: string }) => {
  const src = logoMap[name] ?? "/logos/sql.svg";
  const bg = brandColors[name] ?? "#64748b";
  // Use white icon on colored bg for high contrast; for light yellow (JS) use dark icon
  const isLightBg = name === "JavaScript" || name === "React";
  const iconStyle = isLightBg
    ? { filter: "brightness(0) saturate(100%)" }
    : { filter: "brightness(0) invert(1)" };

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-md transition-shadow hover:shadow-lg"
      style={{ backgroundColor: bg }}
      title={name}
    >
      <Image
        src={src}
        alt={`${name} logo`}
        width={22}
        height={22}
        className="opacity-95"
        style={iconStyle}
      />
    </div>
  );
};
