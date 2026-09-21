"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Send, CheckCircle2 } from "lucide-react";
import { insforge } from "@/lib/insforge";

interface ModalsProps {
  activeModal: "login" | "signup" | "demo" | null;
  onClose: () => void;
  onSwitchModal: (modal: "login" | "signup" | "demo") => void;
}

export function Modals({ activeModal, onClose, onSwitchModal }: ModalsProps) {
  // Demo modal states
  const [demoFullName, setDemoFullName] = useState("");
  const [demoEmail, setDemoEmail] = useState("");
  const [demoPhone, setDemoPhone] = useState("");
  const [demoSystemType, setDemoSystemType] = useState("Residential Solar System (5kVA – 10kVA)");
  const [demoMessage, setDemoMessage] = useState("");
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoSuccessTicket, setDemoSuccessTicket] = useState<string | null>(null);
  const [demoError, setDemoError] = useState<string | null>(null);

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Signup states
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupSubmitting, setSignupSubmitting] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  if (!activeModal) return null;

  // Handle Request Demo Submit
  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoEmail.trim() || !demoPhone.trim()) return;

    setDemoSubmitting(true);
    setDemoError(null);

    const randomNum = Math.floor(1200 + Math.random() * 800);
    const queueNumber = `#XN-${randomNum}`;

    try {
      const payload = {
        full_name: demoFullName.trim(),
        email: demoEmail.trim(),
        phone: demoPhone.trim(),
        system_type: demoSystemType,
        message: demoMessage.trim(),
        source: "demo_request",
        queue_number: queueNumber,
        status: "new",
      };

      const { error: dbError } = await insforge.database.from("leads").insert([payload]);

      if (dbError) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_INSFORGE_URL}/api/database/records/leads`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY}`,
            },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error("Could not record consultation request");
      }

      setDemoSuccessTicket(queueNumber);
    } catch (err: unknown) {
      console.error("Demo submission failed:", err);
      setDemoError("Could not submit request. Please check your network and try again.");
    } finally {
      setDemoSubmitting(false);
    }
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword) return;

    setLoginSubmitting(true);
    setLoginError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_INSFORGE_URL}/api/auth/sessions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Invalid credentials");
      }

      if (data.accessToken) {
        localStorage.setItem("xense_auth_token", data.accessToken);
        localStorage.setItem("xense_user", JSON.stringify(data.user || { email: loginEmail }));
      }
      alert(`Signed in successfully! Welcome back, ${data.user?.name || loginEmail}`);
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication error";
      setLoginError(message);
    } finally {
      setLoginSubmitting(false);
    }
  };

  // Handle Signup Submit
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail.trim() || !signupPassword) return;

    setSignupSubmitting(true);
    setSignupError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_INSFORGE_URL}/api/auth/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: signupEmail.trim(),
            password: signupPassword,
            name: `${signupFirstName} ${signupLastName}`.trim(),
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Registration failed");
      }

      alert("Account created successfully! Check your email to verify.");
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration error";
      setSignupError(message);
    } finally {
      setSignupSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-slate-900">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* DEMO MODAL */}
        {activeModal === "demo" && (
          <div>
            <div className="text-center mb-6">
              <div className="relative h-10 w-10 mx-auto mb-3 rounded-xl overflow-hidden bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center">
                <Image src="/assets/logo.png" alt="Xense Logo" width={32} height={32} className="object-contain" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Request a Live Demo</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Our engineering team will contact you for a live consultation
              </p>
            </div>

            {demoSuccessTicket ? (
              <div className="text-center py-6 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Demo Request Received!</h3>
                <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your request has been recorded with priority ticket{" "}
                  <span className="font-mono font-bold text-indigo-600">{demoSuccessTicket}</span>. Our team will reach out within 24 hours to schedule your presentation.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 inline-flex items-center justify-center px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-3.5">
                {demoError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                    {demoError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={demoFullName}
                    onChange={(e) => setDemoFullName(e.target.value)}
                    placeholder="Full Name"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="Email Address"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                </div>
                <input
                  type="tel"
                  required
                  value={demoPhone}
                  onChange={(e) => setDemoPhone(e.target.value)}
                  placeholder="Phone / WhatsApp (e.g. +234 800 000 0000)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                />
                <select
                  value={demoSystemType}
                  onChange={(e) => setDemoSystemType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                >
                  <option value="Residential Solar System (5kVA – 10kVA)">Residential Solar System (5kVA – 10kVA)</option>
                  <option value="Commercial Facility (15kVA – 50kVA)">Commercial Facility (15kVA – 50kVA)</option>
                  <option value="Mini-Grid Installation">Mini-Grid Installation</option>
                  <option value="Not sure – need consultation">Not sure – need consultation</option>
                </select>
                <textarea
                  rows={2}
                  value={demoMessage}
                  onChange={(e) => setDemoMessage(e.target.value)}
                  placeholder="Tell us about your current inverter setup or requirements..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white resize-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={demoSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-sm font-extrabold shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
                >
                  <span>{demoSubmitting ? "Submitting Request..." : "Submit Demo Request"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* SIGN IN MODAL */}
        {activeModal === "login" && (
          <div>
            <div className="text-center mb-6">
              <div className="relative h-10 w-10 mx-auto mb-3 rounded-xl overflow-hidden bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center">
                <Image src="/assets/logo.png" alt="Xense Logo" width={32} height={32} className="object-contain" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Sign in to Xense</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Manage your telemetry and autonomous load controls
              </p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loginSubmitting}
                className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-sm font-extrabold shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
              >
                {loginSubmitting ? "Signing in..." : "Sign In to Dashboard"}
              </button>
              <p className="text-center text-xs text-slate-500">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => onSwitchModal("signup")}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Sign Up Free
                </button>
              </p>
            </form>
          </div>
        )}

        {/* SIGN UP MODAL */}
        {activeModal === "signup" && (
          <div>
            <div className="text-center mb-6">
              <div className="relative h-10 w-10 mx-auto mb-3 rounded-xl overflow-hidden bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center">
                <Image src="/assets/logo.png" alt="Xense Logo" width={32} height={32} className="object-contain" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Create your Xense account</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Start monitoring and protecting your solar investment
              </p>
            </div>

            {signupError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                {signupError}
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={signupFirstName}
                    onChange={(e) => setSignupFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={signupLastName}
                    onChange={(e) => setSignupLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={signupSubmitting}
                className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-sm font-extrabold shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
              >
                {signupSubmitting ? "Creating Account..." : "Create Free Account"}
              </button>
              <p className="text-center text-xs text-slate-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => onSwitchModal("login")}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
