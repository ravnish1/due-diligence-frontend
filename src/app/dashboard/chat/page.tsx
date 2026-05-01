"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Send, Bot, User, Trash2, PlusCircle, MessageSquare, Menu, BookOpen, Link as LinkIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

const mockHistory: Conversation[] = [
  {
    id: "1",
    title: "Q3 Earnings Analysis",
    messages: [
      { id: "m1", role: "user", content: "What were the main revenue drivers in Q3?" },
      { 
        id: "m2", 
        role: "ai", 
        content: "Based on the Q3 Financial Report, the main revenue drivers were the new SaaS subscription tier (up 45% YoY) and enterprise consulting services.", 
        sources: [
          { id: "s1", documentName: "Q3_Financial_Report_2026.pdf", text: "The newly introduced SaaS subscription tier saw a 45% year-over-year growth, contributing to $4.2M in recurring revenue. Enterprise consulting services also expanded..." }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Employee Policy Updates",
    messages: [
      { id: "m3", role: "user", content: "What is the updated remote work policy?" },
      { id: "m4", role: "ai", content: "Employees are now allowed to work remotely 3 days a week, subject to manager approval.", sources: [] }
    ]
  }
];

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockHistory);
  const [activeId, setActiveId] = useState<string>(mockHistory[0].id);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const activeConversation = conversations.find(c => c.id === activeId);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [activeConversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue
    };

    const updatedConversations = conversations.map(c => {
      if (c.id === activeId) {
        return { ...c, messages: [...c.messages, newMessage] };
      }
      return c;
    });

    setConversations(updatedConversations);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "This is a simulated response from the RAG system based on your query.",
        sources: [
          { id: "sim1", documentName: "Example_Doc.pdf", text: "This is a simulated extracted chunk that the AI used to formulate its answer." }
        ]
      };
      setConversations(prev => prev.map(c => {
        if (c.id === activeId) {
          return { ...c, messages: [...c.messages, aiResponse] };
        }
        return c;
      }));
    }, 1000);
  };

  const handleNewChat = () => {
    const newChat: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: []
    };
    setConversations([newChat, ...conversations]);
    setActiveId(newChat.id);
  };

  const handleClear = () => {
    setConversations(prev => prev.map(c => {
      if (c.id === activeId) return { ...c, messages: [] };
      return c;
    }));
  };

  const ChatSidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button onClick={handleNewChat} className="w-full justify-start font-medium" variant="default">
          <PlusCircle className="mr-2 h-4 w-4" /> New Chat
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-2 px-2">History</h3>
        {conversations.map(conv => (
          <Button
            key={conv.id}
            variant={activeId === conv.id ? "secondary" : "ghost"}
            className="w-full justify-start truncate font-normal"
            onClick={() => setActiveId(conv.id)}
          >
            <MessageSquare className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{conv.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-3.5rem)] md:h-screen w-full bg-background relative">
      {/* Inner Sidebar for History (Desktop) */}
      <div className="hidden lg:flex w-72 flex-col border-r bg-muted/20">
        <ChatSidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <header className="h-14 border-b flex items-center justify-between px-4 lg:px-6 bg-background/95 backdrop-blur z-10 shrink-0">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden shrink-0" />}>
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <ChatSidebar />
              </SheetContent>
            </Sheet>
            <h2 className="font-heading font-semibold truncate">{activeConversation?.title || "Chat"}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClear} className="text-muted-foreground hover:text-destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Chat
          </Button>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {activeConversation?.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto opacity-50">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">How can I help you today?</h3>
              <p className="text-muted-foreground">Ask me anything about your ingested documents. I'll provide answers with exact source citations.</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8 pb-4">
              {activeConversation?.messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-4", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted border text-foreground"
                  )}>
                    {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={cn("flex flex-col gap-2 max-w-[85%]", msg.role === "user" ? "items-end" : "items-start")}>
                    <div className={cn(
                      "px-4 py-3 rounded-2xl",
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-muted/50 border rounded-tl-sm text-foreground"
                    )}>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>

                    {/* Sources Panel */}
                    {msg.role === "ai" && msg.sources && msg.sources.length > 0 && (
                      <div className="w-full mt-1">
                        <Accordion className="w-full bg-card border rounded-lg overflow-hidden shadow-sm">
                          <AccordionItem value="sources" className="border-none">
                            <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              <div className="flex items-center">
                                <BookOpen className="w-3 h-3 mr-2" /> 
                                {msg.sources.length} Source{msg.sources.length !== 1 ? 's' : ''}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-1 space-y-3 bg-muted/10">
                              {msg.sources.map((source, idx) => (
                                <div key={source.id} className="text-sm bg-background p-3 rounded border text-muted-foreground relative">
                                  <div className="flex items-center gap-2 font-medium text-foreground mb-1">
                                    <LinkIcon className="w-3 h-3" /> {source.documentName}
                                  </div>
                                  <p className="line-clamp-3 hover:line-clamp-none transition-all cursor-pointer">"{source.text}"</p>
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 lg:p-6 bg-background border-t">
          <form onSubmit={handleSend} className="max-w-3xl mx-auto relative flex items-center">
            <Input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question about your documents..." 
              className="pr-12 py-6 rounded-2xl shadow-sm border-muted-foreground/20 focus-visible:ring-primary/20 bg-muted/30"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!inputValue.trim()}
              className="absolute right-2 rounded-xl h-10 w-10 transition-transform active:scale-95 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="text-center mt-3">
             <p className="text-xs text-muted-foreground">AI can make mistakes. Always verify important information from the sources.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
