import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AccessibilitySkipLink from "../components/AccessibilitySkipLink";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { content } from "../lib/content";
import { themeInitScript } from "../lib/theme";

const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "600"],
  display: "swap",
});
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Script id="json-ld" type="application/ld+json" strategy="beforeInteractive">
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
                alumniOf: content.education.map((e) => ({
                  "@type": "CollegeOrUniversity",
                  name: e.school,
                })),
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
        <AccessibilitySkipLink />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <SpeedInsights />
      </body>
    </html>
  );
}
