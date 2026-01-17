import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      background: string;
      backgroundLight: string;
      backgroundGradient: string;
      text: string;
      textSecondary: string;
      accent: string;
      success: string;
      warning: string;
      error: string;
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
    }
  }
}