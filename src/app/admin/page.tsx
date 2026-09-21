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
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  Home,
  LogOut,
} from "lucide-react";
import { insforge } from "@/lib/insforge";

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
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "demo_request" | "waitlist" | "new" | "contacted" | "high_priority"
  >("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [notesDrafts, setNotesDrafts] = useState<Record<string, string>>({});
  const [isSavingNotes, setIsSavingNotes] = useState<string | null>(null);

  // Fetch leads from InsForge
  const fetchLeads = async () => {
    setLoading(true);
    try {
      // First try via SDK
      const { data, error } = await insforge.database
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setLeads(data as LeadRecord[]);
      } else {
        // Fallback to direct REST API
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_INSFORGE_URL}/api/database/records/leads?order=created_at.desc`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY}`,
            },
          }
        );
        if (res.ok) {
          const restData = await res.json();
          setLeads(Array.isArray(restData) ? restData : restData.data || []);
        }
      }
      setLastRefreshed(new Date());
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Update lead status
  const updateLeadStatus = async (id: string, newStatus: LeadRecord["status"]) => {
    setUpdatingId(id);
    try {
      const { error } = await insforge.database
        .from("leads")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        // REST fallback
        await fetch(
          `${process.env.NEXT_PUBLIC_INSFORGE_URL}/api/database/records/leads?id=eq.${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY}`,
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );
      }

      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Save lead internal notes
  const saveLeadNotes = async (id: string) => {
    const noteContent = notesDrafts[id];
    if (noteContent === undefined) return;

    setIsSavingNotes(id);
    try {
      await insforge.database
        .from("leads")
        .update({ notes: noteContent })
        .eq("id", id);

      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, notes: noteContent } : l))
      );
    } catch (err) {
      console.error("Failed to save note:", err);
    } finally {
      setIsSavingNotes(null);
    }
  };

  // Helper to format WhatsApp phone number (strip spaces, symbols)
  const formatWhatsAppUrl = (phone: string | null, name: string | null) => {
    if (!phone) return "#";
    const cleaned = phone.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `Hello ${name || "there"}, thank you for contacting Xense Energy regarding your solar load control inquiry. When is a convenient time for your live consultation?`
    );
    return `https://wa.me/${cleaned}?text=${msg}`;
  };

  // KPI Metrics Calculation
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
      // Filter tab
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

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans pb-20 selection:bg-indigo-500 selection:text-white">
      {/* Top CEO Executive Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#0d1322]/90 backdrop-blur-md px-4 py-3.5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative h-9 w-9 rounded-xl overflow-hidden bg-white p-1 border border-slate-700 shadow flex items-center justify-center">
              <Image src="/assets/logo.png" alt="Xense Logo" width={28} height={28} className="object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white tracking-tight">
                  Xense Energy
                </span>
                <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-[10px] font-mono font-extrabold text-indigo-400 border border-indigo-500/30">
                  CEO EXECUTIVE PANEL
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Live Lead Pipeline &amp; Customer Consultation Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-indigo-400" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={exportToCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Website</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Executive Body */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8 pt-8">
        {/* KPI Top Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5 mb-8">
          {/* Total Leads */}
          <div className="rounded-2xl border border-slate-800 bg-[#0f1626] p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Inquiries</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {metrics.total}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">All captured prospects</div>
          </div>

          {/* Demo Requests */}
          <div className="rounded-2xl border border-slate-800 bg-[#0f1626] p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Live Demos</span>
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              {metrics.demos}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">High-intent consultation</div>
          </div>

          {/* Waitlist Subscribers */}
          <div className="rounded-2xl border border-slate-800 bg-[#0f1626] p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Waitlist</span>
              <Mail className="w-4 h-4 text-sky-400" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">
              {metrics.waitlist}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">Hardware queue allocations</div>
          </div>

          {/* High Priority Commercial */}
          <div className="rounded-2xl border border-slate-800 bg-[#0f1626] p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">High Value</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              {metrics.highPriority}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">Commercial &amp; Mini-Grid</div>
          </div>

          {/* Action Required (New) */}
          <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-rose-300">
              <span className="text-xs font-bold uppercase tracking-wider">Action Needed</span>
              <AlertCircle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
              {metrics.newItems}
            </div>
            <div className="mt-1 text-[11px] text-rose-300/80">Pending CEO / Sales call</div>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1626] p-4 mb-6 shadow-md">
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
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <span>{pill.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      activeFilter === pill.id
                        ? "bg-white/20 text-white"
                        : "bg-slate-900/60 text-slate-400"
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
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Live Leads Table / Cards */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1626] overflow-hidden shadow-xl">
          <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Prospective Clients</h3>
              <span className="text-xs text-slate-400">
                ({filteredLeads.length} displayed)
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Last synced: {lastRefreshed.toLocaleTimeString()}</span>
            </div>
          </div>

          {loading ? (
            <div className="p-16 text-center text-slate-400">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-400 mb-2" />
              <p className="text-xs">Loading live records from database...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-16 text-center text-slate-400">
              <Users className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-slate-300">No leads found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try clearing your search term or selecting another filter pill.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {filteredLeads.map((lead) => {
                const isDemo = lead.source === "demo_request";
                const isHp =
                  lead.system_type?.includes("Commercial") ||
                  lead.system_type?.includes("Mini-Grid");

                return (
                  <div
                    key={lead.id}
                    className="p-4 sm:p-6 hover:bg-slate-850/40 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Left: Lead Identity & Ticket */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-extrabold text-white">
                            {lead.full_name || "Waitlist Subscriber"}
                          </span>

                          {lead.queue_number && (
                            <span className="rounded-full bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-300">
                              {lead.queue_number}
                            </span>
                          )}

                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              isDemo
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                            }`}
                          >
                            {isDemo ? "Live Demo Request" : "Waitlist"}
                          </span>

                          {isHp && (
                            <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 text-[9px] font-bold font-mono">
                              HIGH VALUE FACILITY
                            </span>
                          )}

                          <span className="text-[11px] text-slate-500 font-mono">
                            {new Date(lead.created_at).toLocaleString([], {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Contact details */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                          <a
                            href={`mailto:${lead.email}`}
                            className="inline-flex items-center gap-1.5 text-indigo-400 hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{lead.email}</span>
                          </a>

                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white"
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{lead.phone}</span>
                            </a>
                          )}

                          {lead.system_type && (
                            <span className="inline-flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                              <Zap className="w-3.5 h-3.5 text-amber-400" />
                              <span>{lead.system_type}</span>
                            </span>
                          )}
                        </div>

                        {/* Customer message if consultation requested */}
                        {lead.message && (
                          <div className="mt-2 rounded-xl bg-slate-900/90 border border-slate-800 p-3 text-xs text-slate-300 leading-relaxed font-normal">
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
                            className="flex-1 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => saveLeadNotes(lead.id)}
                            disabled={isSavingNotes === lead.id}
                            className="rounded-lg bg-slate-800 px-3 py-1.5 text-[11px] font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
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
                                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 text-xs font-extrabold shadow-sm transition-all"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>

                              <a
                                href={`tel:${lead.phone}`}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 text-xs font-bold transition-all"
                                title="Call directly"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>Call</span>
                              </a>
                            </>
                          )}

                          <a
                            href={`mailto:${lead.email}?subject=Xense%20Energy%20Inquiry%20(${lead.queue_number || "Follow-up"})`}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 text-xs font-bold transition-all"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
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
                            className={`rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none border transition-colors ${
                              lead.status === "new"
                                ? "bg-rose-950/40 border-rose-500/40 text-rose-300"
                                : lead.status === "contacted"
                                ? "bg-indigo-950/40 border-indigo-500/40 text-indigo-300"
                                : lead.status === "qualified"
                                ? "bg-amber-950/40 border-amber-500/40 text-amber-300"
                                : lead.status === "converted"
                                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                                : "bg-slate-900 border-slate-700 text-slate-400"
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
