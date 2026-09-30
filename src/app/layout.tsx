import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import ExecutiveEasterEggModal from "@/components/common/ExecutiveEasterEggModal";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://xenseenergy.com"),
  title: {
    default: "Xense Energy Systems — Intelligent Energy Management & Automation",
    template: "%s | Xense Energy Systems",
  },
  description:
    "Xense Energy Systems delivers intelligent multi-source power control, real-time energy monitoring, and AI-powered load automation for modern homes and commercial facilities.",
  keywords: [
    "energy management system Nigeria",
    "intelligent power control",
    "automatic transfer switch",
    "load monitoring system",
    "fuel accountability system",
    "generator monitoring Nigeria",
    "solar energy automation",
    "Xense Energy",
    "Port Harcourt energy solutions",
    "smart load control",
  ],
  authors: [{ name: "Xense Energy Systems", url: "https://xenseenergy.com" }],
  creator: "Xense Energy Systems",
  publisher: "Xense Energy Systems",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "VwwzF-ziAitbSJ4EEfIsjjDSVN9iWfym0zXngw_uIlE",
  },
  icons: {
    icon: [
      { url: "/assets/logo.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Xense Energy Systems — Intelligent Energy Management & Automation",
    description:
      "Intelligent multi-source power control, real-time energy monitoring, and AI-powered load automation. Built for Nigerian businesses.",
    url: "https://xenseenergy.com",
    images: [{ url: "/assets/logo.png", width: 800, height: 800, alt: "Xense Energy Systems" }],
    siteName: "Xense Energy Systems",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xense Energy Systems — Intelligent Energy Management & Automation",
    description:
      "Intelligent multi-source power control, real-time energy monitoring, and AI-powered load automation.",
    images: ["/assets/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Xense Energy Systems",
              description:
                "Intelligent multi-source power control, real-time energy monitoring, and AI-powered load automation for businesses in Nigeria.",
              url: "https://xenseenergy.com",
              logo: "https://xenseenergy.com/assets/logo.png",
              image: "https://xenseenergy.com/assets/logo.png",
              telephone: "+2347036791927",
              email: "info@xenseenergy.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Port Harcourt",
                addressRegion: "Rivers State",
                addressCountry: "NG",
              },
              areaServed: "Nigeria",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-[#0f172a] selection:bg-indigo-500/20 font-sans">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        {children}
        <ExecutiveEasterEggModal />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
