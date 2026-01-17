import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const Orb = ({ color, position }: { color: string; position: [number, number, number] }) => (
  <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.6}>
    <mesh position={position}>
      <sphereGeometry args={[0.5, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.3} />
    </mesh>
  </Float>
);

const TechStackOrb = () => (
  <Canvas camera={{ position: [0, 0, 4], fov: 55 }}>
    <ambientLight intensity={0.4} />
    <pointLight position={[4, 4, 4]} intensity={1.2} />
    <pointLight position={[-4, -3, -4]} intensity={0.8} color="#ec4899" />
    <Orb color="#8b5cf6" position={[-1.2, 0.4, 0]} />
    <Orb color="#06b6d4" position={[1.0, -0.2, 0]} />
    <Orb color="#f59e0b" position={[0, 1.2, -0.2]} />
  </Canvas>
);

export default TechStackOrb;
