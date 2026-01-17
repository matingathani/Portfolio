import SectionHeader from "../../components/SectionHeader";
import SkillGroupCard from "../../components/SkillGroupCard";
import { content } from "../../lib/content";

export const metadata = {
  title: "Skills",
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeader title="Skills" subtitle="Focused toolset" />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {content.skills.map((group) => (
          <SkillGroupCard key={group.title} group={group} />
        ))}
      </div>
    </div>
  );
}
