import React from "react";
import Layout from "../components/Layout";
import { resume } from "../data/resume";
import { Card, Container, PageSection, SectionHeader } from "../components/ui";
import styled from "styled-components";

const ExperienceGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const RoleCard = styled(Card)`
  display: grid;
  gap: 1rem;

  h3 {
    margin: 0;
    font-size: 1.4rem;
  }

  h4 {
    margin: 0;
    color: ${props => props.theme.colors.textSecondary};
    font-weight: 500;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.7;
  }
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: rgba(139, 92, 246, 0.2);
    border: 1px solid rgba(139, 92, 246, 0.35);
    font-size: 0.85rem;
  }
`;

const Experience = () => (
  <Layout>
    <PageSection>
      <Container>
        <SectionHeader>
          <h1>Experience</h1>
          <p>Problem → action → impact summaries that highlight engineering maturity and measurable outcomes.</p>
        </SectionHeader>
        <ExperienceGrid>
          {resume.experience.map((role) => (
            <RoleCard key={role.role}>
              <div>
                <h3>{role.role}</h3>
                <h4>{role.company} · {role.location} · {role.dates}</h4>
              </div>
              <p><strong>Problem:</strong> {role.problem}</p>
              <p><strong>Action:</strong> {role.action}</p>
              <p><strong>Impact:</strong> {role.impact}</p>
              <TagGroup>
                {role.tools.map(tool => (
                  <span key={tool}>{tool}</span>
                ))}
              </TagGroup>
            </RoleCard>
          ))}
        </ExperienceGrid>
      </Container>
    </PageSection>
  </Layout>
);

export default Experience;
