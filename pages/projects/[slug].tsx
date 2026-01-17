import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { resume } from "../../data/resume";
import { Card, Container, PageSection, SectionHeader, ButtonSecondary } from "../../components/ui";
import styled from "styled-components";
import Link from "next/link";

const CaseGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const TwoCol = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
`;

const Diagram = styled.div`
  width: 100%;
  height: 220px;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(139, 92, 246, 0.2);
  display: grid;
  place-items: center;

  svg {
    max-width: 90%;
  }
`;

const ProjectCaseStudy = () => {
  const { query } = useRouter();
  const slug = query.slug as string;
  const project = resume.projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Layout>
        <PageSection>
          <Container>
            <SectionHeader>
              <h1>Project not found</h1>
              <p>This case study is not available yet.</p>
            </SectionHeader>
          </Container>
        </PageSection>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageSection>
        <Container>
          <SectionHeader>
            <h1>{project.name}</h1>
            <p>{project.overview}</p>
          </SectionHeader>

          <CaseGrid>
            <Card>
              <strong>Timeline</strong>
              <p>{project.dates}</p>
              <strong>Tech Stack</strong>
              <List>
                {project.techStack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </List>
            </Card>

            <Card>
              <strong>Responsibilities</strong>
              <List>
                {project.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
            </Card>

            <TwoCol>
              <Card>
                <strong>Architecture (High-Level)</strong>
                <Diagram>
                  <svg viewBox="0 0 420 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="50" width="120" height="60" rx="12" stroke="#8b5cf6" />
                    <rect x="150" y="30" width="120" height="60" rx="12" stroke="#06b6d4" />
                    <rect x="290" y="70" width="120" height="60" rx="12" stroke="#ec4899" />
                    <text x="70" y="85" fill="#ffffff" textAnchor="middle" fontSize="12">Client/UI</text>
                    <text x="210" y="65" fill="#ffffff" textAnchor="middle" fontSize="12">API Layer</text>
                    <text x="350" y="105" fill="#ffffff" textAnchor="middle" fontSize="12">Data / Services</text>
                    <line x1="130" y1="80" x2="150" y2="60" stroke="#8b5cf6" />
                    <line x1="270" y1="70" x2="290" y2="90" stroke="#06b6d4" />
                  </svg>
                </Diagram>
                <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "0.75rem" }}>
                  Simplified flow showing how features connect through APIs. Detailed architecture available upon request.
                </p>
              </Card>
              <Card>
                <strong>Engineering Challenges</strong>
                <List>
                  {project.challenges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </List>
              </Card>
            </TwoCol>

            <Card>
              <strong>Results / Impact</strong>
              <List>
                {project.results.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
            </Card>

            <Link href="/projects" passHref legacyBehavior>
              <ButtonSecondary>Back to Projects</ButtonSecondary>
            </Link>
          </CaseGrid>
        </Container>
      </PageSection>
    </Layout>
  );
};

export default ProjectCaseStudy;
