"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Scale } from "lucide-react";
import { useWishlistStore, getResolvedItem } from "@/lib/store";
import { INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";
import { formatPriceRange } from "@/lib/format";
import { ItemVisual } from "./ItemVisual";

export function CompareModal() {
  const store = useWishlistStore();
  const rate = store.inrRate || 88;

  if (!store.isCompareModalOpen) return null;

  const compareItems = INITIAL_WISHLIST_ITEMS.filter((i) =>
    store.compareItemIds.includes(i.id)
  ).map((i) => getResolvedItem(i, store));

  // Collect all unique spec labels from the selected items
  const allSpecLabels = Array.from(
    new Set(compareItems.flatMap((item) => item.specs.map((s) => s.label)))
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => store.setCompareModalOpen(false)}
          className="fixed inset-0 bg-[#111110]/50 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <div className="flex min-h-full items-center justify-center p-2 sm:p-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-[#F7F7F5] border border-[#E8E8E4] text-left shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-white border-b border-[#E8E8E4] flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Scale className="w-5 h-5 text-[#4F46E5] shrink-0" />
                <h2 className="text-base sm:text-lg font-semibold text-[#111110] truncate">
                  Side-by-Side Comparison
                </h2>
                <span className="text-xs text-[#8A8A80] font-mono shrink-0">
                  ({compareItems.length}/3)
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {compareItems.length > 0 && (
                  <button
                    onClick={() => store.clearCompare()}
                    className="text-xs text-[#57574F] hover:text-[#DC2626] font-medium px-2 py-1 rounded transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => store.setCompareModalOpen(false)}
                  className="p-1.5 rounded-lg text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] transition-colors"
                  aria-label="Close compare dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
              {compareItems.length === 0 ? (
                <div className="text-center py-12 text-[#8A8A80] space-y-2">
                  <p className="text-sm">No items selected for comparison.</p>
                  <p className="text-xs">
                    Click the comparison icon on any item card to compare specifications side-by-side.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr>
                        <th className="p-3 bg-[#F1F1EE] border border-[#E8E8E4] text-xs font-semibold text-[#57574F] w-1/4">
                          Attribute
                        </th>
                        {compareItems.map((item) => {
                          const price = formatPriceRange(item.priceUSD.min, item.priceUSD.max, rate);
                          return (
                            <th
                              key={item.id}
                              className="p-4 bg-white border border-[#E8E8E4] text-xs align-top relative min-w-[240px]"
                            >
                              <button
                                onClick={() => store.removeCompareItem(item.id)}
                                className="absolute top-2 right-2 p-1 text-[#8A8A80] hover:text-[#DC2626] transition-colors"
                                title="Remove from comparison"
                                aria-label={`Remove ${item.name}`}
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>

                              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 bg-[#F1F1EE] border border-[#E8E8E4]">
                                <ItemVisual item={item} aspectRatio="16/10" />
                              </div>

                              <div className="text-[10px] uppercase font-bold tracking-wider text-[#8A8A80]">
                                {item.brand || item.category}
                              </div>
                              <div className="font-semibold text-[#111110] text-sm mt-0.5 mb-1 line-clamp-2">
                                {item.name}
                              </div>
                              <div className="text-base font-bold text-[#111110] font-mono tabular-nums">
                                {price.usd}
                              </div>
                              <div className="text-[11px] text-[#57574F] font-mono tabular-nums">
                                {price.inr}
                              </div>

                              {item.link && (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-[#4F46E5] hover:underline font-medium mt-2"
                                >
                                  <span>Product page</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#E8E8E4] text-xs">
                      <tr>
                        <td className="p-3 bg-[#F7F7F5] border border-[#E8E8E4] font-medium text-[#57574F]">
                          Status &amp; Priority
                        </td>
                        {compareItems.map((item) => (
                          <td key={item.id} className="p-3 bg-white border border-[#E8E8E4]">
                            <span className="capitalize font-semibold text-[#111110]">
                              {item.status}
                            </span>{" "}
                            &middot;{" "}
                            <span className="capitalize text-[#57574F]">
                              {item.priority} Priority
                            </span>
                          </td>
                        ))}
                      </tr>

                      {allSpecLabels.map((label) => (
                        <tr key={label}>
                          <td className="p-3 bg-[#F7F7F5] border border-[#E8E8E4] font-medium text-[#57574F]">
                            {label}
                          </td>
                          {compareItems.map((item) => {
                            const spec = item.specs.find((s) => s.label === label);
                            return (
                              <td
                                key={item.id}
                                className="p-3 bg-white border border-[#E8E8E4] font-mono text-[#111110]"
                              >
                                {spec ? spec.value : <span className="text-[#8A8A80]">&mdash;</span>}
                              </td>
                            );
                          })}
                        </tr>
                      ))}

                      <tr>
                        <td className="p-3 bg-[#F7F7F5] border border-[#E8E8E4] font-medium text-[#57574F]">
                          Key Highlight
                        </td>
                        {compareItems.map((item) => (
                          <td
                            key={item.id}
                            className="p-3 bg-white border border-[#E8E8E4] text-[#57574F] leading-relaxed"
                          >
                            {item.summary}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
