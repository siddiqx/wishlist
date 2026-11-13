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
  FileText,
  Sliders,
  Scale,
  Calendar,
  Tag,
  CheckCircle2,
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
  const [copiedSpecs, setCopiedSpecs] = useState(false);
  const [localNotes, setLocalNotes] = useState(item.notes || "");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const priorityColor =
    item.priority === "high"
      ? "bg-[#DC2626]"
      : item.priority === "medium"
      ? "bg-[#D97706]"
      : "bg-[#8A8A80]";

  const handleCopySpecs = () => {
    if (!item.specs || item.specs.length === 0) return;
    const text =
      `${item.name} Specifications:\n` +
      item.specs.map((s) => `${s.label}: ${s.value}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopiedSpecs(true);
    setTimeout(() => setCopiedSpecs(false), 2000);
  };

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
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-[#E8E8E4] flex items-center justify-between gap-3 shrink-0 z-20">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onPrev}
            className="p-2 rounded-xl border border-[#E8E8E4] text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] active:scale-95 transition-all"
            title="Previous item"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNext}
            className="p-2 rounded-xl border border-[#E8E8E4] text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] active:scale-95 transition-all"
            title="Next item"
            aria-label="Next item"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action icons right */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => store.togglePin(item.id)}
            className={`p-2 rounded-xl border transition-all active:scale-95 ${
              item.isPinned
                ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                : "border-[#E8E8E4] text-[#57574F] hover:bg-[#F1F1EE]"
            }`}
            title="Pin item"
            aria-label="Pin item"
          >
            <Bookmark className={`w-4 h-4 ${item.isPinned ? "fill-white" : ""}`} />
          </button>

          <button
            onClick={() => store.toggleCompareItem(item.id)}
            className={`p-2 rounded-xl border transition-all active:scale-95 ${
              isCompared
                ? "bg-[#4F46E5] text-white border-indigo-700 shadow-xs"
                : "border-[#E8E8E4] text-[#57574F] hover:bg-[#F1F1EE]"
            }`}
            title="Compare item"
            aria-label="Compare item"
          >
            <Layers className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-[#E8E8E4] text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] active:scale-95 transition-all"
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
            <div
              className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
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

        {/* Navigation Tabs (Details / Specs / Alternatives / Notes) */}
        <div className="flex items-center gap-1 p-1 bg-[#F1F1EE] rounded-xl border border-[#E8E8E4] text-xs font-medium">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-2 sm:py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === "overview"
                ? "bg-white text-[#111110] font-semibold shadow-xs"
                : "text-[#57574F] hover:text-[#111110]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <button
            onClick={() => setActiveTab("specs")}
            className={`flex-1 py-2 sm:py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === "specs"
                ? "bg-white text-[#111110] font-semibold shadow-xs"
                : "text-[#57574F] hover:text-[#111110]"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Specs</span>
            {item.specs && item.specs.length > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === "specs"
                    ? "bg-[#111110] text-white"
                    : "bg-[#E8E8E4] text-[#57574F]"
                }`}
              >
                {item.specs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("alternatives")}
            className={`flex-1 py-2 sm:py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === "alternatives"
                ? "bg-white text-[#111110] font-semibold shadow-xs"
                : "text-[#57574F] hover:text-[#111110]"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Alternatives</span>
            <span className="sm:hidden">Alts</span>
            {item.alternatives && item.alternatives.length > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === "alternatives"
                    ? "bg-[#111110] text-white"
                    : "bg-[#E8E8E4] text-[#57574F]"
                }`}
              >
                {item.alternatives.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`flex-1 py-2 sm:py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === "notes"
                ? "bg-white text-[#111110] font-semibold shadow-xs"
                : "text-[#57574F] hover:text-[#111110]"
            }`}
          >
            <span>Notes</span>
            {localNotes.trim() && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
            )}
          </button>
        </div>

        {/* Tab 1: Details (Overview) */}
        {activeTab === "overview" && (
          <div className="space-y-4 sm:space-y-5">
            {/* Executive 4-Metric Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {/* Metric 1: Timeline */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#E8E8E4] shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase text-[#8A8A80]">
                  <Calendar className="w-3 h-3 text-[#4F46E5]" />
                  <span>Timeline</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#111110] mt-1 capitalize">
                  {item.when === "now" ? "Core Roadmap" : "Future Milestone"}
                </div>
                <div className="text-[10px] text-[#8A8A80] mt-0.5 truncate">
                  {item.when === "now" ? "Immediate acquisition" : "Scheduled milestone"}
                </div>
              </div>

              {/* Metric 2: Priority */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#E8E8E4] shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase text-[#8A8A80]">
                  <span className={`w-2 h-2 rounded-full ${priorityColor}`} />
                  <span>Priority</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#111110] mt-1 capitalize">
                  {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Tier
                </div>
                <div className="text-[10px] text-[#8A8A80] mt-0.5 truncate">
                  {item.priority === "high"
                    ? "Essential gear"
                    : item.priority === "medium"
                    ? "Standard priority"
                    : "Elective upgrade"}
                </div>
              </div>

              {/* Metric 3: Plan Allocation */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#E8E8E4] shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase text-[#8A8A80]">
                  <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                  <span>Budget Plan</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold mt-1">
                  <span className={item.isInPlan ? "text-[#4F46E5]" : "text-[#57574F]"}>
                    {item.isInPlan ? "In Active Plan" : "Not in Plan"}
                  </span>
                </div>
                <div className="text-[10px] text-[#8A8A80] mt-0.5 truncate">
                  {item.isInPlan ? "Counted in total" : "Excluded from total"}
                </div>
              </div>

              {/* Metric 4: Category */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#E8E8E4] shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase text-[#8A8A80]">
                  <Tag className="w-3 h-3 text-[#D97706]" />
                  <span>Category</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#111110] mt-1 capitalize truncate">
                  {item.category.replace("-", " ")}
                </div>
                <div className="text-[10px] text-[#8A8A80] mt-0.5 capitalize">
                  Status: {item.status}
                </div>
              </div>
            </div>

            {/* Candidate Group Selector for Motorcycles */}
            {item.candidateGroup === "motorcycle-choice" && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-emerald-200/80 shadow-xs text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-[#111110]">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>Motorcycle Selection (1 of 4 Models)</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.isInPlan
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {item.isInPlan ? "Active in Budget Plan" : "Alternative Model"}
                  </span>
                </div>
                <p className="text-[#57574F] leading-relaxed text-[11px] sm:text-xs">
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
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-[#E8E8E4] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A8A80]">
                      Component Breakdown
                    </h3>
                  </div>
                  <span className="text-xs text-[#8A8A80] font-mono">
                    {item.subItems.length} items
                  </span>
                </div>
                <div className="space-y-2">
                  {item.subItems.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 sm:p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8E4]/60 flex items-start justify-between gap-2.5 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-[#111110] truncate">
                          {sub.name}
                        </div>
                        {sub.detail && (
                          <div className="text-[#57574F] text-[11px] mt-0.5 leading-snug line-clamp-2">
                            {sub.detail}
                          </div>
                        )}
                      </div>
                      {sub.costUSD !== undefined && (
                        <div className="text-right font-mono font-semibold text-[#111110] shrink-0 pl-2">
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
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-[#E8E8E4] shadow-xs space-y-3">
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
                      <span className="leading-relaxed text-[11px] sm:text-xs">{check}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Plan Switcher Card */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#E8E8E4] shadow-xs flex items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-semibold text-[#111110]">Interactive Budget Plan</div>
                <div className="text-[#8A8A80] text-[11px] mt-0.5">
                  {item.isInPlan
                    ? "Included in running total calculation"
                    : "Add this item to calculate total expenditure"}
                </div>
              </div>
              <button
                onClick={() => store.toggleInPlan(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                  item.isInPlan
                    ? "bg-[#EEF0FF] text-[#4F46E5] border border-indigo-200"
                    : "bg-[#111110] text-white hover:bg-stone-800"
                }`}
              >
                {item.isInPlan ? "Remove Plan" : "+ Add to Plan"}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Specs (Optimized Mobile Spec Sheet) */}
        {activeTab === "specs" && (
          <div className="space-y-4">
            {/* Top 2 to 4 Hero Metric Chips */}
            {item.specs && item.specs.length > 0 && (
              <div className="grid grid-cols-2 gap-2.5">
                {item.specs.slice(0, 4).map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#E8E8E4] shadow-xs"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A80] truncate">
                      {spec.label}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#111110] font-mono mt-0.5 truncate tabular-nums">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Complete Specifications Sheet */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-[#E8E8E4] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A8A80]">
                    Verified Technical Specifications
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#8A8A80]">
                  {item.specs.length} fields
                </span>
              </div>

              {item.specs && item.specs.length > 0 ? (
                <div className="space-y-1.5 pt-1">
                  {item.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 sm:p-3 rounded-xl bg-[#F7F7F5]/70 hover:bg-[#F1F1EE] border border-[#E8E8E4]/40 flex items-center justify-between text-xs gap-3 transition-colors"
                    >
                      <span className="text-[#57574F] font-medium text-[11px] sm:text-xs shrink-0 max-w-[45%]">
                        {spec.label}
                      </span>
                      <span className="text-[#111110] font-mono font-semibold text-[11px] sm:text-xs text-right tabular-nums break-words flex-1">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#8A8A80] py-4 text-center">
                  No technical specs recorded.
                </p>
              )}

              {item.specs && item.specs.length > 0 && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleCopySpecs}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E8E4] bg-[#F7F7F5] hover:bg-stone-200 text-[#57574F] hover:text-[#111110] text-[11px] font-medium transition-colors"
                  >
                    {copiedSpecs ? (
                      <>
                        <Check className="w-3 h-3 text-[#16A34A]" />
                        <span className="text-[#16A34A] font-semibold">Specs Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Spec Sheet</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Alternatives */}
        {activeTab === "alternatives" && (
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-[#E8E8E4] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-[#4F46E5]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A8A80]">
                  Considered Alternatives
                </h3>
              </div>
              <span className="text-[11px] text-[#8A8A80] font-mono">
                {item.alternatives?.length || 0} models
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-[#57574F] leading-relaxed">
              Alternative models evaluated during blueprint research within the same tier or price-to-performance threshold:
            </p>

            {item.alternatives && item.alternatives.length > 0 ? (
              <div className="space-y-2 pt-1">
                {item.alternatives.map((alt, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8E4] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                      <span className="font-semibold text-[#111110] truncate">{alt}</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-white border border-[#E8E8E4] text-[#8A8A80] shrink-0">
                      Option
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8A8A80] py-4 text-center">
                No direct alternatives listed.
              </p>
            )}
          </div>
        )}

        {/* Tab 4: Notes */}
        {activeTab === "notes" && (
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-[#E8E8E4] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="drawer-notes"
                className="text-xs font-semibold uppercase tracking-wider text-[#8A8A80]"
              >
                Personal Notes &amp; Observations
              </label>
              <span className="text-[10px] font-mono text-[#8A8A80]">
                Saved to device
              </span>
            </div>

            {/* Quick Insert Snippet Chips for Mobile */}
            <div
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px]"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <button
                type="button"
                onClick={() => {
                  const addition = (localNotes ? "\n" : "") + "Quotation: $";
                  setLocalNotes(localNotes + addition);
                  store.setItemNotes(item.id, localNotes + addition);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F1F1EE] hover:bg-stone-200 text-[#57574F] hover:text-[#111110] whitespace-nowrap transition-colors"
              >
                + Quotation
              </button>
              <button
                type="button"
                onClick={() => {
                  const addition = (localNotes ? "\n" : "") + "Target Date: ";
                  setLocalNotes(localNotes + addition);
                  store.setItemNotes(item.id, localNotes + addition);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F1F1EE] hover:bg-stone-200 text-[#57574F] hover:text-[#111110] whitespace-nowrap transition-colors"
              >
                + Target Date
              </button>
              <button
                type="button"
                onClick={() => {
                  const addition = (localNotes ? "\n" : "") + "Serial / Config: ";
                  setLocalNotes(localNotes + addition);
                  store.setItemNotes(item.id, localNotes + addition);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F1F1EE] hover:bg-stone-200 text-[#57574F] hover:text-[#111110] whitespace-nowrap transition-colors"
              >
                + Serial No.
              </button>
              <button
                type="button"
                onClick={() => {
                  const addition = (localNotes ? "\n" : "") + "Vendor / Store: ";
                  setLocalNotes(localNotes + addition);
                  store.setItemNotes(item.id, localNotes + addition);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F1F1EE] hover:bg-stone-200 text-[#57574F] hover:text-[#111110] whitespace-nowrap transition-colors"
              >
                + Vendor
              </button>
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
      <div className="p-3.5 sm:p-5 pb-[max(1rem,env(safe-area-inset-bottom))] bg-white border-t border-[#E8E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-lg z-20">
        <div className="flex items-baseline sm:block justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A80]">
              Estimated Investment
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#111110] tracking-tight tabular-nums">
              {price.usd}
            </div>
          </div>
          <div className="text-[11px] font-mono text-[#57574F] text-right sm:text-left sm:mt-0.5">
            {price.inr} &middot; ₹{rate}/$
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
          {/* Status Select */}
          <select
            value={item.status}
            onChange={(e) =>
              handleStatusChange(
                e.target.value as "wishlist" | "planned" | "saving" | "bought"
              )
            }
            aria-label="Change status"
            className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-[#E8E8E4] bg-[#F7F7F5] sm:bg-white text-xs font-semibold text-[#111110] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] cursor-pointer text-center"
          >
            <option value="wishlist">Wishlist</option>
            <option value="planned">Planned</option>
            <option value="saving">Saving</option>
            <option value="bought">Bought</option>
          </select>

          {/* View Product Button */}
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#111110] text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
            >
              <span className="truncate">View Product</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          ) : (
            <div />
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
            className="w-full sm:w-[90vw] md:w-[680px] lg:w-[760px] max-w-full bg-[#F7F7F5] border-l border-[#E8E8E4] shadow-2xl flex flex-col h-dvh overflow-hidden"
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
