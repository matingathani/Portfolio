import React from "react";
import Layout from "../components/Layout";
import { resume } from "../data/resume";
import { Card, Container, PageSection, SectionHeader } from "../components/ui";
import styled from "styled-components";

const Narrative = styled(Card)`
  display: grid;
  gap: 1.5rem;

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.8;
  }
`;

const About = () => (
  <Layout>
    <PageSection>
      <Container>
        <SectionHeader>
          <h1>About Me</h1>
          <p>Engineer-first narrative that balances AI delivery, backend systems, and clean software practices.</p>
        </SectionHeader>
        <Narrative>
          <p>
            I’m {resume.name}, a Computer Science student at {resume.education.school} with a minor in data science. My work sits at the
            intersection of AI/ML pipelines, backend systems, and practical product delivery. I focus on building reliable systems
            with clean interfaces, defensible data processing, and measurable outcomes.
          </p>
          <p>
            As a Data Intern at Musikaar, I built and optimized Python-based ML/NLP workflows for HRMS datasets, improving accuracy
            and stability while reducing manual processing effort. That experience pushed me to document and validate model pipelines
            as rigorously as the UI and API layers that surface them.
          </p>
          <p>
            Teaching has shaped how I approach engineering. As an Engineering Tutor, I’ve mentored 180+ students across 300+ sessions,
            diagnosing 1,000+ defects and standardizing testing workflows. It reinforced my commitment to readable code, repeatable
            debugging, and evidence-based validation.
          </p>
          <p>
            In my capstone sponsor integration, I worked in an Agile team delivering real features, conducting code reviews, and
            maintaining shared documentation. I care deeply about clean commits, strong communication, and systems that are easy for
            others to pick up and extend.
          </p>
        </Narrative>
      </Container>
    </PageSection>
  </Layout>
);

export default About;
