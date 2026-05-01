"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Clock,
  Coins,
  FileText,
  MessageSquare,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Eye,
  Search,
  Bot,
  Sparkles,
  Activity,
  Database,
  Globe,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ─── Mini Ring Chart (SVG) ─── */
function RingChart({ value, max, color, size = 120 }: { value: number; max: number; color: string; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const pct = value / max;
  const offset = circ * (1 - pct);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" className="text-muted/60" strokeWidth={10} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={10} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
    </svg>
  );
}

/* ─── Sparkline (fake mini-chart) ─── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 32;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardOverview() {
  const stats = [
    { label: "Documents Ingested", value: "24", change: "+3", up: true, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", sparkData: [4, 6, 5, 8, 12, 14, 18, 20, 24], sparkColor: "#3b82f6" },
    { label: "AI Conversations", value: "142", change: "+18", up: true, icon: MessageSquare, color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/20", sparkData: [20, 28, 40, 55, 70, 88, 110, 128, 142], sparkColor: "#8b5cf6" },
    { label: "Credits Consumed", value: "840", change: "-12%", up: false, icon: Coins, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", sparkData: [120, 150, 100, 90, 110, 80, 95, 60, 35], sparkColor: "#f59e0b" },
    { label: "Avg Response Time", value: "0.8s", change: "-0.2s", up: false, icon: Zap, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", sparkData: [1.4, 1.2, 1.1, 1.0, 0.9, 0.95, 0.85, 0.82, 0.8], sparkColor: "#10b981" },
  ];

  const recentDocs = [
    { name: "Master_Contracts.pdf", type: "PDF", pages: 142, status: "Indexed", time: "2 min ago", icon: FileText, accent: "bg-blue-500" },
    { name: "Q3_Proposals.docx", type: "DOCX", pages: 38, status: "Indexed", time: "45 min ago", icon: FileText, accent: "bg-violet-500" },
    { name: "https://docs.api.v1/guide", type: "URL", pages: 12, status: "Processing", time: "1 hour ago", icon: Globe, accent: "bg-emerald-500" },
    { name: "Leads_Database.csv", type: "CSV", pages: 8420, status: "Indexed", time: "Yesterday", icon: Database, accent: "bg-amber-500" },
  ];

  const recentChats = [
    { title: "Q3 Strategy Analysis", messages: 8, time: "2 mins ago", preview: "Based on your Q3 proposals, the key growth areas are..." },
    { title: "Vendor Contract Review", messages: 12, time: "3 hours ago", preview: "The indemnification clause in section 8.2 requires attention..." },
    { title: "Lead Scoring Criteria", messages: 5, time: "Yesterday", preview: "Top 3 leads matching your criteria are Alpha Corp, Beta..." },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium text-muted-foreground mb-1">
            Welcome back 👋
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl lg:text-3xl font-heading font-bold tracking-tight">
            System Overview
          </motion.h1>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2">
          <Link href="/dashboard/ingest">
            <Button className="rounded-xl shadow-md shadow-primary/15 h-9 text-sm">
              <Plus className="w-4 h-4 mr-1.5" /> New Ingest
            </Button>
          </Link>
          <Link href="/dashboard/chat">
            <Button variant="outline" className="rounded-xl h-9 text-sm">
              <MessageSquare className="w-4 h-4 mr-1.5" /> Start Chat
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            key={stat.label}
            className={cn(
              "relative p-5 bg-card border rounded-2xl shadow-sm hover:shadow-md transition-all group overflow-hidden",
              stat.border
            )}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-muted/40 to-transparent rounded-bl-[3rem] pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <div className={cn(stat.bg, "p-2 rounded-xl")}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
              <div className={cn(
                "flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full",
                stat.up ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
              )}>
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <Sparkline data={stat.sparkData} color={stat.sparkColor} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Credit Usage & Ring Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-card border rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-base font-heading font-semibold">Credit Usage</h2>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Monthly</span>
          </div>

          {/* Ring Chart */}
          <div className="flex items-center justify-center mb-6 relative">
            <RingChart value={8420} max={10000} color="hsl(var(--primary))" size={140} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold tracking-tight">84%</span>
              <span className="text-[10px] text-muted-foreground font-medium">Used</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-muted-foreground">Vectorization</span>
              </div>
              <span className="font-semibold">5,120</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                <span className="text-muted-foreground">LLM Tokens</span>
              </div>
              <span className="font-semibold">3,300</span>
            </div>
          </div>

          {/* Sub-stats */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="p-3 rounded-xl bg-muted/40 border border-dashed">
              <p className="text-[10px] text-muted-foreground mb-0.5">Daily Avg</p>
              <p className="text-lg font-bold">284 <span className="text-[10px] text-emerald-500 font-medium">↓12%</span></p>
            </div>
            <div className="p-3 rounded-xl bg-muted/40 border border-dashed">
              <p className="text-[10px] text-muted-foreground mb-0.5">Projected</p>
              <p className="text-lg font-bold">9.2k <span className="text-[10px] text-muted-foreground font-normal">/10k</span></p>
            </div>
          </div>
        </motion.div>

        {/* Right: Recent Documents */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3 bg-card border rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-blue-500/10 rounded-lg">
                <FileText className="w-4 h-4 text-blue-500" />
              </div>
              <h2 className="text-base font-heading font-semibold">Recent Documents</h2>
            </div>
            <Link href="/dashboard/documents">
              <Button variant="ghost" size="sm" className="text-xs font-semibold text-muted-foreground hover:text-primary h-7 rounded-lg">
                View All <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {recentDocs.map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors group cursor-pointer"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0", doc.accent)}>
                  <doc.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{doc.name}</p>
                  <p className="text-[11px] text-muted-foreground">{doc.type} · {typeof doc.pages === "number" && doc.pages > 1000 ? `${(doc.pages / 1000).toFixed(1)}k rows` : `${doc.pages} pages`}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold",
                    doc.status === "Indexed" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                  )}>
                    {doc.status === "Indexed" ? <CheckCircle2 className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                    {doc.status}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{doc.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row: Recent Chats + Quick Actions */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Recent Conversations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-3 bg-card border rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-violet-500/10 rounded-lg">
                <Bot className="w-4 h-4 text-violet-500" />
              </div>
              <h2 className="text-base font-heading font-semibold">Recent Conversations</h2>
            </div>
            <Link href="/dashboard/history">
              <Button variant="ghost" size="sm" className="text-xs font-semibold text-muted-foreground hover:text-primary h-7 rounded-lg">
                View All <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {recentChats.map((chat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-primary flex items-center justify-center text-white shrink-0 shadow-md shadow-violet-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold">{chat.title}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{chat.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate leading-relaxed">{chat.preview}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">{chat.messages} messages</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* AI Status */}
          <div className="bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent border border-primary/15 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">System Online</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground">Vectors</p>
                <p className="text-lg font-bold">24,810</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Model</p>
                <p className="text-lg font-bold">GPT-4o</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Latency</p>
                <p className="text-lg font-bold">0.8s</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Uptime</p>
                <p className="text-lg font-bold">99.9%</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <Link href="/dashboard/search" className="block">
            <div className="p-4 bg-card border rounded-2xl flex items-center gap-3 group hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                <Search className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">Semantic Search</p>
                <p className="text-[11px] text-muted-foreground">Query across all documents</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </div>
          </Link>

          <div className="p-4 bg-card border rounded-2xl flex items-center gap-3 group hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">Upgrade Plan</p>
              <p className="text-[11px] text-muted-foreground">Unlock unlimited credits</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
