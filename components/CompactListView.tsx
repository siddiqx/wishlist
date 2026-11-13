"use client";

import { Bookmark } from "lucide-react";
import { Item } from "@/data/wishlist";
import { useWishlistStore } from "@/lib/store";
import { formatPriceRange } from "@/lib/format";
import { ItemVisual } from "./ItemVisual";

interface CompactListViewProps {
  items: (Item & { isPinned: boolean; isInPlan: boolean })[];
}

export function CompactListView({ items }: CompactListViewProps) {
  const store = useWishlistStore();
  const rate = store.inrRate || 88;

  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F7F7F5] border-b border-[#E8E8E4] text-[#8A8A80] font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4 w-12 text-center">Pin</th>
              <th className="py-3 px-4">Item &amp; Brand</th>
              <th className="py-3 px-4 hidden md:table-cell">Category</th>
              <th className="py-3 px-4">Price Est.</th>
              <th className="py-3 px-4 hidden sm:table-cell">Priority</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Plan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F1EE]">
            {items.map((item) => {
              const price = formatPriceRange(item.priceUSD.min, item.priceUSD.max, rate);
              const isBought = item.status === "bought";

              return (
                <tr
                  key={item.id}
                  onClick={() => store.openDetail(item.id)}
                  className={`hover:bg-[#F7F7F5] transition-colors cursor-pointer group ${
                    isBought ? "opacity-75" : ""
                  }`}
                >
                  {/* Pin */}
                  <td
                    className="py-3 px-4 text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      store.togglePin(item.id);
                    }}
                  >
                    <button
                      className="p-1 rounded text-[#8A8A80] hover:text-amber-500 transition-colors"
                      aria-label="Pin"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          item.isPinned ? "fill-amber-500 text-amber-500" : ""
                        }`}
                      />
                    </button>
                  </td>

                  {/* Item Image & Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#F1F1EE] border border-[#E8E8E4]">
                        <ItemVisual
                          item={item}
                          aspectRatio="1/1"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#111110] group-hover:text-[#4F46E5] transition-colors truncate max-w-xs sm:max-w-md">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#8A8A80] truncate">
                          {item.brand || item.summary}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 hidden md:table-cell text-[#57574F] font-medium capitalize">
                    {item.category.replace("-", " ")}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 font-mono tabular-nums">
                    <div className="font-semibold text-[#111110]">
                      {store.currencyDisplay === "USD" && price.usd}
                      {store.currencyDisplay === "INR" && price.inr}
                      {store.currencyDisplay === "BOTH" && price.usdCompact}
                    </div>
                    {store.currencyDisplay === "BOTH" && (
                      <div className="text-[11px] text-[#8A8A80]">{price.inrCompact}</div>
                    )}
                  </td>

                  {/* Priority */}
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${
                        item.priority === "high"
                          ? "bg-rose-50 text-[#DC2626]"
                          : item.priority === "medium"
                          ? "bg-amber-50 text-[#D97706]"
                          : "bg-[#F1F1EE] text-[#57574F]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.priority === "high"
                            ? "bg-[#DC2626]"
                            : item.priority === "medium"
                            ? "bg-[#D97706]"
                            : "bg-[#8A8A80]"
                        }`}
                      />
                      {item.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${
                        item.status === "bought"
                          ? "bg-emerald-50 text-[#16A34A] font-semibold"
                          : item.status === "saving"
                          ? "bg-amber-50 text-[#D97706]"
                          : item.status === "planned"
                          ? "bg-[#EEF0FF] text-[#4F46E5]"
                          : "bg-[#F1F1EE] text-[#57574F]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* In Plan */}
                  <td
                    className="py-3 px-4 text-right"
                    onClick={(e) => {
                      e.stopPropagation();
                      store.toggleInPlan(item.id);
                    }}
                  >
                    <button
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        item.isInPlan
                          ? "bg-[#EEF0FF] text-[#4F46E5] border border-indigo-200 font-semibold"
                          : "bg-[#F7F7F5] text-[#8A8A80] border border-[#E8E8E4] hover:text-[#111110]"
                      }`}
                    >
                      {item.isInPlan ? "In Plan" : "+ Plan"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
