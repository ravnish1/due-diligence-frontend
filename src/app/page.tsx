"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, FileText, Search, Sparkles, History, MessageSquare, Briefcase, Stethoscope, Scale, GraduationCap, FileSignature, Users, Bot, Database, Zap, Factory, Headset, Building2, Landmark } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function TrialGateDialog({ trigger }: { trigger: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin123") {
      toast.success("ACCESS GRANTED: Welcome to the RAG Playground!", {
        duration: 4000,
      });
      router.push("/playground");
    } else {
      toast.error("INVALID CREDENTIALS: Check your email and password.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent className="sm:max-w-[425px] border-primary/10 bg-white/95 backdrop-blur-2xl shadow-[0_32px_120px_-20px_rgba(0,0,0,0.1)] overflow-hidden rounded-3xl text-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 -z-10 animate-mesh-1" />
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl text-foreground">Trial Access Gate</DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            Enter your trial credentials to access the playground.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="grid gap-6 py-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="trial-email" className="text-foreground font-medium">Email Address</Label>
              <Input
                id="trial-email"
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all rounded-xl h-12 text-foreground placeholder:text-muted-foreground/50"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="trial-password" className="text-foreground font-medium">Password</Label>
              <Input
                id="trial-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-muted/50 border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all rounded-xl h-12 text-foreground placeholder:text-muted-foreground/50"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full h-12 rounded-xl shadow-lg shadow-primary/25 font-bold text-base group bg-primary hover:bg-primary/90 text-primary-foreground">
            Unlock Playground <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function MarketingPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You've been added to the waitlist!");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="px-6 lg:px-14 py-3 flex items-center justify-between border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold font-heading">
            LL
          </div>
          <span className="font-heading font-semibold text-xl tracking-tight">LaunchLive</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#use-cases" className="hover:text-foreground transition-colors">Use Cases</Link>
          <Link href="/enterprise" className="hover:text-foreground transition-colors font-semibold text-primary/80 hover:text-primary">For Enterprise</Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors text-primary font-semibold italic">Launch Demo</Link>
        </nav>
        <div className="flex items-center gap-4">
          <TrialGateDialog trigger={<Button variant="default" className="font-medium rounded-full">Get Trial <ArrowRight className="w-4 h-4 ml-2" /></Button>} />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-14 pt-6 pb-12 md:pt-10 md:pb-20 flex flex-col items-center text-center overflow-hidden">
          {/* Animated Shader Gradient Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-mesh-1" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-mesh-2" />
            <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-sky-500/10 blur-[100px] rounded-full animate-mesh-1" />
          </div>

          {/* Subtle Premium Pattern */}
          <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdHRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwgMCwgMCwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-40" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-6 relative z-10"
          >
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs md:text-sm font-semibold bg-muted/50 text-primary border-primary/20 backdrop-blur-sm shadow-sm transition-all">
              <Sparkles className="w-4 h-4 mr-2" /> Introducing LaunchLive RAG 2.0
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-black tracking-tighter text-foreground leading-[1.05]">
              Unleash the Power of Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-indigo-500 to-primary/40 animate-gradient-x">Enterprise Documents</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Ingest, query, and chat with your proprietary data using enterprise-grade AI. Experience the most advanced Retrieval-Augmented Generation platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <TrialGateDialog trigger={<Button size="lg" className="rounded-full text-base h-14 px-10 w-full sm:w-auto shadow-[0_0_40px_rgba(var(--primary),0.3)] hover:shadow-[0_0_60px_rgba(var(--primary),0.4)] transition-all duration-300">Start Free Trial</Button>} />

              <Dialog>
                <DialogTrigger render={<Button variant="outline" size="lg" className="rounded-full text-base h-14 px-10 w-full sm:w-auto border-2 hover:bg-muted/50 transition-all duration-300" />}>
                  Join Waitlist
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-heading text-2xl">Join the Waitlist</DialogTitle>
                    <DialogDescription className="text-base">Sign up to get early access to our upcoming features and enterprise APIs.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleWaitlistSubmit} className="grid gap-5 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="waitlist-email" className="font-semibold">Work Email</Label>
                      <Input id="waitlist-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl bg-muted/50" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="waitlist-msg" className="font-semibold">Message (Optional)</Label>
                      <Input id="waitlist-msg" placeholder="How do you plan to use our platform?" value={message} onChange={(e) => setMessage(e.target.value)} className="h-12 rounded-xl bg-muted/50" />
                    </div>
                    <Button type="submit" className="w-full h-12 rounded-xl font-bold text-base shadow-lg">Join Now</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 50 }}
            className="w-full max-w-5xl mx-auto mt-20 md:mt-24 rounded-2xl border border-border/50 bg-card shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden relative z-10"
          >
            {/* Dynamic RAG Process Visualization */}
            <div className="aspect-video bg-muted/10 relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
              {/* Grid + ambient glow */}
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-50" />
              </div>

              {/* Floating contextual badges — hidden on small screens to keep mobile clean */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute top-4 left-4 md:top-6 md:left-8 hidden sm:flex items-center gap-2 bg-background/80 backdrop-blur border rounded-full px-3 py-1.5 shadow-sm text-[10px] md:text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>3 docs ingested</span>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="absolute top-4 right-4 md:top-6 md:right-8 hidden sm:flex items-center gap-2 bg-background/80 backdrop-blur border rounded-full px-3 py-1.5 shadow-sm text-[10px] md:text-xs text-muted-foreground">
                <Search className="w-3 h-3" />
                <span>Semantic search active</span>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-4 left-4 md:bottom-6 md:left-8 hidden sm:flex items-center gap-2 bg-background/80 backdrop-blur border rounded-full px-3 py-1.5 shadow-sm text-[10px] md:text-xs font-medium">
                <Zap className="w-3 h-3 text-amber-500" />
                <span className="text-muted-foreground">Avg. response: <span className="text-foreground">0.8s</span></span>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="absolute bottom-4 right-4 md:bottom-6 md:right-8 hidden sm:flex items-center gap-2 bg-background/80 backdrop-blur border rounded-full px-3 py-1.5 shadow-sm text-[10px] md:text-xs font-medium">
                <Database className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">Vectors: <span className="text-foreground">24,810</span></span>
              </motion.div>

              {/* Animated dashed connection lines (desktop only) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <line x1="33%" y1="30%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" /></line>
                <line x1="33%" y1="50%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" /></line>
                <line x1="33%" y1="70%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" /></line>
                <line x1="50%" y1="50%" x2="67%" y2="35%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" /></line>
                <line x1="50%" y1="50%" x2="67%" y2="65%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" /></line>
              </svg>

              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center z-10">
                {/* Left: Document Sources */}
                <div className="flex flex-col gap-4">
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-background border rounded-xl p-4 shadow-sm flex items-center gap-4 hover:border-primary/50 transition-colors">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center"><FileSignature className="w-5 h-5" /></div>
                    <div className="min-w-0 flex-1"><p className="text-sm font-semibold truncate">Master_Contracts.pdf</p><p className="text-xs text-muted-foreground">142 Pages</p></div>
                  </motion.div>
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="bg-background border rounded-xl p-4 shadow-sm flex items-center gap-4 hover:border-primary/50 transition-colors md:translate-x-4">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><FileText className="w-5 h-5" /></div>
                    <div className="min-w-0 flex-1"><p className="text-sm font-semibold truncate">Q3_Proposals.docx</p><p className="text-xs text-muted-foreground">2.4 MB</p></div>
                  </motion.div>
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="bg-background border rounded-xl p-4 shadow-sm flex items-center gap-4 hover:border-primary/50 transition-colors">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center"><Users className="w-5 h-5" /></div>
                    <div className="min-w-0 flex-1"><p className="text-sm font-semibold truncate">Leads_Database.csv</p><p className="text-xs text-muted-foreground">8,420 Rows</p></div>
                  </motion.div>
                </div>

                {/* Center: AI Brain */}
                <div className="flex justify-center relative py-8 md:py-0">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-1/2 -z-10 hidden md:block" />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-background border-2 border-primary/50 shadow-[0_0_40px_rgba(var(--primary),0.3)] flex items-center justify-center relative"
                  >
                    <div className="absolute inset-0 bg-primary/10 rounded-3xl animate-pulse" />
                    <Bot className="w-10 h-10 md:w-12 md:h-12 text-primary relative z-10" />

                    {/* Floating elements around brain */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-background border shadow-sm flex items-center justify-center"><Database className="w-3.5 h-3.5 text-muted-foreground" /></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-background border shadow-sm flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-amber-500" /></div>
                  </motion.div>
                </div>

                {/* Right: Insights */}
                <div className="flex flex-col gap-4">
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.0 }} className="bg-background border rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-primary shrink-0" />
                      <h3 className="text-sm font-semibold truncate">Key Insights Extracted</h3>
                    </div>
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-2 text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        Net-30 payment clause detected across <span className="font-medium text-foreground">6 contracts</span>
                      </li>
                      <li className="flex items-start gap-2 text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-medium text-foreground">3 high-value leads</span> match Q3 proposal criteria
                      </li>
                      <li className="flex items-start gap-2 text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        Indemnification risk flagged in <span className="font-medium text-foreground">Clause 8.2</span>
                      </li>
                    </ul>
                  </motion.div>
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.1 }} className="bg-background border border-primary/20 bg-primary/5 rounded-xl p-4 shadow-sm flex gap-3 md:translate-x-[-16px]">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-1">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-tight">"What are the terms of the Alpha contract?"</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground mt-1.5 leading-relaxed">Based on <span className="font-medium text-foreground">Master_Contracts.pdf</span>, the terms state a net-30 payment schedule...</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Social Proof / Metrics (New Section) */}
        <section className="border-y bg-muted/20 py-10 px-6 lg:px-14 overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center md:text-left shrink-0 opacity-70">Engineered For Scale</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full">
              {[
                { label: "Documents Processed", value: "10M+" },
                { label: "Avg. Query Latency", value: "< 0.8s" },
                { label: "Uptime SLA", value: "99.99%" },
                { label: "Compliance Ready", value: "Enterprise" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-2xl md:text-3xl font-heading font-black text-foreground">{stat.value}</span>
                  <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider max-w-[80px] leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* How It Works - Cinematic Light Premium */}
        <section id="how-it-works" className="relative py-24 scroll-mt-20 px-6 lg:px-14 bg-muted/30 text-foreground overflow-hidden">
          {/* Ambient Background Effects */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary),0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary),0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-24">

              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
                From Documents to Intelligence <br className="hidden md:block" />
                <span className="text-primary"> In Seconds</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Stop drowning in static files. Deploy an enterprise-grade retrieval pipeline that instantly converts your raw data into a reasoning engine ready for complex queries.
              </motion.p>
            </div>

            <div className="relative">
              {/* Connector Line (Desktop) */}
              <div className="absolute top-24 left-[10%] right-[10%] h-[2px] bg-primary/5 hidden md:block">
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-10 relative z-10">
                {[
                  {
                    step: "01",
                    title: "Upload Docs",
                    desc: "Drag and drop PDFs, Word docs, CSVs, or enter URLs. We handle the parsing, chunking, and vector embedding instantly.",
                    icon: FileText,
                    mockup: (
                      <div className="w-full h-full bg-background border rounded-lg p-3 flex flex-col gap-2 relative overflow-hidden shadow-sm">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center border border-primary/20 mb-1"><FileText className="w-4 h-4 text-primary" /></div>
                        <div className="h-1.5 w-full bg-muted rounded-full" />
                        <div className="h-1.5 w-3/4 bg-muted rounded-full" />
                        <div className="mt-auto h-1 w-full overflow-hidden bg-primary/10 rounded-full"><div className="h-full bg-primary w-2/3" /></div>
                      </div>
                    )
                  },
                  {
                    step: "02",
                    title: "Ask Questions",
                    desc: "Query your documents using natural language. Our semantic search bypasses keywords to find the exact conceptual context.",
                    icon: Search,
                    mockup: (
                      <div className="w-full h-full bg-background border rounded-lg p-3 flex flex-col gap-2 relative overflow-hidden shadow-sm">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
                        <div className="w-full h-6 rounded-full bg-muted/50 border flex items-center px-2 gap-2">
                          <Search className="w-3 h-3 text-primary" />
                          <div className="h-1 w-12 bg-muted-foreground/30 rounded-full" />
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="h-1.5 w-full bg-muted rounded-full" />
                          <div className="h-1.5 w-5/6 bg-muted rounded-full" />
                        </div>
                      </div>
                    )
                  },
                  {
                    step: "03",
                    title: "Get Answers",
                    desc: "Receive highly accurate, synthesis-driven AI responses complete with precise, clickable source citations for immediate verification.",
                    icon: MessageSquare,
                    mockup: (
                      <div className="w-full h-full bg-background border rounded-lg p-3 flex flex-col relative overflow-hidden shadow-sm">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
                        <div className="flex gap-2 items-start mb-2">
                          <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20"><Sparkles className="w-2.5 h-2.5 text-primary" /></div>
                          <div className="space-y-1 w-full pt-1">
                            <div className="h-1.5 w-full bg-muted rounded-full" />
                            <div className="h-1.5 w-4/5 bg-muted rounded-full" />
                          </div>
                        </div>
                        <div className="mt-auto flex gap-1">
                          <div className="h-3 w-8 bg-muted border rounded-sm" />
                          <div className="h-3 w-8 bg-muted border rounded-sm" />
                        </div>
                      </div>
                    )
                  }
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.2) }}
                    className="group relative bg-background/50 hover:bg-background border hover:border-primary/30 backdrop-blur-xl p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-lg"
                  >
                    <div className="absolute top-0 right-8 -translate-y-1/2 text-5xl font-heading font-black text-muted-foreground/10 group-hover:text-primary/10 transition-colors pointer-events-none">
                      {s.step}
                    </div>

                    <div className="w-full h-32 mb-8 rounded-xl bg-muted/30 border p-4 flex items-center justify-center relative group-hover:border-primary/20 transition-colors">
                      {s.mockup}
                    </div>

                    <h3 className="text-xl font-heading font-semibold mb-3 text-foreground flex items-center gap-2">
                      <span className="text-primary">{s.step}.</span> {s.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {s.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-20 flex justify-center">
              <TrialGateDialog trigger={
                <Button size="lg" className="h-12 px-8 rounded-full shadow-lg shadow-primary/25 transition-all font-medium text-base">
                  See It In Action
                </Button>
              } />
            </div>
          </div>
        </section>

        {/* Features - Bento Grid */}
        <section id="features" className="py-24 scroll-mt-20 px-6 lg:px-14">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Core Platform</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter mb-6">
                Enterprise-Grade Capabilities
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
                Built from the ground up for security, accuracy, and unprecedented speed. A completely managed RAG pipeline.
              </motion.p>
            </div>

            {/* Bento Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature 1 - Large */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2 bg-gradient-to-br from-card to-muted/30 border p-8 md:p-12 rounded-[2rem] hover:shadow-xl hover:border-primary/30 transition-all duration-500 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
                <FileText className="w-12 h-12 text-primary mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 relative z-10" />
                <h3 className="text-3xl font-heading font-bold mb-4 tracking-tight relative z-10">Multi-Format Ingestion Engine</h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl relative z-10">Seamlessly import PDF, DOCX, TXT, MD, CSV, and live URLs. We automatically chunk, embed, and index your content into our high-performance vector datastore without any custom ETL scripts.</p>
              </motion.div>

              {/* Feature 2 - Small */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-card to-muted/30 border p-8 md:p-10 rounded-[2rem] hover:shadow-xl hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                <Search className="w-10 h-10 text-primary mb-6 transform group-hover:scale-110 transition-transform duration-500 relative z-10" />
                <h3 className="text-2xl font-heading font-bold mb-3 tracking-tight relative z-10">Deep Semantic Search</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">Go beyond keyword matching. Find the exact intent and context within millions of document pages in milliseconds.</p>
              </motion.div>

              {/* Feature 3 - Small */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-card to-muted/30 border p-8 md:p-10 rounded-[2rem] hover:shadow-xl hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                <MessageSquare className="w-10 h-10 text-primary mb-6 transform group-hover:scale-110 transition-transform duration-500 relative z-10" />
                <h3 className="text-2xl font-heading font-bold mb-3 tracking-tight relative z-10">Granular Source Citations</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">Trust but verify. Every AI response includes direct, clickable citations mapping back to your exact original source.</p>
              </motion.div>

              {/* Feature 4 - Large */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="md:col-span-2 bg-gradient-to-br from-card to-muted/30 border p-8 md:p-12 rounded-[2rem] hover:shadow-xl hover:border-primary/30 transition-all duration-500 group flex flex-col justify-center relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
                <History className="w-12 h-12 text-primary mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10" />
                <h3 className="text-3xl font-heading font-bold mb-4 tracking-tight relative z-10">Persistent Conversation Memory</h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl relative z-10">Pick up right where you left off. Access past queries and maintain deep contextual awareness across multiple chat sessions effortlessly.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Use Cases - Sleek Grid */}
        <section id="use-cases" className="py-24 scroll-mt-20 px-6 lg:px-14 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Versatility</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter mb-6">
                Built for Every Industry
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                Whatever your domain, Our System adapts to your proprietary knowledge base.
              </motion.p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { title: "Legal", icon: Scale, desc: "Case law & contracts" },
                { title: "Finance", icon: Briefcase, desc: "KYC & financial reports" },
                { title: "Healthcare", icon: Stethoscope, desc: "Clinical guidelines" },
                { title: "Manufacturing", icon: Factory, desc: "Manuals & SOPs" },
                { title: "Customer Support", icon: Headset, desc: "Ticket resolution" },
                { title: "Human Resources", icon: Users, desc: "Policies & handbooks" },
                { title: "Real Estate", icon: Building2, desc: "Lease agreements" },
                { title: "Public Sector", icon: Landmark, desc: "Regulatory compliance" },
              ].map((uc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-background/80 backdrop-blur-md border border-border/60 p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                    <uc.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <span className="font-heading font-bold text-lg">{uc.title}</span>
                  <span className="text-sm text-muted-foreground mt-2 leading-tight">{uc.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-gradient-to-br from-background via-primary/5 to-background text-foreground rounded-[3rem] p-12 md:p-20 text-center shadow-[0_32px_120px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden border border-primary/10"
          >
            {/* White Gradient Shader inside the CTA */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-primary/20 blur-[120px] pointer-events-none animate-mesh-1" />
            <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-indigo-500/10 blur-[100px] pointer-events-none animate-mesh-2" />

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter mb-6 relative z-10 leading-[1.1]">
              Ready to Transform Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-indigo-500 to-primary/40 animate-gradient-x">Document Intelligence?</span>
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium relative z-10 leading-relaxed">
              Join leading innovative teams. Get unlimited document ingestion, priority support, and all premium features during our early access phase.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Dialog>
                <DialogTrigger render={<Button size="lg" className="rounded-full text-lg h-16 px-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_20px_50px_rgba(var(--primary),0.3)] transition-all duration-300 font-bold" />}>
                  Secure Early Access
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-2xl">Early Access Signup</DialogTitle>
                    <DialogDescription className="text-base">Leave your email and we'll reach out with your special VIP invite link.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleWaitlistSubmit} className="grid gap-5 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="early-email" className="font-semibold">Work Email</Label>
                      <Input id="early-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl" required />
                    </div>
                    <Button type="submit" className="w-full h-12 rounded-xl font-bold text-base shadow-lg">Submit Request</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Link href="/enterprise">
                <Button variant="outline" size="lg" className="rounded-full text-lg h-16 px-8 hover:bg-muted text-foreground border-border shadow-sm font-semibold transition-all">
                  Contact Enterprise Sales
                </Button>
              </Link>
            </div>

            <p className="mt-10 text-sm text-muted-foreground font-medium relative z-10">
              No credit card required • Setup in 5 minutes
            </p>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="py-32 px-6 lg:px-14 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tighter">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">Everything you need to know about the platform.</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-border/50 py-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">What document formats are supported?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">We support PDF, DOCX, TXT, MD, CSV, and live URLs. More formats are continually being added.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-border/50 py-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">Is my proprietary data secure?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">Yes. Your documents are encrypted at rest and in transit. We do not use your data to train public models.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-border/50 py-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">How accurate are the source citations?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">Our semantic chunking engine ensures that citations point to the exact paragraph or section referenced by the AI, minimizing hallucinations and providing an auditable trail.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b border-border/50 py-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">Can I integrate this with my existing app?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">Absolutely. We provide a robust REST API for both ingestion and querying, allowing seamless integration into your workflows. Visit our Enterprise page to learn more.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-b border-border/50 py-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">Is there a limit on document size?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">During early access, individual file sizes are capped at 100MB, but overall storage scales with your plan. For massive ingestion needs, please contact our enterprise team.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="border-b border-border/50 py-2 border-transparent">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">How do I access the dashboard?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">You can explore the platform features by clicking the "Launch Demo" link in the navigation menu.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 px-6 lg:px-14">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold font-heading text-xs">
              LL
            </div>
            <span className="font-heading font-semibold tracking-tight text-lg">LaunchLive</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Twitter</Link>
            <Link href="#" className="hover:text-foreground">LinkedIn</Link>
            <Link href="#" className="hover:text-foreground">GitHub</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LaunchLive Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
