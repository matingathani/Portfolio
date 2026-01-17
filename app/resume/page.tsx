import dynamic from "next/dynamic";
import SectionHeader from "../../components/SectionHeader";
import { content } from "../../lib/content";

const ResumeViewer = dynamic(() => import("../../components/ResumeViewer"), { ssr: false });

export const metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeader title="Resume" subtitle="PDF preview" />
      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ResumeViewer fileUrl="/resume.pdf" />
        </div>
        <div className="space-y-6">
          <div className="card space-y-3">
            <h3 className="text-lg font-heading text-primary">Education</h3>
            <p className="text-sm text-secondary">{content.education.degree}</p>
            <p className="text-sm text-secondary">{content.education.school}</p>
            <p className="text-sm text-muted">GPA {content.education.gpa}</p>
          </div>
          <div className="card space-y-3">
            <h3 className="text-lg font-heading text-primary">Key skills</h3>
            <div className="flex flex-wrap gap-2">
              {content.skills[0].skills.slice(0, 6).map((skill) => (
                <span key={skill} className="rounded-full border border-border px-3 py-1 text-xs text-secondary">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="card space-y-3">
            <h3 className="text-lg font-heading text-primary">Top projects</h3>
            <ul className="text-sm text-secondary">
              {content.projects.map((project) => (
                <li key={project.slug}>{project.name}</li>
              ))}
            </ul>
          </div>
          <a href="/resume.pdf" className="btn-primary" download>
            Download PDF
          </a>
          <a href="/resume.pdf" className="btn-secondary" target="_blank" rel="noreferrer">
            Open PDF
          </a>
        </div>
      </div>
    </div>
  );
}
