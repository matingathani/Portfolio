"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";
import { useMediaQuery, usePageVisibility } from "../lib/hooks";
import { isWebGLAvailable } from "../lib/utils";

function Knot() {
  const ref = useRef<Mesh>(null);
  const visible = usePageVisibility();

  useFrame((state) => {
    if (!ref.current || !visible) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[0.8, 0.22, 120, 16]} />
        <meshStandardMaterial color="#22d3ee" roughness={0.5} metalness={0.3} />
      </mesh>
    </Float>
  );
}

export default function Signal3D() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const canRender = isWebGLAvailable();

  if (isMobile || !canRender) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-card border border-border bg-[#0b1220]">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted">Signal</span>
      </div>
    );
  }

  return (
    <Canvas camera={{ position: [0, 0, 3.2] }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <Knot />
    </Canvas>
  );
}
