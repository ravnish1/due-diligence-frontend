"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  Globe,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Plug,
  Shield,
  Zap,
  Building2,
  Users,
  BarChart3,
  Workflow,
  Key,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const integrations = [
  { icon: Database, name: "PostgreSQL / Supabase", desc: "Sync structured records directly into your RAG pipeline via native connectors.", color: "text-blue-500 bg-blue-500/10" },
  { icon: Globe, name: "Salesforce CRM", desc: "Ingest deal notes, contracts, and lead data from Salesforce automatically.", color: "text-sky-500 bg-sky-500/10" },
  { icon: FileText, name: "SharePoint & OneDrive", desc: "Connect your Microsoft 365 document libraries and keep knowledge always fresh.", color: "text-indigo-500 bg-indigo-500/10" },
  { icon: Layers, name: "Notion Workspaces", desc: "Turn your team's entire Notion wiki into a queryable enterprise knowledge base.", color: "text-rose-500 bg-rose-500/10" },
  { icon: Server, name: "S3 / Azure Blob / GCS", desc: "Bulk-ingest from any cloud object storage bucket with zero infrastructure setup.", color: "text-amber-500 bg-amber-500/10" },
  { icon: Workflow, name: "Zapier & Make (n8n)", desc: "Automate ingestion pipelines using the tools your operations team already uses.", color: "text-emerald-500 bg-emerald-500/10" },
  { icon: Plug, name: "REST & GraphQL APIs", desc: "Full-featured API for programmatic ingestion, querying, and response streaming.", color: "text-purple-500 bg-purple-500/10" },
  { icon: MessageSquare, name: "Slack & MS Teams", desc: "Surface AI answers directly inside your team's messaging tools via bot integration.", color: "text-teal-500 bg-teal-500/10" },
];

const useCases = [
  {
    icon: Building2,
    vertical: "Legal & Compliance",
    title: "Contract Intelligence at Scale",
    problem: "Legal teams spend 40% of their time manually reviewing contracts for clauses, risks, and obligations.",
    solution: "Ingest your entire contract repository. Query for specific clauses, flag indemnification risks, and compare terms across vendor agreements — instantly.",
    metrics: ["60% reduction in contract review time", "Clause-level source citation", "Multi-document cross-referencing"],
  },
  {
    icon: BarChart3,
    vertical: "Finance & Due Diligence",
    title: "Deal Room Document Intelligence",
    problem: "M&A analysts manually parse thousands of pages across data rooms before a single deal can close.",
    solution: "Upload entire data rooms. Let your team query financial statements, agreements, and disclosures in natural language. Surface anomalies before they become liabilities.",
    metrics: ["Due diligence cycles cut by 35%", "Cross-document financial reconciliation", "Audit-ready citation trails"],
  },
  {
    icon: Users,
    vertical: "Sales & Revenue",
    title: "Proposal & Tender Intelligence",
    problem: "Sales teams recreate proposals from scratch because past wins are buried in scattered file drives.",
    solution: "Index every proposal, RFP response, and pricing sheet. Your reps get AI-assisted drafting from what has already won — without leaving their workflow.",
    metrics: ["2× faster proposal creation", "Institutional knowledge preserved", "Win pattern recognition"],
  },
  {
    icon: Shield,
    vertical: "Risk & Procurement",
    title: "Vendor & Supplier Risk Analysis",
    problem: "Procurement teams can't efficiently screen hundreds of supplier contracts for non-standard terms.",
    solution: "Ingest vendor contracts and query them for payment terms, SLA deviations, IP ownership clauses, and exit conditions across your entire supplier base.",
    metrics: ["100% contract coverage", "Deviation alerts on key clauses", "Bulk comparative analysis"],
  },
];

const apiSnippets = {
  ingest: `POST /api/v1/ingest
Authorization: Bearer sk-live-xxxx

{
  "source": "s3://your-bucket/contracts/",
  "namespace": "legal-team-2025",
  "parse_mode": "deep",
  "webhookUrl": "https://your-app.com/hook"
}`,
  query: `POST /api/v1/query
Authorization: Bearer sk-live-xxxx

{
  "namespace": "legal-team-2025",
  "query": "Which contracts have net-30 payment terms?",
  "top_k": 5,
  "stream": true,
  "cite_sources": true
}`,
  response: `{
  "answer": "Contracts with net-30 payment terms: Master_Services_v3.pdf (Clause 4.2), Vendor_Agreement_Alpha.pdf (Sec. 9.1), ...",
  "sources": [
    { "file": "Master_Services_v3.pdf", "page": 12, "clause": "4.2", "score": 0.97 },
    { "file": "Vendor_Agreement_Alpha.pdf", "page": 4, "clause": "9.1", "score": 0.94 }
  ],
  "latency_ms": 820
}`,
};

export default function EnterprisePage() {
  const [activeSnippet, setActiveSnippet] = useState<"ingest" | "query" | "response">("query");
  const [contactForm, setContactForm] = useState({ name: "", company: "", email: "", message: "" });

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message received! Our enterprise team will reach out within 24 hours.");
    setContactForm({ name: "", company: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="px-6 lg:px-14 py-4 flex items-center justify-between border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold font-heading">LL</div>
          <span className="font-heading font-semibold text-xl tracking-tight">LaunchLive</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
          <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="/#use-cases" className="hover:text-foreground transition-colors">Use Cases</Link>
          <Link href="/enterprise" className="text-primary font-semibold">For Enterprise</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="#contact">
            <Button variant="outline" className="rounded-full font-medium text-sm hidden sm:inline-flex">Talk to Sales</Button>
          </Link>
          <Link href="/">
            <Button className="rounded-full font-medium text-sm">← Back to Home</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative px-6 lg:px-14 pt-20 pb-24 text-center overflow-hidden">
          {/* Animated Shader Gradient Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-mesh-1" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-mesh-2" />
            <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-sky-500/10 blur-[100px] rounded-full animate-mesh-1" />
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-primary/5 text-primary border-primary/20 mb-6">
              <Building2 className="w-3.5 h-3.5 mr-2" /> Built for Enterprise Teams
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6 leading-[1.05]">
              Integrate With Your <span className="text-primary">Current Stack</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              LaunchLive RAG drops into your existing workflows via REST APIs, native connectors, and webhooks — no rip-and-replace required. Ship document intelligence in days, not quarters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contact">
                <Button size="lg" className="rounded-full h-12 px-8 shadow-lg shadow-primary/25 font-medium text-base w-full sm:w-auto">
                  Talk to Sales <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="#api">
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 font-medium text-base w-full sm:w-auto">
                  View API Docs <Code2 className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Trust Strip */}
        <section className="border-y bg-muted/20 py-6 px-6 lg:px-14">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 text-sm text-muted-foreground font-medium">
            {[
              { icon: Shield, text: "Enterprise Architecture" },
              { icon: Lock, text: "End-to-End Encrypted" },
              { icon: Key, text: "Bring Your Own Key (BYOK)" },
              { icon: Server, text: "Private Cloud Deployable" },
              { icon: Zap, text: "< 1s Avg. Response Latency" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Integrations Grid */}
        <section className="py-24 px-6 lg:px-14">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-medium text-primary mb-3">Native Connectors</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">
                Connect Everything You Already Use
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Native connectors for the tools your enterprise runs on — no middleware, no custom ETL scripts, no engineering sprint.
              </motion.p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {integrations.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-background border rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm mb-2">{item.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* B2B Use Cases */}
        <section id="use-cases" className="py-24 px-6 lg:px-14 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-medium text-primary mb-3">Industry Use Cases</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">
                Built for Teams With Real Complexity
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Not a generic chat-with-PDF tool. LaunchLive RAG is purpose-built for enterprises where accuracy, auditability, and scale are non-negotiable.
              </motion.p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((uc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background border rounded-3xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <uc.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-widest">{uc.vertical}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">{uc.title}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="bg-rose-500/5 border border-rose-500/15 rounded-xl p-4">
                      <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1.5">The Problem</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{uc.problem}</p>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4">
                      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1.5">The Solution</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{uc.solution}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {uc.metrics.map((m, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* API Section */}
        <section id="api" className="py-24 px-6 lg:px-14">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-medium text-primary mb-3">Developer First</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">
                A REST API Your Devs Will Love
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Simple, predictable, and streaming-capable. Integrate document intelligence into your product in under an afternoon.
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              {/* Features side */}
              <div className="lg:col-span-2 space-y-5">
                {[
                  { icon: Key, title: "API Key Auth", desc: "Bearer token authentication with per-key rate limits and usage analytics." },
                  { icon: Zap, title: "Streaming Responses", desc: "Server-sent events for real-time token streaming. Keep your UX snappy." },
                  { icon: Database, title: "Namespace Isolation", desc: "Logical separation of document sets per tenant, team, or project." },
                  { icon: Lock, title: "Webhook Events", desc: "Receive async callbacks on ingestion complete, error, and re-index events." },
                  { icon: Globe, title: "SDK Support", desc: "Official SDKs for TypeScript, Python, and Go. OpenAPI spec available." },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex gap-4">
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">{title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Code Panel */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
                {/* Tab bar */}
                <div className="flex border-b border-zinc-800 bg-zinc-900/80 px-4">
                  {(["ingest", "query", "response"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSnippet(tab)}
                      className={`px-4 py-3 text-xs font-mono font-medium transition-colors border-b-2 -mb-px ${activeSnippet === tab ? "border-primary text-primary" : "border-transparent text-zinc-400 hover:text-zinc-200"}`}
                    >
                      {tab === "ingest" ? "POST /ingest" : tab === "query" ? "POST /query" : "Response"}
                    </button>
                  ))}
                </div>
                {/* Code */}
                <div className="p-6 overflow-x-auto">
                  <pre className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre">
                    <code>{apiSnippets[activeSnippet]}</code>
                  </pre>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact / Sales */}
        <section id="contact" className="py-24 px-6 lg:px-14 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left copy */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <p className="text-sm font-medium text-primary mb-4">Enterprise Sales</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-6">
                  Let's Build Your <span className="text-primary">Knowledge Infrastructure</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                  Talk to our enterprise team about custom ingestion volumes, dedicated deployments, SLA agreements, and white-label licensing.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "Enterprise Email", value: "info@launchlive.studio" },

                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="font-medium text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right form */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-background border rounded-3xl p-8 shadow-sm">
                <h3 className="font-heading font-bold text-xl mb-6">Send Us a Message</h3>
                <form onSubmit={handleContact} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Your Name</label>
                      <Input placeholder="Alex Johnson" value={contactForm.name} onChange={(e) => setContactForm(p => ({ ...p, name: e.target.value }))} required className="rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Company</label>
                      <Input placeholder="Acme Corp" value={contactForm.company} onChange={(e) => setContactForm(p => ({ ...p, company: e.target.value }))} required className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Work Email</label>
                    <Input type="email" placeholder="alex@acmecorp.com" value={contactForm.email} onChange={(e) => setContactForm(p => ({ ...p, email: e.target.value }))} required className="rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">How can we help?</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your use case, document volumes, and team size..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full rounded-xl border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full rounded-xl font-medium shadow-lg shadow-primary/20">
                    Send Message <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">We respond to all enterprise inquiries within 24 hours.</p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-6 lg:px-14 text-center text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          <span>© 2025 LaunchLive RAG. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="#api" className="hover:text-foreground transition-colors">API</Link>
            <Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
