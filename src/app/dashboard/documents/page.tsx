"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MoreHorizontal, FileText, Trash2, Eye, File, Link as LinkIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";

type DocumentStatus = "Ready" | "Processing" | "Failed";

interface Document {
  id: string;
  name: string;
  type: "PDF" | "DOCX" | "URL" | "TXT";
  status: DocumentStatus;
  chunkCount: number;
  dateAdded: string;
  metadata: Record<string, string>;
}

const mockDocuments: Document[] = [
  { id: "1", name: "Q3_Financial_Report_2026.pdf", type: "PDF", status: "Ready", chunkCount: 142, dateAdded: "2026-05-01", metadata: { "Author": "Finance Dept", "Category": "Financials" } },
  { id: "2", name: "Employee_Handbook_v2.docx", type: "DOCX", status: "Ready", chunkCount: 89, dateAdded: "2026-04-28", metadata: { "Department": "HR", "Version": "2.0" } },
  { id: "3", name: "LaunchLive API Docs", type: "URL", status: "Processing", chunkCount: 0, dateAdded: "2026-05-01", metadata: { "Source": "https://docs.launchlive.ai" } },
  { id: "4", name: "Legacy_System_Architecture.txt", type: "TXT", status: "Failed", chunkCount: 0, dateAdded: "2026-04-15", metadata: { "Error": "Encoding not supported" } },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [docToDelete, setDocToDelete] = useState<Document | null>(null);

  const handleDelete = () => {
    if (docToDelete) {
      setDocuments(docs => docs.filter(d => d.id !== docToDelete.id));
      toast.success("Document deleted", { description: `${docToDelete.name} has been removed from the library.` });
      setDocToDelete(null);
    }
  };

  const StatusBadge = ({ status }: { status: DocumentStatus }) => {
    switch (status) {
      case "Ready": return <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Ready</Badge>;
      case "Processing": return <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-200">Processing</Badge>;
      case "Failed": return <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 border-rose-200">Failed</Badge>;
    }
  };

  const TypeIcon = ({ type }: { type: Document["type"] }) => {
    switch (type) {
      case "PDF": return <FileText className="h-4 w-4 text-rose-500" />;
      case "DOCX": return <File className="h-4 w-4 text-blue-500" />;
      case "URL": return <LinkIcon className="h-4 w-4 text-emerald-500" />;
      case "TXT": return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] md:h-screen p-6 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <FileText className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-heading font-bold mb-2">No Documents Yet</h2>
        <p className="text-muted-foreground max-w-sm mb-6">Upload your first document to start building your knowledge base and querying your data.</p>
        <Link href="/dashboard/ingest">
          <Button size="lg">Ingest Document</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Document Library</h1>
          <p className="text-muted-foreground">Manage and monitor all ingested documents in your knowledge base.</p>
        </div>
        <Link href="/dashboard/ingest">
          <Button>Add Document</Button>
        </Link>
      </div>

      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[300px]">Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Chunks</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <TypeIcon type={doc.type} />
                      <span className="truncate max-w-[250px]" title={doc.name}>{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell><StatusBadge status={doc.status} /></TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">{doc.chunkCount}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.dateAdded}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedDoc(doc)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDocToDelete(doc)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Document
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Detail Drawer */}
      <Sheet open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="font-heading">Document Details</SheetTitle>
            <SheetDescription>
              Detailed information and metadata for the selected document.
            </SheetDescription>
          </SheetHeader>
          {selectedDoc && (
            <div className="space-y-6">
              <div className="p-4 bg-muted/40 rounded-lg border flex items-center gap-4">
                <div className="h-12 w-12 rounded bg-background border flex items-center justify-center shrink-0">
                   <TypeIcon type={selectedDoc.type} />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-medium truncate" title={selectedDoc.name}>{selectedDoc.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedDoc.type} • Added {selectedDoc.dateAdded}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-card">
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <StatusBadge status={selectedDoc.status} />
                </div>
                <div className="p-4 border rounded-lg bg-card">
                  <p className="text-sm text-muted-foreground mb-1">Total Chunks</p>
                  <p className="font-mono text-lg font-semibold">{selectedDoc.chunkCount}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Extracted Metadata</h4>
                {Object.keys(selectedDoc.metadata).length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableBody>
                        {Object.entries(selectedDoc.metadata).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium text-muted-foreground bg-muted/30 w-1/3">{key}</TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic border rounded-lg p-4 bg-muted/20">No metadata found for this document.</p>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <Dialog open={!!docToDelete} onOpenChange={(open) => !open && setDocToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-medium text-foreground">{docToDelete?.name}</span>? This action cannot be undone and the document will be removed from the vector index.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDocToDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete Document</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
