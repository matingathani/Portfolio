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
              I care about systems that move data cleanly from input to insight. That means stable preprocessing,
              predictable APIs, and UX that makes the tooling approachable for real users.
            </p>
            <p className="text-sm text-secondary">
              My focus areas right now: production-minded ML workflows, backend reliability, and collaboration
              patterns that keep teams aligned.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="card space-y-4">
            <h3 className="text-lg font-heading text-primary">Values</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li>Testing and regression discipline</li>
              <li>Readable documentation and handoffs</li>
              <li>Performance-first data handling</li>
              <li>Collaborative delivery with clear ownership</li>
            </ul>
            <a href="/#contact" className="btn-secondary">
              Connect on Home
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
