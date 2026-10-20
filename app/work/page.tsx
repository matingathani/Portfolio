import Link from "next/link";
import SectionHeading from "../../components/SectionHeading";
import WorkGrid from "../../components/WorkGrid";

export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeading as="h1" eyebrow="Work" title="Things I've built and fixed">
        Open-source fixes, products and data projects. Filter by type.
      </SectionHeading>
      <WorkGrid />
      <p className="mt-10 text-sm text-secondary">
        Looking for pull-request details?{" "}
        <Link href="/oss" className="link underline">
          See the open-source page
        </Link>
        .
      </p>
    </div>
  );
}
