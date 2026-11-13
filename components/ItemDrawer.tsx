"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Bookmark,
  Layers,
  FileCheck2,
  Camera,
} from "lucide-react";
import { useWishlistStore, getResolvedItem } from "@/lib/store";
import { INITIAL_WISHLIST_ITEMS, Item } from "@/data/wishlist";
import { formatPriceRange, formatUSD } from "@/lib/format";
import { ItemVisual, ASSET_CACHE_KEY } from "./ItemVisual";
import manifestData from "@/data/image-manifest.json";

interface ItemDrawerContentProps {
  item: Item & { isPinned: boolean; isInPlan: boolean };
  rate: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

type DrawerTab = "overview" | "specs" | "alternatives" | "notes";

function ItemDrawerContent({
  item,
  rate,
  onClose,
  onNext,
  onPrev,
}: ItemDrawerContentProps) {
  const store = useWishlistStore();
  const [activeTab, setActiveTab] = useState<DrawerTab>("overview");
  const [copiedLink, setCopiedLink] = useState(false);
  const [localNotes, setLocalNotes] = useState(item.notes || "");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const price = formatPriceRange(item.priceUSD.min, item.priceUSD.max, rate);
  const isBought = item.status === "bought";
  const isCompared = store.compareItemIds.includes(item.id);

  const manifestEntry = (manifestData.items as Record<string, { credit?: string; photographer?: string }>)[item.id];
  const rawCredit = manifestEntry?.credit || manifestEntry?.photographer || "Curated Photography";
  const photoCredit = rawCredit.replace(/User Verified Product Photo/gi, "Official Product Photography");

  // Derive images list
  const imagesList =
    item.images && item.images.length > 0
      ? item.images
      : [`/images/items/${item.id}.webp`];
  const hasMultipleImages = imagesList.length > 1;

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  };

  // Derive domain from link
  let domain = "";
  let isSearchUrl = false;
  if (item.link) {
    try {
      const urlObj = new URL(item.link);
      domain = urlObj.hostname.replace(/^www\./, "");
      isSearchUrl = domain.includes("google.") || !item.linkVerified;
    } catch {
      domain = "product-link";
    }
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNotes(e.target.value);
    store.setItemNotes(item.id, e.target.value);
  };

  const handleStatusChange = (status: "wishlist" | "planned" | "saving" | "bought") => {
    store.setItemStatus(item.id, status);
    if (status === "bought") {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const copyProductLink = () => {
    const url = item.link || window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F7F5] overflow-hidden">
      {/* Sticky Top Header with Prev/Next, Title & Close */}
      <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-white border-b border-[#E8E8E4] flex items-center justify-between gap-4 shrink-0 z-20">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onPrev}
            className="p-1.5 rounded-lg border border-[#E8E8E4] text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] transition-colors"
            title="Previous item"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNext}
            className="p-1.5 rounded-lg border border-[#E8E8E4] text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] transition-colors"
            title="Next item"
            aria-label="Next item"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action icons right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => store.togglePin(item.id)}
            className={`p-1.5 rounded-lg border transition-all ${
              item.isPinned
                ? "bg-amber-500 text-white border-amber-600"
                : "border-[#E8E8E4] text-[#57574F] hover:bg-[#F1F1EE]"
            }`}
            title="Pin item"
            aria-label="Pin item"
          >
            <Bookmark className={`w-4 h-4 ${item.isPinned ? "fill-white" : ""}`} />
          </button>

          <button
            onClick={() => store.toggleCompareItem(item.id)}
            className={`p-1.5 rounded-lg border transition-all ${
              isCompared
                ? "bg-[#4F46E5] text-white border-indigo-700"
                : "border-[#E8E8E4] text-[#57574F] hover:bg-[#F1F1EE]"
            }`}
            title="Compare item"
            aria-label="Compare item"
          >
            <Layers className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#E8E8E4] text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] transition-colors"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-5 sm:space-y-6">
        {/* Interactive Image Gallery Carousel */}
        <div className="space-y-3">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white border border-[#E8E8E4] shadow-sm select-none group">
            <ItemVisual
              item={item}
              aspectRatio="16/10"
              priority
              overrideSrc={imagesList[currentImageIndex]}
            />
            {isBought && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-[#16A34A] text-white shadow-md flex items-center gap-1.5 z-10">
                <Check className="w-4 h-4" />
                Acquired
              </div>
            )}

            {hasMultipleImages && (
              <>
                {/* Arrow navigation */}
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md shadow-lg transition-all duration-150 z-10 opacity-90 hover:scale-105"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md shadow-lg transition-all duration-150 z-10 opacity-90 hover:scale-105"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Counter Pill */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-medium z-10">
                  {currentImageIndex + 1} / {imagesList.length}
                </div>

                {/* Slide indicator dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                  {imagesList.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        idx === currentImageIndex
                          ? "w-6 bg-white"
                          : "w-1.5 bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {hasMultipleImages && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
              {imagesList.map((imgSrc, idx) => {
                const isActive = idx === currentImageIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 aspect-[16/10] shrink-0 rounded-xl overflow-hidden border transition-all duration-150 ${
                      isActive
                        ? "border-[#4F46E5] ring-2 ring-[#4F46E5]/40 shadow-sm scale-102"
                        : "border-[#E8E8E4] opacity-65 hover:opacity-100 hover:border-stone-400"
                    }`}
                  >
                    <Image
                      src={imgSrc.includes("?") ? `${imgSrc}&${ASSET_CACHE_KEY}` : `${imgSrc}?${ASSET_CACHE_KEY}`}
                      alt={`${item.name} thumbnail ${idx + 1}`}
                      fill
                      unoptimized
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Title, Brand & Summary */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#8A8A80] uppercase tracking-wider font-semibold">
            <span>{item.brand || item.category}</span>
            <span>&middot;</span>
            <span className="capitalize">{item.category.replace("-", " ")}</span>
            {item.when === "later" && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-stone-900 text-white font-mono">
                Later Milestone
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#111110] tracking-tight">
            {item.name}
          </h2>

          <p className="text-sm sm:text-base text-[#57574F] leading-relaxed">
            {item.summary}
          </p>
        </div>

        {/* Navigation Tabs (Overview / Specs / Alternatives / Notes) */}
        <div className="flex items-center gap-1 p-1 bg-[#F1F1EE] rounded-xl border border-[#E8E8E4] text-xs font-medium">
          {(["overview", "specs", "alternatives", "notes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 rounded-lg capitalize transition-all ${
                activeTab === tab
                  ? "bg-white text-[#111110] font-semibold shadow-xs"
                  : "text-[#57574F] hover:text-[#111110]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-5">
            {/* Quick Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-white border border-[#E8E8E4]">
                <div className="text-[10px] font-semibold uppercase text-[#8A8A80]">Timeline</div>
                <div className="text-sm font-semibold text-[#111110] mt-0.5 capitalize">
                  {item.when === "now" ? "Core Roadmap" : "Future Milestone"}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E8E8E4]">
                <div className="text-[10px] font-semibold uppercase text-[#8A8A80]">Priority</div>
                <div className="text-sm font-semibold text-[#111110] mt-0.5 capitalize flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.priority === "high"
                        ? "bg-[#DC2626]"
                        : item.priority === "medium"
                        ? "bg-[#D97706]"
                        : "bg-[#8A8A80]"
                    }`}
                  />
                  <span>{item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}</span>
                </div>
              </div>
            </div>

            {/* Candidate Group Selector for Motorcycles */}
            {item.candidateGroup === "motorcycle-choice" && (
              <div className="p-4 rounded-xl bg-white border border-emerald-200/80 shadow-xs text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-[#111110]">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>Motorcycle Selection (1 of 4 Models)</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.isInPlan ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {item.isInPlan ? "Active in Budget Plan" : "Alternative Model"}
                  </span>
                </div>
                <p className="text-[#57574F] leading-relaxed">
                  Only one motorcycle is budgeted in your total. Selecting this machine sets it as your active choice and updates your budget seamlessly.
                </p>
                {!item.isInPlan ? (
                  <button
                    onClick={() => store.toggleInPlan(item.id)}
                    className="w-full py-2 rounded-lg bg-[#111110] hover:bg-black text-white text-xs font-semibold transition-colors mt-1"
                  >
                    Select This Motorcycle for Plan
                  </button>
                ) : (
                  <div className="text-[11px] text-emerald-700 font-medium">
                    &bull; Currently budgeted as your active motorcycle selection.
                  </div>
                )}
              </div>
            )}

            {/* Sub-items / Component Breakdown */}
            {item.subItems && item.subItems.length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-[#E8E8E4] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A8A80]">
                    Component &amp; Recipe Breakdown
                  </h3>
                  <span className="text-xs text-[#8A8A80] font-mono">
                    {item.subItems.length} items
                  </span>
                </div>
                <div className="space-y-2">
                  {item.subItems.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8E4]/60 flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-semibold text-[#111110]">{sub.name}</div>
                        {sub.detail && (
                          <div className="text-[#57574F] mt-0.5 leading-relaxed">{sub.detail}</div>
                        )}
                      </div>
                      {sub.costUSD !== undefined && (
                        <div className="text-right font-mono font-semibold text-[#111110] shrink-0">
                          {formatUSD(sub.costUSD)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legal Verification Checklist (for Land/Real estate) */}
            {item.checklist && item.checklist.length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-[#E8E8E4] space-y-3">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#16A34A]" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A8A80]">
                    Due Diligence &amp; Legal Verification
                  </h3>
                </div>
                <ul className="space-y-2 text-xs">
                  {item.checklist.map((check, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[#57574F]">
                      <div className="w-4 h-4 rounded border border-[#E8E8E4] bg-[#F7F7F5] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#16A34A]" />
                      </div>
                      <span className="leading-relaxed">{check}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Specs */}
        {activeTab === "specs" && (
          <div className="p-5 rounded-2xl bg-white border border-[#E8E8E4] shadow-xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A8A80] mb-3">
              Technical Specifications
            </h3>
            {item.specs.length > 0 ? (
              <dl className="divide-y divide-[#F1F1EE]">
                {item.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1"
                  >
                    <dt className="text-[#57574F] font-medium sm:w-1/3">{spec.label}</dt>
                    <dd className="text-[#111110] font-mono sm:w-2/3 sm:text-right font-medium">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-xs text-[#8A8A80] py-4">No technical specs recorded.</p>
            )}
          </div>
        )}

        {/* Tab 3: Alternatives */}
        {activeTab === "alternatives" && (
          <div className="p-5 rounded-2xl bg-white border border-[#E8E8E4] shadow-xs space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A8A80]">
              Considered Alternatives
            </h3>
            {item.alternatives && item.alternatives.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {item.alternatives.map((alt, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-[#F1F1EE] border border-[#E8E8E4] text-[#111110] text-xs font-medium"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8A8A80] py-4">No direct alternatives listed.</p>
            )}
          </div>
        )}

        {/* Tab 4: Notes */}
        {activeTab === "notes" && (
          <div className="p-5 rounded-2xl bg-white border border-[#E8E8E4] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="drawer-notes"
                className="text-xs font-semibold uppercase tracking-wider text-[#8A8A80]"
              >
                Personal Notes &amp; Observations
              </label>
            </div>
            <textarea
              id="drawer-notes"
              value={localNotes}
              onChange={handleNotesChange}
              rows={6}
              placeholder="Record quotes, serial numbers, discount codes, or notes here..."
              className="w-full p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8E4] text-xs text-[#111110] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] placeholder:text-[#8A8A80] resize-none leading-relaxed font-sans"
            />
          </div>
        )}

        {/* Footer Credit & Copy Link */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-[#8A8A80]">
          <span className="flex items-center gap-1.5">
            <Camera className="w-3 h-3" />
            <span>{photoCredit}</span>
          </span>

          <button
            onClick={copyProductLink}
            className="inline-flex items-center gap-1 hover:text-[#111110] transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span className="text-[#16A34A] font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sticky Bottom Bar with Price, Status & Product Page */}
      <div className="p-4 sm:p-5 bg-white border-t border-[#E8E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-lg z-20">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A80]">
            Estimated Investment
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#111110] tracking-tight tabular-nums">
            {price.usd}
          </div>
          <div className="text-[11px] font-mono text-[#57574F]">
            {price.inr} &middot; ₹{rate}/$
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Select */}
          <select
            value={item.status}
            onChange={(e) =>
              handleStatusChange(
                e.target.value as "wishlist" | "planned" | "saving" | "bought"
              )
            }
            aria-label="Change status"
            className="px-3 py-2.5 rounded-xl border border-[#E8E8E4] bg-white text-xs font-semibold text-[#111110] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] cursor-pointer"
          >
            <option value="wishlist">Status: Wishlist</option>
            <option value="planned">Status: Planned</option>
            <option value="saving">Status: Saving</option>
            <option value="bought">Status: Bought</option>
          </select>

          {/* View Product Button */}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111110] text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
            >
              <span>View on {domain}</span>
              {isSearchUrl ? (
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                  verify
                </span>
              ) : (
                <ExternalLink className="w-3.5 h-3.5" />
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ItemDrawer() {
  const store = useWishlistStore();
  const rate = store.inrRate || 88;

  const selectedItemRaw = INITIAL_WISHLIST_ITEMS.find(
    (i) => i.id === store.selectedDetailItemId
  );

  const item = selectedItemRaw ? getResolvedItem(selectedItemRaw, store) : null;

  // Keyboard navigation: ESC to close, Left/Right arrows to navigate
  useEffect(() => {
    if (!store.selectedDetailItemId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement
      ) {
        if (e.key === "Escape") {
          store.closeDetail();
        }
        return;
      }

      if (e.key === "Escape") {
        store.closeDetail();
      } else if (e.key === "ArrowRight") {
        store.navigateDetail("next");
      } else if (e.key === "ArrowLeft") {
        store.navigateDetail("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [store]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => store.closeDetail()}
          className="fixed inset-0 bg-[#111110]/50 backdrop-blur-sm transition-opacity"
        />

        {/* Slide-over panel / bottom sheet on mobile */}
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-full sm:w-[90vw] md:w-[680px] lg:w-[760px] max-w-full bg-[#F7F7F5] border-l border-[#E8E8E4] shadow-2xl flex flex-col h-full overflow-hidden"
          >
            <ItemDrawerContent
              key={item.id}
              item={item}
              rate={rate}
              onClose={() => store.closeDetail()}
              onNext={() => store.navigateDetail("next")}
              onPrev={() => store.navigateDetail("prev")}
            />
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
