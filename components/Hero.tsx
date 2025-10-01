import React, { Suspense, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 5%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: auto;
    min-height: 100vh;
    padding-top: 80px;
  }
`;

const HeroContent = styled(motion.div)`
  flex: 1;
  z-index: 2;
  
  h1 {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, #6e57e0, #00c2ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #fff;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 600px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 3rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(45deg, #6e57e0, #00c2ff);
  color: #fff;
  border: none;
  box-shadow: 0 4px 15px rgba(110, 87, 224, 0.4);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(110, 87, 224, 0.6);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: #fff;
  border: 2px solid rgba(110, 87, 224, 0.8);
  
  &:hover {
    background: rgba(110, 87, 224, 0.1);
    transform: translateY(-3px);
  }
`;

const HeroCanvas = styled.div`
  flex: 1;
  height: 100%;
  z-index: 1;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
`;

const AnimatedBrain = () => {
  const brainGroup = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (brainGroup.current) {
      brainGroup.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });
  
  return (
    <group ref={brainGroup}>
      {/* Core brain structure */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Center>
          <Text3D
            font="/fonts/inter_bold.json"
            size={1.5}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            MG
            <meshStandardMaterial color="#6e57e0" />
          </Text3D>
        </Center>
      </Float>
      
      {/* Orbiting particles representing neural connections */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i / 3) * 3,
          Math.cos(i / 4) * 3,
          Math.sin(i / 5) * 3
        ]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#00c2ff" 
            emissive="#00c2ff"
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </mesh>
      ))}
      
      {/* Neural connections */}
      {Array.from({ length: 15 }).map((_, i) => {
        const startPos = new THREE.Vector3(
          Math.sin(i / 3) * 3,
          Math.cos(i / 4) * 3,
          Math.sin(i / 5) * 3
        );
        
        const endPos = new THREE.Vector3(
          Math.cos(i / 5) * 3,
          Math.sin(i / 3) * 3,
          Math.cos(i / 4) * 3
        );
        
        const points = [startPos, endPos];
        const positions = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]));
        
        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={positions}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial 
              color="#6e57e0"
              linewidth={1}
              opacity={0.6}
              transparent
            />
          </line>
        );
      })}
    </group>
  );
};

const Hero: React.FC = () => {
  return (
    <HeroSection id="hero">
      <HeroContent
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Matin Gathani</h1>
        <h2>AI Engineer & Computer Science Student</h2>
        <p>Developing intelligent solutions with AI/ML expertise</p>
        <CTAButtons>
          <PrimaryButton 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </PrimaryButton>
          <SecondaryButton 
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </SecondaryButton>
        </CTAButtons>
      </HeroContent>
      
      <HeroCanvas>
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#00c2ff" intensity={0.5} />
          <Suspense fallback={null}>
            <AnimatedBrain />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate />
        </Canvas>
      </HeroCanvas>
    </HeroSection>
  );
};

export default Hero;
