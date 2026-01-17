"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";
import { usePageVisibility } from "../lib/hooks";

function FloatingMesh() {
  const meshRef = useRef<Mesh>(null);
  const visible = usePageVisibility();

  useFrame((state) => {
    if (!meshRef.current || !visible) return;
    const { x, y } = state.pointer;
    meshRef.current.rotation.x = x * 0.35;
    meshRef.current.rotation.y = y * 0.35 + state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#3b82f6"
          wireframe
          roughness={0.4}
          metalness={0.2}
          emissive="#1e3a8a"
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }} className="h-full w-full" dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={1.2} />
      <FloatingMesh />
    </Canvas>
  );
}
