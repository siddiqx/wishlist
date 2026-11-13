"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useWishlistStore, getResolvedItem } from "@/lib/store";
import { INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";
import { formatUSD, formatPriceRange } from "@/lib/format";
import { ItemVisual } from "./ItemVisual";

const COLUMNS: {
  id: "wishlist" | "planned" | "saving" | "bought";
  title: string;
  description: string;
  badgeBg: string;
}[] = [
  {
    id: "wishlist",
    title: "Wishlist",
    description: "Curated aspirations & researched gear",
    badgeBg: "bg-[#F1F1EE] text-[#57574F]",
  },
  {
    id: "planned",
    title: "Planned",
    description: "Scheduled for next purchase cycle",
    badgeBg: "bg-[#EEF0FF] text-[#4F46E5]",
  },
  {
    id: "saving",
    title: "Saving",
    description: "Funds currently being allocated",
    badgeBg: "bg-[#FFFBEB] text-[#D97706]",
  },
  {
    id: "bought",
    title: "Bought / Acquired",
    description: "Delivered & verified in setup",
    badgeBg: "bg-[#F0FDF4] text-[#16A34A]",
  },
];

export function Roadmap() {
  const store = useWishlistStore();
  const rate = store.inrRate || 88;
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [mobileActiveColumn, setMobileActiveColumn] = useState<"all" | "wishlist" | "planned" | "saving" | "bought">("all");

  const resolvedItems = INITIAL_WISHLIST_ITEMS.map((item) =>
    getResolvedItem(item, store)
  ).filter((item) => {
    if (store.activeCategory !== "all" && item.category !== store.activeCategory) {
      return false;
    }
    if (store.searchQuery.trim()) {
      const q = store.searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.brand?.toLowerCase().includes(q) ?? false)
      );
    }
    return true;
  });

  const moveStatus = (
    id: string,
    newStatus: "wishlist" | "planned" | "saving" | "bought"
  ) => {
    store.setItemStatus(id, newStatus);
    if (newStatus === "bought") {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleDragStart = (id: string) => {
    setDraggedItemId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    targetColumn: "wishlist" | "planned" | "saving" | "bought"
  ) => {
    if (draggedItemId) {
      moveStatus(draggedItemId, targetColumn);
      setDraggedItemId(null);
    }
  };

  return (
    <div className="py-6 sm:py-8 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Mobile Column Filter Tabs (Visible on screens < md) */}
        <div className="flex md:hidden items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 pt-1" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setMobileActiveColumn("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              mobileActiveColumn === "all"
                ? "bg-[#111110] text-white"
                : "bg-white border border-[#E8E8E4] text-[#57574F]"
            }`}
          >
            All Columns ({resolvedItems.length})
          </button>
          {COLUMNS.map((col) => {
            const count = resolvedItems.filter((i) => i.status === col.id).length;
            const isActive = mobileActiveColumn === col.id;
            return (
              <button
                key={col.id}
                onClick={() => setMobileActiveColumn(col.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-[#111110] text-white"
                    : "bg-white border border-[#E8E8E4] text-[#57574F]"
                }`}
              >
                {col.title} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-0">
          {COLUMNS.filter((col) => mobileActiveColumn === "all" || mobileActiveColumn === col.id).map((col) => {
            const colItems = resolvedItems.filter((i) => i.status === col.id);
            const totalUSD = colItems.reduce(
              (acc, curr) => acc + (curr.priceUSD.min + curr.priceUSD.max) / 2,
              0
            );

            return (
              <div
                key={col.id}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(col.id)}
                className="flex flex-col bg-[#F1F1EE]/60 border border-[#E8E8E4] rounded-2xl p-4 min-h-[600px]"
              >
                {/* Column Header */}
                <div className="mb-4 pb-3 border-b border-[#E8E8E4]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-[#111110] text-sm flex items-center gap-2">
                      <span>{col.title}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${col.badgeBg}`}
                      >
                        {colItems.length}
                      </span>
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#57574F]">
                    <span className="truncate">{col.description}</span>
                    <span className="font-mono font-medium text-[#111110] ml-1 shrink-0 tabular-nums">
                      ~{formatUSD(Math.round(totalUSD))}
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colItems.length === 0 ? (
                    <div className="h-32 border-2 border-dashed border-[#E8E8E4] rounded-xl flex items-center justify-center text-xs text-[#8A8A80]">
                      Drop items here
                    </div>
                  ) : (
                    colItems.map((item) => {
                      const price = formatPriceRange(
                        item.priceUSD.min,
                        item.priceUSD.max,
                        rate
                      );
                      const isItemBought = item.status === "bought";

                      return (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => handleDragStart(item.id)}
                          onClick={() => store.openDetail(item.id)}
                          className={`p-3.5 bg-white border border-[#E8E8E4] rounded-xl shadow-xs hover:shadow-md hover:border-stone-400 transition-all cursor-grab active:cursor-grabbing group ${
                            isItemBought ? "opacity-80" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#F1F1EE]">
                              <ItemVisual
                                item={item}
                                aspectRatio="1/1"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] uppercase font-bold tracking-wider text-[#8A8A80] truncate">
                                {item.brand || item.category}
                              </div>
                              <h4 className="text-xs font-semibold text-[#111110] truncate group-hover:text-[#4F46E5] transition-colors">
                                {item.name}
                              </h4>
                              <div className="text-xs font-mono font-semibold text-[#111110] mt-1 tabular-nums">
                                {price.usdCompact}
                              </div>
                            </div>
                          </div>

                          {/* Quick move arrow buttons */}
                          <div className="mt-3 pt-2.5 border-t border-[#F1F1EE] flex items-center justify-between text-[#8A8A80] text-[10px]">
                            <span>{item.when === "later" ? "Milestone" : "Core"}</span>

                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              {col.id !== "wishlist" && (
                                <button
                                  onClick={() => {
                                    const prev =
                                      col.id === "planned"
                                        ? "wishlist"
                                        : col.id === "saving"
                                        ? "planned"
                                        : "saving";
                                    moveStatus(item.id, prev);
                                  }}
                                  className="p-1 rounded hover:bg-[#F1F1EE] hover:text-[#111110] transition-colors"
                                  title="Move to previous stage"
                                >
                                  <ArrowLeft className="w-3 h-3" />
                                </button>
                              )}

                              {col.id !== "bought" && (
                                <button
                                  onClick={() => {
                                    const next =
                                      col.id === "wishlist"
                                        ? "planned"
                                        : col.id === "planned"
                                        ? "saving"
                                        : "bought";
                                    moveStatus(item.id, next);
                                  }}
                                  className="p-1 rounded hover:bg-[#F1F1EE] hover:text-[#111110] transition-colors"
                                  title="Move to next stage"
                                >
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
