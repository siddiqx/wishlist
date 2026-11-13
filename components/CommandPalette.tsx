"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calculator,
  Kanban,
  Bookmark,
  Database,
  ArrowRight,
} from "lucide-react";
import { useWishlistStore } from "@/lib/store";
import { INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";
import { CATEGORIES } from "@/data/categories";

export function CommandPalette() {
  const store = useWishlistStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (store.isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [store.isCommandPaletteOpen]);

  if (!store.isCommandPaletteOpen) return null;

  const filteredCategories = CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredItems = INITIAL_WISHLIST_ITEMS.filter(
    (i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.summary.toLowerCase().includes(query.toLowerCase()) ||
      (i.brand?.toLowerCase().includes(query.toLowerCase()) ?? false)
  ).slice(0, 8);

  const close = () => {
    setQuery("");
    store.setCommandPaletteOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 bg-[#111110]/50 backdrop-blur-sm transition-opacity"
        />

        {/* Palette Dialog */}
        <div className="flex min-h-full items-start justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="w-full max-w-xl transform rounded-2xl bg-white border border-[#E8E8E4] text-left shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Search Input */}
            <div className="relative border-b border-[#E8E8E4] px-4 flex items-center">
              <Search className="w-5 h-5 text-[#8A8A80] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, category, or search an item..."
                className="w-full border-0 bg-transparent py-4 pl-3 pr-8 text-sm text-[#111110] placeholder:text-[#8A8A80] focus:outline-none"
              />
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-[#8A8A80] bg-[#F1F1EE] border border-[#E8E8E4] rounded shrink-0">
                ESC
              </kbd>
            </div>

            {/* Suggestions list */}
            <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
              {/* Quick Actions */}
              {!query && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#8A8A80]">
                    Quick Navigation &amp; Tools
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        store.setBudgetDrawerOpen(true);
                        close();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#57574F] hover:bg-[#F1F1EE] hover:text-[#111110] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Calculator className="w-4 h-4 text-[#4F46E5]" />
                        <span className="font-medium text-[#111110]">Open Budget Planner Drawer</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#8A8A80]">
                        {store.inPlanItemIds.length} items
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        store.setViewMode("roadmap");
                        close();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#57574F] hover:bg-[#F1F1EE] hover:text-[#111110] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Kanban className="w-4 h-4 text-[#D97706]" />
                        <span className="font-medium text-[#111110]">Switch to Kanban Roadmap View</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#8A8A80]">Timeline</span>
                    </button>

                    <button
                      onClick={() => {
                        store.setPinnedOnly(!store.pinnedOnly);
                        close();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#57574F] hover:bg-[#F1F1EE] hover:text-[#111110] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Bookmark className="w-4 h-4 text-rose-500" />
                        <span className="font-medium text-[#111110]">Toggle Pinned Items Only</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#8A8A80]">
                        {store.pinnedItemIds.length} pinned
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        store.setBackupModalOpen(true);
                        close();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#57574F] hover:bg-[#F1F1EE] hover:text-[#111110] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Database className="w-4 h-4 text-[#57574F]" />
                        <span className="font-medium text-[#111110]">Backup &amp; Export Data (JSON / CSV)</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Categories */}
              {filteredCategories.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#8A8A80]">
                    Jump to Category
                  </div>
                  <div className="space-y-1">
                    {filteredCategories.slice(0, 5).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          store.setActiveCategory(cat.id);
                          close();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#57574F] hover:bg-[#F1F1EE] hover:text-[#111110] transition-colors text-left"
                      >
                        <div>
                          <div className="font-semibold text-[#111110]">{cat.name}</div>
                          <div className="text-[11px] text-[#8A8A80] truncate max-w-sm">
                            {cat.tagline}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8A8A80]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specific Items */}
              {filteredItems.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#8A8A80]">
                    Wishlist Items
                  </div>
                  <div className="space-y-1">
                    {filteredItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          store.openDetail(item.id);
                          close();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#57574F] hover:bg-[#F1F1EE] hover:text-[#111110] transition-colors text-left"
                      >
                        <div className="truncate flex-1 mr-2">
                          <div className="font-semibold text-[#111110] truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#8A8A80] truncate font-mono">
                            {item.brand || item.category} &middot; ${item.priceUSD.min}&ndash;${item.priceUSD.max}
                          </div>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F1F1EE] text-[#57574F] capitalize">
                          {item.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query && filteredCategories.length === 0 && filteredItems.length === 0 && (
                <div className="text-center py-8 text-[#8A8A80] text-xs">
                  No matching categories or items found.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
