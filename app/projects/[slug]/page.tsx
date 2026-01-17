import { notFound } from "next/navigation";
import SectionHeader from "../../../components/SectionHeader";
import ScrollReveal from "../../../components/ScrollReveal";
import { content } from "../../../lib/content";

type Params = { slug: string };

export const generateStaticParams = async () => {
  return content.projects.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = ({ params }: { params: Params }) => {
  const project = content.projects.find((item) => item.slug === params.slug);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: project.overview,
  };
};

export default function ProjectDetailPage({ params }: { params: Params }) {
  const project = content.projects.find((item) => item.slug === params.slug);
  if (!project) return notFound();

  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeader title={project.name} subtitle={project.dates} />
      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <ScrollReveal className="lg:col-span-2">
          <div className="card space-y-6">
            <div>
              <p className="section-subtitle">Problem</p>
              <p className="mt-2 text-sm text-secondary">{project.challenges[0]}</p>
            </div>
            <div>
              <p className="section-subtitle">Solution</p>
              <p className="mt-2 text-sm text-secondary">{project.overview}</p>
            </div>
            <div>
              <p className="section-subtitle">Features</p>
              <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-secondary">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="section-subtitle">My contributions</p>
              <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-secondary">
                {project.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="card space-y-6">
            <div>
              <p className="section-subtitle">Architecture</p>
              <svg viewBox="0 0 260 180" className="mt-3 w-full">
                <rect x="10" y="20" width="80" height="40" rx="8" fill="#0f172a" stroke="#3b82f6" />
                <text x="50" y="45" textAnchor="middle" fill="#E6EAF2" fontSize="10">
                  Client
                </text>
                <rect x="100" y="20" width="80" height="40" rx="8" fill="#0f172a" stroke="#22d3ee" />
                <text x="140" y="45" textAnchor="middle" fill="#E6EAF2" fontSize="10">
                  API
                </text>
                <rect x="190" y="20" width="60" height="40" rx="8" fill="#0f172a" stroke="#3b82f6" />
                <text x="220" y="45" textAnchor="middle" fill="#E6EAF2" fontSize="10">
                  Data
                </text>
                <line x1="90" y1="40" x2="100" y2="40" stroke="#3b82f6" />
                <line x1="180" y1="40" x2="190" y2="40" stroke="#22d3ee" />
              </svg>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-secondary">
                {project.architecture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="section-subtitle">Tech stack</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-border px-3 py-1 text-xs text-secondary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="section-subtitle">Outcomes</p>
              <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-secondary">
                {project.results.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
