'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

const Logo = styled.a`
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
          <div style={{ marginLeft: '1rem' }}>
            <ThemeToggle />
          </div>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
