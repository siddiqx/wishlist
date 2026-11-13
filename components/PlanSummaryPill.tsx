"use client";

import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import { useWishlistStore, getResolvedItem } from "@/lib/store";
import { INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";
import { formatUSD } from "@/lib/format";

export function PlanSummaryPill() {
  const store = useWishlistStore();

  const planItems = INITIAL_WISHLIST_ITEMS.map((i) =>
    getResolvedItem(i, store)
  ).filter((i) => i.isInPlan && !i.recurring);

  if (planItems.length === 0 || store.isBudgetDrawerOpen) {
    return null;
  }

  const totalMin = planItems.reduce((acc, curr) => acc + curr.priceUSD.min, 0);
  const totalMax = planItems.reduce((acc, curr) => acc + curr.priceUSD.max, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="fixed bottom-6 inset-x-0 mx-auto w-fit z-30 px-4"
    >
      <button
        onClick={() => store.setBudgetDrawerOpen(true)}
        className="group flex items-center gap-3 px-5 py-3 rounded-full bg-[#111110] text-white shadow-[0_12px_24px_-6px_rgba(17,17,16,0.3)] hover:shadow-[0_16px_32px_-8px_rgba(17,17,16,0.4)] hover:scale-102 active:scale-97 transition-all duration-150 border border-white/10"
      >
        <div className="w-6 h-6 rounded-full bg-[#4F46E5] flex items-center justify-center shrink-0">
          <Calculator className="w-3.5 h-3.5 text-white" />
        </div>

        <div className="text-xs font-medium flex items-center gap-2">
          <span className="font-semibold text-white">
            {planItems.length} {planItems.length === 1 ? "item" : "items"} in plan
          </span>
          <span className="text-stone-400">&middot;</span>
          <span className="font-mono font-semibold text-stone-200 tabular-nums">
            {formatUSD(totalMin)} &ndash; {formatUSD(totalMax)}
          </span>
        </div>

        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
          <ArrowRight className="w-3 h-3 text-white" />
        </div>
      </button>
    </motion.div>
  );
}
