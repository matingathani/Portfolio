import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #050816;
    color: #ffffff;
    overflow-x: hidden;
  }

  section {
    padding: 100px 5%;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 1.2;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #0a0a19;
  }

  ::-webkit-scrollbar-thumb {
    background: #3a3a60;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #4a4a70;
  }
`;

export default GlobalStyle;
