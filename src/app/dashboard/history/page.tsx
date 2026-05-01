"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, MessageSquare, ArrowRight, History as HistoryIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface ConversationHistory {
  id: string;
  title: string;
  messageCount: number;
  lastActive: string;
}

const mockHistory: ConversationHistory[] = [
  { id: "1", title: "Q3 Earnings Analysis", messageCount: 14, lastActive: "Just now" },
  { id: "2", title: "Employee Policy Updates", messageCount: 3, lastActive: "2 hours ago" },
  { id: "3", title: "Legal Liability Clauses in Contract A", messageCount: 22, lastActive: "Yesterday" },
  { id: "4", title: "Competitor Analysis 2026", messageCount: 8, lastActive: "May 1, 2026" },
];

export default function HistoryPage() {
  const [history, setHistory] = useState<ConversationHistory[]>(mockHistory);
  const [convToDelete, setConvToDelete] = useState<ConversationHistory | null>(null);

  const handleDelete = () => {
    if (convToDelete) {
      setHistory(h => h.filter(c => c.id !== convToDelete.id));
      toast.success("Conversation deleted", { description: "The conversation history has been permanently removed." });
      setConvToDelete(null);
    }
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] md:h-screen p-6 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <HistoryIcon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-heading font-bold mb-2">No Conversation History</h2>
        <p className="text-muted-foreground max-w-sm mb-6">Start a new chat to begin building your query history.</p>
        <Link href="/dashboard/chat">
          <Button size="lg">Start New Chat</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Conversation History</h1>
        <p className="text-muted-foreground">Review, resume, or manage your past interactions with the AI.</p>
      </div>

      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[350px]">Conversation Title</TableHead>
                <TableHead className="text-center">Messages</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((conv) => (
                <TableRow key={conv.id} className="group">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                         <MessageSquare className="w-4 h-4 text-primary" />
                      </div>
                      <span className="truncate max-w-[280px]" title={conv.title}>{conv.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                     <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-muted text-xs font-medium">
                       {conv.messageCount}
                     </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{conv.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Link href="/dashboard/chat" className="hidden group-hover:flex">
                         <Button variant="ghost" size="sm">
                           Resume <ArrowRight className="w-4 h-4 ml-2" />
                         </Button>
                       </Link>
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="text-muted-foreground hover:text-destructive"
                         onClick={() => setConvToDelete(conv)}
                       >
                         <Trash2 className="w-4 h-4" />
                       </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation */}
      <Dialog open={!!convToDelete} onOpenChange={(open) => !open && setConvToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Conversation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the conversation <span className="font-medium text-foreground">"{convToDelete?.title}"</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setConvToDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete Permanently</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
