"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "../lib/hooks";

const codeSnippets = [
  "const", "function", "async", "await", "return", "import", "export",
  "class", "interface", "type", "let", "var", "if", "else", "for", "while",
  "try", "catch", "finally", "=>", "()", "{}", "[]", "<>", "//", "/*",
  "python", "java", "react", "next", "api", "data", "ai", "ml", "npm",
  "git", "docker", "sql", "json", "html", "css", "js", "ts", "tsx"
];

export default function GradientCodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
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

    // Code particles
    const particles: Array<{
      text: string;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 10 + Math.random() * 8,
        opacity: 0.25 + Math.random() * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw code particles
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const particle of particles) {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        // Subtle glow effect - Light theme colors
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${(Date.now() * 0.1 + particle.x * 0.1) % 360}, 70%, 60%, 0.4)`;
        const textHue = (Date.now() * 0.05 + particle.x * 0.05) % 360;
        ctx.fillStyle = `hsla(${textHue}, 65%, 45%, ${particle.opacity})`;
        ctx.fillText(particle.text, 0, 0);
        
        ctx.restore();

        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Wrap around edges
        if (particle.x < -50) particle.x = width + 50;
        if (particle.x > width + 50) particle.x = -50;
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
      {/* Animated gradient background - Light theme */}
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
      {/* Code particles overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 w-full h-full opacity-70"
        style={{ pointerEvents: "none" }}
      />
    </>
  );
}
