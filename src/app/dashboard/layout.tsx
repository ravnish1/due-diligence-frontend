"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UploadCloud, FileText, MessageSquare, Search, History, Menu, LogOut, PanelLeftClose, PanelLeftOpen, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Ingest", href: "/dashboard/ingest", icon: UploadCloud },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Semantic Search", href: "/dashboard/search", icon: Search },
  { name: "History", href: "/dashboard/history", icon: History },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              isCollapsed && "justify-center px-0"
            )}
            title={isCollapsed ? item.name : undefined}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-muted/20">
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}>
        <div className="flex h-14 items-center justify-between border-b px-4">
          {!isCollapsed && (
            <div className="flex items-center gap-2 font-heading font-semibold">
               <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs">LL</div>
               LaunchLive
            </div>
          )}
          {isCollapsed && (
             <div className="w-6 h-6 rounded bg-primary mx-auto flex items-center justify-center text-primary-foreground font-heading font-bold text-xs">LL</div>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavLinks />
        </div>
        <div className="border-t p-4">
          <Button render={<Link href="/" />} variant="ghost" className={cn("w-full justify-start text-muted-foreground", isCollapsed && "justify-center px-0")}>
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="ml-3">Back to Website</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" className="shrink-0" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 flex flex-col">
              <div className="flex items-center gap-2 font-heading font-semibold mb-6">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs">LL</div>
                LaunchLive
              </div>
              <nav className="grid gap-2 text-lg font-medium">
                <NavLinks />
              </nav>
              <div className="mt-auto">
                <Button render={<Link href="/" />} variant="ghost" className="w-full justify-start text-muted-foreground">
                  <LogOut className="h-5 w-5 shrink-0" />
                  <span className="ml-3">Back to Website</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="font-heading font-semibold">LaunchLive RAG</div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background/50">
          {children}
        </main>
      </div>
    </div>
  );
}
