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
      <SectionHeader title="About Me" subtitle="Engineer building across data, analytics, and AI." />
      <div className="mt-10 grid gap-10 lg:grid-cols-[320px_1fr]">
        <ScrollReveal>
          <div className="card space-y-4">
            <Image
              src="/matin-gathani.webp"
              alt="Matin Gathani"
              width={640}
              height={800}
              className="h-auto w-full rounded-card border border-border object-cover"
              priority
            />
            <div>
              <p className="text-lg font-heading text-primary">{content.name}</p>
              <p className="text-sm text-secondary">{content.role}</p>
              <p className="text-sm text-muted">{content.contact.location}</p>
            </div>
            <div className="space-y-2 text-sm text-secondary">
              <a href={`mailto:${content.contact.email}`} className="hover:text-primary">
                {content.contact.email}
              </a>
              <a href={content.contact.github} target="_blank" rel="noreferrer" className="hover:text-primary">
                GitHub
              </a>
              <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">
                LinkedIn
              </a>
            </div>
          </div>
        </ScrollReveal>
        <div className="space-y-8">
          <ScrollReveal>
            <div className="card space-y-4">
              <p className="text-sm text-secondary">{content.summary}</p>
              <p className="text-sm text-secondary">
                I care about systems that move data cleanly from input to insight - stable preprocessing,
                predictable APIs, and analytics that decision-makers can trust.
              </p>
              <p className="text-sm text-secondary">
                My focus areas right now: open-source contribution to Cloudflare&apos;s developer tooling,
                business analytics and applied AI, and backend reliability.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="card space-y-4">
              <h3 className="text-lg font-heading text-primary">Education</h3>
              <div className="space-y-4 text-sm text-secondary">
                {content.education.map((edu) => (
                  <div key={edu.school}>
                    <p>{edu.dates}</p>
                    <p>{edu.degree} - {edu.school}</p>
                    <p className="text-sm text-muted">{edu.location}</p>
                    {edu.gpa && <p className="text-sm text-muted">GPA {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="card space-y-4">
              <h3 className="text-lg font-heading text-primary">Work Experience</h3>
              <div className="space-y-4 text-sm text-secondary">
                {content.experience.map((item) => (
                  <div key={item.role}>
                    <p className="text-primary font-semibold">{item.role}</p>
                    <p>{item.company} - {item.location}</p>
                    <p className="text-xs text-muted">{item.dates}</p>
                    <ul className="mt-2 list-disc space-y-2 pl-4">
                      <li>{item.action}</li>
                      <li>{item.impact}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="card space-y-4">
              <h3 className="text-lg font-heading text-primary">Impact</h3>
              <div className="grid gap-4 text-sm text-secondary md:grid-cols-2">
                <div>
                  <p className="text-2xl font-heading text-primary">28</p>
                  <p>Merged OSS fixes</p>
                </div>
                <div>
                  <p className="text-2xl font-heading text-primary">180+</p>
                  <p>Students mentored</p>
                </div>
                <div>
                  <p className="text-2xl font-heading text-primary">1,000+</p>
                  <p>Code defects diagnosed</p>
                </div>
                <div>
                  <p className="text-2xl font-heading text-primary">10,000+</p>
                  <p>Records processed</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
