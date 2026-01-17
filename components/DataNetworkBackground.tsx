"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, usePageVisibility, usePrefersReducedMotion } from "../lib/hooks";

const NODE_COUNT = 42;

export default function DataNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const visible = usePageVisibility();

  useEffect(() => {
    if (!canvasRef.current || reduced || isMobile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: NODE_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const mouse = { x: -9999, y: -9999 };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      if (!visible) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(59, 130, 246, 0.35)";
      ctx.strokeStyle = "rgba(34, 211, 238, 0.2)";

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const mx = node.x - mouse.x;
        const my = node.y - mouse.y;
        const dist = Math.hypot(mx, my);
        if (dist < 120) {
          node.vx += (mx / dist) * 0.02;
          node.vy += (my / dist) * 0.02;
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160) {
            ctx.globalAlpha = 1 - dist / 160;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 0.8;
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [reduced, isMobile, visible]);

  if (reduced || isMobile) {
    return (
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.2), transparent 40%), radial-gradient(circle at 80% 40%, rgba(34,211,238,0.15), transparent 40%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-30 pointer-events-none"
      aria-hidden
    />
  );
}
