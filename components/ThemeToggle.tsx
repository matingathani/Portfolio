import React, { useEffect, useState } from 'react';
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

const Icon = styled.i`
  margin-right: 8px;
`;

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('mg_theme');
      setIsDark(stored !== 'light');
    } catch {}
  }, []);

  const handleClick = () => {
    (window as any).__toggleTheme?.();
  };

  return (
    <ToggleButton onClick={handleClick} aria-label="Toggle theme">
      {isDark ? <Icon className="fas fa-sun" /> : <Icon className="fas fa-moon" />}
      {isDark ? 'Light' : 'Dark'}
    </ToggleButton>
  );
};

export default ThemeToggle;


