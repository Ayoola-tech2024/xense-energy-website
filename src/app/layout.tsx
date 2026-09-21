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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://xense-energy-website.vercel.app"),
  title: "Xense Energy — Intelligent Solar Automation & Smart Load Control",
  description:
    "Intelligent solar automation, real-time battery protection, and autonomous load shedding for modern homes and commercial facilities.",
  icons: {
    icon: [
      { url: "/assets/logo.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Xense Energy — Intelligent Solar Automation",
    description:
      "Intelligent solar automation, real-time battery protection, and autonomous load shedding for modern homes and commercial facilities.",
    images: [{ url: "/assets/logo.png", width: 800, height: 800, alt: "Xense Energy" }],
    siteName: "Xense Energy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xense Energy — Intelligent Solar Automation",
    description:
      "Intelligent solar automation, real-time battery protection, and autonomous load shedding for modern homes and commercial facilities.",
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
