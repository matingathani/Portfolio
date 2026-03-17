"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Waypoints — camera positions & look-at targets per portfolio section
// ---------------------------------------------------------------------------
export const WAYPOINTS = [
  { section: "hero",       pos: [0, 0, 28]    as [number, number, number], target: [0, 0, 0]    as [number, number, number] },
  { section: "experience", pos: [18, 4, 20]   as [number, number, number], target: [14, 0, 0]   as [number, number, number] },
  { section: "projects",   pos: [-14, -2, 22] as [number, number, number], target: [-10, 0, 0]  as [number, number, number] },
  { section: "skills",     pos: [6, 14, 18]   as [number, number, number], target: [0, 10, 0]   as [number, number, number] },
  { section: "resume",     pos: [-6, -10, 20] as [number, number, number], target: [0, -6, 0]   as [number, number, number] },
  { section: "contact",    pos: [0, 2, 35]    as [number, number, number], target: [0, 0, 0]    as [number, number, number] },
];

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------
interface NodeData {
  position: [number, number, number];
  connections: number[];
}

interface ConnectionData {
  start: [number, number, number];
  end: [number, number, number];
  index: number;
}

// ---------------------------------------------------------------------------
// NeuralNode
// ---------------------------------------------------------------------------
function NeuralNode({
  position,
  isMobile,
}: {
  position: [number, number, number];
  isMobile?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const segments = isMobile ? 8 : 16;

  useFrame((state) => {
    if (!meshRef.current) return;
    const pulse =
      Math.sin(state.clock.elapsedTime * 0.6 + position[0] * 0.5) * 0.1 + 1;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.12, segments, segments]} />
      <meshStandardMaterial
        color="#00D4FF"
        emissive="#0066cc"
        emissiveIntensity={1.0}
        opacity={0.9}
        transparent
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// NeuralConnection
// ---------------------------------------------------------------------------
function NeuralConnection({
  start,
  end,
  index,
}: {
  start: [number, number, number];
  end: [number, number, number];
  index: number;
}) {
  const { points, curve } = useMemo(() => {
    const midX = (start[0] + end[0]) / 2;
    const midY = (start[1] + end[1]) / 2;
    const midZ = (start[2] + end[2]) / 2;

    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        midX + Math.sin(index) * 0.3,
        midY + Math.cos(index) * 0.3,
        midZ + Math.sin(index * 2) * 0.2
      ),
      new THREE.Vector3(...end),
    ]);
    return { points: c.getPoints(80), curve: c };
  }, [start, end, index]);

  // suppress unused-var warning — curve is exported for DataParticle consumers
  void curve;

  const lineRef = useRef<THREE.Line>(null!);

  useFrame((state) => {
    if (!lineRef.current) return;
    const mat = lineRef.current.material as THREE.LineBasicMaterial;
    const pulse =
      Math.sin(state.clock.elapsedTime * 0.4 + index * 0.1) * 0.25 + 0.75;
    mat.opacity = 0.45 * pulse;
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
      <lineBasicMaterial color="#1a6faf" transparent opacity={0.45} linewidth={1} />
    </line>
  );
}

// ---------------------------------------------------------------------------
// DataParticle
// ---------------------------------------------------------------------------
function DataParticle({
  curve,
  particleIndex,
  speed,
}: {
  curve: THREE.CatmullRomCurve3;
  particleIndex: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = particleIndex % 2 === 0 ? "#10b981" : "#f59e0b";

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = ((state.clock.elapsedTime * speed) % 1 + 1) % 1;
    const pt = curve.getPoint(t);
    meshRef.current.position.set(pt.x, pt.y, pt.z);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.06, 6, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.0}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// SceneSetup — fog + lights (no Camera; provided by ImmersiveCanvas)
// ---------------------------------------------------------------------------
function SceneSetup() {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.FogExp2("#060b18", 0.018);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight color="#00D4FF" intensity={0.8} position={[15, 15, 10]} />
      {/* scattered point lights for depth */}
      <pointLight color="#00A8E8" intensity={1.5} distance={30} decay={2} position={[0, 0, 0]} />
      <pointLight color="#00D4FF" intensity={1.2} distance={25} decay={2} position={[10, 10, 5]} />
      <pointLight color="#003366" intensity={1.0} distance={25} decay={2} position={[-10, -8, -5]} />
    </>
  );
}

// ---------------------------------------------------------------------------
// CameraRig — scroll-driven camera animation
// ---------------------------------------------------------------------------
const SCROLL_RANGES = [0, 0.17, 0.35, 0.53, 0.70, 0.85, 1.0];

function CameraRig({
  scrollProgress,
  isAmbient,
  isMobile,
}: {
  scrollProgress: number;
  isAmbient?: boolean;
  isMobile?: boolean;
}) {
  const { camera } = useThree();
  const currentTargetRef = useRef(new THREE.Vector3());

  // Determine active waypoint index from scroll progress
  const getWaypointIndex = (progress: number): number => {
    for (let i = SCROLL_RANGES.length - 2; i >= 0; i--) {
      if (progress >= SCROLL_RANGES[i]) return Math.min(i, WAYPOINTS.length - 1);
    }
    return 0;
  };

  useFrame((state) => {
    const cam = camera as THREE.PerspectiveCamera;

    if (isMobile) {
      // Static ambient camera for mobile
      const targetPos = new THREE.Vector3(0, 2, 25);
      cam.position.lerp(targetPos, 0.04);
      currentTargetRef.current.lerp(new THREE.Vector3(0, 0, 0), 0.04);
      cam.lookAt(currentTargetRef.current);
      return;
    }

    if (isAmbient) {
      // Gentle orbit for about/blog pages
      const t = state.clock.elapsedTime * 0.12;
      const targetPos = new THREE.Vector3(
        Math.sin(t) * 4,
        3 + Math.cos(t * 0.5) * 1.5,
        30 + Math.cos(t) * 2
      );
      cam.position.lerp(targetPos, 0.04);
      currentTargetRef.current.lerp(new THREE.Vector3(0, 0, 0), 0.04);
      cam.lookAt(currentTargetRef.current);
      return;
    }

    // Scroll-driven camera
    const wpIndex = getWaypointIndex(scrollProgress);
    const wp = WAYPOINTS[wpIndex];

    const destPos = new THREE.Vector3(...wp.pos);
    const destTarget = new THREE.Vector3(...wp.target);

    cam.position.lerp(destPos, 0.04);
    currentTargetRef.current.lerp(destTarget, 0.04);
    cam.lookAt(currentTargetRef.current);
  });

  return null;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface NeuralUniverseProps {
  scrollProgress: number; // 0–1
  isAmbient?: boolean;    // for about/blog pages
  isMobile?: boolean;
}

// ---------------------------------------------------------------------------
// NeuralUniverse — default export
// ---------------------------------------------------------------------------
export default function NeuralUniverse({
  scrollProgress,
  isAmbient,
  isMobile,
}: NeuralUniverseProps) {
  const nodeCount = isMobile ? 80 : 300;
  const radius = isMobile ? 20 : 30;
  const connThreshold = isMobile ? 5 : 8;
  const maxConns = 4;

  // Build nodes + connections
  const { nodes, connections, particleCurves } = useMemo(() => {
    const nodeArray: NodeData[] = [];

    // Helper to add a spherically-distributed node
    const addNode = (cx: number, cy: number, cz: number, r: number) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rr = r * Math.pow(Math.random(), 0.6);
      nodeArray.push({
        position: [
          cx + rr * Math.sin(phi) * Math.cos(theta),
          cy + rr * Math.sin(phi) * Math.sin(theta),
          cz + rr * Math.cos(phi),
        ],
        connections: [],
      });
    };

    // Main cloud
    for (let i = 0; i < nodeCount; i++) addNode(0, 0, 0, radius);

    // Cluster nodes near each waypoint target
    const clusterCount = isMobile ? 10 : 15;
    for (const wp of WAYPOINTS) {
      for (let c = 0; c < clusterCount; c++) {
        addNode(wp.target[0], wp.target[1], wp.target[2], 5);
      }
    }

    // Build connections
    const connList: ConnectionData[] = [];
    for (let i = 0; i < nodeArray.length; i++) {
      const distances: { index: number; dist: number }[] = [];
      for (let j = i + 1; j < nodeArray.length; j++) {
        const dx = nodeArray[i].position[0] - nodeArray[j].position[0];
        const dy = nodeArray[i].position[1] - nodeArray[j].position[1];
        const dz = nodeArray[i].position[2] - nodeArray[j].position[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < connThreshold) distances.push({ index: j, dist });
      }

      distances.sort((a, b) => a.dist - b.dist);
      const take = Math.min(maxConns, distances.length);
      for (let k = 0; k < take; k++) {
        nodeArray[i].connections.push(distances[k].index);
        connList.push({
          start: nodeArray[i].position,
          end: nodeArray[distances[k].index].position,
          index: connList.length,
        });
      }
    }

    // Build CatmullRomCurve3 objects for particle travel (desktop only)
    const curves: THREE.CatmullRomCurve3[] = [];
    if (!isMobile && connList.length > 0) {
      const particleConnCount = Math.min(80, connList.length);
      // Spread particle source connections across the full set
      const step = Math.max(1, Math.floor(connList.length / particleConnCount));
      for (let p = 0; p < particleConnCount; p++) {
        const conn = connList[p * step % connList.length];
        const midX = (conn.start[0] + conn.end[0]) / 2;
        const midY = (conn.start[1] + conn.end[1]) / 2;
        const midZ = (conn.start[2] + conn.end[2]) / 2;
        curves.push(
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(...conn.start),
            new THREE.Vector3(
              midX + Math.sin(p) * 0.3,
              midY + Math.cos(p) * 0.3,
              midZ + Math.sin(p * 2) * 0.2
            ),
            new THREE.Vector3(...conn.end),
          ])
        );
      }
    }

    return { nodes: nodeArray, connections: connList, particleCurves: curves };
  }, [nodeCount, radius, connThreshold, isMobile]);

  // Per-particle speed: cycles between 3–5 seconds → speed = 1/duration
  const particleSpeeds = useMemo(
    () =>
      Array.from({ length: particleCurves.length }, (_, i) => 1 / (3 + (i % 3))),
    [particleCurves.length]
  );

  return (
    <>
      <SceneSetup />

      {/* Neural network */}
      <group>
        {nodes.map((node, i) => (
          <NeuralNode key={i} position={node.position} isMobile={isMobile} />
        ))}
        {connections.map((conn) => (
          <NeuralConnection
            key={conn.index}
            start={conn.start}
            end={conn.end}
            index={conn.index}
          />
        ))}
      </group>

      {/* Data particles (desktop only) */}
      {!isMobile &&
        particleCurves.map((curve, i) => (
          <DataParticle
            key={i}
            curve={curve}
            particleIndex={i}
            speed={particleSpeeds[i]}
          />
        ))}

      {/* Camera */}
      <CameraRig
        scrollProgress={scrollProgress}
        isAmbient={isAmbient}
        isMobile={isMobile}
      />
    </>
  );
}
