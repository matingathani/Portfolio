"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "../lib/hooks";

export default function RainLightningBackground() {
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

    // Rain drops
    const rainDrops: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 200; i++) {
      rainDrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 10 + Math.random() * 20,
        speed: 2 + Math.random() * 5,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    // Lightning
    let lightningTimer = 0;
    let lightningActive = false;
    let lightningOpacity = 0;

    const drawLightning = () => {
      if (lightningActive) {
        ctx.fillStyle = `rgba(255, 255, 255, ${lightningOpacity})`;
        ctx.fillRect(0, 0, width, height);
        lightningOpacity -= 0.1;
        if (lightningOpacity <= 0) {
          lightningActive = false;
        }
      }
    };

    const triggerLightning = () => {
      if (Math.random() > 0.98) {
        lightningActive = true;
        lightningOpacity = 0.8;
        setTimeout(() => {
          lightningActive = false;
          lightningOpacity = 0;
        }, 100);
      }
    };

    const draw = () => {
      ctx.fillStyle = "#0a0e17";
      ctx.fillRect(0, 0, width, height);

      // Draw lightning flash
      drawLightning();

      // Draw rain
      ctx.strokeStyle = "rgba(173, 216, 230, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      for (const drop of rainDrops) {
        ctx.globalAlpha = drop.opacity;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // Update rain positions
      for (const drop of rainDrops) {
        drop.y += drop.speed;
        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      }

      // Lightning timing
      lightningTimer++;
      if (lightningTimer > 60) {
        triggerLightning();
        lightningTimer = 0;
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
