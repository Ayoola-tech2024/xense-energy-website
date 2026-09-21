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

  return (
    <section id="simulator" className="mx-auto max-w-[1320px] scroll-mt-24 px-4 py-14 sm:py-20 sm:px-6 lg:px-10">
      <div className="mb-8 max-w-2xl sm:mb-10">
        <h2 className="section-title">
          See how Xense protects your home{" "}
          <span className="text-gradient">
            in real time.
          </span>
        </h2>
        <p className="section-copy mt-2 sm:mt-3">
          Drag the battery slider below to watch Xense automatically manage your Air Conditioner, Deep Freezer, Fans, and Wi-Fi system as battery levels change.
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
                <span className="font-mono text-4xl font-extrabold tracking-[-0.08em] text-indigo-600 sm:text-5xl">
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
                <span className="text-amber-600">35% FREEZER</span>
                <span className="text-indigo-600">50% AC</span>
                <span className="text-emerald-600">100% FULL</span>
              </div>
            </div>

            {/* Status Alert Card */}
            <div
              className={`mt-6 sm:mt-8 rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
                soc > 50
                  ? "border-emerald-200 bg-emerald-50"
                  : soc > 35
                  ? "border-indigo-200 bg-indigo-50"
                  : "border-rose-200 bg-rose-50"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span
                  className={`shrink-0 rounded-xl border p-2.5 sm:p-3 ${
                    soc > 50
                      ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                      : soc > 35
                      ? "border-indigo-200 bg-indigo-100 text-indigo-700"
                      : "border-rose-200 bg-rose-100 text-rose-700"
                  }`}
                >
                  <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <div>
                  <div
                    className={`font-extrabold tracking-wider text-[11px] sm:text-xs ${
                      soc > 50
                        ? "text-emerald-900"
                        : soc > 35
                        ? "text-indigo-900"
                        : "text-rose-900"
                    }`}
                  >
                    {soc > 50
                      ? "FULL POWER MODE: ALL APPLIANCES ACTIVE"
                      : soc > 35
                      ? "STAGE 1 LOAD SHEDDING (AC DISCONNECTED)"
                      : "STAGE 2 CRITICAL PROTECTION (FREEZER SHED)"}
                  </div>
                  <div className="mt-1 text-[10px] sm:text-[11px] leading-relaxed text-slate-600">
                    {soc > 50
                      ? `Battery level is healthy (${soc}%). Air Conditioner, Deep Freezer, Fans & Wi-Fi are all running safely.`
                      : soc > 35
                      ? `Battery SOC dropped to ${soc}%. Xense automatically shed the Air Conditioner to extend backup runtime.`
                      : `Critical battery level (${soc}%). Xense shed the Deep Freezer to preserve essential Wi-Fi & security circuits.`}
                  </div>
                </div>
              </div>
            </div>

            {/* Metric counters */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3 text-center">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-3.5">
                <div className="font-mono text-[8px] font-bold uppercase text-slate-500 sm:text-[9px]">
                  Active Load
                </div>
                <div className="mt-0.5 font-mono text-base font-extrabold text-indigo-600 sm:text-lg">
                  {totalKw.toFixed(2)} kW
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-3.5">
                <div className="font-mono text-[8px] font-bold uppercase text-slate-500 sm:text-[9px]">
                  Extra Backup
                </div>
                <div className="mt-0.5 font-mono text-base font-extrabold text-emerald-600 sm:text-lg">
                  +8 Hours
                </div>
              </div>
            </div>
          </div>

          {/* Appliance Rows */}
          <div className="space-y-3">
            <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-800">
              <span>Managed Home Appliances</span>
              <span className="font-mono font-bold text-indigo-600 text-[10px]">
                4 Connected
              </span>
            </div>

            {/* AC */}
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
                    Air Conditioner (1.5 HP)
                    <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[8px] font-bold text-slate-700 sm:text-[9px]">
                      HEAVY LOAD
                    </span>
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
                    Living Room &amp; Bedrooms
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

            {/* Freezer */}
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
                    Deep Freezer &amp; Fridge
                    <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[8px] font-bold text-slate-700 sm:text-[9px]">
                      MEDIUM LOAD
                    </span>
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
                    Kitchen Food Preservation
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

            {/* Fans */}
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
                    Lighting &amp; Fans
                    <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[8px] font-bold text-slate-700 sm:text-[9px]">
                      BASE LOAD
                    </span>
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
                    Whole House Essential Circuit
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

            {/* Wi-Fi */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-200/80 bg-indigo-50/30 p-3.5 sm:flex-nowrap sm:p-4">
              <div className="flex items-center gap-3">
                <span className="shrink-0 rounded-xl bg-indigo-100 p-2 sm:p-2.5 text-indigo-700">
                  <Wifi className="h-4 w-4" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-900 sm:gap-2">
                    Wi-Fi Router &amp; CCTV
                    <span className="rounded border border-indigo-200 bg-indigo-100 px-1.5 py-0.5 font-mono text-[8px] font-bold text-indigo-800 sm:text-[9px]">
                      ALWAYS ON
                    </span>
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500 sm:text-[10px]">
                    Home Security &amp; Internet Gateway
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-indigo-800 sm:text-[9px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span> ALWAYS ON
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
