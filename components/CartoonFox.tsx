"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function CartoonFox() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(y, [0, 500], [10, -10]);
  const rotateY = useTransform(x, [0, 500], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x, y });
      }
    };

    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener("mousemove", handleMouseMove);
      svg.addEventListener("mouseenter", () => setIsHovered(true));
      svg.addEventListener("mouseleave", () => setIsHovered(false));
    }

    return () => {
      if (svg) {
        svg.removeEventListener("mousemove", handleMouseMove);
        svg.removeEventListener("mouseenter", () => setIsHovered(true));
        svg.removeEventListener("mouseleave", () => setIsHovered(false));
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
      <motion.svg
        ref={svgRef}
        viewBox="0 0 500 500"
        className="w-full h-full max-w-md cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        style={{ 
          willChange: 'transform', 
          transform: 'translateZ(0)',
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
      >
        <defs>
          {/* Warm Sky Gradient */}
          <linearGradient id="warmSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE8CC" />
            <stop offset="30%" stopColor="#FFD4A3" />
            <stop offset="60%" stopColor="#FFC085" />
            <stop offset="100%" stopColor="#E8B870" />
          </linearGradient>
          
          {/* Grass Texture Pattern */}
          <pattern id="grassPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#7CB342" />
            <path d="M 2 20 Q 5 15 8 20" stroke="#5A8A2E" strokeWidth="1.5" fill="none" />
            <path d="M 8 20 Q 11 15 14 20" stroke="#5A8A2E" strokeWidth="1.5" fill="none" />
            <path d="M 14 20 Q 17 15 20 20" stroke="#5A8A2E" strokeWidth="1.5" fill="none" />
            <path d="M 5 20 Q 7 16 9 20" stroke="#6B9A3A" strokeWidth="1" fill="none" />
            <path d="M 11 20 Q 13 16 15 20" stroke="#6B9A3A" strokeWidth="1" fill="none" />
            <path d="M 17 20 Q 19 16 20 20" stroke="#6B9A3A" strokeWidth="1" fill="none" />
          </pattern>

          {/* Grass Gradient Overlay */}
          <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8BC34A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7CB342" stopOpacity="1" />
            <stop offset="100%" stopColor="#689F38" stopOpacity="0.95" />
          </linearGradient>

          {/* Warm Sun Rays */}
          <radialGradient id="sunRays" cx="50%" cy="20%">
            <stop offset="0%" stopColor="#FFF8E7" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#FFE8CC" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFD4A3" stopOpacity="0" />
          </radialGradient>

          {/* Tree Gradients */}
          <linearGradient id="treeTrunk" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5A3C" />
            <stop offset="50%" stopColor="#6B4423" />
            <stop offset="100%" stopColor="#5A3A1F" />
          </linearGradient>
          
          <linearGradient id="treeLeaves" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A7C3A" />
            <stop offset="50%" stopColor="#3A6B2A" />
            <stop offset="100%" stopColor="#2D5016" />
          </linearGradient>

          {/* Fox Body */}
          <linearGradient id="foxBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF9D5C" />
            <stop offset="50%" stopColor="#FF7A3D" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
          
          <linearGradient id="foxBelly" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E7" />
            <stop offset="100%" stopColor="#FFE5B4" />
          </linearGradient>

          {/* Shadow */}
          <filter id="dropShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Warm Sky Background */}
        <rect width="500" height="500" fill="url(#warmSky)" />
        
        {/* Warm Sun Rays */}
        <ellipse cx="250" cy="100" rx="180" ry="120" fill="url(#sunRays)" opacity="0.6" />
        <circle cx="250" cy="100" r="40" fill="#FFE8CC" opacity="0.9" />

        {/* Background Trees */}
        <g opacity="0.7">
          {[
            { x: 30, y: 200, width: 25, height: 180, leaves: [{ x: 30, y: 200, rx: 35, ry: 40 }] },
            { x: 450, y: 180, width: 25, height: 200, leaves: [{ x: 450, y: 180, rx: 40, ry: 45 }] },
            { x: 100, y: 220, width: 20, height: 160, leaves: [{ x: 100, y: 220, rx: 30, ry: 35 }] },
            { x: 400, y: 210, width: 20, height: 170, leaves: [{ x: 400, y: 210, rx: 28, ry: 32 }] },
          ].map((tree, i) => (
            <g key={`tree-${i}`}>
              <rect x={tree.x} y={tree.y} width={tree.width} height={tree.height} fill="url(#treeTrunk)" rx="3" filter="url(#dropShadow)" />
              {tree.leaves.map((leaf, j) => (
                <ellipse key={j} cx={leaf.x} cy={leaf.y} rx={leaf.rx} ry={leaf.ry} fill="url(#treeLeaves)" />
              ))}
            </g>
          ))}
        </g>

        {/* Grass Background - Detailed */}
        <rect x="0" y="400" width="500" height="100" fill="url(#grassGradient)" />
        <rect x="0" y="400" width="500" height="100" fill="url(#grassPattern)" opacity="0.6" />
        
        {/* Individual Grass Blades for Detail */}
        {[...Array(60)].map((_, i) => {
          const xPos = (i * 8.5) % 500;
          const height = 15 + (i % 5) * 3;
          const sway = Math.sin(i) * 2;
          return (
            <motion.path
              key={`grass-${i}`}
              d={`M ${xPos} 500 Q ${xPos + sway} ${500 - height * 0.5} ${xPos + sway * 0.5} ${500 - height}`}
              stroke="#5A8A2E"
              strokeWidth={1.5 + (i % 2)}
              fill="none"
              strokeLinecap="round"
              animate={isHovered ? {
                d: [
                  `M ${xPos} 500 Q ${xPos + sway} ${500 - height * 0.5} ${xPos + sway * 0.5} ${500 - height}`,
                  `M ${xPos} 500 Q ${xPos + sway * 1.5} ${500 - height * 0.5} ${xPos + sway * 0.8} ${500 - height}`,
                  `M ${xPos} 500 Q ${xPos + sway} ${500 - height * 0.5} ${xPos + sway * 0.5} ${500 - height}`,
                ],
              } : {}}
              transition={{
                duration: 1 + (i % 3) * 0.2,
                repeat: isHovered ? Infinity : 0,
                delay: i * 0.05,
              }}
            />
          );
        })}

        {/* Additional Grass Layer for Depth */}
        {[...Array(40)].map((_, i) => {
          const xPos = (i * 12.5) % 500;
          const height = 20 + (i % 4) * 4;
          const sway = Math.cos(i) * 3;
          return (
            <motion.path
              key={`grass2-${i}`}
              d={`M ${xPos} 500 Q ${xPos + sway} ${500 - height * 0.6} ${xPos + sway * 0.6} ${500 - height}`}
              stroke="#6B9A3A"
              strokeWidth={2 + (i % 2)}
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
              animate={isHovered ? {
                d: [
                  `M ${xPos} 500 Q ${xPos + sway} ${500 - height * 0.6} ${xPos + sway * 0.6} ${500 - height}`,
                  `M ${xPos} 500 Q ${xPos + sway * 1.8} ${500 - height * 0.6} ${xPos + sway * 1} ${500 - height}`,
                  `M ${xPos} 500 Q ${xPos + sway} ${500 - height * 0.6} ${xPos + sway * 0.6} ${500 - height}`,
                ],
              } : {}}
              transition={{
                duration: 1.2 + (i % 3) * 0.3,
                repeat: isHovered ? Infinity : 0,
                delay: i * 0.08,
              }}
            />
          );
        })}

        {/* The Adventurous Fox - Animation Changes on Hover */}
        <g transform="translate(250, 350)">
          <motion.g
            animate={isHovered ? {
              y: [0, -15, 0],
              scale: [1, 1.05, 1],
            } : {
              y: [0, -8, 0],
            }}
            transition={{
              duration: isHovered ? 0.4 : 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: 'transform' }}
          >
            {/* Fox Body */}
            <ellipse cx="0" cy="25" rx="40" ry="28" fill="url(#foxBody)" filter="url(#dropShadow)" />
            <ellipse cx="0" cy="30" rx="28" ry="22" fill="url(#foxBelly)" />
            <ellipse cx="0" cy="20" rx="12" ry="15" fill="#FFF8E7" opacity="0.9" />

            {/* Fox Head */}
            <motion.g
              animate={isHovered ? {
                rotate: [0, 5, -5, 0],
                x: [0, 3, -3, 0],
              } : {}}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
              }}
            >
              <ellipse cx="0" cy="-20" rx="32" ry="35" fill="url(#foxBody)" filter="url(#dropShadow)" />
              <ellipse cx="0" cy="-15" rx="24" ry="26" fill="url(#foxBelly)" />
              <ellipse cx="0" cy="-10" rx="18" ry="20" fill="#FFF8E7" opacity="0.95" />

              {/* Ears */}
              <motion.polygon
                points="-22,-40 -12,-58 -6,-48"
                fill="url(#foxBody)"
                animate={isHovered ? { rotate: [0, 15, -15, 0] } : { rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: isHovered ? 0.8 : 1.2, repeat: Infinity }}
                style={{ transformOrigin: "-17px -49px" }}
              />
              <motion.polygon
                points="22,-40 12,-58 6,-48"
                fill="url(#foxBody)"
                animate={isHovered ? { rotate: [0, -15, 15, 0] } : { rotate: [0, -5, 0, 5, 0] }}
                transition={{ duration: isHovered ? 0.8 : 1.2, repeat: Infinity }}
                style={{ transformOrigin: "17px -49px" }}
              />
              <polygon points="-22,-40 -12,-58 -6,-48" fill="#FFE5B4" opacity="0.7" />
              <polygon points="22,-40 12,-58 6,-48" fill="#FFE5B4" opacity="0.7" />

              {/* Snout */}
              <ellipse cx="0" cy="-5" rx="14" ry="12" fill="#FFE5B4" />
              <ellipse cx="0" cy="0" rx="7" ry="6" fill="#1a1a2e" />

              {/* Eyes - More Excited on Hover */}
              <motion.ellipse
                cx="-10"
                cy="-22"
                rx="7"
                ry={isHovered ? 12 : 10}
                fill="#1a1a2e"
                animate={isHovered ? { scaleY: [1, 1.5, 1] } : { scaleY: [1, 1.2, 1] }}
                transition={{ duration: isHovered ? 1.5 : 2.5, repeat: Infinity }}
              />
              <motion.ellipse
                cx="10"
                cy="-22"
                rx="7"
                ry={isHovered ? 12 : 10}
                fill="#1a1a2e"
                animate={isHovered ? { scaleY: [1, 1.5, 1] } : { scaleY: [1, 1.2, 1] }}
                transition={{ duration: isHovered ? 1.5 : 2.5, repeat: Infinity, delay: 0.15 }}
              />
              <circle cx="-8" cy="-24" r="3" fill="#FFF" />
              <circle cx="8" cy="-24" r="3" fill="#FFF" />
              <circle cx="-7" cy="-25" r="1.5" fill="#FFD700" />
              <circle cx="9" cy="-25" r="1.5" fill="#FFD700" />
            </motion.g>

            {/* Tail - More Dynamic on Hover */}
            <motion.g
              animate={isHovered ? { rotate: [-30, 30, -30] } : { rotate: [-15, 15, -15] }}
              transition={{ 
                duration: isHovered ? 0.5 : 0.8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ transformOrigin: "-30px 20px", willChange: 'transform' }}
            >
              <ellipse cx="-30" cy="20" rx="18" ry="30" fill="url(#foxBody)" />
              <ellipse cx="-30" cy="20" rx="12" ry="24" fill="#FF8C42" />
              <ellipse cx="-35" cy="10" rx="10" ry="18" fill="#FF6B9D" />
              <circle cx="-38" cy="5" r="6" fill="#FF9FF3" />
              <circle cx="-40" cy="0" r="5" fill="#FECA57" />
            </motion.g>

            {/* Front Legs - Faster on Hover */}
            <motion.g
              animate={isHovered ? {
                y: [0, 8, 0],
                rotate: [0, 8, 0],
              } : {
                y: [0, 5, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: isHovered ? 0.25 : 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: 'transform' }}
            >
              <ellipse cx="-15" cy="40" rx="7" ry="18" fill="url(#foxBody)" />
              <ellipse cx="15" cy="45" rx="7" ry="16" fill="url(#foxBody)" />
              <ellipse cx="-15" cy="53" rx="6" ry="10" fill="#FF8C42" />
              <ellipse cx="15" cy="55" rx="6" ry="10" fill="#FF8C42" />
              <ellipse cx="-15" cy="60" rx="5" ry="4" fill="#1a1a2e" />
              <ellipse cx="15" cy="62" rx="5" ry="4" fill="#1a1a2e" />
            </motion.g>

            {/* Back Legs - Faster on Hover */}
            <motion.g
              animate={isHovered ? {
                y: [0, -8, 0],
                rotate: [0, -10, 0],
              } : {
                y: [0, -5, 0],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: isHovered ? 0.25 : 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.15,
              }}
              style={{ willChange: 'transform' }}
            >
              <ellipse cx="-18" cy="35" rx="8" ry="20" fill="url(#foxBody)" />
              <ellipse cx="12" cy="37" rx="8" ry="18" fill="url(#foxBody)" />
              <ellipse cx="-18" cy="50" rx="7" ry="12" fill="#FF8C42" />
              <ellipse cx="12" cy="51" rx="7" ry="12" fill="#FF8C42" />
              <ellipse cx="-18" cy="58" rx="6" ry="5" fill="#1a1a2e" />
              <ellipse cx="12" cy="59" rx="6" ry="5" fill="#1a1a2e" />
            </motion.g>

            {/* Explorer Accessories */}
            <rect x="-10" y="8" width="20" height="25" rx="4" fill="#48DBFB" filter="url(#dropShadow)" />
            <rect x="-8" y="12" width="16" height="18" rx="2" fill="#1a1a2e" opacity="0.2" />
            <circle cx="0" y="15" r="2.5" fill="#FFD700" />
            
            <motion.ellipse
              cx="0"
              cy="-35"
              rx="20"
              ry="8"
              fill="#1a1a2e"
              animate={isHovered ? { y: [-35, -40, -35] } : { y: [-35, -37, -35] }}
              transition={{ duration: isHovered ? 1 : 1.5, repeat: Infinity }}
            />
            <ellipse cx="0" cy="-40" rx="16" ry="6" fill="#48DBFB" />
            <circle cx="0" cy="-42" r="3" fill="#FECA57" />

            {/* Scarf - More Dynamic on Hover */}
            <motion.path
              d={isHovered 
                ? "M 18 -15 Q 32 -5 42 5 Q 35 15 25 25"
                : "M 18 -15 Q 28 -8 35 0 Q 30 8 22 15"
              }
              stroke="#FF6B9D"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              animate={isHovered ? {
                pathLength: [0.7, 1, 0.7],
                opacity: [0.9, 1, 0.9],
              } : {
                pathLength: [0.6, 1, 0.6],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: isHovered ? 1.2 : 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        </g>

        {/* Motion Lines - More on Hover */}
        {[...Array(isHovered ? 15 : 8)].map((_, i) => (
          <motion.line
            key={`speed-${i}`}
            x1={120 + i * (isHovered ? 8 : 12)}
            y1={350}
            x2={110 + i * (isHovered ? 8 : 12)}
            y2={350}
            stroke="#FF6B9D"
            strokeWidth={isHovered ? "3" : "2.5"}
            opacity="0.5"
            strokeLinecap="round"
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: [0, isHovered ? 0.8 : 0.7, 0],
              x: [0, isHovered ? -35 : -25],
            }}
            transition={{
              duration: isHovered ? 0.8 : 1.2,
              repeat: Infinity,
              delay: i * (isHovered ? 0.05 : 0.08),
              ease: "easeOut",
            }}
            style={{ willChange: 'transform, opacity' }}
          />
        ))}

        {/* Sparkles - More Active on Hover */}
        {[...Array(isHovered ? 20 : 12)].map((_, i) => (
          <motion.circle
            key={`sparkle-${i}`}
            cx={60 + (i * 28) % 380}
            cy={50 + (i * 25) % 300}
            r={2 + (i % 3)}
            fill="#FFD700"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              scale: [0, isHovered ? 2 : 1.8, 1.2, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: isHovered ? 1.5 + (i % 2) : 2.5 + (i % 2),
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
            style={{ willChange: 'transform, opacity' }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
