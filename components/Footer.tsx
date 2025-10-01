'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const FooterContainer = styled.footer`
  background-color: rgba(10, 10, 25, 0.8);
  backdrop-filter: blur(8px);
  padding: 2rem 0;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterLink = styled.a`
  display: block;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  text-decoration: none;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Matin Gathani</h3>
          <p>Computer Science Student & AI Engineer passionate about creating innovative solutions through machine learning, software development, and collaborative problem-solving.</p>
          <SocialLinks>
            <SocialIcon href="https://github.com/matingathani" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/matin-gathani-185a7a192" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </SocialIcon>
            <SocialIcon href="mailto:mgathan1@asu.edu" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-envelope"></i>
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLink href="#about">About Me</FooterLink>
          <FooterLink href="#skills">Skills</FooterLink>
          <FooterLink href="#experience">Experience</FooterLink>
          <FooterLink href="#projects">Projects</FooterLink>
          <FooterLink href="#education">Education</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>Contact & Activities</h3>
          <FooterLink href="mailto:mgathan1@asu.edu">mgathan1@asu.edu</FooterLink>
          <FooterLink href="tel:4805722372">480-572-2372</FooterLink>
          <p>Arizona State University<br/>Tempe, AZ</p>
          <p><strong>Activities:</strong><br/>
          Software Developers Association<br/>
          HackerDevils (Coding Competitions)</p>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} Matin Gathani. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
