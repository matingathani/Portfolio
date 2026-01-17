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
  position: relative;

  h1, h2 {
    font-size: 2.75rem;
    margin-bottom: 0.75rem;
    font-family: ${props => props.theme.typography.headingFont};
    font-weight: 700;
    letter-spacing: -0.02em;
    background: ${props => props.theme.colors.gradient1};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 60px;
      height: 2px;
      background: ${props => props.theme.colors.primary};
      box-shadow: 0 0 8px ${props => props.theme.colors.primary};
    }
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 1.1rem;
    max-width: 720px;
    font-family: ${props => props.theme.typography.bodyFont};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    h1, h2 {
      font-size: 2.1rem;
    }
  }
`;

export const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border-radius: ${props => props.theme.shapes.borderRadius};
  border: 1px solid ${props => props.theme.colors.gridLine};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.glow};
    transform: translateY(-2px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

export const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  font-size: 0.85rem;
  font-family: ${props => props.theme.typography.monoFont};
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid ${props => props.theme.colors.gridLine};
  color: ${props => props.theme.colors.textSecondary};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: rgba(59, 130, 246, 0.15);
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
  }
`;

export const ButtonPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  background: ${props => props.theme.colors.gradient1};
  border: 1px solid ${props => props.theme.colors.primary};
  color: #fff;
  font-family: ${props => props.theme.typography.bodyFont};
  font-weight: 600;
  text-decoration: none;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.pixelGlow};
    
    &::before {
      left: 100%;
    }
  }
`;

export const ButtonSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.gridLine};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.bodyFont};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.small};
    background: rgba(59, 130, 246, 0.05);
  }
`;
