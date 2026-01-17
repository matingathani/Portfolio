import React from "react";
import Layout from "../../components/Layout";
import { resume } from "../../data/resume";
import { Card, Container, PageSection, SectionHeader, ButtonPrimary } from "../../components/ui";
import styled from "styled-components";
import Link from "next/link";
import { trackEvent } from "../../utils/analytics";

const ProjectsGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled(Card)`
  display: grid;
  gap: 1rem;

  h3 {
    margin: 0;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

const Projects = () => (
  <Layout>
    <PageSection>
      <Container>
        <SectionHeader>
          <h1>Project Case Studies</h1>
          <p>Deep-dive case studies with architecture, responsibilities, and results.</p>
        </SectionHeader>
        <ProjectsGrid>
          {resume.projects.map((project) => (
            <ProjectCard key={project.slug}>
              <h3>{project.name}</h3>
              <p>{project.overview}</p>
              <p><strong>Dates:</strong> {project.dates}</p>
              <Link href={`/projects/${project.slug}`} passHref legacyBehavior>
                <ButtonPrimary onClick={() => trackEvent("project_case_study_click")}>Open Case Study</ButtonPrimary>
              </Link>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </PageSection>
  </Layout>
);

export default Projects;
