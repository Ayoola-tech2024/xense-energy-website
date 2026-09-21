"use client";

import { Sparkles, Power, Grid, CheckCircle, ArrowRight } from "lucide-react";

interface OperatingModesProps {
  onOpenModal: (modal: "login" | "signup" | "demo") => void;
}

export default function OperatingModes({ onOpenModal }: OperatingModesProps) {
  return (
    <section id="modes" className="mx-auto max-w-[1320px] scroll-mt-24 px-4 py-14 sm:py-20 sm:px-6 lg:px-10">
      {/* Section Header */}
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Three Operating Modes. <br />
          <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">
            Total Intelligent Control.
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-600 sm:mt-4">
          Unlike standard inverters that crash during deep battery drain, Xense runs across three dedicated postures tailored for automated protection, manual pass-through, or utility recovery.
        </p>
      </div>

      {/* 3-Column Direct Cards */}
      <div className="grid items-stretch gap-6 sm:gap-8 lg:grid-cols-3">
        {/* MODE 1: XENSE MODE (FLAGSHIP) */}
        <div className="relative flex flex-col justify-between rounded-3xl sm:rounded-[2rem] border-2 border-indigo-500/40 bg-gradient-to-b from-indigo-50/30 via-white to-white p-6 sm:p-8 shadow-xl transition-all duration-300 hover:border-indigo-500 hover:shadow-2xl group">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-slate-900 px-4 py-1 font-mono text-[9px] font-extrabold uppercase tracking-widest text-white shadow-md">
            <Sparkles className="h-3 w-3 text-indigo-400" /> FLAGSHIP AUTONOMOUS POSTURE
          </div>

          <div>
            <div className="mb-6 mt-2 flex items-center justify-between">
              <div className="rounded-2xl bg-indigo-600 p-3.5 text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-extrabold uppercase text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> DEFAULT ACTIVE
              </span>
            </div>

            <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
              MODE 01
            </span>
            <h3 className="mt-1 text-2xl font-extrabold text-slate-900">Xense Mode</h3>
            <p className="mt-0.5 text-xs font-bold text-slate-600">Automatic Solar &amp; Battery Protection</p>

            <p className="mt-4 text-xs font-medium leading-relaxed text-slate-600">
              Continuously monitors solar generation and battery SOC. When battery level drops to{" "}
              <strong className="font-bold text-slate-900">35%</strong>, Xense automatically sheds heavy loads (Air Conditioners &amp; Water Heaters) to extend backup duration by up to{" "}
              <strong className="font-bold text-indigo-700">3x</strong>.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-center font-mono">
              <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                <div className="text-[9px] font-bold uppercase text-slate-500">Safety Floor</div>
                <div className="mt-0.5 text-sm font-extrabold text-slate-900">35% SOC</div>
              </div>
              <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                <div className="text-[9px] font-bold uppercase text-slate-500">Backup Gain</div>
                <div className="mt-0.5 text-sm font-extrabold text-indigo-600">+8 Hours</div>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 text-xs font-medium text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                <span>Automated multi-stage load shedding logic</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                <span>100% offline edge logic &mdash; runs if Wi-Fi drops</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                <span>Zero midnight blackout traps for essential circuits</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => onOpenModal("demo")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-extrabold text-white shadow-md shadow-indigo-500/25 transition-all hover:bg-indigo-700 active:scale-95 cursor-pointer"
            >
              <span>Request Xense Mode Demo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* MODE 2: BYPASS MODE */}
        <div className="relative flex flex-col justify-between rounded-3xl sm:rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 shadow-xl transition-all duration-300 hover:border-slate-400 hover:shadow-2xl group">
          <div>
            <div className="mb-6 mt-2 flex items-center justify-between">
              <div className="rounded-2xl bg-slate-900 p-3.5 text-white shadow-md shadow-slate-900/10 transition-transform group-hover:scale-105">
                <Power className="h-6 w-6 text-slate-200" />
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-mono text-[10px] font-extrabold uppercase text-slate-800">
                MANUAL OVERRIDE
              </span>
            </div>

            <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              MODE 02
            </span>
            <h3 className="mt-1 text-2xl font-extrabold text-slate-900">Bypass Mode</h3>
            <p className="mt-0.5 text-xs font-bold text-slate-600">Continuous Direct Power Output</p>

            <p className="mt-4 text-xs font-medium leading-relaxed text-slate-600">
              Disables load shedding decision logic entirely. Power passes through continuously to all connected wall sockets, treating Xense as an open pass-through outlet for raw power feed.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-center font-mono">
              <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                <div className="text-[9px] font-bold uppercase text-slate-500">Load Shedding</div>
                <div className="mt-0.5 text-sm font-extrabold text-slate-700">DISABLED</div>
              </div>
              <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                <div className="text-[9px] font-bold uppercase text-slate-500">Appliance Feed</div>
                <div className="mt-0.5 text-sm font-extrabold text-slate-900">100% RAW</div>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 text-xs font-medium text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                <span>Disables automatic load shedding logic completely</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                <span>Passes maximum power continuously to heavy appliances</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                <span>Ideal for maintenance, heavy tooling, or emergency testing</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => onOpenModal("demo")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95 cursor-pointer"
            >
              <span>Learn About Bypass</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* MODE 3: AUTO GRID MODE */}
        <div className="relative flex flex-col justify-between rounded-3xl sm:rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 shadow-xl transition-all duration-300 hover:border-slate-400 hover:shadow-2xl group">
          <div>
            <div className="mb-6 mt-2 flex items-center justify-between">
              <div className="rounded-2xl bg-indigo-950 p-3.5 text-white shadow-md shadow-indigo-950/10 transition-transform group-hover:scale-105">
                <Grid className="h-6 w-6 text-indigo-300" />
              </div>
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 font-mono text-[10px] font-extrabold uppercase text-indigo-900">
                UTILITY FALLBACK
              </span>
            </div>

            <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
              MODE 03
            </span>
            <h3 className="mt-1 text-2xl font-extrabold text-slate-900">Auto Grid Mode</h3>
            <p className="mt-0.5 text-xs font-bold text-slate-600">Automated Utility Sensing &amp; Recharging</p>

            <p className="mt-4 text-xs font-medium leading-relaxed text-slate-600">
              Detects when main utility grid power returns, automatically bypassing battery shedding logic so all home loads run directly from utility power while fast-charging battery banks.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-center font-mono">
              <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                <div className="text-[9px] font-bold uppercase text-slate-500">Grid Detection</div>
                <div className="mt-0.5 text-sm font-extrabold text-slate-900">&lt; 5 ms</div>
              </div>
              <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                <div className="text-[9px] font-bold uppercase text-slate-500">Battery Action</div>
                <div className="mt-0.5 text-sm font-extrabold text-indigo-600">RECHARGING</div>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 text-xs font-medium text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                <span>Automated sensing of returning utility grid power</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                <span>Bypasses battery shedding during grid availability</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                <span>Simultaneous battery recharging and full load pass-through</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => onOpenModal("demo")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95 cursor-pointer"
            >
              <span>Learn About Auto Grid</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
