import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';

const EducationSection = styled.section`
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

const EducationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: ${props => props.theme.shapes.borderRadius};
  padding: 2.5rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: ${props => props.theme.shadows.medium};
  display: flex;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  gap: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.gradient2};
    border-radius: ${props => props.theme.shapes.borderRadius} ${props => props.theme.shapes.borderRadius} 0 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: ${props => props.theme.shadows.large};
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(139, 92, 246, 0.5);
  }
`;

const EducationLogo = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
  }
`;

const EducationContent = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    font-size: 1.1rem;
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 0.5rem;
  }
  
  .education-gpa {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => props.theme.colors.secondary};
    margin: 1rem 0;
  }
`;

// 3D university logo or symbol
const University3D = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Center>
        <Text3D
          font="/fonts/inter_bold.json"
          size={0.8}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          ASU
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
          />
        </Text3D>
      </Center>
    </Float>
  );
};

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <EducationSection id="education" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        Education
      </SectionTitle>
      
      <EducationCard
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <EducationLogo>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <University3D />
          </Canvas>
        </EducationLogo>
        <EducationContent>
          <h3>B.S. Computer Science</h3>
          <p>Arizona State University, Tempe, AZ</p>
          <p>Expected May 2026</p>
          <p className="education-gpa">GPA: 3.67</p>
          <p><strong>Relevant Coursework:</strong> Data Structures and Algorithms, Object-Oriented Programming & Design, Software Analysis and Design, Software QA and Testing, Operating Systems, Applied Linear Algebra, Human-Computer Interaction</p>
        </EducationContent>
      </EducationCard>
    </EducationSection>
  );
};

export default Education;
