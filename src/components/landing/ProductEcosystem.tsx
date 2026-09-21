"use client";

import Image from "next/image";
import { CheckCircle, Smartphone, Zap, WifiOff } from "lucide-react";

export default function ProductEcosystem() {
  return (
    <section id="ecosystem" className="mx-auto max-w-[1320px] scroll-mt-24 px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-12 max-w-3xl">
        <div className="mb-4 flex items-center gap-3 font-mono text-[10px] font-extrabold uppercase tracking-[0.25em] text-indigo-600">
          <span>PRODUCT ECOSYSTEM</span>
          <span className="h-px w-8 bg-indigo-300"></span>
          <span>HARDWARE &amp; SOFTWARE</span>
        </div>
        <h2 className="section-title">
          Designed for simplicity.{" "}
          <span className="text-gradient">
            Built for performance.
          </span>
        </h2>
        <p className="section-copy">
          Explore the Xense Energy product family — combining hybrid solar inverters, wireless RS232 smart dongles, and real-time mobile cloud tracking.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Card 1: Inverter */}
        <div className="md:col-span-7 glass-card p-6 sm:p-8 flex flex-col justify-between group border-slate-200 bg-white hover:border-indigo-400 transition-all shadow-lg hover:shadow-xl">
          <div>
            <div className="relative mb-6 h-[260px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <Image
                src="/assets/xense-inverter-kit.jpg"
                alt="Xense Wall-Mounted Inverter & Dongle Kit"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-slate-900/90 px-3 py-1 font-mono text-[9px] font-bold text-white backdrop-blur-md">
                HARDWARE UNIT
              </span>
            </div>
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
              01. INVERTER &amp; BACKUP SYSTEM
            </span>
            <h3 className="mt-1 text-2xl font-extrabold text-slate-900">Xense Smart Solar Inverter</h3>
            <p className="mt-2.5 text-xs font-medium leading-relaxed text-slate-600">
              Wall-mounted intelligent hybrid inverter with digital LCD display. Integrates seamlessly with existing solar arrays, Lithium/Gel battery banks, and grid power.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-700">
            <span>Clean Minimalist Enclosure</span>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </div>
        </div>

        {/* Card 2: Mobile App */}
        <div className="md:col-span-5 glass-card p-6 sm:p-8 flex flex-col justify-between group border-slate-200 bg-white hover:border-indigo-400 transition-all shadow-lg hover:shadow-xl">
          <div>
            <div className="relative mb-6 flex h-[260px] w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-2">
              <Image
                src="/assets/xense-mobile-dashboard-flip.webp"
                alt="Xense Live Mobile Dashboard on Galaxy Z Flip"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/90 px-2.5 py-1 shadow backdrop-blur-md">
                <span className="live-dot"></span>
                <span className="font-mono text-[9px] font-bold text-white">LIVE</span>
              </div>
            </div>
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
              02. REMOTE TELEMETRY
            </span>
            <h3 className="mt-1 text-xl font-extrabold text-slate-900">Xense Live Mobile Dashboard</h3>
            <p className="mt-2.5 text-xs font-medium leading-relaxed text-slate-600">
              Monitor real-time power flow, adjust battery reserve floors, and switch operating modes remotely from your smartphone.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-700">
            <span>iOS &amp; Android App Included</span>
            <Smartphone className="h-4 w-4 text-indigo-600" />
          </div>
        </div>

        {/* Card 3: Dongle */}
        <div className="md:col-span-6 glass-card p-6 sm:p-8 flex flex-col justify-between group border-slate-200 bg-white hover:border-indigo-400 transition-all shadow-lg hover:shadow-xl">
          <div>
            <div className="relative mb-6 flex h-[250px] w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
              <Image
                src="/assets/xense-dongle-plug.jpg"
                alt="Xense RS232 Dongle"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-slate-900/90 px-3 py-1 font-mono text-[9px] font-bold text-white backdrop-blur-md">
                PLUG &amp; PLAY
              </span>
            </div>
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
              03. SMART CONNECTOR
            </span>
            <h3 className="mt-1 text-xl font-extrabold text-slate-900">Xense Wireless Dongle Stick</h3>
            <p className="mt-2.5 text-xs font-medium leading-relaxed text-slate-600">
              Plugs directly into your inverter&apos;s RS232 / RJ45 port. Zero complex electrical rewiring needed — 60-second setup.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-700">
            <span>Instant 60-Second Setup</span>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
        </div>

        {/* Card 4: Smart Guard */}
        <div className="md:col-span-6 glass-card p-6 sm:p-8 flex flex-col justify-between group border-slate-200 bg-white hover:border-indigo-400 transition-all shadow-lg hover:shadow-xl">
          <div>
            <div className="relative mb-6 flex h-[250px] w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
              <Image
                src="/assets/xense-appliance-guard-3d.jpg"
                alt="Xense Smart Appliance Guard — Real-Time & Offline Control"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-slate-900/90 px-3 py-1 font-mono text-[9px] font-bold text-white backdrop-blur-md">
                SMART GUARD
              </span>
            </div>
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
              04. INTELLIGENT MONITORING
            </span>
            <h3 className="mt-1 text-xl font-extrabold text-slate-900">Real-Time &amp; Offline Monitoring</h3>
            <p className="mt-2.5 text-xs font-medium leading-relaxed text-slate-600">
              Supports both real-time cloud data sync and offline local data logging. Load shedding logic functions even when Wi-Fi drops.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-700">
            <span>100% Offline Capable</span>
            <WifiOff className="h-4 w-4 text-sky-600" />
          </div>
        </div>
      </div>
    </section>
  );
}
