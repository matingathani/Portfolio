"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Mesh } from "three";
import { isWebGLAvailable } from "../lib/utils";
import { useMediaQuery, usePageVisibility } from "../lib/hooks";

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

export default function Hero3D() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const canRender = useMemo(() => isWebGLAvailable(), []);

  if (!canRender || isMobile) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-card border border-border bg-[#0b1220]">
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M120 22L207 70V170L120 218L33 170V70L120 22Z"
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M120 22L120 218"
            stroke="#22D3EE"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="120" cy="120" r="42" stroke="#3B82F6" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      className="h-full w-full"
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={1.2} />
      <FloatingMesh />
    </Canvas>
  );
}
