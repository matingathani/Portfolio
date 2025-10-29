const darkTheme = {
  colors: {
    primary: '#6e57e0',
    secondary: '#00c2ff',
    background: '#050816',
    backgroundLight: '#0a0a19',
    text: '#ffffff',
    textSecondary: '#aaaaaa',
    accent: '#ffa500',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  }
};

const lightTheme = {
  colors: {
    primary: '#6e57e0',
    secondary: '#00c2ff',
    background: '#ffffff',
    backgroundLight: '#f6f7fb',
    text: '#0a0a19',
    textSecondary: '#4a4a70',
    accent: '#ffa500',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  }
};

export { darkTheme as theme, darkTheme, lightTheme };
export default darkTheme;
