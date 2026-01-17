'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavbarContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  background: rgba(10, 14, 23, 0.85);
  border-bottom: 1px solid ${props => props.theme.colors.gridLine};
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
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

const Logo = styled.a`
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.headingFont};
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: all 0.2s ease;

  span {
    color: ${props => props.theme.colors.primary};
  }
  
  &:hover {
    text-shadow: 0 0 8px ${props => props.theme.colors.primary};
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
    background: rgba(10, 14, 23, 0.95);
    border-top: 1px solid ${props => props.theme.colors.gridLine};
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    clip-path: ${props => props.isOpen ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 0, 0 0)'};
    transition: clip-path 0.4s ease;
  }
`;

const NavLink = styled.a<{ $active?: boolean }>`
  color: ${props => props.theme.colors.textSecondary};
  margin: 0 1rem;
  font-size: 1rem;
  font-family: ${props => props.theme.typography.bodyFont};
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${props => props.theme.colors.text};
    
    &::after {
      width: 100%;
    }
  }

  ${props => props.$active ? `
    color: ${props.theme.colors.primary};
    
    &::after {
      width: 100%;
    }
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
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Home', href: '/', match: (path: string) => path === '/' },
    { label: 'About', href: '/about', match: (path: string) => path === '/about' },
    { label: 'Experience', href: '/experience', match: (path: string) => path === '/experience' },
    { label: 'Projects', href: '/projects', match: (path: string) => path.startsWith('/projects') },
    { label: 'Skills', href: '/skills', match: (path: string) => path === '/skills' },
    { label: 'Resume', href: '/resume', match: (path: string) => path === '/resume' },
    { label: 'Contact', href: '/contact', match: (path: string) => path === '/contact' },
  ];

  return (
    <NavbarContainer style={{ background: scrolled ? 'rgba(5, 8, 22, 0.95)' : 'transparent' }}>
      <NavContent>
        <Link href="/" passHref legacyBehavior>
          <Logo>
            Matin<span>Gathani</span>
          </Logo>
        </Link>

        <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </MobileMenuButton>

        <NavLinks isOpen={isOpen}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} passHref legacyBehavior>
              <NavLink
                $active={link.match(router.pathname)}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            </Link>
          ))}
          <Link href="/blog" passHref legacyBehavior>
            <NavLink
              $active={router.pathname.startsWith('/blog')}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </NavLink>
          </Link>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
