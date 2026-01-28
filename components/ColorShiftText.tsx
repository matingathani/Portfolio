"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ColorShiftTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export default function ColorShiftText({ children, className = "", speed = 1 }: ColorShiftTextProps) {
  const [hue, setHue] = useState(200);

  useEffect(() => {
    let animationFrame: number;
    let currentHue = 200;

    const animate = () => {
      currentHue = (currentHue + speed * 0.5) % 360;
      setHue(currentHue);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [speed]);

  return (
    <motion.span
      className={className}
      style={{
        color: `hsl(${hue}, 70%, 45%)`,
        transition: "color 0.1s ease-out",
      }}
    >
      {children}
    </motion.span>
  );
}
