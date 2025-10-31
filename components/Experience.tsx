import React, { useMemo, useRef, useState } from 'react';
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

const FilterBar = styled.div`
  display: flex;
  gap: .5rem;
  margin: 0 auto 1rem;
  max-width: 1200px;
  justify-content: center;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  background: ${p => p.$active ? 'rgba(110,87,224,0.25)' : 'rgba(255,255,255,0.05)'};
  border: 1px solid rgba(255,255,255,0.15);
  color: ${p => p.theme.colors.text};
  padding: .5rem .9rem;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
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
  
  const items = useMemo(() => ([
    { key: 'ugta-2023', cat: 'Teaching', title: 'UGTA – Arizona State University', date: 'Spring 2023', points: [
      'Undergraduate Teaching Assistant for FSE 100 and CSE 220.',
      'Led weekly labs and office hours (30+ students/session) covering C/Java, data structures, and engineering design workflow.',
      'Designed practice sets and walkthroughs for arrays, pointers, stacks/queues, and recursion; emphasized stepwise tracing.',
      'Introduced a structured "Reproduce → Isolate → Verify" debugging loop that improved issue resolution time.',
      'Built small reference projects and test harnesses to help students validate solutions with edge cases.',
      'Graded programming assignments; provided rubric‑based, actionable feedback focused on correctness and code clarity.'
    ] },
    { key: 'intern-musikaar', cat: 'Work', title: 'Project Intern – Musikaar', date: 'May 2024 – Aug 2024', points: [
      'Built and optimized ML models using Python, NLP, and tokenization to improve HR data processing workflows.',
      'Validated model performance with custom datasets and applied testing principles to reduce system errors.',
      'Developed front-end pages and integrated APIs to deliver seamless AI-driven user experiences.',
      'Partnered with cross-functional teams to debug pipelines, document processes, and support deployment.'
    ] },
    { key: 'la-asu', cat: 'Teaching', title: 'Engineering Tutor / Learning Assistant – ASU', date: 'Jan 2024 – Present', points: [
      'Mentored 180+ students in programming (Java, Assembly, C++), emphasizing debugging, testing, and problem-solving.',
      'Guided learners on software lifecycle concepts through hands-on projects and assignments.',
      'Enhanced communication by translating complex technical topics into clear, accessible explanations.'
    ] },
    { key: 'ugta-460-2025', cat: 'Teaching', title: 'UGTA – CSE 460 (Software Engineering)', date: 'Fall 2025', points: [
      'Undergraduate Teaching Assistant focusing on modern software engineering practices and testing.',
      'Guided capstone teams on requirements, architecture, and iterative delivery with issue tracking and milestones.',
      'Ran lightweight code reviews highlighting readability, testability, and defect prevention.',
      'Introduced CI basics (linting, type checks, unit tests) and deployment checklists for team projects.',
      'Mentored students on writing maintainable tests (unit/integration) and selecting assertions/fixtures effectively.'
    ] },
  ]), []);

  const [filter, setFilter] = useState<'All' | 'Teaching' | 'Work' | 'Projects'>('All');
  const filtered = items.filter(i => filter === 'All' ? true : i.cat === filter);

  return (
    <ExperienceSection id="experience" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        Professional Experience
      </SectionTitle>
      <FilterBar>
        {['All','Teaching','Work','Projects'].map(name => (
          <FilterButton key={name} onClick={() => setFilter(name as any)} $active={filter===name as any}>{name}</FilterButton>
        ))}
      </FilterBar>
      
      <TimelineContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {filtered.map((it, idx) => (
          <TimelineItem key={it.key} variants={itemVariants}>
            <TimelineContent>
              <h3>{it.title}</h3>
              <span className="timeline-date">{it.date}</span>
              <ul>
                {it.points.map((p, i) => (<li key={i}>{p}</li>))}
              </ul>
            </TimelineContent>
          </TimelineItem>
        ))}
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
