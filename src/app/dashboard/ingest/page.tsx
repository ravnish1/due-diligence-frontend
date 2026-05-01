"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { UploadCloud, Link as LinkIcon, FileType, X, CheckCircle2 } from "lucide-react";

export default function IngestPage() {
  const [activeTab, setActiveTab] = useState("file");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // File state
  const [files, setFiles] = useState<File[]>([]);
  
  // URL state
  const [url, setUrl] = useState("");
  const [urlLabel, setUrlLabel] = useState("");
  
  // Text state
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setProgress(0);
    
    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 200));
      setProgress(i);
    }
    
    toast.success("Ingestion complete", {
      description: "Documents are now processing and will be ready for querying shortly."
    });
    
    setIsUploading(false);
    setProgress(0);
    setFiles([]);
    setUrl("");
    setUrlLabel("");
    setTitle("");
    setText("");
  };

  const handleIngest = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "file" && files.length === 0) {
      toast.error("Please add at least one file");
      return;
    }
    simulateUpload();
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Ingest Data</h1>
        <p className="text-muted-foreground">Upload documents, crawl URLs, or paste raw text to add to your knowledge base.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-muted/50 p-1">
          <TabsTrigger value="file" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all h-full">
            <UploadCloud className="w-4 h-4 mr-2" /> File Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all h-full">
            <LinkIcon className="w-4 h-4 mr-2" /> URL Crawl
          </TabsTrigger>
          <TabsTrigger value="text" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all h-full">
            <FileType className="w-4 h-4 mr-2" /> Raw Text
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleIngest} className="bg-card border rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "file" && (
              <motion.div
                key="file"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                <div 
                  {...getRootProps()} 
                  className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-10 transition-colors cursor-pointer ${
                    isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:bg-muted/50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <UploadCloud className={`w-12 h-12 mb-4 ${isDragActive ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="text-lg font-medium mb-1">Drag & drop files here</p>
                  <p className="text-sm text-muted-foreground">or click to browse from your computer</p>
                  <p className="text-xs text-muted-foreground mt-4">Supports PDF, DOCX, TXT, MD, CSV (Max 100MB)</p>
                </div>

                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <Label>Selected Files ({files.length})</Label>
                    <div className="max-h-[150px] overflow-y-auto space-y-2 pr-2">
                      {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between bg-muted/40 p-3 rounded-lg border">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileType className="w-5 h-5 text-primary shrink-0" />
                            <div className="truncate">
                              <p className="text-sm font-medium truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={(e) => { e.stopPropagation(); removeFile(i); }}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "url" && (
              <motion.div
                key="url"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col gap-6"
              >
                <div className="grid gap-2">
                  <Label htmlFor="url">Target URL</Label>
                  <Input 
                    id="url" 
                    type="url" 
                    placeholder="https://example.com/docs" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required={activeTab === "url"} 
                  />
                  <p className="text-xs text-muted-foreground">We will crawl the page text and indexing it.</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="urlLabel">Document Label (Optional)</Label>
                  <Input 
                    id="urlLabel" 
                    placeholder="E.g., Q3 Earnings Report" 
                    value={urlLabel}
                    onChange={(e) => setUrlLabel(e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {activeTab === "text" && (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col gap-6"
              >
                <div className="grid gap-2">
                  <Label htmlFor="title">Document Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Meeting Notes - Strategy" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required={activeTab === "text"} 
                  />
                </div>
                <div className="grid gap-2 flex-1 flex flex-col">
                  <Label htmlFor="text">Raw Text Content</Label>
                  <textarea 
                    id="text" 
                    placeholder="Paste your text here..." 
                    className="flex-1 min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required={activeTab === "text"}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t flex flex-col gap-4">
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading & Processing...</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full sm:w-auto sm:self-end"
              disabled={isUploading || (activeTab === 'file' && files.length === 0)}
            >
              {isUploading ? "Ingesting..." : "Start Ingestion"}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}
