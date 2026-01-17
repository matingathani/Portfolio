import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const ResumeSection = styled.section`
  padding: 100px 5%;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 3rem;
  background: ${props => props.theme.colors.gradient1};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const ResumeContainer = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ResumeCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: ${props => props.theme.shapes.borderRadius};
  padding: 2.5rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
    border-color: rgba(139, 92, 246, 0.5);
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.text};
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    &::before {
      content: '';
      width: 4px;
      height: 24px;
      background: ${props => props.theme.colors.gradient1};
      border-radius: 2px;
    }
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.7;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      color: ${props => props.theme.colors.textSecondary};
      line-height: 1.7;
      margin-bottom: 0.75rem;
      padding-left: 1.5rem;
      position: relative;
      
      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: ${props => props.theme.colors.primary};
        font-weight: bold;
      }
    }
  }
`;

const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.gradient2};
  color: white;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  text-decoration: none;
  font-weight: 600;
  margin-top: 2rem;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const ResumePreview = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: ${props => props.theme.shapes.borderRadius};
  padding: 2.5rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: ${props => props.theme.shadows.medium};
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  .preview-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    background: ${props => props.theme.colors.gradient1};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 2rem;
  }
`;

const Resume = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <ResumeSection id="resume" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
      >
        Resume
      </SectionTitle>
      
      <ResumeContainer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ResumeCard
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3>📄 Quick Summary</h3>
          <p>
            <strong>Matin Gathani</strong> - Computer Science Student & AI Engineer
          </p>
          <p>
            Currently pursuing a B.S. in Computer Science at Arizona State University with a 3.67 GPA. 
            Experienced in Machine Learning, software development, and teaching. Passionate about 
            building intelligent solutions and mentoring others.
          </p>
          <ul>
            <li>Expected Graduation: May 2026</li>
            <li>Current Role: Engineering Tutor at ASU</li>
            <li>180+ Students Mentored</li>
            <li>ML/AI Specialist with Python & NLP expertise</li>
          </ul>
        </ResumeCard>
        
        <ResumePreview
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="preview-icon">📋</div>
          <h3>Download Resume</h3>
          <p>
            Get a complete PDF version of my resume with all details about my experience, 
            education, skills, and projects.
          </p>
          <DownloadButton
            href="/resume.pdf"
            download="Matin_Gathani_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>📥</span>
            <span>Download PDF</span>
          </DownloadButton>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
            Note: If the PDF is not available, you can view all details in the sections above or ask the chatbot!
          </p>
        </ResumePreview>
      </ResumeContainer>
      
      <motion.div
        style={{ textAlign: 'center', marginTop: '3rem' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem' }}>
          💡 <strong>Tip:</strong> Use the chatbot (bottom right) to ask questions about my resume!
        </p>
      </motion.div>
    </ResumeSection>
  );
};

export default Resume;

