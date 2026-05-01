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
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function DashboardOverview() {
  const stats = [
    { label: "Total Ingests", value: "24", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "AI Queries", value: "142", icon: MessageSquare, color: "text-primary", bg: "bg-primary/10" },
    { label: "Credits Used", value: "840", icon: Coins, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Time Saved", value: "12h", icon: Zap, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  const recentActivity = [
    { type: "chat", title: "Q3 Strategy Analysis", time: "2 mins ago", status: "Completed" },
    { type: "ingest", title: "annual_report_2025.pdf", time: "45 mins ago", status: "Success" },
    { type: "chat", title: "Vendor Contract Review", time: "3 hours ago", status: "Archived" },
    { type: "ingest", title: "https://docs.api.v1/guide", time: "Yesterday", status: "Success" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">System Overview</h1>
          <p className="text-muted-foreground mt-1 text-lg">Welcome back. Here's what's happening with your RAG instance.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/ingest">
            <Button className="rounded-xl shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" /> New Ingest
            </Button>
          </Link>
          <Link href="/dashboard/chat">
            <Button variant="outline" className="rounded-xl">
              <MessageSquare className="w-4 h-4 mr-2" /> Start Chat
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="p-6 bg-card border rounded-2xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} p-2.5 rounded-xl`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Credit Usage Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-card border rounded-3xl p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-heading font-semibold">Credit Utilization</h2>
            </div>
            <span className="text-sm font-medium px-3 py-1 bg-muted rounded-full">Monthly Cycle</span>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground font-medium">RAG Processing Credits</span>
                <span className="font-bold">8,420 / 10,000 <span className="text-muted-foreground font-normal ml-1">(84%)</span></span>
              </div>
              <Progress value={84} className="h-3 rounded-full" />
              <div className="flex gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" /> Vectorization
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary/30" /> LLM Tokens
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-2xl bg-muted/30 border border-dashed">
                 <p className="text-xs text-muted-foreground mb-1">Daily Average</p>
                 <p className="text-xl font-bold">284 <span className="text-xs text-emerald-500 font-normal">↓ 12%</span></p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/30 border border-dashed">
                 <p className="text-xs text-muted-foreground mb-1">Projected End</p>
                 <p className="text-xl font-bold">9,240 <span className="text-xs text-muted-foreground font-normal">/ 10k</span></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border rounded-3xl p-8 shadow-sm flex flex-col"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-muted rounded-lg">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-heading font-semibold">Recent Activity</h2>
          </div>

          <div className="space-y-6 flex-1">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex gap-4 items-start relative pb-6 last:pb-0">
                {i !== recentActivity.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-px bg-muted" />
                )}
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10",
                  item.type === "chat" ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"
                )}>
                  {item.type === "chat" ? <MessageSquare className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold truncate max-w-[120px]">{item.title}</p>
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{item.type}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                       <CheckCircle2 className="w-3 h-3" /> {item.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link href="/dashboard/history" className="mt-8">
            <Button variant="ghost" className="w-full text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
              View All History
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Features/Quick Links */}
      <div className="grid md:grid-cols-2 gap-4">
         <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-colors">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
                  <LayoutDashboard className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="font-bold">Upgrade Plan</h3>
                  <p className="text-sm text-muted-foreground">Unlock unlimited credits and priority support.</p>
               </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </div>
         <div className="p-6 bg-muted/20 border rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-card border flex items-center justify-center shadow-sm">
                  <BarChart3 className="w-6 h-6 text-muted-foreground" />
               </div>
               <div>
                  <h3 className="font-bold">API Documentation</h3>
                  <p className="text-sm text-muted-foreground">Integrate LaunchLive RAG into your own apps.</p>
               </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
