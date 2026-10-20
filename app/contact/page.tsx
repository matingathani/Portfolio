import ContactForm from "../../components/ContactForm";
import SectionHeading from "../../components/SectionHeading";
import { content } from "../../lib/content";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionHeading as="h1" eyebrow="Contact" title="Let's talk">
        The quickest way to reach me is email. I usually reply within a couple of days.
      </SectionHeading>

      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div>
            <p className="eyebrow mb-1">Email</p>
            <a href={`mailto:${content.contact.email}`} className="link text-lg">
              {content.contact.email}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-1">Elsewhere</p>
            <ul className="space-y-1 text-sm">
              <li>
                <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={content.contact.github} target="_blank" rel="noopener noreferrer" className="link">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-1">Based in</p>
            <p className="text-sm text-secondary">{content.contact.location}</p>
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4 font-heading text-xl font-semibold text-primary">Send a message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
