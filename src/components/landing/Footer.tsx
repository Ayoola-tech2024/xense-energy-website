"use client";

import { useRef } from "react";
import Image from "next/image";

interface FooterProps {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onOpenDemo: () => void;
}

export function Footer({ onOpenLogin, onOpenSignup, onOpenDemo }: FooterProps) {
  const socialLinks = [
    {
      name: "X (Twitter)",
      href: "https://twitter.com/xenseenergy",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/xense-energy",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com/xenseenergy",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/xenseenergy",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  const lastTouchEndRef = useRef(0);

  const registerEasterEggClick = (e: React.MouseEvent | React.TouchEvent) => {
    const current = Number(sessionStorage.getItem("xense_copy_clicks") || "0") + 1;
    if (current >= 3) {
      if ("preventDefault" in e) e.preventDefault();
      sessionStorage.removeItem("xense_copy_clicks");
      window.dispatchEvent(new CustomEvent("xense:open-easter-egg"));
    } else {
      sessionStorage.setItem("xense_copy_clicks", String(current));
      setTimeout(() => sessionStorage.removeItem("xense_copy_clicks"), 2000);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const now = Date.now();
    // Intercept rapid consecutive taps to prevent native mobile double-tap zoom
    if (now - lastTouchEndRef.current <= 500) {
      e.preventDefault();
    }
    lastTouchEndRef.current = now;
    registerEasterEggClick(e);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Avoid duplicate firing on devices that trigger both touchend and click
    if (Date.now() - lastTouchEndRef.current < 500) return;
    registerEasterEggClick(e);
  };

  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-6 text-[10px] font-mono uppercase tracking-[0.14em] text-slate-600 sm:flex-row sm:items-center">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="relative h-7 w-7 rounded-md overflow-hidden bg-white p-0.5 border border-slate-200 shadow-sm flex items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="Xense Energy Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span
            onClick={handleClick}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: "manipulation" }}
            className="font-extrabold text-slate-800 select-none cursor-default touch-manipulation"
          >
            © 2026 Xense Energy Systems • All Rights Reserved
          </span>
        </div>

        {/* Center: Social Media Links for the Website */}
        <div className="flex items-center gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="h-8 w-8 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all flex items-center justify-center shadow-xs"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Right: Quick Action Links */}
        <div className="flex flex-wrap items-center gap-6 font-bold">
          <button
            type="button"
            onClick={onOpenLogin}
            className="hover:text-indigo-600 transition-colors"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={onOpenSignup}
            className="hover:text-indigo-600 transition-colors"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={onOpenDemo}
            className="hover:text-emerald-600 transition-colors"
          >
            Request Demo
          </button>
        </div>
      </div>
    </footer>
  );
}
