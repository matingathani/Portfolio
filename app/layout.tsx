import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import BackgroundLayers from "../components/BackgroundLayers";
import FlowingCodeBackground from "../components/FlowingCodeBackground";
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
    images: ["/og-card.svg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.name} | ${content.role}`,
    description: content.summary,
    images: ["/og-card.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        <FlowingCodeBackground />
        <AccessibilitySkipLink />
        <KeyboardShortcuts />
        <Navbar />
        <main id="main-content" className="relative overflow-hidden">
          <BackgroundLayers />
          <div className="relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
        <Footer />
        <ScrollToTop />
        <ScrollProgress />
        <SpeedInsights />
      </body>
    </html>
  );
}
