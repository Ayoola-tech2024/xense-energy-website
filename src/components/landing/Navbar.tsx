"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenModal: (modal: "login" | "signup" | "demo") => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTouchEndRef = useRef(0);

  const registerEasterEggClick = (e: React.MouseEvent | React.TouchEvent) => {
    clickCountRef.current += 1;
    if (clickCountRef.current >= 5) {
      if ("preventDefault" in e) e.preventDefault();
      clickCountRef.current = 0;
      window.dispatchEvent(new CustomEvent("xense:open-easter-egg"));
      return;
    }

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2500);
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
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <nav className="mx-auto flex max-w-[1320px] items-center justify-between rounded-2xl border border-slate-200/90 bg-white/90 px-4 py-3 shadow-lg shadow-slate-200/40 backdrop-blur-xl sm:px-6">
        <div
          onClick={handleClick}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "manipulation" }}
          className="flex items-center gap-3 group cursor-pointer select-none touch-manipulation"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm transition-transform group-hover:scale-105 active:scale-95">
            <Image
              src="/assets/logo.png"
              alt="Xense Energy Logo"
              width={36}
              height={36}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="leading-none">
            <span className="block text-sm font-extrabold tracking-[0.18em] text-slate-900">
              XENSE
            </span>
            <span className="mt-1 block text-[8px] font-bold tracking-[0.28em] text-emerald-600">
              ENERGY SYSTEMS
            </span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 text-xs font-bold text-slate-600 lg:flex">
          <Link href="#modes" className="transition-colors hover:text-emerald-600">
            Operating Modes
          </Link>
          <Link href="#ecosystem" className="transition-colors hover:text-emerald-600">
            Products
          </Link>
          <Link href="#dashboard" className="transition-colors hover:text-emerald-600">
            App &amp; Dashboard
          </Link>
          <Link href="#simulator" className="transition-colors hover:text-emerald-600">
            Simulator
          </Link>
          <Link href="#waitlist" className="font-bold text-emerald-600 transition-colors hover:text-emerald-700">
            Join Waitlist
          </Link>
        </div>

        {/* Action Buttons: Sign In, Sign Up, Request Demo */}
        <div className="hidden items-center gap-2.5 sm:flex">
          <button
            type="button"
            onClick={() => onOpenModal("login")}
            className="rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => onOpenModal("signup")}
            className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => onOpenModal("demo")}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/25 transition-all hover:bg-emerald-700 hover:shadow-emerald-500/35 active:scale-95 cursor-pointer"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#34d399]"></span>
            <span>Request Demo</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-xl border border-slate-200 p-2 text-slate-700 sm:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-[1320px] rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl sm:hidden">
          <div className="grid gap-1 text-sm font-semibold text-slate-700">
            <Link
              href="#modes"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-100"
            >
              Operating Modes
            </Link>
            <Link
              href="#ecosystem"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-100"
            >
              Products
            </Link>
            <Link
              href="#dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-100"
            >
              App &amp; Dashboard
            </Link>
            <Link
              href="#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-100"
            >
              Simulator
            </Link>
            <Link
              href="#waitlist"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 font-bold text-emerald-600 transition-colors hover:bg-slate-100"
            >
              Join Waitlist
            </Link>
            <div className="mt-2 border-t border-slate-200 pt-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal("demo");
                }}
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-emerald-500/25 cursor-pointer"
              >
                Request Demo
              </button>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal("login");
                  }}
                  className="rounded-lg border border-slate-200 py-2.5 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal("signup");
                  }}
                  className="rounded-lg border border-slate-200 py-2.5 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
