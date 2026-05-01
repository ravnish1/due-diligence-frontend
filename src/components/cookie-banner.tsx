"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it pops up after initial load
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pointer-events-none flex justify-center"
        >
          <div className="bg-card border shadow-2xl rounded-2xl p-5 sm:p-6 max-w-4xl w-full pointer-events-auto flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 flex gap-4 items-start">
              <div className="mt-1 bg-primary/10 p-2.5 rounded-full shrink-0 hidden sm:block">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This website uses its own and third-party cookies necessary for its operation and to analyze your browsing habits. For more information, please access our <a href="#" className="underline hover:text-primary transition-colors">Cookie Policy</a>. To accept all cookies click Accept All. To reject all click on Reject All.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <Button variant="outline" className="flex-1 md:flex-none rounded-full px-6" onClick={handleReject}>
                Reject All
              </Button>
              <Button className="flex-1 md:flex-none rounded-full px-6" onClick={handleAccept}>
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
