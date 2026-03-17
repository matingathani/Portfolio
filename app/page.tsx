import Link from "next/link";
import AnimatedText from "../components/AnimatedText";
import Typewriter from "../components/Typewriter";
import SectionHeader from "../components/SectionHeader";
import MetricCounter from "../components/MetricCounter";
import ProjectCard from "../components/ProjectCard";
import ExperienceCard from "../components/ExperienceCard";
import LazyContactForm from "../components/LazyContactForm";
import CopyButton from "../components/CopyButton";
import SkillGroupCard from "../components/SkillGroupCard";
import { SkillLogo } from "../components/SkillLogo";
import SkillProficiencyBar from "../components/SkillProficiencyBar";
import ImpactBars from "../components/ImpactBars";
import LazyResume from "../components/LazyResume";
import TestimonialCard from "../components/TestimonialCard";
import AchievementBadge from "../components/AchievementBadge";
import ProjectFilter from "../components/ProjectFilter";
import GitHubActivity from "../components/GitHubActivity";
import GitContribSnapshot from "../components/GitContribSnapshot";
import RecentAiTrainingCard from "../components/RecentAiTrainingCard";
import ProjectsSection from "../components/ProjectsSection";
import ColorShiftText from "../components/ColorShiftText";
import Tooltip from "../components/Tooltip";
import Image from "next/image";
import { content } from "../lib/content";
import { formatPhone, slugify } from "../lib/utils";

export default function HomePage() {
  return (
    <div>
      <section data-section="hero" className="relative mx-auto flex max-w-content flex-col items-center gap-10 px-6 pb-16 pt-16 md:flex-row md:items-start">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 border-2 border-accent/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <ColorShiftText speed={0.4}>
              <p className="section-subtitle font-bold">Available for internships</p>
            </ColorShiftText>
          </div>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted cursor-blink">Adventure ready</p>
          <h1 className="text-4xl font-heading font-semibold md:text-5xl">
            <ColorShiftText speed={0.8}>
              <AnimatedText text={`Hi, I'm ${content.name}.`} />
            </ColorShiftText>
          </h1>
          <p className="text-lg">
            <ColorShiftText speed={0.6}>
              <AnimatedText text={content.role} />
            </ColorShiftText>
          </p>
          <p className="text-sm text-muted">
            <Typewriter text="Building AI-powered systems with clean, reliable data flows." />
          </p>
          <div className="flex flex-wrap gap-3">
            <Tooltip content="Explore my featured projects">
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
            </Tooltip>
            <Tooltip content="Download my resume">
              <a href="#resume" className="btn-secondary">
                View Resume
              </a>
            </Tooltip>
            <Tooltip content="Get in touch with me">
              <a href="#contact" className="btn-secondary">
                Contact
              </a>
            </Tooltip>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-secondary">
            <span>{content.contact.location}</span>
            <span>{formatPhone(content.contact.phone)}</span>
            <ColorShiftText speed={0.5}>
              <a href={`mailto:${content.contact.email}`} className="hover:underline">
                {content.contact.email}
              </a>
            </ColorShiftText>
          </div>
        </div>
        <div className="w-full max-w-sm flex-1 md:flex-none md:w-[360px] relative">
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-blue-500/20 shadow-xl hover:shadow-2xl transition-all duration-300" style={{ background: 'rgba(6,11,24,0.4)' }}>
            <Image
              src="/profile-photo.webp"
              alt={content.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 300px, 360px"
              style={{ objectPosition: "center 30%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
          </div>
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
                  <span key={skill} className="rounded-full border-2 border-border px-3 py-1 text-xs font-semibold text-secondary hover:border-accent hover:text-accent transition-colors">
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
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="card">
            <h3 className="text-lg font-heading text-primary">Impact snapshot</h3>
            <p className="mt-2 text-sm text-secondary">Resume-backed metrics, scaled by magnitude.</p>
            <div className="mt-4">
              <ImpactBars items={content.impactMetrics} />
            </div>
          </div>
          <div className="card space-y-3">
            <h3 className="text-lg font-heading text-primary">Fast context</h3>
            <p className="text-sm text-secondary">{content.recruiterIntro}</p>
            <Tooltip content="Download my resume in PDF format">
              <a href="/MatinGathaniResume2026.pdf" className="btn-secondary" download>
                Download Resume
              </a>
            </Tooltip>
          </div>
          <GitContribSnapshot username={content.contact.github.split("/").pop() || "matingathani"} />
          {content.recentAiTraining && (
            <RecentAiTrainingCard training={content.recentAiTraining} />
          )}
        </div>
      </section>

      <section id="experience" data-section="experience" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
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
                  <span key={tool} className="rounded-full border-2 border-border px-3 py-1 text-xs font-semibold text-secondary hover:border-accent hover:text-accent transition-colors">
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

      <section id="projects" data-section="projects" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
        <SectionHeader 
          title={<ColorShiftText speed={0.3}>Projects</ColorShiftText>} 
          subtitle="Selected work" 
        />
        <div className="mt-8">
          <ProjectsSection projects={content.projects} />
        </div>
      </section>

      {content.testimonials && content.testimonials.length > 0 && (
        <section id="testimonials" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
          <SectionHeader 
            title={<ColorShiftText speed={0.3}>Testimonials</ColorShiftText>} 
            subtitle="What others say" 
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {content.testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </section>
      )}

      {content.achievements && content.achievements.length > 0 && (
        <section id="achievements" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
          <SectionHeader 
            title={<ColorShiftText speed={0.3}>Achievements</ColorShiftText>} 
            subtitle="Milestones & highlights" 
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.achievements.map((achievement, index) => (
              <AchievementBadge key={index} achievement={achievement} index={index} />
            ))}
          </div>
        </section>
      )}

      <section id="skills" data-section="skills" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
        <SectionHeader 
          title={<ColorShiftText speed={0.3}>Skills</ColorShiftText>} 
          subtitle="Toolbox" 
        />
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
                <Tooltip key={skill} content={`Proficient in ${skill}`}>
                  <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
                    <SkillLogo name={skill} />
                    <span className="text-sm text-secondary font-medium">{skill}</span>
                  </div>
                </Tooltip>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-primary">Proficiency snapshot</h4>
              <div className="mt-3 space-y-3">
                {content.skillProficiencies.map((skill) => (
                  <SkillProficiencyBar key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-heading text-primary">Signal stack</h3>
              <p className="mt-2 text-sm text-secondary">
                Blending ML, APIs, and data systems with production-focused testing and documentation.
              </p>
              <div className="mt-4 h-48 flex items-center justify-center rounded-xl" style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)' }}>
                <p className="text-xs font-mono text-muted tracking-widest uppercase">Neural signal stack</p>
              </div>
            </div>
            <GitHubActivity username={content.contact.github.split("/").pop() || "matingathani"} />
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {content.skills.map((group) => (
            <SkillGroupCard key={group.title} group={group} />
          ))}
        </div>
      </section>

      <section id="resume" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
        <SectionHeader 
          title={<ColorShiftText speed={0.3}>Resume</ColorShiftText>} 
          subtitle="Preview" 
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LazyResume fileUrl="/MatinGathaniResume2026.pdf" />
          </div>
          <div className="space-y-4">
            <div className="card space-y-3">
              <h3 className="text-lg font-heading text-primary">Summary</h3>
              <p className="text-sm text-secondary">{content.summary}</p>
            </div>
            <Tooltip content="Download resume as PDF">
              <a href="/MatinGathaniResume2026.pdf" className="btn-primary" download>
                Download PDF
              </a>
            </Tooltip>
          </div>
        </div>
      </section>

      <section id="contact" data-section="contact" className="section-block mx-auto max-w-content scroll-mt-24 px-6 py-12">
        <SectionHeader 
          title={<ColorShiftText speed={0.3}>Contact</ColorShiftText>} 
          subtitle="Let's connect" 
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="card">
              <LazyContactForm />
            </div>
          </div>
          <div className="space-y-4">
            <div className="card space-y-3">
              <h3 className="text-lg font-heading text-primary">Direct</h3>
              <p className="text-sm text-secondary">{content.contact.email}</p>
              <Tooltip content="Click to copy email address">
                <CopyButton value={content.contact.email} />
              </Tooltip>
            </div>
            <div className="card space-y-3">
              <h3 className="text-lg font-heading text-primary">Social</h3>
              <Tooltip content="Visit my LinkedIn profile">
                <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="text-sm text-secondary hover:text-accent font-medium transition-colors">
                  LinkedIn →
                </a>
              </Tooltip>
              <Tooltip content="Visit my GitHub profile">
                <a href={content.contact.github} target="_blank" rel="noreferrer" className="text-sm text-secondary hover:text-accent font-medium transition-colors">
                  GitHub →
                </a>
              </Tooltip>
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
