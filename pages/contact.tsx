import React, { useState } from "react";
import Layout from "../components/Layout";
import { resume } from "../data/resume";
import { ButtonPrimary, Card, Container, PageSection, SectionHeader } from "../components/ui";
import styled from "styled-components";
import { trackEvent } from "../utils/analytics";

const FormCard = styled(Card)`
  display: grid;
  gap: 1.25rem;

  label {
    font-weight: 600;
  }

  input, textarea {
    width: 100%;
    padding: 0.85rem 1rem;
    border-radius: ${props => props.theme.shapes.borderRadiusSmall};
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 1rem;
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setFormState({ name: "", email: "", company: "", website: "", message: "", honeypot: "" });
      trackEvent("contact_submission");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <PageSection>
        <Container>
          <SectionHeader>
            <h1>Contact</h1>
            <p>Send a message directly, or reach me via email/LinkedIn.</p>
          </SectionHeader>

          <Grid>
            <Card>
              <h3>Contact Details</h3>
              <p>Email: <a href={`mailto:${resume.contact.email}`}>{resume.contact.email}</a></p>
              <p>Phone: <a href={`tel:${resume.contact.phone}`}>{resume.contact.phone}</a></p>
              <p>LinkedIn: <a href={resume.contact.linkedin} target="_blank" rel="noreferrer">{resume.contact.linkedin}</a></p>
              <p>Location: {resume.contact.location}</p>
            </Card>

            <FormCard as="form" onSubmit={handleSubmit}>
              <div style={{ display: "none" }} aria-hidden="true">
                <label htmlFor="honeypot">Leave this field empty</label>
                <input id="honeypot" name="honeypot" value={formState.honeypot} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" value={formState.name} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={formState.email} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="company">Company (optional)</label>
                <input id="company" name="company" value={formState.company} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="website">Website (optional)</label>
                <input id="website" name="website" value={formState.website} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={formState.message} onChange={handleChange} required />
              </div>
              <ButtonPrimary as="button" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message"}
              </ButtonPrimary>
              <div aria-live="polite">
                {status === "success" && <p>Thanks! Your message was sent successfully.</p>}
                {status === "error" && <p>Sorry, something went wrong. Please try again.</p>}
              </div>
            </FormCard>
          </Grid>
        </Container>
      </PageSection>
    </Layout>
  );
};

export default Contact;
