import Image from "next/image";
import SectionHeader from "../../components/SectionHeader";
import ScrollReveal from "../../components/ScrollReveal";
import { content } from "../../lib/content";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeader title="About" subtitle="Narrative" />
      <div className="mt-8 grid gap-10 md:grid-cols-3">
        <ScrollReveal className="md:col-span-2">
          <div className="card space-y-4">
            <p className="text-sm text-secondary">{content.summary}</p>
            <p className="text-sm text-secondary">
              I enjoy building systems where data pipelines, API contracts, and UX come together cleanly. My
              focus is on reliability, measurable performance, and clear documentation that enables teams to
              move fast without regressions.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="card space-y-4">
            <Image src="/avatar.svg" alt="Matin Gathani" width={240} height={240} className="w-full rounded-card border border-border" />
            <h3 className="text-lg font-heading text-primary">Values</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li>Testing and regression discipline</li>
              <li>Readable documentation and handoffs</li>
              <li>Performance-first data handling</li>
              <li>Collaborative delivery with clear ownership</li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
