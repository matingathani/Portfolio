// Neo-Pixel Tech Noir Theme
const darkTheme = {
  colors: {
    // Base Colors
    background: '#0A0E17', // near-black navy
    surface: '#111827', // surface panels
    surfaceElevated: '#1F2937', // elevated surfaces
    
    // Text Colors
    text: '#E6EAF2', // primary text
    textSecondary: '#9CA3AF', // secondary text
    textMuted: '#6B7280', // muted text
    
    // Accent Colors (max TWO visible at once)
    primary: '#3B82F6', // Electric Blue
    secondary: '#22D3EE', // Cyan
    pixelHit: '#A855F7', // Purple - VERY limited use
    
    // Pixel Grid
    gridLine: 'rgba(59, 130, 246, 0.15)', // pixel grid lines
    
    // System Colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    
    // Legacy support (will be phased out)
    backgroundLight: '#111827',
    backgroundGradient: 'linear-gradient(135deg, #0A0E17 0%, #111827 100%)',
    accent: '#3B82F6',
    gradient1: 'linear-gradient(135deg, #3B82F6 0%, #22D3EE 100%)',
    gradient2: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)',
    gradient3: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  shapes: {
    borderRadius: '8px', // sharper, more tech feel
    borderRadiusSmall: '4px',
    borderRadiusLarge: '12px',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.4)',
    large: '0 8px 32px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(59, 130, 246, 0.4)', // electric blue glow
    pixelGlow: '0 0 8px rgba(59, 130, 246, 0.6)', // pixel hit effect
  },
  typography: {
    headingFont: '"Space Grotesk", -apple-system, sans-serif',
    bodyFont: '"Inter", -apple-system, sans-serif',
    monoFont: '"JetBrains Mono", monospace',
  }
};

// Light theme removed - single dark theme only
const lightTheme = darkTheme;

export { darkTheme as theme, darkTheme, lightTheme };
export default darkTheme;
