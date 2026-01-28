"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "../lib/hooks";

export default function TechGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    // Grid configuration
    const gridSize = 50;
    const lineWidth = 0.5;
    const gridColor = "rgba(59, 130, 246, 0.15)";
    const accentColor = "rgba(96, 165, 250, 0.25)";

    // Floating particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    let time = 0;

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = lineWidth;

      // Vertical lines with subtle animation
      for (let x = 0; x < width; x += gridSize) {
        const offset = Math.sin(time + x * 0.001) * 2;
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, height);
        ctx.stroke();
      }

      // Horizontal lines with subtle animation
      for (let y = 0; y < height; y += gridSize) {
        const offset = Math.cos(time + y * 0.001) * 2;
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(width, y + offset);
        ctx.stroke();
      }

      // Draw connection lines between nearby particles
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.globalAlpha = (1 - dist / 150) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Draw particles
      ctx.fillStyle = accentColor;
      for (const particle of particles) {
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Update particles
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [reduced, isMobile]);

  if (reduced || isMobile) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #0a0e17 0%, #0f1625 50%, #0a0e17 100%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
