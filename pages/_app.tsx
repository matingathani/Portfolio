import React, { useMemo, useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import { darkTheme, lightTheme } from '../styles/theme';
import 'aos/dist/aos.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem('mg_theme');
    if (stored === 'light') setIsDark(false);
  }, []);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Matin Gathani – Computer Science student and AI Engineer portfolio." />
        <meta name="theme-color" content={isDark ? '#050816' : '#ffffff'} />
        <title>Matin Gathani | Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
        {/* Theme toggle portal via global handler */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__toggleTheme = function(){try{const cur=localStorage.getItem('mg_theme');localStorage.setItem('mg_theme',cur==='light'?'dark':'light');location.reload()}catch(e){}};`,
          }}
        />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
