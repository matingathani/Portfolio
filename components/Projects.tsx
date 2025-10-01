import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Text } from '@react-three/drei';

const ProjectsSection = styled.section`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    font-size: 1rem;
    line-height: 1.6;
    color: ${props => props.theme.colors.textSecondary};
    flex: 1;
    margin-bottom: 1.5rem;
  }
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  span {
    background: rgba(110, 87, 224, 0.2);
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    font-size: 0.8rem;
    color: ${props => props.theme.colors.text};
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectButton = styled(motion.a)`
  padding: 0.7rem 1.5rem;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(110, 87, 224, 0.4);
  }
`;

// Simple 3D model representation for projects
const Project3DModel = ({ index }: { index: number }) => {
  const models = [
    // Medical Record System
    <mesh key={0}>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial 
        color="#6e57e0" 
        wireframe={true} 
        emissive="#00c2ff" 
        emissiveIntensity={0.5}
      />
    </mesh>,
    
    // Maze-Solving Car
    <mesh key={1}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial 
        color="#00c2ff" 
        wireframe={true} 
        emissive="#6e57e0" 
        emissiveIntensity={0.5}
      />
    </mesh>,
    
    // Digital Design Circuit
    <mesh key={2}>
      <octahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial 
        color="#6e57e0" 
        wireframe={true} 
        emissive="#00c2ff" 
        emissiveIntensity={0.5}
      />
    </mesh>
  ];
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      {models[index]}
    </Float>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const projectsData = [
    {
      title: "Medical Record System",
      description: "Designed a full-stack system using JavaScript, SQL, and Docker; enabled structured storage, retrieval, and visualization of patient data.",
      tags: ["JavaScript", "SQL", "Docker"],
      image: "/images/medical-record-system.svg"
    },
    {
      title: "Maze-Solving Car",
      description: "Collaborated on an automation project using block coding and data-driven decision logic to navigate maze environments.",
      tags: ["Automation", "Block Coding", "Decision Logic"],
      image: "/images/maze-solving-car.svg"
    },
    {
      title: "Digital Design Key Fob Circuit",
      description: "Implemented logic gate circuit using K-map/state diagrams; applied data modeling principles to optimize outputs.",
      tags: ["Logic Gates", "K-map", "Data Modeling"],
      image: "/images/digital-design-circuit.svg"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <ProjectsSection id="projects" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </SectionTitle>
      
      <ProjectsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {projectsData.map((project, index) => (
          <ProjectCard
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <ProjectImage>
              <Canvas>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <Project3DModel index={index} />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </ProjectImage>
            <ProjectContent>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ProjectTags>
                {project.tags.map((tag, idx) => (
                  <span key={idx}>{tag}</span>
                ))}
              </ProjectTags>
              <ProjectLinks>
                <ProjectButton 
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </ProjectButton>
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects;
