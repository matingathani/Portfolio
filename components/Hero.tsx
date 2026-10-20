import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import StatsCard from "./StatsCard";
import { content } from "../lib/content";
import { homeStats } from "../lib/stats";

export default function Hero() {
  const { hero } = content;

  return (
    <section className="mx-auto grid max-w-content gap-12 px-6 py-14 md:grid-cols-[1.35fr_1fr] md:items-start md:py-24">
      <div>
        <p className="font-mono text-sm text-muted">
          <span className="text-accent">matin@imperial</span>:~$ whoami
        </p>
        <h1 className="mt-6 font-heading text-5xl font-semibold leading-[1.02] tracking-tight text-primary md:text-7xl">
          {content.name}
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-relaxed text-primary">{hero.headline}</p>
        <p className="mt-4 max-w-xl leading-relaxed text-secondary">{hero.intro}</p>
        <p className="eyebrow mt-6">{hero.currently}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work" className="btn-primary">
            See my work
          </Link>
          <Link href="/resume" className="btn-secondary">
            View resume
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact
          </Link>
        </div>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
          <StatsCard stats={homeStats} />
          <SocialLinks />
        </div>
      </div>

      <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border bg-surface md:max-w-none">
        <figcaption className="flex items-center justify-between border-b border-border px-3 py-2 font-mono text-xs text-muted">
          <span>~/portrait.jpg</span>
          <span>768&times;1024</span>
        </figcaption>
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="/portrait.jpg"
            alt="Portrait of Matin Gathani"
            fill
            priority
            sizes="(min-width: 768px) 400px, 90vw"
            className="object-cover object-[50%_40%]"
          />
        </div>
      </figure>
    </section>
  );
}
