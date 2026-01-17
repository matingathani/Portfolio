"use client";

import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Link from "next/link";
import { resume } from "../data/resume";
import { ButtonPrimary, ButtonSecondary, Container } from "./ui";

const HeroWrapper = styled.section`
  padding: 140px 0 80px;
  position: relative;
  overflow: hidden;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div`
  h1 {
    font-size: 3.4rem;
    line-height: 1.1;
    margin-bottom: 1rem;
    background: ${props => props.theme.colors.gradient1};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    h1 {
      font-size: 2.6rem;
    }
  }
`;

const CTAGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeroVisual = styled.div<{ $tilt: { x: number; y: number } }>`
  height: 360px;
  border-radius: ${props => props.theme.shapes.borderRadius};
  border: 1px solid rgba(139, 92, 246, 0.3);
  background: radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.2), transparent 60%),
              radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.2), transparent 60%),
              rgba(15, 15, 24, 0.8);
  box-shadow: ${props => props.theme.shadows.large};
  overflow: hidden;
  position: relative;
  transform: perspective(900px) rotateX(${props => props.$tilt.y}deg) rotateY(${props => props.$tilt.x}deg);
  transition: transform 0.12s ease;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 280px;
  }
`;

const FallbackVisual = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-align: center;
  padding: 1rem;
`;

const DynamicHeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

const HeroLanding: React.FC = () => {
  const [enable3D, setEnable3D] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 900;
    const memory = (navigator as any).deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 8;
    setEnable3D(!reduced && !isMobile && memory >= 4 && cores >= 4);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
    setTilt({ x, y });
  };

  const subheadline = useMemo(() => (
    "AI/ML pipelines · Backend systems · Data & APIs · Full‑stack delivery"
  ), []);

  return (
    <HeroWrapper>
      <Container>
        <HeroGrid>
          <HeroContent>
            <PillGroup>
              <span>AI / Software Engineering Student</span>
              <span>Production ML + API Delivery</span>
            </PillGroup>
            <h1>{resume.title}</h1>
            <p>{resume.summary}</p>
            <p>{subheadline}</p>
            <CTAGroup>
              <Link href="/resume" passHref legacyBehavior>
                <ButtonPrimary>View Resume</ButtonPrimary>
              </Link>
              <Link href="/projects" passHref legacyBehavior>
                <ButtonSecondary>View Projects</ButtonSecondary>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <ButtonSecondary>Contact Me</ButtonSecondary>
              </Link>
            </CTAGroup>
          </HeroContent>

          <HeroVisual
            onMouseMove={enable3D ? handleMouseMove : undefined}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            $tilt={tilt}
          >
            {enable3D ? (
              <DynamicHeroScene />
            ) : (
              <FallbackVisual>
                <div>
                  <p>3D preview disabled on this device.</p>
                  <p>Optimized for performance & accessibility.</p>
                </div>
              </FallbackVisual>
            )}
          </HeroVisual>
        </HeroGrid>
      </Container>
    </HeroWrapper>
  );
};

const PillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;

  span {
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    background: rgba(139, 92, 246, 0.2);
    border: 1px solid rgba(139, 92, 246, 0.4);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 600;
  }
`;

export default HeroLanding;
