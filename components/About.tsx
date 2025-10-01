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
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const StatNumber = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
          color="#6e57e0" 
          wireframe={true} 
          emissive="#00c2ff" 
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
            <strong>Computer Science student</strong> with a Data Science minor (GPA 3.6). 
            I have extensive experience in Python, C++, and Java with hands-on exposure to 
            AI/ML model training, API integration, and system testing.
          </p>
          <p>
            I recently completed an internship developing HRMS machine learning models 
            with NLP and tokenization at Musikaar. I'm passionate about applying AI to solve 
            real-world problems and currently tutor students in programming and software engineering.
          </p>
          <p>
            As a strong communicator with attention to detail, I'm seeking to apply AI development 
            and testing skills as an AI Engineer, working at the intersection of machine learning, 
            software development, and creative problem-solving.
          </p>
          
          <AboutStats>
            {[
              { number: '3.6', label: 'GPA' },
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
