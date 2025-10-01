import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

const SkillsSection = styled.section`
  padding: 100px 5%;
  position: relative;
  overflow: hidden;
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 100%;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkillBar = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const SkillProgress = styled.div<{ width: string }>`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  width: ${props => props.width};
  border-radius: 5px;
`;

const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SkillName = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  justify-content: space-between;
  
  span:last-child {
    color: ${props => props.theme.colors.secondary};
  }
`;

const SkillIcons = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const SkillIcon = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  i {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  span {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const SkillTag = styled(motion.span)`
  background: rgba(110, 87, 224, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  border: 1px solid rgba(110, 87, 224, 0.3);
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
`;

// 3D floating skill icons
const FloatingSkills = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      
      {['Python', 'ML', 'AI', 'C++', 'Java'].map((skill, i) => (
        <Float key={i} speed={(i + 1) * 0.5} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[
            (i - 2) * 1.5,
            Math.sin(i) * 0.5,
            0
          ]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#6e57e0" : "#00c2ff"} 
              emissive={i % 2 === 0 ? "#6e57e0" : "#00c2ff"}
              emissiveIntensity={0.3}
              wireframe={true}
            />
          </mesh>
        </Float>
      ))}
    </Canvas>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * i,
        duration: 0.5
      }
    })
  };
  
  const chartData = {
    labels: ['Python', 'C++', 'Java', 'JavaScript', 'Machine Learning', 'NLP'],
    datasets: [
      {
        label: 'Skill Level',
        data: [90, 85, 80, 75, 85, 80],
        backgroundColor: [
          'rgba(110, 87, 224, 0.7)',
          'rgba(0, 194, 255, 0.7)',
          'rgba(110, 87, 224, 0.7)',
          'rgba(0, 194, 255, 0.7)',
          'rgba(110, 87, 224, 0.7)',
          'rgba(0, 194, 255, 0.7)'
        ],
        borderColor: [
          'rgba(110, 87, 224, 1)',
          'rgba(0, 194, 255, 1)',
          'rgba(110, 87, 224, 1)',
          'rgba(0, 194, 255, 1)',
          'rgba(110, 87, 224, 1)',
          'rgba(0, 194, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  return (
    <SkillsSection id="skills" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        Technical Skills
      </SectionTitle>
      
      <SkillsGrid>
        <SkillCategory
          custom={0}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={categoryVariants}
        >
          <CategoryTitle>Programming & AI/ML</CategoryTitle>
          <ChartWrapper>
            <PolarArea 
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: {
                    ticks: { display: false },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: { color: 'white', font: { size: 12 } }
                  }
                },
                plugins: {
                  legend: { position: 'bottom', labels: { color: 'white' } }
                }
              }}
            />
          </ChartWrapper>
        </SkillCategory>
        
        <SkillCategory
          custom={1}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={categoryVariants}
        >
          <CategoryTitle>APIs & Testing</CategoryTitle>
          <SkillsList>
            {[
              { name: 'REST APIs', percentage: '85%' },
              { name: 'Postman', percentage: '80%' },
              { name: 'API Integration', percentage: '75%' },
              { name: 'Software Testing', percentage: '80%' }
            ].map((skill, index) => (
              <SkillItem key={index}>
                <SkillName>
                  <span>{skill.name}</span>
                  <span>{skill.percentage}</span>
                </SkillName>
                <SkillBar>
                  <SkillProgress width={skill.percentage} />
                </SkillBar>
              </SkillItem>
            ))}
          </SkillsList>

          <div style={{ height: '200px', marginTop: '2rem' }}>
            <FloatingSkills />
          </div>
        </SkillCategory>
        
        <SkillCategory
          custom={2}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={categoryVariants}
        >
          <CategoryTitle>Web Development</CategoryTitle>
          <SkillIcons>
            {[
              { icon: 'fab fa-html5', name: 'HTML' },
              { icon: 'fab fa-css3-alt', name: 'CSS' },
              { icon: 'fab fa-js', name: 'JavaScript' },
              { icon: 'fab fa-react', name: 'React.js' },
              { icon: 'fab fa-node-js', name: 'Node.js' },
              { icon: 'fab fa-npm', name: 'NPM' }
            ].map((skill, index) => (
              <SkillIcon 
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <i className={skill.icon}></i>
                <span>{skill.name}</span>
              </SkillIcon>
            ))}
          </SkillIcons>
        </SkillCategory>
        
        <SkillCategory
          custom={3}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={categoryVariants}
        >
          <CategoryTitle>Data & Systems</CategoryTitle>
          <SkillTags>
            {[
              'SQL', 'Docker', 'Git/GitHub', 'Linux/Unix', 'Windows', 'MacOS', 
              'TensorFlow', 'PyTorch', 'NumPy', 'Pandas', 'Scikit-learn', 'Jupyter'
            ].map((tag, index) => (
              <SkillTag 
                key={index}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(110, 87, 224, 0.3)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {tag}
              </SkillTag>
            ))}
          </SkillTags>
        </SkillCategory>
      </SkillsGrid>
    </SkillsSection>
  );
};

export default Skills;
