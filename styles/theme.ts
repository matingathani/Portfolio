const darkTheme = {
  colors: {
    primary: '#8b5cf6', // Vibrant purple
    secondary: '#06b6d4', // Cyan
    tertiary: '#f59e0b', // Amber
    quaternary: '#ec4899', // Pink
    background: '#0a0a0f',
    backgroundLight: '#141420',
    backgroundGradient: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
    text: '#ffffff',
    textSecondary: '#b8b8d4',
    accent: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gradient1: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    gradient2: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
    gradient3: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  shapes: {
    borderRadius: '24px',
    borderRadiusSmall: '16px',
    borderRadiusLarge: '32px',
  },
  shadows: {
    small: '0 4px 20px rgba(139, 92, 246, 0.15)',
    medium: '0 8px 30px rgba(139, 92, 246, 0.25)',
    large: '0 15px 50px rgba(139, 92, 246, 0.35)',
    glow: '0 0 30px rgba(139, 92, 246, 0.5)',
  }
};

const lightTheme = {
  colors: {
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    tertiary: '#f59e0b',
    quaternary: '#ec4899',
    background: '#ffffff',
    backgroundLight: '#f8fafc',
    backgroundGradient: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)',
    text: '#0f172a',
    textSecondary: '#475569',
    accent: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gradient1: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    gradient2: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
    gradient3: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  shapes: {
    borderRadius: '24px',
    borderRadiusSmall: '16px',
    borderRadiusLarge: '32px',
  },
  shadows: {
    small: '0 4px 20px rgba(139, 92, 246, 0.1)',
    medium: '0 8px 30px rgba(139, 92, 246, 0.15)',
    large: '0 15px 50px rgba(139, 92, 246, 0.2)',
    glow: '0 0 30px rgba(139, 92, 246, 0.3)',
  }
};

export { darkTheme as theme, darkTheme, lightTheme };
export default darkTheme;
