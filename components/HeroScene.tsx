import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Low-poly wireframe cube
const WireframeCube = () => {
  const meshRef = React.useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#22D3EE"
          emissiveIntensity={0.3}
          wireframe
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// Low-poly sphere with glowing edges
const LowPolySphere = () => {
  const meshRef = React.useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * -0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[1.5, -0.5, 0]}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#22D3EE"
          emissive="#3B82F6"
          emissiveIntensity={0.25}
          wireframe={false}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
};

// Data node mesh (abstract tech shape)
const DataNode = () => {
  const groupRef = React.useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} position={[-1.2, 0.8, 0]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[Math.sin(i) * 0.6, Math.cos(i) * 0.6, 0]}>
            <octahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial
              color="#3B82F6"
              emissive="#22D3EE"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
        {/* Connecting lines */}
        {Array.from({ length: 5 }).map((_, i) => {
          const next = (i + 1) % 5;
          const start = new THREE.Vector3(
            Math.sin(i) * 0.6,
            Math.cos(i) * 0.6,
            0
          );
          const end = new THREE.Vector3(
            Math.sin(next) * 0.6,
            Math.cos(next) * 0.6,
            0
          );
          return (
            <line key={`line-${i}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={new Float32Array([...start.toArray(), ...end.toArray()])}
                  count={2}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#3B82F6" opacity={0.5} transparent />
            </line>
          );
        })}
      </group>
    </Float>
  );
};

const HeroScene = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
    <ambientLight intensity={0.3} />
    <pointLight position={[4, 4, 4]} intensity={1.0} color="#3B82F6" />
    <pointLight position={[-4, -3, -4]} intensity={0.6} color="#22D3EE" />
    <WireframeCube />
    <LowPolySphere />
    <DataNode />
  </Canvas>
);

export default HeroScene;
