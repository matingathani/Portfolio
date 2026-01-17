import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const FloatingShape = () => (
  <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
    <mesh>
      <icosahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#06b6d4"
        emissiveIntensity={0.45}
        roughness={0.3}
      />
    </mesh>
  </Float>
);

const HeroScene = () => (
  <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
    <ambientLight intensity={0.4} />
    <pointLight position={[4, 6, 4]} intensity={1.2} />
    <pointLight position={[-4, -3, -4]} intensity={0.6} color="#ec4899" />
    <FloatingShape />
  </Canvas>
);

export default HeroScene;
