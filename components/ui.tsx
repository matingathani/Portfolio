import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 1.25rem;
  }
`;

export const PageSection = styled.section`
  padding: 120px 0 80px;
  position: relative;
`;

export const SectionHeader = styled.div`
  margin-bottom: 2.5rem;

  h1, h2 {
    font-size: 2.75rem;
    margin-bottom: 0.75rem;
    background: ${props => props.theme.colors.gradient1};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 1.1rem;
    max-width: 720px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    h1, h2 {
      font-size: 2.1rem;
    }
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: ${props => props.theme.shapes.borderRadius};
  border: 1px solid rgba(139, 92, 246, 0.25);
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 2rem;
  position: relative;
`;

export const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.85rem;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: ${props => props.theme.colors.text};
`;

export const ButtonPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  background: ${props => props.theme.colors.gradient2};
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

export const ButtonSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.35);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.small};
  }
`;
