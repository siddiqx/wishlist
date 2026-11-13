"use client";

import { useEffect, useRef, useState } from "react";
import { Search, LayoutGrid, List, Kanban, Calculator, Layers, Database, X } from "lucide-react";
import { useWishlistStore } from "@/lib/store";

export function TopBar() {
  const store = useWishlistStore();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut listener: "/" to focus search, "Cmd/Ctrl+K" for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable;

      if (e.key === "/" && !isInput) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        store.setCommandPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [store]);

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-250 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#E8E8E4] shadow-xs"
          : "bg-[#F7F7F5] border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Wordmark Left */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-[#111110] text-white flex items-center justify-center font-display text-sm font-semibold tracking-tighter shadow-xs group-hover:bg-[#4F46E5] transition-colors">
              SB
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-display text-xl sm:text-2xl font-medium tracking-tight text-[#111110] group-hover:text-stone-700 transition-colors">
                The Blueprint
              </span>
              <span className="text-[10px] tracking-wider uppercase font-medium text-[#8A8A80] mt-0.5">
                Siddiq&apos;s Registry
              </span>
            </div>
          </a>
        </div>

        {/* Search Bar Center (Expands on focus) */}
        <div
          className={`mx-auto hidden md:block transition-all duration-300 ${
            isSearchFocused ? "flex-1 max-w-lg" : "flex-1 max-w-md"
          }`}
        >
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#8A8A80] pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={store.searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => store.setSearchQuery(e.target.value)}
              placeholder="Search gear, specs, brand, or notes... (Press /)"
              className="w-full pl-9 pr-9 py-2 text-sm bg-white border border-[#E8E8E4] rounded-xl placeholder:text-[#8A8A80] text-[#111110] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all shadow-xs"
            />
            {store.searchQuery ? (
              <button
                onClick={() => store.setSearchQuery("")}
                className="absolute right-3 p-0.5 text-[#8A8A80] hover:text-[#111110] rounded-full"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="absolute right-3 px-1.5 py-0.5 text-[10px] font-mono text-[#8A8A80] bg-[#F1F1EE] border border-[#E8E8E4] rounded pointer-events-none select-none">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Controls Right */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile search trigger */}
          <button
            onClick={() => store.setCommandPaletteOpen(true)}
            className="md:hidden p-2 rounded-xl text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE]"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#F1F1EE] p-0.5 rounded-xl border border-[#E8E8E4]">
            <button
              onClick={() => store.setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                store.viewMode === "grid"
                  ? "bg-white text-[#111110] shadow-xs"
                  : "text-[#57574F] hover:text-[#111110]"
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => store.setViewMode("list")}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                store.viewMode === "list"
                  ? "bg-white text-[#111110] shadow-xs"
                  : "text-[#57574F] hover:text-[#111110]"
              }`}
              title="Compact List View"
              aria-label="Compact List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => store.setViewMode("roadmap")}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                store.viewMode === "roadmap"
                  ? "bg-white text-[#111110] shadow-xs"
                  : "text-[#57574F] hover:text-[#111110]"
              }`}
              title="Roadmap Kanban"
              aria-label="Roadmap Kanban"
            >
              <Kanban className="w-4 h-4" />
            </button>
          </div>

          {/* Compare Button */}
          {store.compareItemIds.length > 0 && (
            <button
              onClick={() => store.setCompareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EEF0FF] border border-indigo-200 text-[#4F46E5] hover:bg-indigo-100 text-xs font-semibold transition-all animate-pulse"
              title="Compare selected items"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Compare ({store.compareItemIds.length})</span>
            </button>
          )}

          {/* Budget Drawer Button */}
          <button
            onClick={() => store.setBudgetDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#111110] text-white hover:bg-stone-800 text-xs font-medium active:scale-95 transition-all duration-150 shadow-xs"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Budget</span>
            <span className="px-1.5 py-0.2 rounded-full bg-stone-700 text-[10px] font-mono">
              {store.inPlanItemIds.length}
            </span>
          </button>

          {/* Backup Menu Button */}
          <button
            onClick={() => store.setBackupModalOpen(true)}
            className="p-2 rounded-xl text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] transition-colors"
            title="Backup & Export JSON/CSV"
            aria-label="Backup & Export"
          >
            <Database className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
