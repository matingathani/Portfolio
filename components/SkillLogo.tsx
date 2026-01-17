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

export const SkillLogo = ({ name }: { name: string }) => {
  const src = logoMap[name] ?? "/logos/sql.svg";
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-[#0f172a] text-primary">
      <Image src={src} alt={`${name} logo`} width={22} height={22} />
    </div>
  );
};
