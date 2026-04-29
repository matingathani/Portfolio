import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import StoryCursor from "../components/story/Cursor";
import ScrollReset from "../components/ScrollReset";
import ScrollToTop from "../components/ScrollToTop";
import ScrollProgress from "../components/ScrollProgress";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import AccessibilitySkipLink from "../components/AccessibilitySkipLink";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { content } from "../lib/content";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
  display: "swap",
});
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
  display: "swap",
});
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: `${content.name} | ${content.role}`,
    template: `%s | ${content.name}`,
  },
  description: content.summary,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: `${content.name} | ${content.role}`,
    description: content.summary,
    url: baseUrl,
    siteName: content.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.name} | ${content.role}`,
    description: content.summary,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${baseUrl}/#person`,
                name: content.name,
                jobTitle: content.role,
                url: baseUrl,
                sameAs: [content.contact.linkedin, content.contact.github],
                alumniOf: {
                  "@type": "CollegeOrUniversity",
                  name: content.education.school,
                },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Tempe",
                  addressRegion: "AZ",
                },
              },
              {
                "@type": "WebSite",
                "@id": `${baseUrl}/#website`,
                url: baseUrl,
                name: content.name,
                description: content.summary,
              },
            ],
          })}
        </Script>
        <ScrollReset />
        <StoryCursor />
        <AccessibilitySkipLink />
        <KeyboardShortcuts />
        <Navbar />
        <main id="main-content" className="relative">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ScrollToTop />
        <ScrollProgress />
        <SpeedInsights />
      </body>
    </html>
  );
}
