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
        <h2 className="section-title mx-auto">
          Three Operating Modes. <br />
          <span className="text-gradient">
            Total Intelligent Control.
          </span>
        </h2>
        <p className="section-copy mx-auto mt-3 sm:mt-4">
          Whether managing a single household or a multi-tenant commercial facility, Xense runs across three dedicated postures tailored for automated load protection, plant pass-through, or utility recovery.
        </p>
      </div>

      {/* 3-Column Direct Cards */}
      <div className="grid items-stretch gap-6 sm:gap-8 lg:grid-cols-3">
        {/* MODE 1: XENSE MODE (FLAGSHIP) */}
        <div className="glass-card relative flex flex-col justify-between rounded-3xl sm:rounded-[2rem] border border-emerald-500/30 bg-gradient-to-b from-emerald-50/20 via-white to-white p-6 sm:p-8 shadow-xl transition-all duration-300 hover:border-emerald-500 hover:shadow-2xl group">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-slate-900 px-4 py-1 font-mono text-[9px] font-extrabold uppercase tracking-widest text-white shadow-md">
            <Sparkles className="h-3 w-3 text-emerald-400" /> FLAGSHIP AUTONOMOUS POSTURE
          </div>

          <div>
            <div className="mb-6 mt-2 flex items-center justify-between">
              <div className="rounded-2xl bg-emerald-600 p-3.5 text-white shadow-md shadow-emerald-500/20 transition-transform group-hover:scale-105">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-extrabold uppercase text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> DEFAULT ACTIVE
              </span>
            </div>

            <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
              MODE 01
            </span>
            <h3 className="mt-1 text-2xl font-extrabold text-slate-900">Xense Mode</h3>
            <p className="mt-0.5 text-xs font-bold text-slate-600">Automated Solar &amp; Battery Protection</p>

            <p className="mt-4 text-xs font-medium leading-relaxed text-slate-600">
              Continuously monitors generation and storage levels. When battery reserve reaches safety threshold (e.g.{" "}
              <strong className="font-bold text-slate-900">35%</strong>), Xense automatically sheds non-critical heavy loads (ACs, thermal chillers, water pumps, secondary machinery) to keep essential circuits powered up to{" "}
              <strong className="font-bold text-emerald-700">3x longer</strong>.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-center font-mono">
              <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                <div className="text-[9px] font-bold uppercase text-slate-500">Safety Floor</div>
                <div className="mt-0.5 text-sm font-extrabold text-slate-900">35% SOC</div>
              </div>
              <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                <div className="text-[9px] font-bold uppercase text-slate-500">Backup Gain</div>
                <div className="mt-0.5 text-sm font-extrabold text-emerald-600">+8 Hours</div>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 text-xs font-medium text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>Multi-stage load shedding for domestic &amp; commercial circuits</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>100% offline edge logic &mdash; operates if Wi-Fi or cloud drops</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>Zero blackout traps for servers, refrigeration, and home lights</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onOpenModal("demo")}
              className="button-primary w-full justify-center py-3 text-xs font-extrabold"
            >
              <span>Request Xense Mode Demo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* MODE 2: BYPASS MODE */}
        <div className="glass-card relative flex flex-col justify-between rounded-3xl sm:rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 shadow-xl transition-all duration-300 hover:border-slate-400 hover:shadow-2xl group">
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
              Disables load shedding decision logic entirely. Power passes through continuously to all connected wall sockets and facility distribution boards for raw, unrestricted power feed.
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
                <span>Disables automated load shedding logic completely</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                <span>Passes maximum power continuously to heavy machinery or appliances</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                <span>Ideal for plant maintenance, workshop tooling, or domestic events</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => onOpenModal("demo")}
              className="button-secondary w-full justify-center py-3 text-xs font-bold"
            >
              <span>Learn About Bypass</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* MODE 3: AUTO GRID MODE */}
        <div className="glass-card relative flex flex-col justify-between rounded-3xl sm:rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 shadow-xl transition-all duration-300 hover:border-teal-400 hover:shadow-2xl group">
          <div>
            <div className="mb-6 mt-2 flex items-center justify-between">
              <div className="rounded-2xl bg-teal-950 p-3.5 text-white shadow-md shadow-teal-950/10 transition-transform group-hover:scale-105">
                <Grid className="h-6 w-6 text-teal-300" />
              </div>
              <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[10px] font-extrabold uppercase text-teal-900">
                UTILITY &amp; GEN-SET
              </span>
            </div>

            <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-teal-600">
              MODE 03
            </span>
            <h3 className="mt-1 text-2xl font-extrabold text-slate-900">Auto Grid &amp; Gen Mode</h3>
            <p className="mt-0.5 text-xs font-bold text-slate-600">Automated Utility &amp; Generator Sync</p>

            <p className="mt-4 text-xs font-medium leading-relaxed text-slate-600">
              Detects when main utility grid or backup diesel generators come online, automatically bypassing battery shedding so all facility and home loads run directly while rapid-charging battery banks.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-center font-mono">
              <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                <div className="text-[9px] font-bold uppercase text-slate-500">Source Detection</div>
                <div className="mt-0.5 text-sm font-extrabold text-slate-900">&lt; 5 ms</div>
              </div>
              <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                <div className="text-[9px] font-bold uppercase text-slate-500">Battery Action</div>
                <div className="mt-0.5 text-sm font-extrabold text-teal-600">RECHARGING</div>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 text-xs font-medium text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                <span>Automated sensing of returning utility grid or generator power</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                <span>Bypasses battery shedding during grid or generator availability</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                <span>Simultaneous battery recharging and full facility load pass-through</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => onOpenModal("demo")}
              className="button-secondary w-full justify-center py-3 text-xs font-bold"
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
