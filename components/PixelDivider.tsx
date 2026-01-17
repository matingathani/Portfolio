import React from "react";
import styled from "styled-components";

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 3rem 0;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.gridLine};
  }
`;

const PixelDot = styled.div`
  width: 4px;
  height: 4px;
  background: ${props => props.theme.colors.primary};
  box-shadow: 
    0 0 4px ${props => props.theme.colors.primary},
    0 0 8px ${props => props.theme.colors.primary};
  animation: pixelPulse 2s ease-in-out infinite;
  
  @keyframes pixelPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.9); }
  }
`;

const PixelDivider: React.FC = () => (
  <DividerContainer>
    <PixelDot />
    <PixelDot />
    <PixelDot />
  </DividerContainer>
);

export default PixelDivider;

