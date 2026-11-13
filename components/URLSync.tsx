"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useWishlistStore, ViewMode } from "@/lib/store";
import { CategoryId, CATEGORIES } from "@/data/categories";

export function URLSync() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const store = useWishlistStore();
  const isInitialMount = useRef(true);

  // 1. Read URL params on initial load
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;

    const cat = searchParams.get("category");
    if (cat && (cat === "all" || CATEGORIES.some((c) => c.id === cat))) {
      store.setActiveCategory(cat as CategoryId | "all");
    }

    const view = searchParams.get("view");
    if (view && ["grid", "list", "roadmap"].includes(view)) {
      store.setViewMode(view as ViewMode);
    }

    const status = searchParams.get("status");
    if (status) {
      store.setStatusFilter(status);
    }

    const q = searchParams.get("q");
    if (q) {
      store.setSearchQuery(q);
    }

    const item = searchParams.get("item");
    if (item) {
      store.openDetail(item);
    }
  }, [searchParams, store]);

  // 2. Reflect state back to URL query params
  useEffect(() => {
    const params = new URLSearchParams();

    if (store.activeCategory !== "all") {
      params.set("category", store.activeCategory);
    }
    if (store.viewMode !== "grid") {
      params.set("view", store.viewMode);
    }
    if (store.statusFilter !== "all") {
      params.set("status", store.statusFilter);
    }
    if (store.searchQuery.trim()) {
      params.set("q", store.searchQuery);
    }
    if (store.selectedDetailItemId) {
      params.set("item", store.selectedDetailItemId);
    }

    const newQuery = params.toString();
    const currentQuery = window.location.search.replace(/^\?/, "");

    if (newQuery !== currentQuery) {
      const newUrl = newQuery ? `${pathname}?${newQuery}` : pathname;
      window.history.replaceState(null, "", newUrl);
    }
  }, [
    store.activeCategory,
    store.viewMode,
    store.statusFilter,
    store.searchQuery,
    store.selectedDetailItemId,
    pathname,
  ]);

  return null;
}
