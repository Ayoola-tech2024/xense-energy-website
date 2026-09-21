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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-md sm:mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-200 sm:text-xs">
              Zero Midnight Blackouts
            </span>
          </div>

          <h1 className="max-w-4xl text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl sm:leading-[1.02] sm:tracking-[-0.05em] md:text-6xl lg:text-[72px]">
            Intelligent Energy Control{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              for Modern Homes.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm font-normal leading-6 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            Zero power blackouts, maximum solar self-consumption, and automatic load optimization for solar inverters and battery storage. Plugs in seamlessly with 100% wireless setup.
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
          <div className="mt-8 grid max-w-md grid-cols-2 divide-x divide-slate-800 border-t border-slate-800/80 pt-5 sm:mt-12 sm:pt-6">
            <div className="pr-4 sm:pr-6">
              <div className="font-mono text-xl font-extrabold text-emerald-400 sm:text-2xl">
                0 ms
              </div>
              <div className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.16em] text-slate-400 sm:text-[9px]">
                Transfer Latency
              </div>
            </div>
            <div className="pl-4 sm:pl-6">
              <div className="font-mono text-xl font-extrabold text-indigo-400 sm:text-2xl">
                100%
              </div>
              <div className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.16em] text-slate-400 sm:text-[9px]">
                Plug &amp; Play Setup
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
