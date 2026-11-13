"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calculator,
  Download,
  Check,
  Calendar,
  Trash2,
} from "lucide-react";
import { useWishlistStore, getResolvedItem } from "@/lib/store";
import { INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";
import { CATEGORIES } from "@/data/categories";
import { formatUSD, formatINR } from "@/lib/format";

export function BudgetDrawer() {
  const store = useWishlistStore();
  const rate = store.inrRate || 88;
  const [editingRate, setEditingRate] = useState(false);
  const [tempRate, setTempRate] = useState(rate.toString());

  if (!store.isBudgetDrawerOpen) return null;

  // Resolve all items
  const resolvedItems = INITIAL_WISHLIST_ITEMS.map((item) =>
    getResolvedItem(item, store)
  );

  // Filter items in plan
  const planItems = resolvedItems.filter((item) => item.isInPlan);

  // Separate One-time vs Monthly vs Yearly
  const oneTimeItems = planItems.filter((i) => !i.recurring);
  const monthlyItems = planItems.filter((i) => i.recurring === "monthly");
  const yearlyItems = planItems.filter((i) => i.recurring === "yearly");

  // Further separate one-time into "Now" and "Later"
  const nowItems = oneTimeItems.filter((i) => i.when === "now");
  const laterItems = oneTimeItems.filter((i) => i.when === "later");

  const sumRange = (items: typeof planItems) => {
    let min = 0;
    let max = 0;
    for (const item of items) {
      min += item.priceUSD.min;
      max += item.priceUSD.max;
    }
    return { min, max };
  };

  const oneTimeTotal = sumRange(oneTimeItems);
  const nowTotal = sumRange(nowItems);
  const laterTotal = sumRange(laterItems);
  const monthlyTotal = sumRange(monthlyItems);
  const yearlyTotal = sumRange(yearlyItems);

  // Category breakdown for one-time costs
  const categoryBreakdown: {
    category: (typeof CATEGORIES)[0];
    count: number;
    min: number;
    max: number;
    pct: number;
  }[] = [];

  const maxTotalForChart = Math.max(oneTimeTotal.max, 1);

  for (const cat of CATEGORIES) {
    const catItems = oneTimeItems.filter((i) => i.category === cat.id);
    if (catItems.length > 0) {
      const { min, max } = sumRange(catItems);
      categoryBreakdown.push({
        category: cat,
        count: catItems.length,
        min,
        max,
        pct: Math.round((max / maxTotalForChart) * 100),
      });
    }
  }

  categoryBreakdown.sort((a, b) => b.max - a.max);

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(tempRate);
    if (!isNaN(parsed) && parsed > 0) {
      store.setInrRate(parsed);
      setEditingRate(false);
    }
  };

  const selectAllNow = () => {
    const nowIds = INITIAL_WISHLIST_ITEMS.filter((i) => i.when === "now").map((i) => i.id);
    store.setInPlanBatch(nowIds, true);
  };

  const selectAll = () => {
    const allIds = INITIAL_WISHLIST_ITEMS.map((i) => i.id);
    store.setInPlanBatch(allIds, true);
  };

  const clearAll = () => {
    store.setInPlanBatch(
      INITIAL_WISHLIST_ITEMS.map((i) => i.id),
      false
    );
  };

  const exportCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Category",
      "Brand",
      "When",
      "Recurring",
      "Min USD",
      "Max USD",
      "Min INR",
      "Max INR",
      "Status",
      "Priority",
    ];

    const rows = planItems.map((i) => [
      `"${i.id}"`,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.category}"`,
      `"${(i.brand || "").replace(/"/g, '""')}"`,
      `"${i.when}"`,
      `"${i.recurring || "one-time"}"`,
      i.priceUSD.min,
      i.priceUSD.max,
      Math.round(i.priceUSD.min * rate),
      Math.round(i.priceUSD.max * rate),
      `"${i.status}"`,
      `"${i.priority}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `siddiq-blueprint-budget-plan-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => store.setBudgetDrawerOpen(false)}
          className="fixed inset-0 bg-[#111110]/50 backdrop-blur-sm transition-opacity"
        />

        {/* Slide-over Container */}
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-screen max-w-2xl bg-[#F7F7F5] border-l border-[#E8E8E4] shadow-2xl flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-[#E8E8E4] flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#4F46E5]" />
                <h2 className="text-lg font-semibold text-[#111110]">
                  Interactive Budget Planner
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-[#F1F1EE] text-[#111110]">
                  {planItems.length} items
                </span>
              </div>

              <button
                onClick={() => store.setBudgetDrawerOpen(false)}
                className="p-1.5 rounded-lg border border-[#E8E8E4] text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] transition-colors"
                aria-label="Close budget planner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Quick Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-white border border-[#E8E8E4] shadow-xs text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#8A8A80] font-medium">Quick plan:</span>
                  <button
                    onClick={selectAllNow}
                    className="px-2.5 py-1 rounded-lg bg-[#F1F1EE] hover:bg-stone-200 text-[#111110] font-medium transition-colors"
                  >
                    All &quot;Now&quot; Items
                  </button>
                  <button
                    onClick={selectAll}
                    className="px-2.5 py-1 rounded-lg bg-[#F1F1EE] hover:bg-stone-200 text-[#111110] font-medium transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-2.5 py-1 rounded-lg text-[#57574F] hover:text-[#111110] transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <button
                  onClick={exportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#111110] text-white font-medium hover:bg-stone-800 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Running Grand Total Hero Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#111110] to-stone-900 text-white shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span>Running Total (Selected in Plan)</span>
                  {/* Exchange rate widget */}
                  <div className="flex items-center gap-1.5">
                    {editingRate ? (
                      <form onSubmit={handleRateSubmit} className="flex items-center gap-1">
                        <span className="text-stone-300 font-mono">₹</span>
                        <input
                          type="number"
                          value={tempRate}
                          onChange={(e) => setTempRate(e.target.value)}
                          className="w-16 px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700 text-xs text-white font-mono focus:outline-none"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="p-1 rounded bg-stone-700 text-white hover:bg-stone-600"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={() => {
                          setTempRate(rate.toString());
                          setEditingRate(true);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-400 hover:text-stone-200 underline decoration-dotted"
                        title="Click to edit exchange rate"
                      >
                        ₹{rate} / $1 USD
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-bold tracking-tight mb-1 tabular-nums font-mono">
                  ${oneTimeTotal.min.toLocaleString()} &ndash; ${oneTimeTotal.max.toLocaleString()}
                  <span className="text-sm font-normal text-stone-400 ml-2">USD</span>
                </div>

                <div className="text-sm font-medium text-stone-300 mb-6 font-mono tabular-nums">
                  Approx. ₹{Math.round((oneTimeTotal.min * rate) / 100000).toLocaleString()}L &ndash; ₹
                  {Math.round((oneTimeTotal.max * rate) / 100000).toLocaleString()}L INR
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-800 text-xs">
                  <div>
                    <div className="text-stone-400 mb-0.5">&quot;Now&quot; Core Bucket</div>
                    <div className="font-semibold text-white font-mono tabular-nums">
                      ${nowTotal.min.toLocaleString()} &ndash; ${nowTotal.max.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-stone-400 mb-0.5">&quot;Later&quot; Big Milestones</div>
                    <div className="font-semibold text-stone-300 font-mono tabular-nums">
                      ${laterTotal.min.toLocaleString()} &ndash; ${laterTotal.max.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recurring Running Costs Section */}
              {(monthlyItems.length > 0 || yearlyItems.length > 0) && (
                <div className="p-5 rounded-2xl bg-white border border-[#E8E8E4] shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#4F46E5]" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111110]">
                      Recurring Operating Costs (Separate from Capital)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {monthlyItems.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E4]">
                        <div className="text-[#8A8A80] font-medium">Monthly Running Total</div>
                        <div className="text-lg font-bold text-[#111110] mt-0.5 font-mono tabular-nums">
                          ${monthlyTotal.min} &ndash; ${monthlyTotal.max}
                          <span className="text-xs font-normal text-[#57574F]"> / month</span>
                        </div>
                        <div className="text-[11px] text-[#57574F] mt-1 font-mono">
                          Approx. {formatINR(monthlyTotal.min, rate)} &ndash; {formatINR(monthlyTotal.max, rate)} / mo
                        </div>
                      </div>
                    )}

                    {yearlyItems.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8E4]">
                        <div className="text-[#8A8A80] font-medium">Yearly Recurring Total</div>
                        <div className="text-lg font-bold text-[#111110] mt-0.5 font-mono tabular-nums">
                          ${yearlyTotal.min} &ndash; ${yearlyTotal.max}
                          <span className="text-xs font-normal text-[#57574F]"> / year</span>
                        </div>
                        <div className="text-[11px] text-[#57574F] mt-1 font-mono">
                          Approx. {formatINR(yearlyTotal.min, rate)} &ndash; {formatINR(yearlyTotal.max, rate)} / yr
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Category Breakdown (Animated SVG/CSS Bar Chart) */}
              {categoryBreakdown.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-[#E8E8E4] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A8A80]">
                      Expenditure by Category
                    </h3>
                    <span className="text-xs text-[#8A8A80] font-mono">
                      {categoryBreakdown.length} active
                    </span>
                  </div>

                  <div className="space-y-3">
                    {categoryBreakdown.map((item) => (
                      <div key={item.category.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#111110]">
                            {item.category.shortName}
                            <span className="text-[#8A8A80] font-normal ml-1">
                              ({item.count})
                            </span>
                          </span>
                          <span className="font-mono text-[#111110] font-semibold tabular-nums">
                            ${item.min.toLocaleString()} &ndash; ${item.max.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#F1F1EE] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(item.pct, 3)}%` }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full bg-[#111110] rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Items List in Plan */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8E8E4] shadow-xs space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A8A80]">
                    Items in Active Plan ({planItems.length})
                  </h3>
                </div>

                {planItems.length === 0 ? (
                  <div className="text-center py-8 text-[#8A8A80] text-xs">
                    No items selected in budget plan yet. Click &quot;+ Add to Plan&quot; on any card.
                  </div>
                ) : (
                  <div className="divide-y divide-[#F1F1EE]">
                    {planItems.map((item) => (
                      <div
                        key={item.id}
                        className="py-2.5 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="truncate flex-1">
                          <div className="font-medium text-[#111110] truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#8A8A80] truncate">
                            {item.category} {item.recurring ? `&middot; ${item.recurring}` : ""}
                          </div>
                        </div>

                        <div className="font-mono text-[#111110] font-medium shrink-0 tabular-nums">
                          {formatUSD(item.priceUSD.min)} &ndash; {formatUSD(item.priceUSD.max)}
                        </div>

                        <button
                          onClick={() => store.toggleInPlan(item.id)}
                          className="p-1 rounded text-[#8A8A80] hover:text-[#DC2626] transition-colors"
                          title="Remove from plan"
                          aria-label={`Remove ${item.name} from plan`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
