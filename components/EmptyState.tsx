"use client";

import { PackageSearch, RotateCcw } from "lucide-react";
import { useWishlistStore } from "@/lib/store";

export function EmptyState() {
  const store = useWishlistStore();

  const handleReset = () => {
    store.setSearchQuery("");
    store.setStatusFilter("all");
    store.setPriorityFilter("all");
    store.setWhenFilter("all");
    store.setPinnedOnly(false);
    store.setActiveCategory("all");
  };

  return (
    <div className="py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-3xl bg-stone-100 border border-stone-200/80 flex items-center justify-center text-stone-400 mx-auto mb-4 shadow-sm">
        <PackageSearch className="w-8 h-8" />
      </div>
      <h3 className="text-base font-semibold text-stone-900 mb-1">
        No Matching Items Found
      </h3>
      <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mb-6 leading-relaxed">
        {store.searchQuery
          ? `We couldn't find anything matching "${store.searchQuery}". Try searching for brands like Dell, Alienware, Royal Enfield, or Raymond.`
          : "No items match your active filters. Try broadening your criteria."}
      </p>
      <button
        onClick={handleReset}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors shadow-sm"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters &amp; View All</span>
      </button>
    </div>
  );
}
