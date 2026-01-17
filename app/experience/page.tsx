import SectionHeader from "../../components/SectionHeader";
import ExperienceCard from "../../components/ExperienceCard";
import ScrollReveal from "../../components/ScrollReveal";
import { content } from "../../lib/content";

export const metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeader title="Experience" subtitle="Impact and roles" />
      <div className="mt-10 space-y-6">
        {content.experience.map((item) => (
          <ScrollReveal key={item.role}>
            <ExperienceCard item={item} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
