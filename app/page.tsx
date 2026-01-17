import dynamic from "next/dynamic";
import Link from "next/link";
import AnimatedText from "../components/AnimatedText";
import Typewriter from "../components/Typewriter";
import SectionHeader from "../components/SectionHeader";
import MetricCounter from "../components/MetricCounter";
import ProjectCard from "../components/ProjectCard";
import Stagger, { StaggerItem } from "../components/Stagger";
import { content } from "../lib/content";
import { formatPhone } from "../lib/utils";

const Hero3D = dynamic(() => import("../components/Hero3D"), { ssr: false });

export default function HomePage() {
  return (
    <div>
      <section className="relative mx-auto flex max-w-content flex-col items-center gap-10 px-6 pb-16 pt-16 md:flex-row md:items-stretch">
        <div className="absolute inset-0 -z-10 rounded-card border border-border bg-soft-radial opacity-80" aria-hidden />
        <div className="scanlines" aria-hidden />
        <div className="noise" aria-hidden />
        <div className="flex-1 space-y-6">
          <p className="section-subtitle">Available for internships</p>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted cursor-blink">
            System ready
          </p>
          <h1 className="text-4xl font-heading font-semibold text-primary md:text-5xl">
            <AnimatedText text={`Hi, I'm ${content.name}.`} />
          </h1>
          <p className="text-lg text-secondary">
            <AnimatedText text={content.role} />
          </p>
          <p className="text-sm text-muted">
            <Typewriter text="Building AI-powered systems with clean, reliable data flows." />
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link href="/resume" className="btn-secondary">
              View Resume
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-secondary">
            <span>{content.contact.location}</span>
            <span>{formatPhone(content.contact.phone)}</span>
            <a href={`mailto:${content.contact.email}`} className="text-accent">
              {content.contact.email}
            </a>
          </div>
        </div>
        <div className="h-[320px] w-full max-w-md flex-1">
          <Hero3D />
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-12">
        <div className="card pixel-grid">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <p className="section-subtitle">Recruiter quick view</p>
              <h2 className="text-2xl font-heading text-primary">Fast scan essentials</h2>
              <p className="text-sm text-secondary">
                {content.education.degree} - {content.education.school}
              </p>
              <a href="/resume.pdf" className="btn-secondary" download>
                Download Resume
              </a>
            </div>
            <div className="space-y-4">
              <MetricCounter value={180} label="Students mentored" />
              <MetricCounter value={1000} label="Code defects diagnosed" />
              <MetricCounter value={10000} label="Records processed" />
            </div>
            <div className="space-y-4">
              <p className="text-sm text-secondary">Top skills</p>
              <div className="flex flex-wrap gap-2">
                {content.skills[0].skills.slice(0, 5).map((skill) => (
                  <span key={skill} className="rounded-full border border-border px-3 py-1 text-xs text-secondary">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-sm text-secondary">Top projects</p>
              <ul className="text-sm text-secondary">
                {content.projects.slice(0, 3).map((project) => (
                  <li key={project.slug}>{project.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-12">
        <SectionHeader title="Featured Projects" subtitle="Selected work" />
        <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
          {content.projects.slice(0, 3).map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-content px-6 py-12">
        <SectionHeader title="Experience Snapshot" subtitle="Recent roles" />
        <Stagger className="mt-8 grid gap-6 md:grid-cols-3">
          {content.experience.map((item) => (
            <StaggerItem key={item.role}>
              <div className="card">
                <h3 className="text-lg font-heading text-primary">{item.role}</h3>
                <p className="text-sm text-secondary">{item.company}</p>
                <p className="mt-2 text-sm text-muted">{item.impact}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
