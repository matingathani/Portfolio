import ScrollReveal from "./ScrollReveal";

export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <ScrollReveal>
      {subtitle && <p className="section-subtitle mb-2">{subtitle}</p>}
      <h2 className="section-title">{title}</h2>
    </ScrollReveal>
  );
}
