"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Layers } from "lucide-react";
import { useWishlistStore } from "@/lib/store";
import { CATEGORIES } from "@/data/categories";
import { INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";
import { formatUSD, formatINR } from "@/lib/format";
import { ASSET_CACHE_KEY } from "./ItemVisual";

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
              The Equipment Registry
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
          src={`/images/categories/${category.id}.webp?${ASSET_CACHE_KEY}`}
          alt={category.name}
          fill
          unoptimized
          priority
          sizes="1280px"
          className="object-cover object-center opacity-65 scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        {/* Banner Content inside Cover */}
        <div className="absolute inset-0 p-3.5 sm:p-8 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md border border-white/20 text-white">
              <Layers className="w-3.5 h-3.5" />
              <span>Category Blueprint</span>
            </span>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors text-xs flex items-center gap-1"
            >
              <span>{isExpanded ? "Collapse" : "Expand"}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-4xl font-normal text-white drop-shadow-sm tracking-tight">
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
        <div className="flex flex-col bg-white border-t border-[#E8E8E4]">
          <div className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-xs">
            <p className="text-[#57574F] max-w-2xl leading-relaxed">
              {category.description}
            </p>

            <div className="flex items-center gap-4 shrink-0 sm:border-l sm:border-[#E8E8E4] sm:pl-6 pt-2 sm:pt-0 border-t border-stone-100 sm:border-t-0">
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

          {/* Contextual Architecture Notices */}
          {category.id === "gaming-pc" && (
            <div className="mx-3 sm:mx-5 mb-3.5 sm:mb-5 p-3 sm:p-4 rounded-xl bg-[#F7F7F5] border border-[#E8E8E4] text-xs">
              <div className="flex items-center gap-2 font-semibold text-[#111110] mb-1">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Flagship Workstation Components &amp; Alternative Builds</span>
              </div>
              <p className="text-[#57574F] leading-relaxed">
                The 9 items listed below represent the discrete hardware components of the <strong>Flagship Performance Build ($2,100 &ndash; $2,800)</strong>, centered on the Ryzen 7 9800X3D and RTX 5070 Ti for high-refresh 1440p gaming and creative workflows. Value-focused alternative components ($1,300 &ndash; $1,700) are detailed within each component&apos;s alternatives tab.
              </p>
            </div>
          )}

          {category.id === "bike" && (
            <div className="mx-3 sm:mx-5 mb-3.5 sm:mb-5 p-3 sm:p-4 rounded-xl bg-[#F7F7F5] border border-[#E8E8E4] text-xs">
              <div className="flex items-center gap-2 font-semibold text-[#111110] mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Selecting Your Machine</span>
              </div>
              <p className="text-[#57574F] leading-relaxed">
                Comparing 4 motorcycle platforms: <strong>Royal Enfield Interceptor 650</strong> (currently selected in plan), <strong>Himalayan 450</strong>, <strong>Triumph Speed 400</strong>, and <strong>KTM 390 Duke</strong>. Adding any motorcycle to your plan automatically replaces the previously selected machine so your overall budget remains accurate without duplication.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
