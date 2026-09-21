"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  CalendarCheck,
  Mail,
  Zap,
  Phone,
  MessageSquare,
  Search,
  Download,
  RefreshCw,
  Clock,
  ShieldCheck,
  ExternalLink,
  AlertCircle,
  LogOut,
} from "lucide-react";

export interface LeadRecord {
  id: string;
  created_at: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  system_type: string | null;
  message: string | null;
  source: "waitlist" | "demo_request";
  queue_number: string | null;
  status: "new" | "contacted" | "qualified" | "converted" | "archived";
  notes: string | null;
}

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Leads Data State
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "demo_request" | "waitlist" | "new" | "contacted" | "high_priority"
  >("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [notesDrafts, setNotesDrafts] = useState<Record<string, string>>({});
  const [isSavingNotes, setIsSavingNotes] = useState<string | null>(null);

  // Check authentication on initial load via server session
  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/session", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchLeads();
          return;
        }
      }
      setIsAuthenticated(false);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch leads securely from server API
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setLeads(json.data || []);
      }
      setLastRefreshed(new Date());
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(fetchLeads, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Handle Logout via server session deletion
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
    } catch {}
    setIsAuthenticated(false);
    setLeads([]);
  };

  // Update lead status securely via server API
  const updateLeadStatus = async (id: string, newStatus: LeadRecord["status"]) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      } else {
        alert("Failed to update status on server.");
      }
    } catch (err) {
      console.error("Error updating lead status:", err);
      alert("Network error updating status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Save internal notes securely via server API
  const saveLeadNotes = async (id: string) => {
    const noteText = notesDrafts[id];
    if (noteText === undefined) return;

    setIsSavingNotes(id);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: noteText }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, notes: noteText } : l))
        );
      } else {
        alert("Failed to save note.");
      }
    } catch (err) {
      console.error("Error saving notes:", err);
      alert("Network error saving notes.");
    } finally {
      setIsSavingNotes(null);
    }
  };

  // Helper to format WhatsApp click-to-chat
  const formatWhatsAppUrl = (phone: string, name?: string | null) => {
    const cleaned = phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
    const greeting = encodeURIComponent(
      `Hello ${name || "there"}, this is the Xense Energy Executive Desk following up on your consultation inquiry.`
    );
    return `https://wa.me/${cleaned}?text=${greeting}`;
  };

  // Calculated Metrics
  const metrics = useMemo(() => {
    const total = leads.length;
    const demos = leads.filter((l) => l.source === "demo_request").length;
    const waitlist = leads.filter((l) => l.source === "waitlist").length;
    const newItems = leads.filter((l) => l.status === "new").length;
    const highPriority = leads.filter(
      (l) =>
        l.system_type?.includes("Commercial") ||
        l.system_type?.includes("Mini-Grid")
    ).length;

    return { total, demos, waitlist, newItems, highPriority };
  }, [leads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Category filter
      if (activeFilter === "demo_request" && lead.source !== "demo_request") return false;
      if (activeFilter === "waitlist" && lead.source !== "waitlist") return false;
      if (activeFilter === "new" && lead.status !== "new") return false;
      if (activeFilter === "contacted" && lead.status !== "contacted") return false;
      if (activeFilter === "high_priority") {
        const isHp =
          lead.system_type?.includes("Commercial") ||
          lead.system_type?.includes("Mini-Grid");
        if (!isHp) return false;
      }

      // Search term
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        lead.email.toLowerCase().includes(term) ||
        (lead.full_name && lead.full_name.toLowerCase().includes(term)) ||
        (lead.phone && lead.phone.toLowerCase().includes(term)) ||
        (lead.system_type && lead.system_type.toLowerCase().includes(term)) ||
        (lead.queue_number && lead.queue_number.toLowerCase().includes(term))
      );
    });
  }, [leads, activeFilter, searchTerm]);

  // CSV Export
  const exportToCSV = () => {
    if (!leads.length) return;
    const headers = [
      "ID",
      "Created At",
      "Ticket",
      "Source",
      "Full Name",
      "Email",
      "Phone",
      "System Type",
      "Message",
      "Status",
      "Internal Notes",
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${new Date(l.created_at).toLocaleString()}"`,
      `"${l.queue_number || ""}"`,
      `"${l.source}"`,
      `"${(l.full_name || "").replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone || ""}"`,
      `"${(l.system_type || "").replace(/"/g, '""')}"`,
      `"${(l.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${l.status}"`,
      `"${(l.notes || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `xense_leads_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 text-slate-500 font-mono">
        <RefreshCw className="w-6 h-6 animate-spin text-indigo-600 mb-3" />
        <p className="text-xs text-slate-600 font-medium">Verifying authorized administrative session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center font-sans select-none px-4">
        <div className="flex items-center gap-5">
          <h1
            onClick={() => {
              window.dispatchEvent(new CustomEvent("xense:open-easter-egg"));
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("xense:open-easter-egg"));
            }}
            style={{ touchAction: "manipulation" }}
            className="text-4xl font-extrabold border-r border-slate-300 pr-5 text-slate-900 tracking-tight cursor-pointer hover:text-indigo-600 transition-colors touch-manipulation"
            title="Click to reveal administrative door"
          >
            404
          </h1>
          <p className="text-sm font-normal text-slate-600">This page could not be found.</p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-indigo-600 transition-colors font-medium"
          >
            &larr; Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans pb-20 selection:bg-indigo-500/20">
      {/* Top CEO Executive Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md px-4 py-3.5 sm:px-8 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative h-9 w-9 rounded-xl overflow-hidden bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center">
              <Image src="/assets/logo.png" alt="Xense Logo" width={28} height={28} className="object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-slate-900 tracking-tight">
                  Xense Energy
                </span>
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-mono font-extrabold text-indigo-700 border border-indigo-200">
                  CEO EXECUTIVE PANEL
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Live Lead Pipeline &amp; Customer Consultation Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>CEO AUTHENTICATED</span>
            </div>

            <button
              type="button"
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-indigo-600" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={exportToCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Website</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 text-xs font-bold text-rose-700 hover:text-rose-800 transition-colors shadow-xs"
              title="Sign out of Admin Desk"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Executive Body */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8 pt-8">
        {/* KPI Top Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5 mb-8">
          {/* Total Leads */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total Inquiries</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {metrics.total}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">All captured prospects</div>
          </div>

          {/* Demo Requests */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Live Demos</span>
              <CalendarCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
              {metrics.demos}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">High-intent consultation</div>
          </div>

          {/* Waitlist Subscribers */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Waitlist</span>
              <Mail className="w-4 h-4 text-sky-600" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-sky-600 font-mono">
              {metrics.waitlist}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">Hardware queue allocations</div>
          </div>

          {/* High Priority Commercial */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">High Value</span>
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
              {metrics.highPriority}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">Commercial &amp; Mini-Grid</div>
          </div>

          {/* Action Required (New) */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 sm:p-5 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between text-rose-700">
              <span className="text-xs font-bold uppercase tracking-wider">Action Needed</span>
              <AlertCircle className="w-4 h-4 text-rose-600" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-rose-700 font-mono">
              {metrics.newItems}
            </div>
            <div className="mt-1 text-[11px] text-rose-600/90 font-medium">Pending CEO / Sales call</div>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 mb-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {[
                { id: "all", label: "All Records", count: metrics.total },
                { id: "demo_request", label: "Demo Requests", count: metrics.demos },
                { id: "waitlist", label: "Waitlist", count: metrics.waitlist },
                { id: "new", label: "Needs Contact", count: metrics.newItems },
                { id: "high_priority", label: "Commercial / Mini-Grid", count: metrics.highPriority },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setActiveFilter(pill.id as any)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    activeFilter === pill.id
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  <span>{pill.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      activeFilter === pill.id
                        ? "bg-white/25 text-white font-bold"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {pill.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] flex-1 md:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, email, phone..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Live Leads Table / Cards */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50/75 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-900">Prospective Clients</h3>
              <span className="text-xs text-slate-500 font-medium">
                ({filteredLeads.length} displayed)
              </span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Last synced: {lastRefreshed.toLocaleTimeString()}</span>
            </div>
          </div>

          {loading ? (
            <div className="p-16 text-center text-slate-500">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-600 mb-2" />
              <p className="text-xs font-medium">Loading live records from database...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-16 text-center text-slate-500">
              <Users className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-sm font-bold text-slate-800">No leads found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try clearing your search term or selecting another filter pill.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => {
                const isDemo = lead.source === "demo_request";
                const isHp =
                  lead.system_type?.includes("Commercial") ||
                  lead.system_type?.includes("Mini-Grid");

                return (
                  <div
                    key={lead.id}
                    className="p-4 sm:p-6 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Left: Lead Identity & Ticket */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-extrabold text-slate-900">
                            {lead.full_name || "Waitlist Subscriber"}
                          </span>

                          {lead.queue_number && (
                            <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-700">
                              {lead.queue_number}
                            </span>
                          )}

                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              isDemo
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-sky-50 text-sky-700 border border-sky-200"
                            }`}
                          >
                            {isDemo ? "Live Demo Request" : "Waitlist"}
                          </span>

                          {isHp && (
                            <span className="rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 text-[9px] font-bold font-mono">
                              HIGH VALUE FACILITY
                            </span>
                          )}

                          <span className="text-[11px] text-slate-400 font-mono">
                            {new Date(lead.created_at).toLocaleString([], {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Contact details */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                          <a
                            href={`mailto:${lead.email}`}
                            className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 hover:underline font-semibold"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{lead.email}</span>
                          </a>

                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-medium"
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{lead.phone}</span>
                            </a>
                          )}

                          {lead.system_type && (
                            <span className="inline-flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                              <Zap className="w-3.5 h-3.5 text-amber-500" />
                              <span>{lead.system_type}</span>
                            </span>
                          )}
                        </div>

                        {/* Customer message if consultation requested */}
                        {lead.message && (
                          <div className="mt-2 rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700 leading-relaxed font-normal">
                            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-0.5">
                              Inquiry Note:
                            </span>
                            &ldquo;{lead.message}&rdquo;
                          </div>
                        )}

                        {/* CEO Internal Notes box */}
                        <div className="mt-3 flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Add CEO / Sales note (e.g. Called client, quoted 10kVA on Sep 22)..."
                            value={
                              notesDrafts[lead.id] !== undefined
                                ? notesDrafts[lead.id]
                                : lead.notes || ""
                            }
                            onChange={(e) =>
                              setNotesDrafts((prev) => ({
                                ...prev,
                                [lead.id]: e.target.value,
                              }))
                            }
                            className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() => saveLeadNotes(lead.id)}
                            disabled={isSavingNotes === lead.id}
                            className="rounded-lg bg-slate-100 border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                          >
                            {isSavingNotes === lead.id ? "Saving..." : "Save Note"}
                          </button>
                        </div>
                      </div>

                      {/* Right: CEO Action Buttons (WhatsApp, Call, Status Selector) */}
                      <div className="flex flex-wrap lg:flex-col items-end gap-2.5 flex-shrink-0">
                        {/* Instant Communication Actions */}
                        <div className="flex items-center gap-1.5">
                          {lead.phone && (
                            <>
                              <a
                                href={formatWhatsAppUrl(lead.phone, lead.full_name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 text-xs font-bold shadow-xs transition-all"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>

                              <a
                                href={`tel:${lead.phone}`}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 text-xs font-bold transition-all shadow-xs"
                                title="Call directly"
                              >
                                <Phone className="w-3.5 h-3.5 text-slate-500" />
                                <span>Call</span>
                              </a>
                            </>
                          )}

                          <a
                            href={`mailto:${lead.email}?subject=Xense%20Energy%20Inquiry%20(${lead.queue_number || "Follow-up"})`}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 text-xs font-bold transition-all shadow-xs"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5 text-slate-500" />
                            <span>Email</span>
                          </a>
                        </div>

                        {/* Pipeline Status Selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                            Stage:
                          </span>
                          <select
                            value={lead.status}
                            disabled={updatingId === lead.id}
                            onChange={(e) =>
                              updateLeadStatus(
                                lead.id,
                                e.target.value as LeadRecord["status"]
                              )
                            }
                            className={`rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none border transition-colors shadow-xs ${
                              lead.status === "new"
                                ? "bg-rose-50 border-rose-200 text-rose-800"
                                : lead.status === "contacted"
                                ? "bg-indigo-50 border-indigo-200 text-indigo-800"
                                : lead.status === "qualified"
                                ? "bg-amber-50 border-amber-200 text-amber-800"
                                : lead.status === "converted"
                                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                : "bg-slate-100 border-slate-200 text-slate-700"
                            }`}
                          >
                            <option value="new">🔴 Needs Contact</option>
                            <option value="contacted">🔵 Contacted</option>
                            <option value="qualified">🟡 Qualified Lead</option>
                            <option value="converted">🟢 Converted / Customer</option>
                            <option value="archived">⚪ Archived</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
