const theme = {
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

// Debug
// eslint-disable-next-line no-console
console.log('DEBUG theme build keys:', Object.keys(theme), 'colors keys', Object.keys(theme.colors || {}));

export { theme };
export default theme;
