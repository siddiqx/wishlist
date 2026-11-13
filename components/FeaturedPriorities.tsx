"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useWishlistStore, getResolvedItem } from "@/lib/store";
import { INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";
import { formatPriceRange } from "@/lib/format";
import { ItemVisual } from "./ItemVisual";

export function FeaturedPriorities() {
  const store = useWishlistStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const rate = store.inrRate || 88;

  // Filter top priority items that are for "now"
  const topItems = INITIAL_WISHLIST_ITEMS.filter(
    (item) => item.priority === "high" && item.when === "now"
  )
    .slice(0, 8)
    .map((item) => getResolvedItem(item, store));

  if (topItems.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-10 pb-4 border-b border-[#E8E8E4]">
      {/* Header with Navigation Arrows */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center shrink-0">
            <Star className="w-3.5 h-3.5 fill-[#4F46E5]" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm text-[#111110]">Top Priorities</h3>
            <p className="text-xs text-[#8A8A80] truncate">High-impact essentials for immediate acquisition</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-lg border border-[#E8E8E4] bg-white text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-lg border border-[#E8E8E4] bg-white text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scroll-Snap Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {topItems.map((item) => {
          const price = formatPriceRange(item.priceUSD.min, item.priceUSD.max, rate);

          return (
            <div
              key={item.id}
              onClick={() => store.openDetail(item.id)}
              className="snap-start shrink-0 w-72 sm:w-80 group cursor-pointer bg-white rounded-2xl border border-[#E8E8E4] p-3 shadow-[0_2px_8px_-2px_rgba(17,17,16,0.05)] hover:shadow-[0_12px_24px_-6px_rgba(17,17,16,0.08)] hover:-translate-y-1 transition-all duration-250 flex flex-col justify-between"
            >
              <div>
                {/* 16:10 or 4:3 Image */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 bg-[#F1F1EE]">
                  <ItemVisual item={item} aspectRatio="16/10" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-[#111110] border border-black/5 shadow-xs">
                    {item.brand || item.category}
                  </div>
                </div>

                <h4 className="font-semibold text-sm text-[#111110] group-hover:text-[#4F46E5] transition-colors line-clamp-1 mb-1">
                  {item.name}
                </h4>
                <p className="text-xs text-[#57574F] line-clamp-2 leading-relaxed mb-3">
                  {item.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F1F1EE] flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#111110] tabular-nums">
                  {price.usdCompact}
                </span>
                <span className="text-[11px] font-semibold text-[#4F46E5] group-hover:underline">
                  View specs &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
