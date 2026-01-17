import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const PixelButtonBase = styled(motion.button)<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: 1px solid ${props => props.$variant === 'primary' ? props.theme.colors.primary : props.theme.colors.gridLine};
  background: ${props => props.$variant === 'primary' 
    ? `linear-gradient(135deg, ${props.theme.colors.primary} 0%, ${props.theme.colors.secondary} 100%)`
    : 'transparent'};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.bodyFont};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.pixelGlow};
    border-color: ${props => props.theme.colors.primary};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const PixelButton: React.FC<PixelButtonProps> = ({ variant = 'primary', children, ...props }) => (
  <PixelButtonBase
    $variant={variant}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    {...props}
  >
    {children}
  </PixelButtonBase>
);

export default PixelButton;

