"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Terminal,
  ShieldCheck,
  AlertTriangle,
  X,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

export default function ExecutiveEasterEggModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [granted, setGranted] = useState(false);
  const router = useRouter();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Keyboard shortcut: Ctrl+Shift+X or Cmd+Shift+X
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "X" || e.key === "x")) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 2. Listen to custom event from logo clicks
  useEffect(() => {
    const handleTrigger = () => {
      setIsOpen(true);
    };

    window.addEventListener("xense:open-easter-egg", handleTrigger);
    return () => window.removeEventListener("xense:open-easter-egg", handleTrigger);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Clearance rejected: Invalid passcode.");
      }

      setGranted(true);
      setTimeout(() => {
        setIsOpen(false);
        router.push("/admin");
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Access denied.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-cyan-500/40 bg-[#070b14] p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] font-mono text-cyan-400">
        {/* Corner Decors */}
        <div className="absolute top-2 left-2 text-[9px] text-cyan-600 select-none">
          SYS::ROOT_EXEC
        </div>
        <div className="absolute top-2 right-2 text-[9px] text-cyan-600 select-none">
          CIPHER::v2.6
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Terminal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-900/40">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shadow-inner">
            <Terminal className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-wider text-white">
                XENSE CIPHER
              </span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[9px] border border-cyan-500/30">
                EASTER EGG
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Executive Level-5 Clearance Portal
            </p>
          </div>
        </div>

        {granted ? (
          <div className="py-8 text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">
              CLEARANCE CONFIRMED
            </h3>
            <p className="text-xs text-emerald-400">
              Initializing Executive Desk...
            </p>
          </div>
        ) : (
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cyan-300 mb-2 flex items-center justify-between">
                <span>Executive Passcode</span>
                <span className="text-[10px] text-slate-500 lowercase">
                  [press Esc to abort]
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter secret cipher..."
                  required
                  autoFocus
                  className="w-full rounded-xl border border-cyan-800/60 bg-black/70 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none pr-10 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 p-1"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-[11px] text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] py-3 text-xs font-bold text-black tracking-wider transition-all disabled:opacity-50"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{submitting ? "AUTHENTICATING..." : "VERIFY CLEARANCE"}</span>
            </button>

            <p className="text-center text-[10px] text-slate-500 pt-2">
              Shortcut: <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Shift</kbd> + <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">X</kbd>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
