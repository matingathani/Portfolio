"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "../lib/hooks";
import Image from "next/image";

const codeSnippets = [
  "const data = await fetch('/api');",
  "function processData() { return data; }",
  "import { useState } from 'react';",
  "class NeuralNetwork { train() {} }",
  "async function loadModel() { await model.load(); }",
  "export default function Component() {}",
  "const result = data.map(x => x * 2);",
  "interface User { name: string; }",
  "type Response = { status: number; }",
  "try { await api.call(); } catch(e) {}",
  "SELECT * FROM users WHERE id = ?",
  "docker run -p 3000:3000 app",
  "git commit -m 'feat: add feature'",
  "npm install react next",
  "def train_model(data): return model",
  "public class Main { public static void main() {} }",
];

const languages = [
  { name: "python", logo: "/logos/python.svg" },
  { name: "java", logo: "/logos/java.svg" },
  { name: "javascript", logo: "/logos/javascript.svg" },
  { name: "react", logo: "/logos/react.svg" },
  { name: "cpp", logo: "/logos/cpp.svg" },
  { name: "docker", logo: "/logos/docker.svg" },
  { name: "git", logo: "/logos/git.svg" },
  { name: "sql", logo: "/logos/sql.svg" },
];

export default function FlowingCodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!canvasRef.current || reduced || isMobile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    // Flowing code snippets
    const codeParticles: Array<{
      text: string;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      rotation: number;
    }> = [];

    for (let i = 0; i < 25; i++) {
      codeParticles.push({
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: 11 + Math.random() * 4,
        opacity: 0.2 + Math.random() * 0.25,
        rotation: (Math.random() - 0.5) * 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw flowing code snippets
      ctx.font = `${12}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      for (const particle of codeParticles) {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        // Color-shifting effect
        const hue = (Date.now() * 0.02 + particle.x * 0.1) % 360;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${hue}, 70%, 50%, 0.5)`;
        ctx.fillStyle = `hsla(${hue}, 65%, 40%, ${particle.opacity})`;
        ctx.fillText(particle.text, 0, 0);
        
        ctx.restore();

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += 0.002;

        // Wrap around edges
        if (particle.x < -200) particle.x = width + 200;
        if (particle.x > width + 200) particle.x = -200;
        if (particle.y < -50) particle.y = height + 50;
        if (particle.y > height + 50) particle.y = -50;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [reduced, isMobile]);

  // Gradient animation - Light theme
  useEffect(() => {
    if (!gradientRef.current || reduced || isMobile) return;

    let animationFrame: number;
    let hue = 200;

    const animateGradient = () => {
      if (gradientRef.current) {
        hue = (hue + 0.5) % 360;
        const color1 = `hsl(${hue}, 60%, 85%)`;
        const color2 = `hsl(${(hue + 80) % 360}, 55%, 80%)`;
        const color3 = `hsl(${(hue + 160) % 360}, 50%, 75%)`;
        
        gradientRef.current.style.background = `
          radial-gradient(circle at 20% 30%, ${color1} 0%, transparent 60%),
          radial-gradient(circle at 80% 70%, ${color2} 0%, transparent 60%),
          radial-gradient(circle at 50% 50%, ${color3} 0%, transparent 70%),
          linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 60%, #f1f5f9 100%)
        `;
      }
      animationFrame = requestAnimationFrame(animateGradient);
    };

    animationFrame = requestAnimationFrame(animateGradient);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [reduced, isMobile]);

  if (reduced || isMobile) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
        }}
      />
    );
  }

  return (
    <>
      {/* Animated gradient background */}
      <div
        ref={gradientRef}
        className="fixed inset-0 -z-10 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, hsl(200, 60%, 85%) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, hsl(280, 55%, 80%) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, hsl(320, 50%, 75%) 0%, transparent 70%),
            linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 60%, #f1f5f9 100%)
          `,
        }}
      />
      {/* Flowing code snippets canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 w-full h-full opacity-70"
        style={{ pointerEvents: "none" }}
      />
      {/* Floating language logos */}
      <div
        ref={containerRef}
        className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none"
      >
        {languages.map((lang, i) => (
          <FloatingLogo
            key={lang.name}
            logo={lang.logo}
            name={lang.name}
            index={i}
            total={languages.length}
            reduced={reduced}
          />
        ))}
      </div>
    </>
  );
}

function FloatingLogo({
  logo,
  name,
  index,
  total,
  reduced,
}: {
  logo: string;
  name: string;
  index: number;
  total: number;
  reduced: boolean;
}) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current || reduced) return;

    const element = logoRef.current;
    const startX = (index % 4) * 25 + 10 + Math.random() * 5;
    const startY = (Math.floor(index / 4) * 25 + 10 + Math.random() * 5);
    
    element.style.left = `${startX}%`;
    element.style.top = `${startY}%`;

    let animationFrame: number;
    let x = startX;
    let y = startY;
    let vx = (Math.random() - 0.5) * 0.02;
    let vy = (Math.random() - 0.5) * 0.02;

    const animate = () => {
      x += vx;
      y += vy;

      if (x < 5 || x > 95) vx *= -1;
      if (y < 5 || y > 95) vy *= -1;

      element.style.left = `${x}%`;
      element.style.top = `${y}%`;
      element.style.transform = `rotate(${Math.sin(Date.now() * 0.001 + index) * 5}deg)`;

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [index, reduced]);

  return (
    <div
      ref={logoRef}
      className="absolute opacity-30 hover:opacity-50 transition-opacity"
      style={{
        width: "48px",
        height: "48px",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
      }}
    >
      <Image
        src={logo}
        alt={name}
        width={48}
        height={48}
        className="w-full h-full object-contain"
        unoptimized
      />
    </div>
  );
}
