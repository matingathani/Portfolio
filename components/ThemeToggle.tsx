import React from 'react';
import styled from 'styled-components';

const ToggleButton = styled.button`
  background: none;
  border: 1px solid rgba(255,255,255,0.2);
  color: ${props => props.theme.colors.text};
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  &:hover { opacity: 0.8; }
`;

const ThemeToggle: React.FC = () => {
  return (
    <ToggleButton onClick={() => (window as any).__toggleTheme?.()} aria-label="Toggle theme">
      Toggle Theme
    </ToggleButton>
  );
};

export default ThemeToggle;


