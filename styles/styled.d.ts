import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      backgroundLight: string;
      text: string;
      textSecondary: string;
      accent: string;
    },
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    }
  }
}