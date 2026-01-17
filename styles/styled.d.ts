import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      // Base Colors
      background: string;
      surface: string;
      surfaceElevated: string;
      
      // Text Colors
      text: string;
      textSecondary: string;
      textMuted: string;
      
      // Accent Colors
      primary: string;
      secondary: string;
      pixelHit: string;
      
      // Pixel Grid
      gridLine: string;
      
      // System Colors
      success: string;
      warning: string;
      error: string;
      
      // Legacy support
      backgroundLight: string;
      backgroundGradient: string;
      accent: string;
      tertiary?: string;
      quaternary?: string;
      gradient1: string;
      gradient2: string;
      gradient3: string;
    },
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    },
    shapes: {
      borderRadius: string;
      borderRadiusSmall: string;
      borderRadiusLarge: string;
    },
    shadows: {
      small: string;
      medium: string;
      large: string;
      glow: string;
      pixelGlow: string;
    },
    typography: {
      headingFont: string;
      bodyFont: string;
      monoFont: string;
    }
  }
}