"use client";

import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Bookmark, Eye, CheckCircle2 } from "lucide-react";
import { Item } from "@/data/wishlist";
import { useWishlistStore } from "@/lib/store";
import { formatPriceRange } from "@/lib/format";
import { ItemVisual } from "./ItemVisual";

interface ItemCardProps {
  item: Item & { isPinned: boolean; isInPlan: boolean };
  isHero?: boolean;
}

export function ItemCard({ item, isHero = false }: ItemCardProps) {
  const store = useWishlistStore();
  const rate = store.inrRate || 88;

  const isBought = item.status === "bought";
  const price = formatPriceRange(item.priceUSD.min, item.priceUSD.max, rate);

  // Priority color indicators
  const priorityColor = {
    high: "bg-[#DC2626]",
    medium: "bg-[#D97706]",
    low: "bg-[#8A8A80]",
  }[item.priority];

  // Status badge styles
  const statusBadge = {
    wishlist: { label: "Wishlist", bg: "bg-[#F1F1EE] text-[#57574F] border-[#E8E8E4]" },
    planned: { label: "Planned", bg: "bg-[#EEF0FF] text-[#4F46E5] border-indigo-200" },
    saving: { label: "Saving", bg: "bg-[#FFFBEB] text-[#D97706] border-amber-200" },
    bought: { label: "Bought", bg: "bg-[#F0FDF4] text-[#16A34A] border-emerald-200" },
  }[item.status];

  const handleStatusChange = (
    newStatus: "wishlist" | "planned" | "saving" | "bought",
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    store.setItemStatus(item.id, newStatus);

    if (newStatus === "bought") {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.7 },
      });
    }
  };

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.togglePin(item.id);
  };

  const handleInPlanToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleInPlan(item.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => store.openDetail(item.id)}
      className={`group relative flex flex-col bg-white rounded-2xl border border-[#E8E8E4] shadow-[0_2px_8px_-2px_rgba(17,17,16,0.05)] hover:shadow-[0_12px_24px_-6px_rgba(17,17,16,0.08)] cursor-pointer overflow-hidden ${
        isBought ? "opacity-80 hover:opacity-100" : ""
      } ${isHero ? "sm:col-span-2 sm:row-span-2" : ""}`}
    >
      {/* 4:3 Image Container with Inner Hairline Border */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1F1EE] rounded-t-2xl">
        <ItemVisual item={item} aspectRatio="4/3" />

        {/* Inner 1px border at 5% black */}
        <div className="absolute inset-0 pointer-events-none rounded-t-2xl ring-1 ring-inset ring-black/5" />

        {/* Top-left: Category Chip */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-[#111110] border border-black/5 shadow-xs">
            <span className={`w-1.5 h-1.5 rounded-full ${priorityColor}`} />
            <span>{item.brand || item.category.replace("-", " ")}</span>
          </span>
        </div>

        {/* Top-right: Bookmark Button (hover on desktop, always on mobile) */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={handleBookmarkToggle}
            className={`p-1.5 rounded-full backdrop-blur-sm shadow-xs transition-all duration-150 ${
              item.isPinned
                ? "bg-amber-500 text-white opacity-100"
                : "bg-white/95 text-[#57574F] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-[#111110]"
            }`}
            title={item.isPinned ? "Remove pin" : "Pin item"}
            aria-label={item.isPinned ? "Remove pin" : "Pin item"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${item.isPinned ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Hover "Quick View" Overlay Pill */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#111110]/85 text-white shadow-md backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </span>
        </div>

        {/* Bought Checkmark Overlay */}
        {isBought && (
          <div className="absolute inset-0 bg-[#111110]/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#16A34A] text-white shadow-md">
              <CheckCircle2 className="w-4 h-4" />
              Acquired
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Name (18px semibold) */}
        <h3
          className={`font-semibold text-[#111110] group-hover:text-[#4F46E5] transition-colors leading-snug mb-1.5 line-clamp-1 ${
            isHero ? "text-xl sm:text-2xl" : "text-[17px]"
          }`}
        >
          {item.name}
        </h3>

        {/* One-line summary (muted, 2-line clamp) */}
        <p className="text-xs sm:text-[13px] text-[#57574F] line-clamp-2 leading-relaxed mb-4 flex-1">
          {item.summary}
        </p>

        {/* Spec Chips (Max 3) */}
        {item.specs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.specs.slice(0, 3).map((spec, idx) => (
              <span
                key={idx}
                className="inline-flex text-[11px] px-2 py-0.5 rounded-md bg-[#F1F1EE] text-[#57574F] font-mono truncate max-w-full"
              >
                <span className="text-[#8A8A80] mr-1">{spec.label}:</span>
                <span className="font-medium text-[#111110]">{spec.value}</span>
              </span>
            ))}
          </div>
        )}

        {/* Footer: Price in tabular numerals, Priority dot, Status pill */}
        <div className="pt-3 border-t border-[#F1F1EE] flex items-end justify-between gap-2 mt-auto">
          {/* Price Range */}
          <div>
            <div className="text-[10px] text-[#8A8A80] font-semibold uppercase tracking-wider">
              Investment
            </div>
            <div className="text-sm sm:text-base font-semibold text-[#111110] tracking-tight tabular-nums mt-0.5">
              {store.currencyDisplay === "USD" && price.usdCompact}
              {store.currencyDisplay === "INR" && price.inrCompact}
              {store.currencyDisplay === "BOTH" && (
                <div className="flex flex-col">
                  <span>{price.usdCompact}</span>
                  <span className="text-[11px] font-normal text-[#8A8A80]">
                    {price.inrCompact}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Plan + Status Pill */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleInPlanToggle}
              className={`px-2 py-1 rounded-lg text-xs font-medium border transition-all duration-150 ${
                item.isInPlan
                  ? "bg-[#EEF0FF] border-indigo-200 text-[#4F46E5] font-semibold"
                  : "bg-[#F7F7F5] border-[#E8E8E4] text-[#8A8A80] hover:text-[#111110]"
              }`}
              title={item.isInPlan ? "In budget plan (click to remove)" : "Add to budget plan"}
            >
              {item.isInPlan ? "In Plan" : "+ Plan"}
            </button>

            {/* Quick Status Dropdown */}
            <select
              value={item.status}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                handleStatusChange(
                  e.target.value as "wishlist" | "planned" | "saving" | "bought",
                  e as unknown as React.MouseEvent
                )
              }
              aria-label={`Change status for ${item.name}`}
              className={`text-xs px-2 py-1 rounded-lg border font-medium focus:outline-none focus:ring-1 focus:ring-[#4F46E5] cursor-pointer ${statusBadge.bg}`}
            >
              <option value="wishlist">Wishlist</option>
              <option value="planned">Planned</option>
              <option value="saving">Saving</option>
              <option value="bought">Bought</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
