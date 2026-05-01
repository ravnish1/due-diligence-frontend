"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  UploadCloud, 
  Send, 
  Bot, 
  User, 
  FileText, 
  X, 
  Sparkles, 
  ArrowLeft, 
  BookOpen, 
  ChevronRight,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Source {
  id: string;
  documentName: string;
  text: string;
}

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  sources?: Source[];
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "ready" | "failed";
}

export default function PlaygroundPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isAiTyping]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading" as const
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress for each file
    for (const file of newFiles) {
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(r => setTimeout(r, 150));
        setFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress: i } : f));
      }
      setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: "ready" } : f));
    }
    
    toast.success("Documents ready", {
      description: `${acceptedFiles.length} files successfully ingested.`
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    }
  });

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isAiTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsAiTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "I've analyzed your uploaded documents. " + 
                 (files.length > 0 
                  ? `Based on '${files[0].name}', here's what I found: The document covers essential strategic guidelines and performance metrics for the current fiscal year.` 
                  : "Please upload a document so I can provide specific answers based on your data."),
        sources: files.length > 0 ? [
          { 
            id: "s1", 
            documentName: files[0].name, 
            text: "This is a key excerpt from your document that supports the generated answer." 
          }
        ] : []
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsAiTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-background font-sans overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b px-6 flex items-center justify-between shrink-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
              LL
            </div>
            <span className="font-heading font-semibold text-lg">Trial Playground</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-primary">Free Trial Mode</span>
        </div>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="font-medium">Go to Dashboard</Button>
        </Link>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Uploads */}
        <aside className="hidden lg:flex w-80 flex-col border-r bg-muted/20 shrink-0">
          <div className="p-6 space-y-6 flex flex-col h-full">
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground">Source Documents</h3>
              <p className="text-xs text-muted-foreground">Add files to build your temporary knowledge base.</p>
            </div>

            <div 
              {...getRootProps()} 
              className={cn(
                "border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 text-center",
                isDragActive ? "border-primary bg-primary/5 scale-[0.98]" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-background"
              )}
            >
              <input {...getInputProps()} />
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                <UploadCloud className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-medium">Drop PDF/Docs</p>
              <p className="text-[10px] text-muted-foreground">Limit 100MB per file</p>
            </div>

            <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-3">
              {files.map((file) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={file.id} 
                  className="bg-background border rounded-lg p-3 shadow-sm group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-xs font-medium truncate">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => removeFile(file.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
                    >
                      <X className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                  {file.status === "uploading" ? (
                    <div className="space-y-1.5">
                      <Progress value={file.progress} className="h-1" />
                      <p className="text-[10px] text-muted-foreground text-right">{file.progress}%</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-medium text-emerald-600">Ready for query</span>
                    </div>
                  )}
                </motion.div>
              ))}
              
              {files.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                  <BookOpen className="w-8 h-8 mb-2" />
                  <p className="text-xs italic">No documents uploaded yet</p>
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Files are stored temporarily for this session. <Link href="/signup" className="text-primary hover:underline">Create an account</Link> for permanent storage.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content - Chat */}
        <main className="flex-1 flex flex-col bg-background relative min-w-0">
          {/* Mobile Upload Drawer Toggle (if needed) */}
          <div className="lg:hidden p-4 border-b bg-muted/10 flex items-center justify-between">
             <div className="text-xs font-medium flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-primary" />
                {files.length} Document(s) active
             </div>
             <Button variant="outline" size="sm" className="h-7 text-[10px] px-2" onClick={() => toast.info("Use desktop for full upload management")}>
               Manage Files
             </Button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-8">
              {messages.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center">
                    <Bot className="w-10 h-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-heading font-bold tracking-tight">RAG Playground</h2>
                    <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Experience high-accuracy AI. Upload a document on the left and ask a question to see the RAG process in action.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                    {[
                      "Summarize the key points",
                      "What are the risks mentioned?",
                      "List all performance targets",
                      "Extract specific dates"
                    ].map((suggestion) => (
                      <button 
                        key={suggestion}
                        onClick={() => setInputValue(suggestion)}
                        className="p-3 text-left text-sm rounded-xl border bg-card hover:border-primary/50 hover:shadow-sm transition-all flex items-center justify-between group"
                      >
                        {suggestion}
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((msg) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={cn("flex gap-4 md:gap-6", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  <div className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 mt-1",
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted border text-foreground"
                  )}>
                    {msg.role === "user" ? <User className="w-5 h-5 md:w-6 md:h-6" /> : <Bot className="w-5 h-5 md:w-6 md:h-6" />}
                  </div>
                  <div className={cn("flex flex-col gap-3 max-w-[85%] md:max-w-[75%]", msg.role === "user" ? "items-end" : "items-start")}>
                    <div className={cn(
                      "px-5 py-4 rounded-3xl text-sm md:text-base leading-relaxed shadow-sm",
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-card border rounded-tl-sm text-foreground"
                    )}>
                      {msg.content}
                    </div>

                    {msg.role === "ai" && msg.sources && msg.sources.length > 0 && (
                      <div className="w-full">
                        <div className="flex items-center gap-2 mb-2 px-1">
                           <div className="h-px bg-muted flex-1" />
                           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Sources</span>
                           <div className="h-px bg-muted flex-1" />
                        </div>
                        <div className="grid gap-2">
                          {msg.sources.map((source) => (
                            <div key={source.id} className="text-xs bg-muted/30 p-3 rounded-xl border border-muted-foreground/10 text-muted-foreground group hover:bg-muted/50 transition-colors">
                              <div className="flex items-center gap-2 font-semibold text-foreground mb-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-primary" /> 
                                <span className="truncate">{source.documentName}</span>
                              </div>
                              <p className="italic line-clamp-2 leading-relaxed">"{source.text}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isAiTyping && (
                <div className="flex gap-4 md:gap-6 flex-row">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted border flex items-center justify-center shrink-0 mt-1">
                    <Loader2 className="w-5 h-5 md:w-6 md:h-6 text-primary animate-spin" />
                  </div>
                  <div className="bg-card border rounded-3xl rounded-tl-sm px-6 py-4 flex gap-1 items-center shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Panel */}
          <div className="p-4 md:p-8 bg-background/80 backdrop-blur-sm border-t shrink-0">
            <form onSubmit={handleSend} className="max-w-3xl mx-auto flex items-end gap-3 relative">
              <div className="flex-1 relative">
                <textarea 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  placeholder={files.length > 0 ? "Ask a question about your documents..." : "Upload a document first..."} 
                  className="w-full min-h-[56px] max-h-32 px-5 py-4 rounded-3xl shadow-sm border-muted-foreground/20 focus:ring-1 focus:ring-primary focus:border-primary bg-card transition-all outline-none text-sm md:text-base resize-none overflow-y-auto"
                  rows={1}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!inputValue.trim() || isAiTyping || (files.length === 0 && messages.length === 0)}
                  className="absolute right-2.5 bottom-2.5 rounded-full h-9 w-9 bg-primary shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
            <p className="text-[10px] text-center text-muted-foreground mt-4 font-medium uppercase tracking-widest opacity-60">
              Experimental RAG Interface • Trial Version 1.0
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
