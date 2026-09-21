import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import ExecutiveEasterEggModal from "@/components/common/ExecutiveEasterEggModal";
import "./globals.css";

export const metadata: Metadata = {
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#07090e] text-slate-100">
        {children}
        <ExecutiveEasterEggModal />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
