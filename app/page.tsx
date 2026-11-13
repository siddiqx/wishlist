"use client";

import { Suspense, useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { CategoryTabs } from "@/components/CategoryTabs";
import { FilterBar } from "@/components/FilterBar";
import { CategoryHeader } from "@/components/CategoryHeader";
import { FeaturedPriorities } from "@/components/FeaturedPriorities";
import { ItemCard } from "@/components/ItemCard";
import { CompactListView } from "@/components/CompactListView";
import { Roadmap } from "@/components/Roadmap";
import { ItemDrawer } from "@/components/ItemDrawer";
import { BudgetDrawer } from "@/components/BudgetDrawer";
import { CompareModal } from "@/components/CompareModal";
import { CommandPalette } from "@/components/CommandPalette";
import { BackupModal } from "@/components/BackupModal";
import { EmptyState } from "@/components/EmptyState";
import { OnboardingHint } from "@/components/OnboardingHint";
import { Footer } from "@/components/Footer";
import { URLSync } from "@/components/URLSync";
import { useWishlistStore } from "@/lib/store";
import { filterAndSortItems } from "@/lib/filters";
import { INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";
import { CATEGORIES } from "@/data/categories";

export default function Home() {
  const store = useWishlistStore();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const filteredItems = useMemo(() => {
    return filterAndSortItems(INITIAL_WISHLIST_ITEMS, store);
  }, [store]);

  // Check if user is browsing "All Items" without specific search/filter overrides
  const isDefaultBrowseAll =
    store.activeCategory === "all" &&
    store.searchQuery.trim() === "" &&
    store.statusFilter === "all" &&
    store.priorityFilter === "all" &&
    store.whenFilter === "all" &&
    !store.pinnedOnly;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#111110]">
      {/* URL Query Params Sync */}
      <Suspense fallback={null}>
        <URLSync />
      </Suspense>

      {/* Sticky Top Navigation Bar */}
      <TopBar />

      {/* Hero Header with Live Stats & Floating Collage */}
      <Hero />

      {/* Sticky Category Tabs */}
      <CategoryTabs />

      {/* Main Content Area */}
      <main id="catalogue" className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Priorities Featured Band (shown when browsing all or default) */}
        {isDefaultBrowseAll && store.viewMode === "grid" && <FeaturedPriorities />}

        {/* Filter & Sort Bar */}
        <FilterBar />

        {/* Selected Category Header Banner */}
        <CategoryHeader />

        {/* View Mode Switching: Roadmap / List / Grid */}
        {store.viewMode === "roadmap" ? (
          <Roadmap />
        ) : filteredItems.length === 0 ? (
          <EmptyState />
        ) : store.viewMode === "list" ? (
          <CompactListView items={filteredItems} />
        ) : isDefaultBrowseAll ? (
          /* Grouped by Category with Bento-style rhythm and "Show all (N)" */
          <div className="space-y-12">
            {CATEGORIES.map((cat) => {
              const catItems = filteredItems.filter((i) => i.category === cat.id);
              if (catItems.length === 0) return null;

              const isExpanded = expandedCategories[cat.id] ?? false;
              const displayItems = isExpanded ? catItems : catItems.slice(0, 6);

              return (
                <section key={cat.id} className="space-y-4">
                  {/* Category Title Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E4]">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-2xl font-normal text-[#111110]">
                        {cat.name}
                      </h3>
                      <span className="text-xs font-mono text-[#8A8A80]">
                        ({catItems.length} items)
                      </span>
                    </div>

                    <button
                      onClick={() => store.setActiveCategory(cat.id)}
                      className="text-xs font-medium text-[#4F46E5] hover:underline"
                    >
                      Focus category &rarr;
                    </button>
                  </div>

                  {/* Cards Grid with clean responsive gap */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {displayItems.map((item, index) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        isHero={index === 0 && catItems.length >= 4}
                      />
                    ))}
                  </div>

                  {/* "Show all (N)" button if category has > 6 items */}
                  {catItems.length > 6 && (
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => toggleCategoryExpand(cat.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E8E8E4] text-xs font-semibold text-[#111110] hover:bg-[#F1F1EE] shadow-xs transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <span>Show fewer</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Show all {catItems.length} items in {cat.shortName}</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          /* Filtered Flat Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                isHero={index === 0 && store.activeCategory !== "all"}
              />
            ))}
          </div>
        )}
      </main>

      {/* Onboarding Hint Tour */}
      <OnboardingHint />

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-over Drawers */}
      <ItemDrawer />
      <BudgetDrawer />
      <CompareModal />
      <CommandPalette />
      <BackupModal />
    </div>
  );
}
