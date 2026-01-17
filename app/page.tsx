import dynamic from "next/dynamic";
import Link from "next/link";
import AnimatedText from "../components/AnimatedText";
import Typewriter from "../components/Typewriter";
import SectionHeader from "../components/SectionHeader";
import MetricCounter from "../components/MetricCounter";
import ProjectCard from "../components/ProjectCard";
import ExperienceCard from "../components/ExperienceCard";
import ContactForm from "../components/ContactForm";
import CopyButton from "../components/CopyButton";
import SkillGroupCard from "../components/SkillGroupCard";
import { SkillLogo } from "../components/SkillLogo";
import { content } from "../lib/content";
import { formatPhone, slugify } from "../lib/utils";

const Hero3D = dynamic(() => import("../components/Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-card border border-border bg-[#0b1220]">
      <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted">Loading</span>
    </div>
  ),
});
const Signal3D = dynamic(() => import("../components/Signal3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-card border border-border bg-[#0b1220]">
      <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted">Loading</span>
    </div>
  ),
});
const ResumeViewer = dynamic(() => import("../components/ResumeViewer"), {
  ssr: false,
  loading: () => (
    <div className="card flex min-h-[520px] items-center justify-center text-sm text-secondary">
      Loading resume...
    </div>
  ),
});

export default function HomePage() {
  return (
    <div>
      <section className="relative mx-auto flex max-w-content flex-col items-center gap-10 px-6 pb-16 pt-16 md:flex-row md:items-stretch">
        <div className="absolute inset-0 -z-10 rounded-card border border-border bg-soft-radial opacity-80" aria-hidden />
        <div className="scanlines" aria-hidden />
        <div className="noise" aria-hidden />
        <div className="flex-1 space-y-6">
          <p className="section-subtitle">Available for internships</p>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted cursor-blink">System ready</p>
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
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#resume" className="btn-secondary">
              View Resume
            </a>
            <a href="#contact" className="btn-secondary">
              Contact
            </a>
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

      <section className="section-block mx-auto max-w-content px-6 py-12">
        <div className="card pixel-grid">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <p className="section-subtitle">Recruiter quick view</p>
              <h2 className="text-2xl font-heading text-primary">Fast scan essentials</h2>
              <p className="text-sm text-secondary">
                {content.education.degree} - {content.education.school}
              </p>
              <a href="/MatinGathaniResume2026.pdf" className="btn-secondary" download>
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

      <section id="experience" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
        <SectionHeader title="Experience" subtitle="Impact and roles" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {content.experience.map((item) => (
            <ExperienceCard
              key={item.role}
              item={item}
              detailsHref={`#experience-${slugify(item.role)}`}
            />
          ))}
        </div>
        <div className="mt-10 space-y-6">
          {content.experience.map((item) => (
            <div key={item.role} id={`experience-${slugify(item.role)}`} className="card">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-heading text-primary">{item.role}</h3>
                  <p className="text-sm text-secondary">{item.company}</p>
                </div>
                <span className="text-xs text-muted">{item.dates}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-border px-3 py-1 text-xs text-secondary">
                    {tool}
                  </span>
                ))}
              </div>
              <div className="mt-4 grid gap-3 text-sm text-secondary">
                <p>
                  <span className="font-semibold text-primary">Challenge:</span> {item.problem}
                </p>
                <p>
                  <span className="font-semibold text-primary">Execution:</span> {item.action}
                </p>
                <p>
                  <span className="font-semibold text-primary">Result:</span> {item.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
        <SectionHeader title="Projects" subtitle="Selected work" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {content.projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              detailsHref={`#project-${project.slug}`}
            />
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {content.projects.map((project) => (
            <div key={project.slug} id={`project-${project.slug}`} className="card space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-heading text-primary">{project.name}</h3>
                <span className="text-xs text-muted">{project.dates}</span>
              </div>
              <p className="text-sm text-secondary">{project.overview}</p>
              <div className="grid gap-4 text-sm text-secondary">
                <div>
                  <p className="section-subtitle">Problem</p>
                  <p className="mt-2">{project.challenges[0]}</p>
                </div>
                <div>
                  <p className="section-subtitle">Solution</p>
                  <ul className="mt-2 list-disc space-y-2 pl-4">
                    {project.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="section-subtitle">Architecture</p>
                  <ul className="mt-2 list-disc space-y-2 pl-4">
                    {project.architecture.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="section-subtitle">Impact</p>
                  <ul className="mt-2 list-disc space-y-2 pl-4">
                    {project.results.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-border px-3 py-1 text-xs text-secondary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
        <SectionHeader title="Skills" subtitle="Toolbox" />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="card lg:col-span-2">
            <h3 className="text-lg font-heading text-primary">Core languages</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                "Python",
                "Java",
                "C++",
                "JavaScript",
                "SQL",
                "HTML5",
                "CSS3",
                "React",
                "Docker",
                "Git",
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                  <SkillLogo name={skill} />
                  <span className="text-sm text-secondary">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="text-lg font-heading text-primary">Signal stack</h3>
            <p className="mt-2 text-sm text-secondary">
              Blending ML, APIs, and data systems with production-focused testing and documentation.
            </p>
            <div className="mt-4 h-48">
              <Signal3D />
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {content.skills.map((group) => (
            <SkillGroupCard key={group.title} group={group} />
          ))}
        </div>
      </section>

      <section id="resume" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
        <SectionHeader title="Resume" subtitle="Preview" />
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ResumeViewer fileUrl="/MatinGathaniResume2026.pdf" />
          </div>
          <div className="space-y-4">
            <div className="card space-y-3">
              <h3 className="text-lg font-heading text-primary">Summary</h3>
              <p className="text-sm text-secondary">{content.summary}</p>
            </div>
            <a href="/MatinGathaniResume2026.pdf" className="btn-primary" download>
              Download PDF
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
        <SectionHeader title="Contact" subtitle="Let's connect" />
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="card">
              <ContactForm />
            </div>
          </div>
          <div className="space-y-4">
            <div className="card space-y-3">
              <h3 className="text-lg font-heading text-primary">Direct</h3>
              <p className="text-sm text-secondary">{content.contact.email}</p>
              <CopyButton value={content.contact.email} />
            </div>
            <div className="card space-y-3">
              <h3 className="text-lg font-heading text-primary">Social</h3>
              <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="text-sm text-secondary hover:text-primary">
                LinkedIn
              </a>
              <a href={content.contact.github} target="_blank" rel="noreferrer" className="text-sm text-secondary hover:text-primary">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block mx-auto max-w-content px-6 py-12">
        <div className="card flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-subtitle">Deep dive</p>
            <h2 className="text-2xl font-heading text-primary">More context on background</h2>
            <p className="text-sm text-secondary">Use the About page for a narrative summary.</p>
          </div>
          <Link href="/about" className="btn-secondary">
            About Me
          </Link>
        </div>
      </section>
    </div>
  );
}
