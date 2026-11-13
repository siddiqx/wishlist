"use client";

import { useWishlistStore } from "@/lib/store";
import { Settings2, Calculator, ArrowUp } from "lucide-react";

export function Footer() {
  const store = useWishlistStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto border-t border-[#E8E8E4] bg-white py-12 text-xs text-[#57574F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[#F1F1EE]">
          {/* Left Wordmark & Purpose */}
          <div className="max-w-md space-y-2">
            <div className="font-display text-2xl font-normal text-[#111110]">
              The Blueprint
            </div>
            <p className="text-[#57574F] leading-relaxed text-xs">
              Siddiq&apos;s personal equipment registry and long-term acquisition roadmap. Figures reflect verified USD specifications and dynamic ₹ INR conversions.
              Retail availability and pricing subject to market updates.
            </p>
          </div>

          {/* Right Navigation & Shortcuts */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#57574F]">
            <button
              onClick={() => store.setBudgetDrawerOpen(true)}
              className="hover:text-[#111110] transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>Budget Planner</span>
            </button>

            <button
              onClick={() => store.setBackupModalOpen(true)}
              className="hover:text-[#111110] transition-colors flex items-center gap-1.5"
            >
              <Settings2 className="w-3.5 h-3.5 text-[#57574F]" />
              <span>Export &amp; Preferences</span>
            </button>

            <button
              onClick={scrollToTop}
              className="hover:text-[#111110] transition-colors flex items-center gap-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-[#8A8A80]">
          <div>
            Curated personal catalogue &middot; Updated for 2026 &middot; Private Edition
          </div>
          <div className="flex items-center gap-3">
            <span>The Blueprint</span>
            <span>&middot;</span>
            <span>All Specifications Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
