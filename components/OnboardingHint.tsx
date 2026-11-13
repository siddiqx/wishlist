"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Eye, Calculator } from "lucide-react";

export function OnboardingHint() {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const dismissed = localStorage.getItem("siddiq_tour_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem("siddiq_tour_dismissed", "true");
  };

  if (!isVisible) return null;

  const STEPS = [
    {
      icon: Search,
      title: "Instant Search & Command Palette",
      desc: "Press / anytime to search specs, brands, and notes, or ⌘K to open the command palette.",
    },
    {
      icon: Eye,
      title: "Interactive Detail Drawer",
      desc: "Click any item to view component pricing, checklists, alternatives, and add personal notes.",
    },
    {
      icon: Calculator,
      title: "Budget & Currency Planner",
      desc: "Toggle items into your budget plan to calculate running totals in USD and INR at editable rates.",
    },
  ];

  const CurrentIcon = STEPS[step].icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-24 right-6 z-40 max-w-sm w-full bg-white rounded-2xl border border-[#E8E8E4] p-5 shadow-[0_12px_24px_-6px_rgba(17,17,16,0.15)] space-y-3"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center shrink-0">
            <CurrentIcon className="w-4 h-4" />
          </div>
          <button
            onClick={dismiss}
            className="p-1 rounded-lg text-[#8A8A80] hover:text-[#111110] hover:bg-[#F1F1EE] transition-colors"
            aria-label="Dismiss tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#111110]">{STEPS[step].title}</h4>
          <p className="text-xs text-[#57574F] mt-1 leading-relaxed">{STEPS[step].desc}</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#F1F1EE]">
          <div className="flex items-center gap-1">
            {STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  step === idx ? "bg-[#4F46E5]" : "bg-[#E8E8E4]"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-3 py-1 rounded-lg bg-[#111110] text-white text-xs font-medium hover:bg-stone-800 transition-colors"
              >
                Next &rarr;
              </button>
            ) : (
              <button
                onClick={dismiss}
                className="px-3 py-1 rounded-lg bg-[#4F46E5] text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
              >
                Got it
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
