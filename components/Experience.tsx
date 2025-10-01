import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';

const ExperienceSection = styled.section`
  padding: 100px 5%;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    background: linear-gradient(180deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 3px;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  
  &:nth-child(odd) {
    left: 0;
    
    &::after {
      right: -13px;
    }
  }
  
  &:nth-child(even) {
    left: 50%;
    
    &::after {
      left: -13px;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    background: ${props => props.theme.colors.background};
    border: 4px solid ${props => props.theme.colors.primary};
    top: 20px;
    border-radius: 50%;
    z-index: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    padding-left: 70px;
    padding-right: 20px;
    left: 0 !important;
    
    &::after {
      left: 17px !important;
    }
  }
`;

const TimelineContent = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.08);
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
  }
  
  .timeline-date {
    display: block;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.secondary};
    font-style: italic;
  }
  
  ul {
    margin-left: 1.5rem;
    color: ${props => props.theme.colors.textSecondary};
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
  }
`;

// 3D Text Component
const FloatingText = ({ text, position, color }: { text: string, position: [number, number, number], color: string }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text
        position={position}
        fontSize={0.5}
        color={color}
        maxWidth={2}
        lineHeight={1}
        textAlign="center"
        font="/fonts/inter_bold.json"
      >
        {text}
      </Text>
    </Float>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  return (
    <ExperienceSection id="experience" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        Professional Experience
      </SectionTitle>
      
      <TimelineContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <TimelineItem variants={itemVariants}>
          <TimelineContent>
            <h3>Project Intern – Musikaar</h3>
            <span className="timeline-date">May 2024 – Aug 2024</span>
            <ul>
              <li>Developed and fine-tuned machine learning models using Python, NLP, and tokenization, improving HR data processing efficiency.</li>
              <li>Validated model performance with custom datasets, applying testing principles to improve accuracy and reduce errors.</li>
              <li>Built web pages in HTML/CSS to connect AI models to end-user applications, ensuring smooth API integration.</li>
              <li>Collaborated with cross-functional teams to debug data pipeline issues and document testing procedures.</li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        
        <TimelineItem variants={itemVariants}>
          <TimelineContent>
            <h3>Engineering Tutor / Learning Assistant – ASU</h3>
            <span className="timeline-date">Jan 2024 – Present</span>
            <ul>
              <li>Tutored 180+ students in programming and software engineering (Java, Assembly, C++), emphasizing problem-solving and debugging.</li>
              <li>Assisted students in understanding software testing methodologies through projects and assignments.</li>
              <li>Strengthened communication and documentation skills by breaking down technical concepts for diverse learners.</li>
            </ul>
          </TimelineContent>
        </TimelineItem>
      </TimelineContainer>
      
      {/* 3D Text for visual enhancement */}
      <div style={{ height: '200px', marginTop: '3rem', position: 'relative' }}>
        <Canvas>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <FloatingText 
            text="ML Models" 
            position={[-2, 0, 0]} 
            color="#6e57e0" 
          />
          <FloatingText 
            text="API Integration" 
            position={[0, 1, 0]} 
            color="#00c2ff" 
          />
          <FloatingText 
            text="Tutoring" 
            position={[2, -0.5, 0]} 
            color="#6e57e0" 
          />
        </Canvas>
      </div>
    </ExperienceSection>
  );
};

export default Experience;
