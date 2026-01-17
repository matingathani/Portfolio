import SectionHeader from "../../components/SectionHeader";
import ContactForm from "../../components/ContactForm";
import CopyButton from "../../components/CopyButton";
import { content } from "../../lib/content";
import { buildMailto } from "../../lib/utils";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeader title="Contact" subtitle="Let's connect" />
      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card">
            <ContactForm />
          </div>
        </div>
        <div className="space-y-6">
          <div className="card space-y-3">
            <h3 className="text-lg font-heading text-primary">Direct</h3>
            <p className="text-sm text-secondary">{content.contact.email}</p>
            <a
              href={buildMailto(content.contact.email, "Portfolio Inquiry")}
              className="btn-secondary"
            >
              Email me
            </a>
            <CopyButton value={content.contact.email} />
          </div>
          <div className="card space-y-3">
            <h3 className="text-lg font-heading text-primary">Social</h3>
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-secondary hover:text-primary"
            >
              LinkedIn
            </a>
            <a
              href={content.contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-secondary hover:text-primary"
            >
              GitHub
            </a>
          </div>
          <div className="card space-y-3">
            <h3 className="text-lg font-heading text-primary">Location</h3>
            <p className="text-sm text-secondary">{content.contact.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
