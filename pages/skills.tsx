import React from "react";
import Layout from "../components/Layout";
import { resume } from "../data/resume";
import { Card, Container, PageSection, SectionHeader } from "../components/ui";
import styled from "styled-components";
import dynamic from "next/dynamic";

const SkillsGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SkillCard = styled(Card)`
  display: grid;
  gap: 1rem;

  h3 {
    margin: 0;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
  }

  ul {
    margin: 0;
    padding-left: 1.2rem;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const LogoGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  margin-bottom: 2.5rem;
`;

const LogoCard = styled(Card)`
  display: grid;
  place-items: center;
  gap: 0.5rem;
  text-align: center;
  padding: 1.5rem 1rem;
  transition: transform 0.2s ease;

  i {
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
  }

  span {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.95rem;
    font-weight: 600;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

const OrbWrapper = styled(Card)`
  height: 280px;
  margin-bottom: 2.5rem;
  padding: 0;
  overflow: hidden;
`;

const DynamicOrb = dynamic(() => import("../components/TechStackOrb"), {
  ssr: false,
  loading: () => null,
});

const Skills = () => (
  <Layout>
    <PageSection>
      <Container>
        <SectionHeader>
          <h1>Skills</h1>
          <p>ATS-friendly skill groups with context on how I’ve applied them.</p>
        </SectionHeader>
        <OrbWrapper>
          <DynamicOrb />
        </OrbWrapper>

        <LogoGrid>
          {[
            { icon: "fab fa-python", label: "Python" },
            { icon: "fab fa-java", label: "Java" },
            { icon: "fas fa-database", label: "SQL" },
            { icon: "fab fa-js", label: "JavaScript" },
            { icon: "fab fa-react", label: "React" },
            { icon: "fab fa-git-alt", label: "Git" },
            { icon: "fab fa-docker", label: "Docker" },
            { icon: "fas fa-robot", label: "ML / NLP" },
          ].map((skill) => (
            <LogoCard key={skill.label}>
              <i className={skill.icon} />
              <span>{skill.label}</span>
            </LogoCard>
          ))}
        </LogoGrid>

        <SkillsGrid>
          <SkillCard>
            <h3>Programming & AI</h3>
            <p>Used across ML pipeline development, tutoring, and systems coursework.</p>
            <ul>
              {resume.skills.programmingAiData.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </SkillCard>
          <SkillCard>
            <h3>Backend, APIs & Testing</h3>
            <p>Applied in API integrations, response validation, and test coverage improvements.</p>
            <ul>
              {resume.skills.backendApisTesting.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </SkillCard>
          <SkillCard>
            <h3>Data & Databases</h3>
            <p>Database modeling, query optimization, and data quality improvements.</p>
            <ul>
              {resume.skills.dataDatabases.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </SkillCard>
          <SkillCard>
            <h3>DevOps & Tooling</h3>
            <p>Version control discipline and containerized workflows for reliable delivery.</p>
            <ul>
              {resume.skills.devOpsTooling.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </SkillCard>
          <SkillCard>
            <h3>Software Engineering Practices</h3>
            <p>Clean, documented, and secure engineering habits from tutoring and capstone work.</p>
            <ul>
              {resume.skills.softwarePractices.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </SkillCard>
          <SkillCard>
            <h3>Frontend & Business Tools</h3>
            <p>Used for responsive UI, reporting, and workflow automation.</p>
            <ul>
              {[...resume.skills.frontendFullstack, ...resume.skills.businessTools].map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </SkillCard>
        </SkillsGrid>
      </Container>
    </PageSection>
  </Layout>
);

export default Skills;
