import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
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
    font-size: 4.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: ${props => props.theme.colors.gradient1};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
    filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.3));
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
  background: ${props => props.theme.colors.gradient2};
  color: #fff;
  border: none;
  box-shadow: ${props => props.theme.shadows.medium};
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const SecondaryButton = styled(Button)`
  background: rgba(139, 92, 246, 0.1);
  color: #fff;
  border: 2px solid rgba(139, 92, 246, 0.5);
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.8);
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.small};
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

const ParallaxLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: 
    radial-gradient(1200px 600px at 20% 10%, rgba(139, 92, 246, 0.15), transparent),
    radial-gradient(900px 500px at 80% 20%, rgba(6, 182, 212, 0.12), transparent),
    radial-gradient(700px 400px at 50% 80%, rgba(236, 72, 153, 0.1), transparent);
  transform: translateZ(0);
`;

const ParticleOverlay = styled.canvas`
  position: absolute;
  inset: 0;
  opacity: 0.65;
`;

const ToggleBar = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  z-index: 3;
`;

const SmallToggle = styled.button`
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: #fff;
  border-radius: 16px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 12px;
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
            <meshStandardMaterial 
              color="#8b5cf6" 
              emissive="#8b5cf6"
              emissiveIntensity={0.5}
            />
          </Text3D>
        </Center>
      </Float>
      
      {/* Orbiting particles representing neural connections */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i / 3) * (3 + Math.sin(i) * 0.5),
          Math.cos(i / 4) * (3 + Math.cos(i) * 0.5),
          Math.sin(i / 5) * (3 + Math.sin(i * 2) * 0.5)
        ]}>
          <sphereGeometry args={[0.08 + Math.sin(i) * 0.02, 12, 12]} />
          <meshStandardMaterial 
            color={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#f59e0b"} 
            emissive={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#f59e0b"}
            emissiveIntensity={0.6}
            toneMapped={false}
          />
        </mesh>
      ))}
      
      {/* Neural connections */}
      {Array.from({ length: 25 }).map((_, i) => {
        const startPos = new THREE.Vector3(
          Math.sin(i / 3) * (3 + Math.sin(i) * 0.5),
          Math.cos(i / 4) * (3 + Math.cos(i) * 0.5),
          Math.sin(i / 5) * (3 + Math.sin(i * 2) * 0.5)
        );
        
        const endPos = new THREE.Vector3(
          Math.cos(i / 5) * (3 + Math.cos(i) * 0.5),
          Math.sin(i / 3) * (3 + Math.sin(i) * 0.5),
          Math.cos(i / 4) * (3 + Math.cos(i * 2) * 0.5)
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
              color={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#f59e0b"}
              linewidth={1}
              opacity={0.7}
              transparent
            />
          </line>
        );
      })}
    </group>
  );
};

const Hero: React.FC = () => {
  const [enable3D, setEnable3D] = useState(true);
  const [enableParticles, setEnableParticles] = useState(true);

  useEffect(() => {
    try {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (m.matches) setEnable3D(false);
    } catch {}
  }, []);

  const particleRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!enableParticles) return;
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const particles = Array.from({ length: 80 }).map((_, i) => ({
      x: Math.random(), y: Math.random(), z: Math.random(), s: 0.5 + Math.random()*1.5, p: i
    }));
    const resize = () => {
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
    };
    const draw = (t: number) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const pt of particles) {
        const x = (pt.x + Math.sin(t*0.0002 + pt.p)*0.003) * canvas.width;
        const y = (pt.y + Math.cos(t*0.00025 + pt.p)*0.003) * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, pt.s * DPR, 0, Math.PI*2);
        ctx.fillStyle = pt.p % 3 === 0 ? 'rgba(139, 92, 246, 0.7)' : pt.p % 3 === 1 ? 'rgba(6, 182, 212, 0.7)' : 'rgba(245, 158, 11, 0.7)';
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [enableParticles]);

  return (
    <HeroSection id="hero">
      <ParallaxLayer />
      <ParticleOverlay ref={particleRef} style={{ display: enableParticles ? 'block' : 'none' }} />
      <ToggleBar>
        <SmallToggle onClick={() => setEnable3D(v => !v)}>{enable3D ? 'Disable 3D' : 'Enable 3D'}</SmallToggle>
        <SmallToggle onClick={() => setEnableParticles(v => !v)}>{enableParticles ? 'Hide Particles' : 'Show Particles'}</SmallToggle>
      </ToggleBar>
      <HeroContent
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Matin Gathani</h1>
        <h2>Computer Science Student & AI Engineer</h2>
        <p>Building intelligent solutions with ML models, API integration, and full-stack development. Passionate about software engineering and data-driven innovation.</p>
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
        {enable3D && (
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#00c2ff" intensity={0.5} />
            <Suspense fallback={null}>
              <AnimatedBrain />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate />
          </Canvas>
        )}
      </HeroCanvas>
    </HeroSection>
  );
};

export default Hero;
