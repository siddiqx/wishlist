import { Item } from "@/data/wishlist";
import { WishlistState, getResolvedItem } from "@/lib/store";

export type ResolvedItem = Item & { isPinned: boolean; isInPlan: boolean };

export function filterAndSortItems(
  items: Item[],
  state: WishlistState,
  options?: { priceRange?: [number, number] }
): ResolvedItem[] {
  const {
    activeCategory,
    searchQuery,
    statusFilter,
    priorityFilter,
    whenFilter,
    pinnedOnly,
    sortBy,
  } = state;

  const resolved = items.map((item) => getResolvedItem(item, state));

  const filtered = resolved.filter((item) => {
    // Category filter
    if (activeCategory !== "all" && item.category !== activeCategory) {
      return false;
    }

    // Status filter
    if (statusFilter !== "all" && item.status !== statusFilter) {
      return false;
    }

    // Priority filter
    if (priorityFilter !== "all" && item.priority !== priorityFilter) {
      return false;
    }

    // When filter
    if (whenFilter !== "all" && item.when !== whenFilter) {
      return false;
    }

    // Pinned filter
    if (pinnedOnly && !item.isPinned) {
      return false;
    }

    // Price range slider filter
    if (options?.priceRange) {
      const [minBound, maxBound] = options.priceRange;
      if (item.priceUSD.min > maxBound || item.priceUSD.max < minBound) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const inName = item.name.toLowerCase().includes(query);
      const inBrand = item.brand?.toLowerCase().includes(query) ?? false;
      const inSummary = item.summary.toLowerCase().includes(query);
      const inTags = item.tags?.some((t) => t.toLowerCase().includes(query)) ?? false;
      const inNotes = item.notes?.toLowerCase().includes(query) ?? false;
      const inSpecs = item.specs.some(
        (s) => s.label.toLowerCase().includes(query) || s.value.toLowerCase().includes(query)
      );

      if (!inName && !inBrand && !inSummary && !inTags && !inNotes && !inSpecs) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  const priorityWeight: Record<string, number> = { high: 3, medium: 2, low: 1 };

  return filtered.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.priceUSD.min - b.priceUSD.min;
      case "price-desc":
        return b.priceUSD.max - a.priceUSD.max;
      case "priority":
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        // By default: Keep bought at the bottom or original catalogue order
        if (a.status === "bought" && b.status !== "bought") return 1;
        if (a.status !== "bought" && b.status === "bought") return -1;
        return 0;
    }
  });
}

export interface CatalogueSummary {
  totalItems: number;
  totalAcquired: number;
  percentageComplete: number;
  oneTimeUSD: { min: number; max: number };
  oneTimeINR: { min: number; max: number };
  monthlyRecurringUSD: { min: number; max: number };
  monthlyRecurringINR: { min: number; max: number };
  yearlyRecurringUSD: { min: number; max: number };
  yearlyRecurringINR: { min: number; max: number };
  nowTotalUSD: { min: number; max: number };
  laterTotalUSD: { min: number; max: number };
}

export function computeCatalogueSummary(items: Item[], state: WishlistState): CatalogueSummary {
  const resolved = items.map((i) => getResolvedItem(i, state));
  const rate = state.inrRate || 88;

  let totalAcquired = 0;
  const oneTimeUSD = { min: 0, max: 0 };
  const monthlyRecurringUSD = { min: 0, max: 0 };
  const yearlyRecurringUSD = { min: 0, max: 0 };
  const nowTotalUSD = { min: 0, max: 0 };
  const laterTotalUSD = { min: 0, max: 0 };

  for (const item of resolved) {
    if (item.status === "bought") {
      totalAcquired++;
    }

    if (item.recurring === "monthly") {
      monthlyRecurringUSD.min += item.priceUSD.min;
      monthlyRecurringUSD.max += item.priceUSD.max;
    } else if (item.recurring === "yearly") {
      yearlyRecurringUSD.min += item.priceUSD.min;
      yearlyRecurringUSD.max += item.priceUSD.max;
    } else {
      // One-time capital expenditure
      oneTimeUSD.min += item.priceUSD.min;
      oneTimeUSD.max += item.priceUSD.max;

      if (item.when === "now") {
        nowTotalUSD.min += item.priceUSD.min;
        nowTotalUSD.max += item.priceUSD.max;
      } else {
        laterTotalUSD.min += item.priceUSD.min;
        laterTotalUSD.max += item.priceUSD.max;
      }
    }
  }

  const percentageComplete =
    resolved.length > 0 ? Math.round((totalAcquired / resolved.length) * 100) : 0;

  return {
    totalItems: resolved.length,
    totalAcquired,
    percentageComplete,
    oneTimeUSD,
    oneTimeINR: {
      min: Math.round(oneTimeUSD.min * rate),
      max: Math.round(oneTimeUSD.max * rate),
    },
    monthlyRecurringUSD,
    monthlyRecurringINR: {
      min: Math.round(monthlyRecurringUSD.min * rate),
      max: Math.round(monthlyRecurringUSD.max * rate),
    },
    yearlyRecurringUSD,
    yearlyRecurringINR: {
      min: Math.round(yearlyRecurringUSD.min * rate),
      max: Math.round(yearlyRecurringUSD.max * rate),
    },
    nowTotalUSD,
    laterTotalUSD,
  };
}
