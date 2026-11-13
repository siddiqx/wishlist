import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CategoryId } from "@/data/categories";
import { Item, INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";

export type ViewMode = "grid" | "list" | "roadmap";
export type CurrencyDisplay = "USD" | "INR" | "BOTH";
export type SortOption = "default" | "price-asc" | "price-desc" | "priority" | "name";

export interface WishlistState {
  // Persistent user overrides
  itemNotes: Record<string, string>;
  itemStatus: Record<string, "wishlist" | "planned" | "saving" | "bought">;
  itemPriority: Record<string, "high" | "medium" | "low">;
  inPlanItemIds: string[];
  pinnedItemIds: string[];
  inrRate: number;
  viewMode: ViewMode;
  currencyDisplay: CurrencyDisplay;

  // UI & Filter state (ephemeral or persisted)
  activeCategory: CategoryId | "all";
  searchQuery: string;
  statusFilter: string;
  priorityFilter: string;
  whenFilter: string;
  pinnedOnly: boolean;
  sortBy: SortOption;

  // Modals & Panels
  selectedDetailItemId: string | null;
  isBudgetDrawerOpen: boolean;
  isCompareModalOpen: boolean;
  compareItemIds: string[];
  isCommandPaletteOpen: boolean;
  isBackupModalOpen: boolean;

  // Actions
  setActiveCategory: (cat: CategoryId | "all") => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: string) => void;
  setPriorityFilter: (filter: string) => void;
  setWhenFilter: (filter: string) => void;
  setPinnedOnly: (val: boolean) => void;
  setSortBy: (sort: SortOption) => void;
  setViewMode: (mode: ViewMode) => void;
  setCurrencyDisplay: (curr: CurrencyDisplay) => void;
  setInrRate: (rate: number) => void;

  // Item overrides
  togglePin: (id: string) => void;
  toggleInPlan: (id: string) => void;
  setInPlanBatch: (ids: string[], inPlan: boolean) => void;
  setItemStatus: (id: string, status: "wishlist" | "planned" | "saving" | "bought") => void;
  setItemPriority: (id: string, priority: "high" | "medium" | "low") => void;
  setItemNotes: (id: string, notes: string) => void;

  // Detail & Modals
  openDetail: (id: string) => void;
  closeDetail: () => void;
  navigateDetail: (direction: "next" | "prev") => void;
  setBudgetDrawerOpen: (open: boolean) => void;
  setCompareModalOpen: (open: boolean) => void;
  toggleCompareItem: (id: string) => void;
  removeCompareItem: (id: string) => void;
  clearCompare: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setBackupModalOpen: (open: boolean) => void;

  // Data management
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonString: string) => { success: boolean; error?: string };
}

// Initial in-plan items: select all "now" items by default
const defaultInPlanIds = INITIAL_WISHLIST_ITEMS.filter((i) => i.when === "now").map((i) => i.id);

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      itemNotes: {},
      itemStatus: {},
      itemPriority: {},
      inPlanItemIds: defaultInPlanIds,
      pinnedItemIds: [],
      inrRate: 88,
      viewMode: "grid",
      currencyDisplay: "BOTH",

      activeCategory: "all",
      searchQuery: "",
      statusFilter: "all",
      priorityFilter: "all",
      whenFilter: "all",
      pinnedOnly: false,
      sortBy: "default",

      selectedDetailItemId: null,
      isBudgetDrawerOpen: false,
      isCompareModalOpen: false,
      compareItemIds: [],
      isCommandPaletteOpen: false,
      isBackupModalOpen: false,

      setActiveCategory: (activeCategory) => set({ activeCategory }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setStatusFilter: (statusFilter) => set({ statusFilter }),
      setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
      setWhenFilter: (whenFilter) => set({ whenFilter }),
      setPinnedOnly: (pinnedOnly) => set({ pinnedOnly }),
      setSortBy: (sortBy) => set({ sortBy }),
      setViewMode: (viewMode) => set({ viewMode }),
      setCurrencyDisplay: (currencyDisplay) => set({ currencyDisplay }),
      setInrRate: (inrRate) => set({ inrRate: Math.max(1, inrRate) }),

      togglePin: (id) =>
        set((state) => ({
          pinnedItemIds: state.pinnedItemIds.includes(id)
            ? state.pinnedItemIds.filter((itemId) => itemId !== id)
            : [...state.pinnedItemIds, id],
        })),

      toggleInPlan: (id) =>
        set((state) => ({
          inPlanItemIds: state.inPlanItemIds.includes(id)
            ? state.inPlanItemIds.filter((itemId) => itemId !== id)
            : [...state.inPlanItemIds, id],
        })),

      setInPlanBatch: (ids, inPlan) =>
        set((state) => {
          if (inPlan) {
            const newSet = new Set([...state.inPlanItemIds, ...ids]);
            return { inPlanItemIds: Array.from(newSet) };
          } else {
            return {
              inPlanItemIds: state.inPlanItemIds.filter((id) => !ids.includes(id)),
            };
          }
        }),

      setItemStatus: (id, status) =>
        set((state) => ({
          itemStatus: { ...state.itemStatus, [id]: status },
        })),

      setItemPriority: (id, priority) =>
        set((state) => ({
          itemPriority: { ...state.itemPriority, [id]: priority },
        })),

      setItemNotes: (id, notes) =>
        set((state) => ({
          itemNotes: { ...state.itemNotes, [id]: notes },
        })),

      openDetail: (id) => set({ selectedDetailItemId: id }),
      closeDetail: () => set({ selectedDetailItemId: null }),

      navigateDetail: (direction) => {
        const { selectedDetailItemId } = get();
        if (!selectedDetailItemId) return;

        const currentIndex = INITIAL_WISHLIST_ITEMS.findIndex(
          (i) => i.id === selectedDetailItemId
        );
        if (currentIndex === -1) return;

        const nextIndex =
          direction === "next"
            ? (currentIndex + 1) % INITIAL_WISHLIST_ITEMS.length
            : (currentIndex - 1 + INITIAL_WISHLIST_ITEMS.length) % INITIAL_WISHLIST_ITEMS.length;

        set({ selectedDetailItemId: INITIAL_WISHLIST_ITEMS[nextIndex].id });
      },

      setBudgetDrawerOpen: (isBudgetDrawerOpen) => set({ isBudgetDrawerOpen }),
      setCompareModalOpen: (isCompareModalOpen) => set({ isCompareModalOpen }),

      toggleCompareItem: (id) =>
        set((state) => {
          if (state.compareItemIds.includes(id)) {
            return { compareItemIds: state.compareItemIds.filter((itemId) => itemId !== id) };
          }
          if (state.compareItemIds.length >= 3) {
            // Maximum 3 items allowed
            return { compareItemIds: [...state.compareItemIds.slice(1), id] };
          }
          return { compareItemIds: [...state.compareItemIds, id] };
        }),

      removeCompareItem: (id) =>
        set((state) => ({
          compareItemIds: state.compareItemIds.filter((itemId) => itemId !== id),
        })),

      clearCompare: () => set({ compareItemIds: [] }),
      setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),
      setBackupModalOpen: (isBackupModalOpen) => set({ isBackupModalOpen }),

      resetToDefaults: () =>
        set({
          itemNotes: {},
          itemStatus: {},
          itemPriority: {},
          inPlanItemIds: defaultInPlanIds,
          pinnedItemIds: [],
          inrRate: 88,
          activeCategory: "all",
          searchQuery: "",
          statusFilter: "all",
          priorityFilter: "all",
          whenFilter: "all",
          pinnedOnly: false,
          sortBy: "default",
          compareItemIds: [],
        }),

      exportJSON: () => {
        const { itemNotes, itemStatus, itemPriority, inPlanItemIds, pinnedItemIds, inrRate } = get();
        return JSON.stringify(
          {
            version: 1,
            exportedAt: new Date().toISOString(),
            data: {
              itemNotes,
              itemStatus,
              itemPriority,
              inPlanItemIds,
              pinnedItemIds,
              inrRate,
            },
          },
          null,
          2
        );
      },

      importJSON: (jsonString) => {
        try {
          const parsed = JSON.parse(jsonString);
          if (!parsed || !parsed.data) {
            return { success: false, error: "Invalid backup format: missing data key." };
          }
          const { itemNotes, itemStatus, itemPriority, inPlanItemIds, pinnedItemIds, inrRate } =
            parsed.data;
          set({
            itemNotes: itemNotes || {},
            itemStatus: itemStatus || {},
            itemPriority: itemPriority || {},
            inPlanItemIds: Array.isArray(inPlanItemIds) ? inPlanItemIds : defaultInPlanIds,
            pinnedItemIds: Array.isArray(pinnedItemIds) ? pinnedItemIds : [],
            inrRate: typeof inrRate === "number" ? inrRate : 88,
          });
          return { success: true };
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Parse error";
          return { success: false, error: message };
        }
      },
    }),
    {
      name: "siddiq_wishlist_storage_v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        itemNotes: state.itemNotes,
        itemStatus: state.itemStatus,
        itemPriority: state.itemPriority,
        inPlanItemIds: state.inPlanItemIds,
        pinnedItemIds: state.pinnedItemIds,
        inrRate: state.inrRate,
        viewMode: state.viewMode,
        currencyDisplay: state.currencyDisplay,
      }),
    }
  )
);

// Helper function to resolve an item with its user overrides
export function getResolvedItem(item: Item, state: WishlistState): Item & { isPinned: boolean; isInPlan: boolean } {
  return {
    ...item,
    notes: state.itemNotes[item.id] !== undefined ? state.itemNotes[item.id] : item.notes,
    status: state.itemStatus[item.id] || item.status,
    priority: state.itemPriority[item.id] || item.priority,
    isPinned: state.pinnedItemIds.includes(item.id),
    isInPlan: state.inPlanItemIds.includes(item.id),
  };
}

export function getAllResolvedItems(state: WishlistState): (Item & { isPinned: boolean; isInPlan: boolean })[] {
  return INITIAL_WISHLIST_ITEMS.map((item) => getResolvedItem(item, state));
}
