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
    font-family: ${props => props.theme.typography.bodyFont};
    background: ${props => props.theme.colors.background};
    background-attachment: fixed;
    color: ${props => props.theme.colors.text};
    overflow-x: hidden;
    position: relative;
    
    /* Pixel Grid Background */
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(${props => props.theme.colors.gridLine} 1px, transparent 1px),
        linear-gradient(90deg, ${props => props.theme.colors.gridLine} 1px, transparent 1px);
      background-size: 32px 32px;
      pointer-events: none;
      z-index: 0;
      opacity: 0.4;
      animation: gridPulse 8s ease-in-out infinite;
    }
    
    /* Subtle animated particles */
    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.06) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
      animation: particleFloat 20s ease-in-out infinite;
    }
  }
  
  @keyframes gridPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.6; }
  }
  
  @keyframes particleFloat {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(20px, -20px); }
    66% { transform: translate(-20px, 20px); }
  }
  
  @media (prefers-reduced-motion: reduce) {
    body::before,
    body::after {
      animation: none;
    }
  }


  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 1.2;
    font-family: ${props => props.theme.typography.headingFont};
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    font-family: ${props => props.theme.typography.bodyFont};
    font-weight: 400;
    line-height: 1.6;
    color: ${props => props.theme.colors.textSecondary};
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
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(20, 20, 32, 0.5);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #3B82F6 0%, #22D3EE 100%);
    border-radius: 10px;
    border: 2px solid rgba(10, 14, 23, 0.5);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #60A5FA 0%, #38BDF8 100%);
  }
`;

export default GlobalStyle;
