import SectionHeader from "../../components/SectionHeader";
import ProjectsGrid from "../../components/ProjectsGrid";
import { content } from "../../lib/content";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeader title="Projects" subtitle="Case studies" />
      <ProjectsGrid projects={content.projects} />
    </div>
  );
}
