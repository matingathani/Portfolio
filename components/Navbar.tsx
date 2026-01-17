'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const NavbarContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  background: rgba(5, 8, 22, 0.8);
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 1rem;
  }
`;

const Logo = styled.div`
  color: ${props => props.theme.colors.text};
  font-weight: 700;
  font-size: 1.5rem;
  cursor: pointer;

  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const NavLinks = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(5, 8, 22, 0.95);
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    clip-path: ${props => props.isOpen ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 0, 0 0)'};
    transition: clip-path 0.4s ease;
  }
`;

const NavLink = styled.a<{ $active?: boolean }>`
  color: ${props => props.theme.colors.text};
  margin: 0 1rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  ${props => props.$active ? `
    color: ${props.theme.colors.primary};
    border-bottom: 2px solid ${props.theme.colors.primary};
    padding-bottom: 2px;
  ` : ''}

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin: 1rem 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ids = ['about','skills','experience','projects','education','resume','contact'];
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(id); });
      }, { root: null, threshold: 0.3 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <NavbarContainer style={{ background: scrolled ? 'rgba(5, 8, 22, 0.95)' : 'transparent' }}>
      <NavContent>
        <Link href="/">
          <Logo>
            Matin<span>Gathani</span>
          </Logo>
        </Link>

        <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </MobileMenuButton>

        <NavLinks isOpen={isOpen}>
          <NavLink href="#about" $active={active==='about'}>About</NavLink>
          <NavLink href="#skills" $active={active==='skills'}>Skills</NavLink>
          <NavLink href="#experience" $active={active==='experience'}>Experience</NavLink>
          <NavLink href="#projects" $active={active==='projects'}>Projects</NavLink>
          <NavLink href="#education" $active={active==='education'}>Education</NavLink>
          <NavLink href="#resume" $active={active==='resume'}>Resume</NavLink>
          <NavLink href="#contact" $active={active==='contact'}>Contact</NavLink>
          <Link href="/blog" passHref legacyBehavior>
            <NavLink $active={false}>Blog</NavLink>
          </Link>
          <div style={{ marginLeft: '1rem' }}>
            <ThemeToggle />
          </div>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
