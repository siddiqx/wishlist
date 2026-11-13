"use client";

import { Bookmark, RotateCcw, ArrowUpDown, X, SlidersHorizontal } from "lucide-react";
import { useWishlistStore, SortOption } from "@/lib/store";

export function FilterBar() {
  const store = useWishlistStore();

  const isFiltered =
    store.statusFilter !== "all" ||
    store.priorityFilter !== "all" ||
    store.whenFilter !== "all" ||
    store.pinnedOnly ||
    store.searchQuery.trim() !== "" ||
    store.sortBy !== "default";

  const resetFilters = () => {
    store.setStatusFilter("all");
    store.setPriorityFilter("all");
    store.setWhenFilter("all");
    store.setPinnedOnly(false);
    store.setSearchQuery("");
    store.setSortBy("default");
  };

  return (
    <div className="py-4 border-b border-[#E8E8E4] space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Filter Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-[#8A8A80] font-semibold uppercase tracking-wider text-[10px] mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* When Filter (Now vs Later) */}
          <div className="flex items-center rounded-xl bg-white border border-[#E8E8E4] p-0.5 shadow-xs">
            <button
              onClick={() => store.setWhenFilter("all")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                store.whenFilter === "all" ? "bg-[#111110] text-white" : "text-[#57574F] hover:text-[#111110]"
              }`}
            >
              All Timelines
            </button>
            <button
              onClick={() => store.setWhenFilter("now")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                store.whenFilter === "now" ? "bg-[#111110] text-white" : "text-[#57574F] hover:text-[#111110]"
              }`}
            >
              Now (Core)
            </button>
            <button
              onClick={() => store.setWhenFilter("later")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                store.whenFilter === "later" ? "bg-[#111110] text-white" : "text-[#57574F] hover:text-[#111110]"
              }`}
            >
              Later (Milestones)
            </button>
          </div>

          {/* Status Select */}
          <div className="relative">
            <select
              value={store.statusFilter}
              onChange={(e) => store.setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-white border border-[#E8E8E4] text-[#111110] text-xs font-medium hover:border-stone-400 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] shadow-xs cursor-pointer"
            >
              <option value="all">Status: All</option>
              <option value="wishlist">Wishlist</option>
              <option value="planned">Planned</option>
              <option value="saving">Saving</option>
              <option value="bought">Bought</option>
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8A80]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {/* Priority Select */}
          <div className="relative">
            <select
              value={store.priorityFilter}
              onChange={(e) => store.setPriorityFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-white border border-[#E8E8E4] text-[#111110] text-xs font-medium hover:border-stone-400 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] shadow-xs cursor-pointer"
            >
              <option value="all">Priority: All</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A8A80]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {/* Pinned / Favourites Toggle */}
          <button
            onClick={() => store.setPinnedOnly(!store.pinnedOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all shadow-xs font-medium ${
              store.pinnedOnly
                ? "bg-[#FFFBEB] border-amber-300 text-[#D97706]"
                : "bg-white border-[#E8E8E4] text-[#57574F] hover:border-stone-400"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${store.pinnedOnly ? "fill-[#D97706] text-[#D97706]" : ""}`} />
            <span>Pinned ({store.pinnedItemIds.length})</span>
          </button>
        </div>

        {/* Right: Currency Toggle & Sort */}
        <div className="flex items-center gap-2">
          {/* Currency toggle */}
          <div className="flex items-center rounded-xl bg-white border border-[#E8E8E4] p-0.5 shadow-xs text-[11px]">
            <button
              onClick={() => store.setCurrencyDisplay("BOTH")}
              className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
                store.currencyDisplay === "BOTH" ? "bg-[#111110] text-white" : "text-[#57574F] hover:text-[#111110]"
              }`}
            >
              Both ($/₹)
            </button>
            <button
              onClick={() => store.setCurrencyDisplay("USD")}
              className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
                store.currencyDisplay === "USD" ? "bg-[#111110] text-white" : "text-[#57574F] hover:text-[#111110]"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => store.setCurrencyDisplay("INR")}
              className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
                store.currencyDisplay === "INR" ? "bg-[#111110] text-white" : "text-[#57574F] hover:text-[#111110]"
              }`}
            >
              INR (₹)
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={store.sortBy}
              onChange={(e) => store.setSortBy(e.target.value as SortOption)}
              aria-label="Sort items by"
              className="pl-7 pr-3 py-1.5 rounded-xl bg-white border border-[#E8E8E4] text-[#111110] font-medium hover:border-stone-400 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] shadow-xs cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="priority">Priority: Highest First</option>
              <option value="name">Name: A to Z</option>
            </select>
            <ArrowUpDown className="absolute left-2.5 w-3.5 h-3.5 text-[#8A8A80] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Removable Chips */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-[#8A8A80] text-[11px] mr-1">Active filters:</span>

          {store.whenFilter !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#E8E8E4] text-[#111110] font-medium">
              <span>Timeline: {store.whenFilter}</span>
              <button
                onClick={() => store.setWhenFilter("all")}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {store.statusFilter !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#E8E8E4] text-[#111110] font-medium capitalize">
              <span>Status: {store.statusFilter}</span>
              <button
                onClick={() => store.setStatusFilter("all")}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {store.priorityFilter !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#E8E8E4] text-[#111110] font-medium capitalize">
              <span>Priority: {store.priorityFilter}</span>
              <button
                onClick={() => store.setPriorityFilter("all")}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {store.pinnedOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-amber-200 text-[#D97706] font-medium">
              <span>Pinned Only</span>
              <button
                onClick={() => store.setPinnedOnly(false)}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {store.searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#E8E8E4] text-[#111110] font-medium">
              <span>Query: &quot;{store.searchQuery}&quot;</span>
              <button
                onClick={() => store.setSearchQuery("")}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[#4F46E5] hover:bg-[#EEF0FF] font-semibold transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear all</span>
          </button>
        </div>
      )}
    </div>
  );
}
