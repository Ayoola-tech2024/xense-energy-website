"use client";

import Image from "next/image";
import { ArrowRight, UserPlus } from "lucide-react";

interface HeroSectionProps {
  onOpenModal: (modal: "login" | "signup" | "demo") => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[85vh] sm:min-h-[92vh] items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:pb-24 sm:pt-36 sm:px-6 lg:px-10">
      {/* Background 3D Hardware Duo with Cinematic Lighting Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        <Image
          src="/assets/xense-hero-hardware-duo-3d.jpg"
          alt="Xense Wireless Smart Dongle and Appliance Guard"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-right opacity-90"
        />
        {/* Dark Gradient Vignette Overlay for High Readability on Left Side Text */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60"></div>
      </div>

      {/* Foreground Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px]">
        <div className="max-w-3xl">
          <h1 className="max-w-4xl text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl sm:leading-[1.02] sm:tracking-[-0.05em] md:text-6xl lg:text-[70px]">
            Intelligent Energy Control{" "}
            <span className="text-gradient-hero">
              for Homes, Businesses &amp; Industry.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm font-normal leading-6 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            Zero power downtime, automated load prioritization, and maximum solar self-consumption. Engineered for residential homes, commercial offices, and industrial operations from 5kVA to 500kVA+ with 100% wireless setup.
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-3.5">
            <button
              type="button"
              onClick={() => onOpenModal("demo")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-xs font-extrabold text-white shadow-xl shadow-indigo-500/30 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 active:scale-95 sm:px-7 sm:py-4 sm:text-sm cursor-pointer"
            >
              <span>Request Demo &amp; Presentation</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onOpenModal("signup")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 sm:px-7 sm:py-4 sm:text-sm cursor-pointer"
            >
              <span>Create Free Account</span>
              <UserPlus className="h-4 w-4 text-indigo-300" />
            </button>
          </div>

          {/* Metrics Strip */}
          <div className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-slate-800 border-t border-slate-800/80 pt-5 sm:mt-12 sm:pt-6">
            <div className="pr-3 sm:pr-4">
              <div className="font-mono text-xl font-extrabold text-indigo-400 sm:text-2xl">
                0 ms
              </div>
              <div className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.14em] text-slate-400 sm:text-[9px]">
                Transfer Latency
              </div>
            </div>
            <div className="px-3 sm:px-4">
              <div className="font-mono text-xl font-extrabold text-sky-300 sm:text-2xl">
                5–500kVA+
              </div>
              <div className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.14em] text-slate-400 sm:text-[9px]">
                Modular Scale
              </div>
            </div>
            <div className="pl-3 sm:pl-4">
              <div className="font-mono text-xl font-extrabold text-amber-400 sm:text-2xl">
                60–80%
              </div>
              <div className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.14em] text-slate-400 sm:text-[9px]">
                Diesel Cut
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
