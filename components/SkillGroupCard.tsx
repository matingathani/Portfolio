import { SkillGroup } from "../lib/types";

export default function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <div className="card">
      <h3 className="text-lg font-heading text-primary">{group.title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span key={skill} className="rounded-full border border-border px-3 py-1 text-xs text-secondary">
            {skill}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-secondary">{group.proof}</p>
    </div>
  );
}
