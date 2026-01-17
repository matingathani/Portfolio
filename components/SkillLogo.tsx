import { ReactNode } from "react";

const LogoShell = ({ children }: { children: ReactNode }) => (
  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-[#0f172a]">
    {children}
  </div>
);

export const SkillLogo = ({ name }: { name: string }) => {
  switch (name) {
    case "Python":
      return (
        <LogoShell>
          <span className="text-sm font-mono text-accent">Py</span>
        </LogoShell>
      );
    case "Java":
      return (
        <LogoShell>
          <span className="text-sm font-mono text-accent">Ja</span>
        </LogoShell>
      );
    case "C++":
      return (
        <LogoShell>
          <span className="text-sm font-mono text-accent">C++</span>
        </LogoShell>
      );
    case "JavaScript":
      return (
        <LogoShell>
          <span className="text-sm font-mono text-accent">JS</span>
        </LogoShell>
      );
    case "SQL":
      return (
        <LogoShell>
          <span className="text-sm font-mono text-accent">SQL</span>
        </LogoShell>
      );
    case "React":
      return (
        <LogoShell>
          <span className="text-sm font-mono text-accent">Rx</span>
        </LogoShell>
      );
    case "Docker":
      return (
        <LogoShell>
          <span className="text-sm font-mono text-accent">Do</span>
        </LogoShell>
      );
    case "Git":
      return (
        <LogoShell>
          <span className="text-sm font-mono text-accent">Git</span>
        </LogoShell>
      );
    default:
      return (
        <LogoShell>
          <span className="text-sm font-mono text-muted">{name.slice(0, 2)}</span>
        </LogoShell>
      );
  }
};
