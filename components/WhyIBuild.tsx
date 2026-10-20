import Link from "next/link";
import Section from "./Section";
import { content } from "../lib/content";

export default function WhyIBuild() {
  return (
    <Section band labelledBy="why-i-build">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow mb-3">01 / Who I am</p>
          <h2 id="why-i-build" className="font-heading text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Why I build
          </h2>
          <p className="mt-6 font-heading text-2xl leading-snug text-primary md:text-3xl">{content.why}</p>
          <Link href="/about" className="link mt-8 inline-block text-sm">
            Full background, experience and skills &rarr;
          </Link>
        </div>
        <ul className="self-start border-y border-border">
          {content.highlights.map((item) => (
            <li key={item.title} className="border-b border-border py-5 last:border-b-0">
              <p className="font-medium text-primary">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
