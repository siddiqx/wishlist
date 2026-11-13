"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/categories";
import { INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";
import { useWishlistStore } from "@/lib/store";

export function CategoryTabs() {
  const store = useWishlistStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Compute item counts per category
  const counts: Record<string, number> = {
    all: INITIAL_WISHLIST_ITEMS.length,
  };

  for (const cat of CATEGORIES) {
    counts[cat.id] = INITIAL_WISHLIST_ITEMS.filter((i) => i.category === cat.id).length;
  }

  // Scroll active tab into view horizontally if needed
  useEffect(() => {
    const activeEl = scrollContainerRef.current?.querySelector(`[data-active="true"]`);
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [store.activeCategory]);

  return (
    <div className="sticky top-16 z-20 bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#E8E8E4] py-2.5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 overscroll-x-contain"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {/* "All Items" tab */}
          <button
            onClick={() => store.setActiveCategory("all")}
            data-active={store.activeCategory === "all"}
            className={`relative shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors select-none ${
              store.activeCategory === "all"
                ? "text-[#111110] font-semibold"
                : "text-[#57574F] hover:text-[#111110] hover:bg-stone-200/50"
            }`}
          >
            {store.activeCategory === "all" && (
              <motion.div
                layoutId="activeCategoryPill"
                className="absolute inset-0 bg-white rounded-full border border-[#E8E8E4] shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>All Items</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                  store.activeCategory === "all"
                    ? "bg-[#111110] text-white"
                    : "bg-[#E8E8E4] text-[#57574F]"
                }`}
              >
                {counts.all}
              </span>
            </span>
          </button>

          {/* 12 Category tabs */}
          {CATEGORIES.map((cat) => {
            const isActive = store.activeCategory === cat.id;
            const count = counts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => store.setActiveCategory(cat.id)}
                data-active={isActive}
                className={`relative shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors select-none ${
                  isActive
                    ? "text-[#111110] font-semibold"
                    : "text-[#57574F] hover:text-[#111110] hover:bg-stone-200/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-white rounded-full border border-[#E8E8E4] shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                  <span>{cat.shortName}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                      isActive
                        ? "bg-[#111110] text-white"
                        : "bg-[#E8E8E4] text-[#57574F]"
                    }`}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
