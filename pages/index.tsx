import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import HeroLanding from "../components/HeroLanding";
import { resume } from "../data/resume";
import { ButtonPrimary, ButtonSecondary, Card, Container, PageSection, SectionHeader } from "../components/ui";
import Link from "next/link";
import { trackEvent } from "../utils/analytics";

const Grid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const QuickView = styled(Card)`
  display: grid;
  gap: 1.5rem;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text};
  }

  p, li {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.7;
  }

  ul {
    margin: 0;
    padding-left: 1.1rem;
  }
`;

const InlineButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const CopyButton = styled.button`
  padding: 0.85rem 1.6rem;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  border: 1px solid rgba(139, 92, 246, 0.35);
  background: rgba(139, 92, 246, 0.15);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const FeaturedProjects = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled(Card)`
  display: grid;
  gap: 1rem;

  h3 {
    margin: 0;
    color: ${props => props.theme.colors.text};
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

const Home = () => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resume.recruiterIntro);
      trackEvent("recruiter_intro_copied");
    } catch {
      // Ignore copy errors silently
    }
  };

  return (
    <Layout>
      <HeroLanding />

      <PageSection>
        <Container>
          <SectionHeader>
            <h2>Recruiter Quick View</h2>
            <p>One-screen snapshot for a 30-second scan: education, skills, projects, and resume access.</p>
          </SectionHeader>
          <Grid>
            <QuickView>
              <div>
                <h3>Education</h3>
                <p>{resume.education.degree}</p>
                <p>{resume.education.school}, {resume.education.location}</p>
                <p>{resume.education.dates} · GPA {resume.education.gpa}</p>
              </div>
              <div>
                <h3>Key Skills</h3>
                <ul>
                  {resume.skills.programmingAiData.slice(0, 5).map(skill => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </QuickView>

            <QuickView>
              <div>
                <h3>Top Projects</h3>
                <ul>
                  {resume.projects.map(project => (
                    <li key={project.slug}>{project.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Resume</h3>
                <p>Download the full PDF or open the inline viewer.</p>
                <InlineButtons>
                  <Link href="/resume" passHref legacyBehavior>
                    <ButtonPrimary onClick={() => trackEvent("resume_view_click")}>View Resume</ButtonPrimary>
                  </Link>
                  <ButtonSecondary
                    href="/MatinGathaniResume2026.pdf"
                    download="MatinGathaniResume2026.pdf"
                    onClick={() => trackEvent("resume_download")}
                  >
                    Download PDF
                  </ButtonSecondary>
                </InlineButtons>
              </div>
            </QuickView>

            <QuickView>
              <div>
                <h3>Recruiter Intro</h3>
                <p>{resume.recruiterIntro}</p>
              </div>
              <CopyButton onClick={handleCopy}>Copy Recruiter Intro</CopyButton>
            </QuickView>
          </Grid>
        </Container>
      </PageSection>

      <PageSection>
        <Container>
          <SectionHeader>
            <h2>Featured Project Case Studies</h2>
            <p>Focused, recruiter-ready case studies that show problem, system design, and impact.</p>
          </SectionHeader>
          <FeaturedProjects>
            {resume.projects.map(project => (
              <ProjectCard key={project.slug}>
                <h3>{project.name}</h3>
                <p>{project.overview}</p>
                <InlineButtons>
                  <Link href={`/projects/${project.slug}`} passHref legacyBehavior>
                    <ButtonPrimary onClick={() => trackEvent("project_case_study_click")}>Open Case Study</ButtonPrimary>
                  </Link>
                </InlineButtons>
              </ProjectCard>
            ))}
          </FeaturedProjects>
        </Container>
      </PageSection>

      <PageSection>
        <Container>
          <SectionHeader>
            <h2>Ready to connect?</h2>
            <p>Let’s discuss roles in AI/ML, backend systems, or full‑stack delivery.</p>
          </SectionHeader>
          <InlineButtons>
            <Link href="/contact" passHref legacyBehavior>
              <ButtonPrimary>Contact Me</ButtonPrimary>
            </Link>
            <Link href="/experience" passHref legacyBehavior>
              <ButtonSecondary>View Experience</ButtonSecondary>
            </Link>
          </InlineButtons>
        </Container>
      </PageSection>
    </Layout>
  );
};

export default Home;
