"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
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

  // 2. Listen to custom event from logo or footer clicks
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
        throw new Error(data.error || "Access denied: Invalid administrative passcode.");
      }

      setGranted(true);
      setTimeout(() => {
        setIsOpen(false);
        router.push("/admin");
      }, 800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Access denied.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay animate-in fade-in duration-200">
      <div className="glass-card relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl text-slate-900 font-sans">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold tracking-tight text-slate-900">
                Executive Portal
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                Staff Only
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Administrative &amp; Lead Management Access
            </p>
          </div>
        </div>

        {granted ? (
          <div className="py-8 text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Authentication Approved
            </h3>
            <p className="text-xs text-emerald-700 font-medium">
              Opening Executive Lead Desk...
            </p>
          </div>
        ) : (
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Master Passcode</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  [Press Esc to close]
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter executive passcode..."
                  required
                  autoFocus
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none pr-10 font-mono transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="button-primary w-full justify-center py-2.5 text-xs font-extrabold shadow-md shadow-emerald-500/20 disabled:opacity-50"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{submitting ? "Verifying Credentials..." : "Sign In to Admin Desk"}</span>
            </button>

            <p className="text-center text-[11px] text-slate-400 pt-1 font-medium">
              Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">Shift</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">X</kbd>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
