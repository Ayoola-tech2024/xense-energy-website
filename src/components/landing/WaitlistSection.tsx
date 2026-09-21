"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, Zap, Users } from "lucide-react";
import { insforge } from "@/lib/insforge";

interface WaitlistSectionProps {
  onRequestDemo?: () => void;
}

export function WaitlistSection({ onRequestDemo }: WaitlistSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQueueNumber, setSubmittedQueueNumber] = useState<string | null>(null);
  const [confirmedEmail, setConfirmedEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const randomNum = Math.floor(1200 + Math.random() * 800);
    const queueNumber = `#XN-${randomNum}`;

    try {
      // 1. Try SDK insert
      const { error: dbError } = await insforge.database.from("leads").insert([
        {
          email: email.trim(),
          source: "waitlist",
          queue_number: queueNumber,
          status: "new",
        },
      ]);

      if (dbError) {
        // Fallback to direct REST API if SDK returns error
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_INSFORGE_URL}/api/database/records/leads`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY}`,
            },
            body: JSON.stringify({
              email: email.trim(),
              source: "waitlist",
              queue_number: queueNumber,
              status: "new",
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to register email with database");
        }
      }

      setSubmittedQueueNumber(queueNumber);
      setConfirmedEmail(email.trim());
      setEmail("");
    } catch (err: unknown) {
      console.error("Waitlist error:", err);
      setError("Unable to save your spot right now. Please verify your connection or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="mx-auto max-w-[1320px] px-4 pb-16 sm:pb-24 pt-8 sm:pt-12 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-6 sm:p-14 lg:p-20 text-center shadow-2xl">
        {/* Ambient Radial Glows */}
        <div className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-indigo-500/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[100px]" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Be first in line for <br />
            <span className="text-gradient">Xense Energy.</span>
          </h2>

          {/* Copy */}
          <p className="mt-4 sm:mt-5 text-xs sm:text-base leading-6 sm:leading-7 text-slate-300 max-w-xl mx-auto font-normal">
            Join the priority rollout for residential setups, installer wholesale allocations, and enterprise commercial deployments.
          </p>

          {/* Interactive Waitlist Form Container */}
          <div className="mt-10 max-w-xl mx-auto">
            {!submittedQueueNumber ? (
              <form
                onSubmit={handleSubmit}
                className="relative flex flex-col sm:flex-row items-stretch gap-3 p-2 rounded-2xl bg-white/[0.07] border border-white/15 backdrop-blur-xl shadow-2xl focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all"
              >
                <div className="relative flex-1 flex items-center">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work or personal email..."
                    className="w-full bg-transparent pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-slate-400 focus:outline-none font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary justify-center px-7 py-3.5 text-sm font-extrabold shadow-lg shadow-indigo-500/30 whitespace-nowrap disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Securing Spot..." : "Join Priority Waitlist"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-left backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-white">You&apos;re on the priority list!</h4>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                        {submittedQueueNumber}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
                      We&apos;ve reserved your early hardware access slot. You&apos;ll receive verification and Batch 01 production updates at{" "}
                      <span className="font-bold text-white">{confirmedEmail}</span>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-3 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs text-left">
                {error}
              </div>
            )}

            {/* Social Proof & Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-[11px] font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero spam • Strict privacy
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Batch 01 Allocations
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-400" /> 1,200+ early subscribers
              </span>
            </div>

            {/* Consultation Alternative */}
            {onRequestDemo && (
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-3 text-xs text-slate-400">
                <span>Need an immediate commercial or industrial deployment?</span>
                <button
                  type="button"
                  onClick={onRequestDemo}
                  className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4"
                >
                  Request Live Demo &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
