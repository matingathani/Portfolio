import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Float } from '@react-three/drei';

const AboutSection = styled.section`
  padding: 120px 5% 80px;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
    text-align: center;
  }
`;

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const AboutContent = styled(motion.div)`
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.7;
    color: ${props => props.theme.colors.textSecondary};
  }
  
  strong {
    color: ${props => props.theme.colors.text};
  }
`;

const AboutStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 2rem;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: ${props => props.theme.shapes.borderRadius};
  text-align: center;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.theme.colors.gradient1};
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const StatNumber = styled.h3`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: ${props => props.theme.colors.gradient2};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ModelContainer = styled(motion.div)`
  height: 400px;
  width: 100%;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 300px;
  }
`;

// This is a placeholder component that would ideally use a real 3D model
// For now, we'll use a simple 3D shape
const BrainModel = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <dodecahedronGeometry args={[2, 0]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          wireframe={true} 
          emissive="#06b6d4" 
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };
  
  return (
    <AboutSection id="about" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </SectionTitle>
      
      <AboutContainer>
        <AboutContent
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>
            <strong>Computer Science junior</strong> at Arizona State University with a strong foundation in software development, 
            data analysis, and system design. Currently maintaining a <strong>3.67 GPA</strong> with coursework in Data Structures, 
            Object-Oriented Programming, Software Analysis & Design, and Software QA & Testing.
          </p>
          <p>
            Recently completed a <strong>Project Internship at Musikaar</strong> where I built and optimized ML models using Python, 
            NLP, and tokenization to improve HR data processing workflows. I validated model performance with custom datasets 
            and developed front-end pages with API integration for seamless AI-driven user experiences. This experience taught me 
            the importance of iterative model refinement and the value of user-centered design in AI applications.
          </p>
          <p>
            As an <strong>Engineering Tutor at ASU</strong>, I've mentored 180+ students in programming (Java, Assembly, C++), 
            emphasizing debugging, testing, and problem-solving. I've developed a structured approach to teaching that focuses on 
            reproducible debugging techniques and systematic problem-solving. My teaching philosophy centers on helping students 
            build confidence through hands-on practice and clear explanations of complex concepts.
          </p>
          <p>
            I'm passionate about applying AI development and testing skills to solve real-world problems at the intersection of 
            machine learning, software development, and creative problem-solving. I enjoy working on projects that combine 
            technical excellence with practical applications, and I'm always eager to learn new technologies and methodologies.
          </p>
          
          <AboutStats>
            {[
              { number: '3.67', label: 'GPA' },
              { number: '180+', label: 'Students Tutored' },
              { number: '3', label: 'Major Projects' }
            ].map((stat, i) => (
              <StatCard
                key={i}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </AboutStats>
        </AboutContent>
        
        <ModelContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Canvas>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <BrainModel />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </ModelContainer>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;
