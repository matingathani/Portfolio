"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface Node {
  position: [number, number, number];
  velocity: [number, number, number];
  connections: number[];
}

function NeuralNode({ position, opacity }: { position: [number, number, number]; opacity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow, subtle pulsing animation
      const pulse = Math.sin(state.clock.elapsedTime * 0.8 + position[0] * 0.5) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
      
      // Subtle rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.12, 24, 24]} />
      <meshStandardMaterial
        color="#00D4FF"
        emissive="#00A8E8"
        emissiveIntensity={1.2}
        opacity={opacity}
        transparent
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  );
}

function NeuralConnection({
  start,
  end,
  opacity,
  index,
}: {
  start: [number, number, number];
  end: [number, number, number];
  opacity: number;
  index: number;
}) {
  const points = useMemo(() => {
    const midX = (start[0] + end[0]) / 2;
    const midY = (start[1] + end[1]) / 2;
    const midZ = (start[2] + end[2]) / 2;
    
    // Create curved path with slight variation
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        midX + (Math.sin(index) * 0.3),
        midY + (Math.cos(index) * 0.3),
        midZ + (Math.sin(index * 2) * 0.2)
      ),
      new THREE.Vector3(...end),
    ]);
    return curve.getPoints(100);
  }, [start, end, index]);

  const lineRef = useRef<THREE.Line>(null!);

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      // Slow pulsing animation
      const pulse = Math.sin(state.clock.elapsedTime * 0.4 + index * 0.1) * 0.25 + 0.75;
      material.opacity = opacity * pulse * 0.7;
      
      // Color shift between blue and white
      const colorShift = Math.sin(state.clock.elapsedTime * 0.3 + index * 0.05) * 0.3 + 0.7;
      material.color.setRGB(
        0 + colorShift * 0.2,
        0.8 + colorShift * 0.2,
        1
      );
    }
  });

  return (
    <line ref={lineRef as any}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#00D4FF"
        transparent
        opacity={opacity * 0.6}
        linewidth={1.5}
      />
    </line>
  );
}

function SceneSetup() {
  const { scene } = useThree();
  
  useEffect(() => {
    scene.fog = new THREE.Fog("#0a0e17", 12, 45);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 25]}
        fov={50}
        near={0.1}
        far={100}
      />
      <Lighting />
    </>
  );
}

function NeuralNetwork() {
  const nodes = useMemo(() => {
    const nodeCount = 100;
    const nodeArray: Node[] = [];
    const radius = 10;

    // Create nodes in a more organic, neural-like structure
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius * Math.pow(Math.random(), 0.6); // More nodes near center

      nodeArray.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        velocity: [
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
        ],
        connections: [],
      });
    }

    // Create connections based on proximity and probability
    for (let i = 0; i < nodeArray.length; i++) {
      const connections: number[] = [];
      const distances: Array<{ index: number; dist: number }> = [];
      
      for (let j = i + 1; j < nodeArray.length; j++) {
        const dx = nodeArray[i].position[0] - nodeArray[j].position[0];
        const dy = nodeArray[i].position[1] - nodeArray[j].position[1];
        const dz = nodeArray[i].position[2] - nodeArray[j].position[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        distances.push({ index: j, dist });
      }
      
      // Sort by distance and connect to nearest nodes
      distances.sort((a, b) => a.dist - b.dist);
      const maxConnections = 3 + Math.floor(Math.random() * 3);
      
      for (let k = 0; k < Math.min(maxConnections, distances.length); k++) {
        if (distances[k].dist < 4 && Math.random() > 0.3) {
          connections.push(distances[k].index);
        }
      }
      
      nodeArray[i].connections = connections;
    }

    return nodeArray;
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow, cinematic rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.015) * 0.03;
    }
  });

  let connectionIndex = 0;

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <NeuralNode key={i} position={node.position} opacity={0.95} />
      ))}
      {nodes.map((node, i) =>
        node.connections.map((connIndex) => {
          const start = node.position;
          const end = nodes[connIndex].position;
          const dx = end[0] - start[0];
          const dy = end[1] - start[1];
          const dz = end[2] - start[2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const opacity = Math.max(0.3, 1 - dist / 4);

          return (
            <NeuralConnection
              key={`${i}-${connIndex}`}
              start={start}
              end={end}
              opacity={opacity}
              index={connectionIndex++}
            />
          );
        })
      )}
    </group>
  );
}

function Lighting() {
  return (
    <>
      {/* Ambient light for soft global illumination */}
      <ambientLight intensity={0.15} color="#001a33" />
      
      {/* Main directional light - blue tint */}
      <directionalLight
        position={[15, 15, 10]}
        intensity={1.2}
        color="#00D4FF"
        castShadow
      />
      
      {/* Secondary directional light - white for contrast */}
      <directionalLight
        position={[-15, -15, -10]}
        intensity={0.6}
        color="#FFFFFF"
      />
      
      {/* Point lights for volumetric effect */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={2} 
        color="#00A8E8" 
        distance={25} 
        decay={2}
      />
      <pointLight 
        position={[8, 8, 8]} 
        intensity={1.5} 
        color="#00D4FF" 
        distance={20} 
        decay={2}
      />
      <pointLight 
        position={[-8, -8, -8]} 
        intensity={1} 
        color="#FFFFFF" 
        distance={20} 
        decay={2}
      />
      
      {/* Additional accent lights */}
      <pointLight 
        position={[5, -5, 5]} 
        intensity={0.8} 
        color="#00D4FF" 
        distance={15} 
        decay={2}
      />
      <pointLight 
        position={[-5, 5, -5]} 
        intensity={0.8} 
        color="#FFFFFF" 
        distance={15} 
        decay={2}
      />
    </>
  );
}

export default function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: false, 
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        style={{ 
          background: "linear-gradient(135deg, #0a0e17 0%, #0f1625 50%, #0a0e17 100%)",
          width: "100%",
          height: "100%",
        }}
        camera={{ position: [0, 0, 25], fov: 50 }}
      >
        <SceneSetup />
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
