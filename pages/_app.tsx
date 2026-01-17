import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import { darkTheme } from '../styles/theme';
import 'aos/dist/aos.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Matin Gathani — AI / Software Engineering student with production ML, backend, and full-stack delivery experience."
        />
        <meta name="theme-color" content="#0a0a0f" />
        <meta property="og:title" content="Matin Gathani | AI / Software Engineering Portfolio" />
        <meta
          property="og:description"
          content="AI/ML pipelines, backend systems, data & APIs, and full‑stack delivery. Recruiter‑ready case studies and resume."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-card.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Matin Gathani | AI / Software Engineering Portfolio" />
        <meta
          name="twitter:description"
          content="AI/ML pipelines, backend systems, data & APIs, and full‑stack delivery."
        />
        <meta name="twitter:image" content="/og-card.svg" />
        <title>Matin Gathani | Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
