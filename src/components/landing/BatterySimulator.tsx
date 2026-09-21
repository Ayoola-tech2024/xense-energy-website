"use client";

import { useState } from "react";
import { ShieldCheck, Wind, Snowflake, Fan, Wifi } from "lucide-react";

export default function BatterySimulator() {
  const [soc, setSoc] = useState(78);

  const acOn = soc > 50;
  const freezerOn = soc > 35;
  const fansOn = soc > 20;
  const wifiOn = true;

  let totalKw = 0.1;
  if (acOn) totalKw += 2.2;
  if (freezerOn) totalKw += 1.5;
  if (fansOn) totalKw += 0.3;

  const hoursRemaining = (soc / 100) * 10;

  return (
    <section id="simulator" className="mx-auto max-w-[1320px] scroll-mt-24 px-4 py-14 sm:py-20 sm:px-6 lg:px-10">
      <div className="mb-8 max-w-2xl sm:mb-10">
        <h2 className="section-title">
          See how Xense protects your home &amp; facility{" "}
          <span className="text-gradient">
            in real time.
          </span>
        </h2>
        <p className="section-copy mt-2 sm:mt-3">
          Drag the battery slider below to watch Xense automatically shed heavy loads (commercial chillers, home ACs, motors) while preserving critical circuits (servers, Wi-Fi, refrigeration, lighting) as battery levels change.
        </p>
      </div>

      <div className="glass-card overflow-hidden p-5 sm:p-8 rounded-3xl transition-all duration-300 border-slate-200 bg-white shadow-xl">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Controls & SOC Readout */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Simulated Battery Level
                </div>
                <div className="mt-1 font-semibold uppercase tracking-[0.16em] text-slate-500 text-[9px] sm:text-[10px]">
                  Drag slider to test emergency response
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-4xl font-extrabold tracking-[-0.08em] text-emerald-600 sm:text-5xl">
                  {soc}
                </span>
                <span className="ml-1 font-mono text-base text-slate-400 sm:text-lg">%</span>
              </div>
            </div>

            {/* Slider */}
            <div className="mt-6 sm:mt-8">
              <input
                type="range"
                min="0"
                max="100"
                value={soc}
                onChange={(e) => setSoc(parseInt(e.target.value, 10))}
                className="soc-slider"
                style={{ "--progress": `${soc}%` } as React.CSSProperties}
              />
              <div className="mt-3 flex justify-between font-mono text-[8px] font-bold text-slate-500 sm:text-[9px]">
                <span className="text-rose-600">0% CRITICAL</span>
                <span className="text-amber-600">35% CHILLERS</span>
                <span className="text-teal-600">50% CLIMATE</span>
                <span className="text-emerald-600">100% FULL</span>
              </div>
            </div>

            {/* Status Alert Card */}
            <div
              className={`mt-6 sm:mt-8 rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
                soc > 50
                  ? "border-emerald-200 bg-emerald-50"
                  : soc > 35
                  ? "border-teal-200 bg-teal-50"
                  : "border-rose-200 bg-rose-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-3 w-3 relative shrink-0 ${
                    soc > 50
                      ? "text-emerald-500"
                      : soc > 35
                      ? "text-teal-500"
                      : "text-rose-500"
                  }`}
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-current"></span>
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                  {soc > 50
                    ? "Normal Operation (All Loads Active)"
                    : soc > 35
                    ? "Stage 1 Shedding (Climate Reduced)"
                    : "Emergency Reserve (Base Loads Only)"}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                {soc > 50
                  ? "All connected domestic & facility circuits receive continuous power from solar arrays and battery reserves."
                  : soc > 35
                  ? "Xense has automatically disconnected heavy ACs and chillers to stretch remaining storage duration by 3x."
                  : "Critical protection active. Only servers, security systems, and baseline lighting are maintained."}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 sm:p-4">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px]">
                  Simulated Load
                </div>
                <div className="mt-1 font-mono text-xl sm:text-2xl font-extrabold text-slate-900">
                  {totalKw.toFixed(1)}{" "}
                  <span className="text-xs font-normal text-slate-500">kW</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 sm:p-4">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px]">
                  Estimated Runtime
                </div>
                <div className="mt-1 font-mono text-xl sm:text-2xl font-extrabold text-emerald-600">
                  {hoursRemaining.toFixed(1)}{" "}
                  <span className="text-xs font-normal text-slate-500">hrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Appliance Rows */}
          <div className="space-y-3">
            <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-800">
              <span>Managed Home &amp; Facility Loads</span>
              <span className="font-mono font-bold text-emerald-600 text-[10px]">
                4 Priority Channels
              </span>
            </div>

            {/* AC & Chillers */}
            <div
              className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3.5 sm:flex-nowrap sm:p-4 transition-all duration-300 ${
                acOn
                  ? "border-emerald-500/30 bg-emerald-50/30"
                  : "border-slate-200 bg-slate-50/70 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 rounded-xl bg-slate-100 p-2 sm:p-2.5 text-slate-700">
                  <Wind className="h-4 w-4" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-900 sm:gap-2">
                    ACs &amp; Industrial Chillers
                    <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[8px] font-bold text-slate-700 sm:text-[9px]">
                      HEAVY LOAD
                    </span>
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
                    Living Areas, Offices &amp; Production Climate
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider sm:text-[9px] ${
                    acOn
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-slate-100 text-slate-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      acOn ? "bg-emerald-600 shadow-[0_0_8px_#10b981]" : "bg-rose-500"
                    }`}
                  ></span>{" "}
                  {acOn ? "ON / RUNNING" : "SHED / OFF"}
                </span>
              </div>
            </div>

            {/* Cold Storage & Freezers */}
            <div
              className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3.5 sm:flex-nowrap sm:p-4 transition-all duration-300 ${
                freezerOn
                  ? "border-emerald-500/30 bg-emerald-50/30"
                  : "border-slate-200 bg-slate-50/70 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 rounded-xl bg-slate-100 p-2 sm:p-2.5 text-slate-700">
                  <Snowflake className="h-4 w-4" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-900 sm:gap-2">
                    Cold Storage &amp; Deep Freezers
                    <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[8px] font-bold text-slate-700 sm:text-[9px]">
                      MEDIUM LOAD
                    </span>
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
                    Perishable Inventory &amp; Kitchen Cold Store
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider sm:text-[9px] ${
                    freezerOn
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-slate-100 text-slate-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      freezerOn ? "bg-emerald-600 shadow-[0_0_8px_#10b981]" : "bg-rose-500"
                    }`}
                  ></span>{" "}
                  {freezerOn ? "ON / RUNNING" : "SHED / OFF"}
                </span>
              </div>
            </div>

            {/* Facility & Home Base Loads */}
            <div
              className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3.5 sm:flex-nowrap sm:p-4 transition-all duration-300 ${
                fansOn
                  ? "border-emerald-500/30 bg-emerald-50/30"
                  : "border-slate-200 bg-slate-50/70 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 rounded-xl bg-slate-100 p-2 sm:p-2.5 text-slate-700">
                  <Fan className="h-4 w-4" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-900 sm:gap-2">
                    Facility Lighting &amp; Air Circulation
                    <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[8px] font-bold text-slate-700 sm:text-[9px]">
                      BASE LOAD
                    </span>
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
                    Workstations, Hallways &amp; Living Spaces
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider sm:text-[9px] ${
                    fansOn
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-slate-100 text-slate-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      fansOn ? "bg-emerald-600 shadow-[0_0_8px_#10b981]" : "bg-rose-500"
                    }`}
                  ></span>{" "}
                  {fansOn ? "ON / RUNNING" : "SHED / OFF"}
                </span>
              </div>
            </div>

            {/* Servers, Wi-Fi & CCTV */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-50/40 p-3.5 sm:flex-nowrap sm:p-4">
              <div className="flex items-center gap-3">
                <span className="shrink-0 rounded-xl bg-emerald-100 p-2 sm:p-2.5 text-emerald-700">
                  <Wifi className="h-4 w-4" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-900 sm:gap-2">
                    Servers, Wi-Fi &amp; CCTV Security
                    <span className="rounded border border-emerald-300 bg-emerald-100 px-1.5 py-0.5 font-mono text-[8px] font-bold text-emerald-800 sm:text-[9px]">
                      ALWAYS ON
                    </span>
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
                    Mission-Critical Gateways &amp; Surveillance
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-emerald-800 sm:text-[9px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shadow-[0_0_8px_#10b981]"></span> ALWAYS ON
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
