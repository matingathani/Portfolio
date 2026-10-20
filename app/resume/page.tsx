import LazyResume from "../../components/LazyResume";
import SectionHeading from "../../components/SectionHeading";

export const metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading as="h1" eyebrow="Resume" title="Resume">
        One page, updated October 2026.
      </SectionHeading>
      <div className="mb-6 flex flex-wrap gap-3">
        <a href="/resume.pdf" download className="btn-primary">
          Download PDF
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
          Open in new tab
        </a>
      </div>
      <LazyResume fileUrl="/resume.pdf" />
    </div>
  );
}
