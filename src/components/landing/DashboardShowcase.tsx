"use client";

import Image from "next/image";
import { BarChart2, Cpu, Bell, Settings, ShieldCheck, Play } from "lucide-react";

interface DashboardShowcaseProps {
  onOpenModal: (modal: "login" | "signup" | "demo") => void;
}

export default function DashboardShowcase({ onOpenModal }: DashboardShowcaseProps) {
  return (
    <section id="dashboard" className="mx-auto max-w-[1320px] scroll-mt-24 px-4 py-14 sm:py-20 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 shadow-2xl">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-600/15 blur-3xl"></div>

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* Left: Info */}
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Full control. <br />
              <span className="text-gradient">
                From your palm.
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-xs sm:text-sm font-normal leading-6 text-slate-300 sm:mt-5 sm:leading-7">
              Whether managing a single household inverter or supervising three-phase power distribution across a commercial plant, the Xense Dashboard gives you real-time telemetry into every watt — solar generation, battery health, load prioritization, and automated gen-set synchronization all in one place.
            </p>

            {/* Feature Pills */}
            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[11px] font-semibold text-slate-200 backdrop-blur-md transition-colors hover:bg-white/[0.12] sm:px-4 sm:py-2 sm:text-xs">
                <BarChart2 className="h-3.5 w-3.5 text-indigo-400" />
                Live Analytics
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[11px] font-semibold text-slate-200 backdrop-blur-md transition-colors hover:bg-white/[0.12] sm:px-4 sm:py-2 sm:text-xs">
                <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                Load Decisions
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[11px] font-semibold text-slate-200 backdrop-blur-md transition-colors hover:bg-white/[0.12] sm:px-4 sm:py-2 sm:text-xs">
                <Bell className="h-3.5 w-3.5 text-amber-400" />
                Smart Alerts
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[11px] font-semibold text-slate-200 backdrop-blur-md transition-colors hover:bg-white/[0.12] sm:px-4 sm:py-2 sm:text-xs">
                <Settings className="h-3.5 w-3.5 text-sky-400" />
                Remote Control
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[11px] font-semibold text-slate-200 backdrop-blur-md transition-colors hover:bg-white/[0.12] sm:px-4 sm:py-2 sm:text-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Priority Lists
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onOpenModal("demo")}
                className="button-primary justify-center text-xs sm:text-sm px-6 py-3.5 font-bold shadow-lg shadow-indigo-500/30"
              >
                <span>Request a Live Demo</span>
                <Play className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onOpenModal("signup")}
                className="justify-center text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl border border-white/20 text-slate-200 hover:bg-white/10 transition-colors"
              >
                Sign Up Free
              </button>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative h-[560px] w-[280px] sm:w-[320px] overflow-hidden rounded-[2rem] shadow-2xl transition-transform duration-500 hover:scale-105">
                <Image
                  src="/assets/xense-mobile-dashboard-note20.webp"
                  alt="Xense Energy Intelligent Mobile App Dashboard on Galaxy Note20"
                  fill
                  sizes="(max-width: 640px) 280px, 320px"
                  className="object-cover"
                />
              </div>
              {/* Floating stat cards */}
              <div className="absolute -left-12 top-12 hidden glass-card bg-white/95 px-3.5 py-2.5 shadow-xl border-slate-200 sm:block">
                <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
                  Solar Today
                </div>
                <div className="font-mono text-base font-extrabold text-slate-900">
                  32.4 <span className="text-xs text-indigo-600">kWh</span>
                </div>
              </div>
              <div className="absolute -right-10 bottom-20 hidden glass-card bg-white/95 px-3.5 py-2.5 shadow-xl border-slate-200 sm:block">
                <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
                  Battery SOC
                </div>
                <div className="font-mono text-base font-extrabold text-slate-900">
                  78<span className="text-xs text-emerald-600">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
