"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Link as LinkIcon, FileText, BarChart } from "lucide-react";

interface SearchResult {
  id: string;
  documentName: string;
  excerpt: string;
  relevance: number;
}

const mockResults: SearchResult[] = [
  { id: "1", documentName: "Q3_Financial_Report_2026.pdf", excerpt: "The newly introduced SaaS subscription tier saw a 45% year-over-year growth, contributing to $4.2M in recurring revenue. Enterprise consulting services also expanded their margin by 12%.", relevance: 98 },
  { id: "2", documentName: "Q2_Financial_Report_2026.pdf", excerpt: "SaaS revenue growth was steady at 22% quarter-over-quarter. Projections indicate a stronger Q3 due to new pricing tiers being introduced in late August.", relevance: 85 },
  { id: "3", documentName: "Investor_Update_Oct.docx", excerpt: "Our core revenue drivers continue to perform above expectations, specifically in the newly launched recurring subscription models targeting enterprise clients.", relevance: 76 },
];

export default function SemanticSearchPage() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate network request
    setTimeout(() => {
      setResults(mockResults);
      setIsSearching(false);
    }, 800);
  };

  const RelevanceBadge = ({ score }: { score: number }) => {
    let colorClass = "text-emerald-600 bg-emerald-500/10 border-emerald-200";
    if (score < 80) colorClass = "text-amber-600 bg-amber-500/10 border-amber-200";
    if (score < 60) colorClass = "text-muted-foreground bg-muted/50 border-border";

    return (
      <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full border ${colorClass}`}>
        <BarChart className="w-3 h-3 mr-1" /> {score}% Match
      </div>
    );
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto min-h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="mb-8 text-center mt-4">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Semantic Search</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Search across all your ingested documents by meaning and intent, not just keywords. No LLM generation, just exact raw matches.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto w-full mb-12">
        <Input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="E.g., What were the main revenue drivers?" 
          className="pr-24 py-6 text-lg rounded-2xl shadow-sm border-muted-foreground/20 focus-visible:ring-primary/20 bg-card"
        />
        <Button 
          type="submit" 
          disabled={!query.trim() || isSearching}
          className="absolute right-2 top-2 bottom-2 rounded-xl"
        >
          {isSearching ? "Searching..." : <><Search className="w-4 h-4 mr-2" /> Search</>}
        </Button>
      </form>

      <div className="flex-1">
        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center h-48 opacity-50">
             <Search className="w-12 h-12 text-muted-foreground mb-4" />
             <p className="text-muted-foreground">Enter a query to find semantic matches in your documents.</p>
          </div>
        ) : isSearching ? (
          <div className="space-y-4 max-w-3xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-xl border bg-card/50 animate-pulse">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-5 w-1/3 bg-muted rounded"></div>
                  <div className="h-6 w-20 bg-muted rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded"></div>
                  <div className="h-4 w-full bg-muted rounded"></div>
                  <div className="h-4 w-2/3 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="font-medium text-muted-foreground mb-4">Found {results.length} semantic matches</h3>
            {results.map((result) => (
              <div key={result.id} className="p-6 rounded-xl border bg-card hover:border-primary/30 transition-colors shadow-sm">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <div className="flex items-center text-sm font-medium text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10 truncate">
                    <FileText className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">{result.documentName}</span>
                  </div>
                  <RelevanceBadge score={result.relevance} />
                </div>
                <p className="text-foreground leading-relaxed">
                   ...{result.excerpt}...
                </p>
                <div className="mt-4 pt-4 border-t flex justify-end">
                   <Button variant="ghost" size="sm" className="text-muted-foreground">
                     <LinkIcon className="w-4 h-4 mr-2" /> View Document
                   </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-center">
             <Search className="w-10 h-10 text-muted-foreground mb-4 opacity-30" />
             <h3 className="text-lg font-medium mb-1">No results found</h3>
             <p className="text-muted-foreground max-w-sm">We couldn't find any documents matching your semantic query. Try rephrasing.</p>
          </div>
        )}
      </div>
    </div>
  );
}
