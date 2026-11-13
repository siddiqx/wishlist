"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Layers } from "lucide-react";
import { useWishlistStore } from "@/lib/store";
import { CATEGORIES } from "@/data/categories";
import { INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";
import { formatUSD, formatINR } from "@/lib/format";

export function CategoryHeader() {
  const store = useWishlistStore();
  const rate = store.inrRate || 88;
  const [isExpanded, setIsExpanded] = useState(true);

  if (store.activeCategory === "all") {
    return (
      <div className="py-4 border-b border-[#E8E8E4] mb-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-medium text-[#111110]">
              Curated Needs Catalogue
            </h2>
            <p className="text-xs sm:text-sm text-[#57574F] mt-0.5">
              Browse all items or filter by category, timeline, priority, and status.
            </p>
          </div>
          <div className="text-xs text-[#8A8A80] font-mono">
            {INITIAL_WISHLIST_ITEMS.length} items &middot; All categories
          </div>
        </div>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.id === store.activeCategory);
  if (!category) return null;

  const categoryItems = INITIAL_WISHLIST_ITEMS.filter((i) => i.category === category.id);
  const minCost = category.estimatedUSD.min;
  const maxCost = category.estimatedUSD.max;

  return (
    <div className="mb-8 rounded-2xl overflow-hidden border border-[#E8E8E4] bg-white shadow-xs">
      {/* Banner Cover with Image & Soft Overlay */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-stone-900">
        <Image
          src={`/images/categories/${category.id}.webp`}
          alt={category.name}
          fill
          priority
          sizes="1280px"
          className="object-cover object-center opacity-65 scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        {/* Banner Content inside Cover */}
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md border border-white/20 text-white">
              <Layers className="w-3.5 h-3.5" />
              <span>Category Blueprint</span>
            </span>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors text-xs flex items-center gap-1"
            >
              <span>{isExpanded ? "Collapse" : "Expand"}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-white drop-shadow-sm tracking-tight">
              {category.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-2xl drop-shadow line-clamp-1">
              {category.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Expandable Meta Strip */}
      {isExpanded && (
        <div className="p-5 bg-white border-t border-[#E8E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <p className="text-[#57574F] max-w-2xl leading-relaxed">
            {category.description}
          </p>

          <div className="flex items-center gap-4 shrink-0 sm:border-l sm:border-[#E8E8E4] sm:pl-6">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A80]">
                Items
              </div>
              <div className="text-base font-bold text-[#111110] font-mono mt-0.5">
                {categoryItems.length}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A80]">
                Estimated Subtotal
              </div>
              <div className="text-base font-bold text-[#111110] font-mono mt-0.5">
                {formatUSD(minCost)} &ndash; {formatUSD(maxCost)}
              </div>
              <div className="text-[10px] text-[#8A8A80] font-mono">
                {formatINR(minCost, rate)} &ndash; {formatINR(maxCost, rate)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
