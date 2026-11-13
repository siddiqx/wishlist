"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Calculator, CheckCircle2 } from "lucide-react";
import { useWishlistStore } from "@/lib/store";
import { computeCatalogueSummary } from "@/lib/filters";
import { INITIAL_WISHLIST_ITEMS } from "@/data/wishlist";
import { AnimatedNumber } from "./AnimatedNumber";
import { ASSET_CACHE_KEY } from "./ItemVisual";

// Spotlight card helper for cursor tracking effect
function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl bg-white border border-[#E8E8E4] p-5 shadow-[0_2px_8px_-2px_rgba(17,17,16,0.05)] transition-all duration-300 hover:shadow-[0_12px_24px_-6px_rgba(17,17,16,0.08)] ${className}`}
    >
      {/* Cursor spotlight halo */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 70, 229, 0.06), transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function Hero() {
  const store = useWishlistStore();
  const summary = computeCatalogueSummary(INITIAL_WISHLIST_ITEMS, store);
  const rate = store.inrRate || 88;

  const scrollToCatalogue = () => {
    const el = document.getElementById("catalogue");
    if (el) {
      const topOffset = 130;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 border-b border-[#E8E8E4] bg-[#F7F7F5] overflow-hidden">
      {/* Background radial ambiance */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Two-Column Hero Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#EEF0FF] text-[#4F46E5] border border-indigo-200/50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
              Siddiq&apos;s Blueprint &middot; 2026 Edition
            </motion.div>

            {/* Display Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal text-[#111110] tracking-tight leading-[1.06]">
                The Blueprint
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-lg text-[#57574F] font-normal leading-relaxed max-w-xl"
            >
              An executive personal registry of engineering workstation hardware, touring machines,
              tailored wardrobe, and generational milestones — planned with exact specifications.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <button
                onClick={scrollToCatalogue}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#111110] text-white text-sm font-medium hover:bg-stone-800 active:scale-[0.97] transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
              >
                <span>Browse Catalogue</span>
                <ArrowDown className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => store.setBudgetDrawerOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#111110] text-sm font-medium border border-[#E8E8E4] hover:bg-[#F1F1EE] active:scale-[0.97] transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
              >
                <Calculator className="w-4 h-4 text-[#4F46E5]" />
                <span>Open Budget Planner</span>
                <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-mono bg-[#EEF0FF] text-[#4F46E5] font-semibold">
                  {store.inPlanItemIds.length} in plan
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Floating Product Collage (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative h-80 sm:h-96 w-full hidden sm:block"
          >
            {/* Collage Card 1: MacBook Pro (Center Top) */}
            <div className="absolute top-2 left-6 w-48 sm:w-56 aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-[0_12px_24px_-6px_rgba(17,17,16,0.1)] border border-[#E8E8E4] transform -rotate-3 hover:rotate-0 transition-transform duration-300 z-20">
              <Image
                src={`/images/items/macbook-pro-14-m-pro.webp?${ASSET_CACHE_KEY}`}
                alt="MacBook Pro"
                fill
                unoptimized
                sizes="250px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-semibold text-white drop-shadow">MacBook Pro 14&quot;</span>
              </div>
            </div>

            {/* Collage Card 2: Interceptor 650 (Right Top) */}
            <div className="absolute top-8 right-2 w-44 sm:w-52 aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-[0_12px_24px_-6px_rgba(17,17,16,0.1)] border border-[#E8E8E4] transform rotate-4 hover:rotate-0 transition-transform duration-300 z-10">
              <Image
                src={`/images/items/re-interceptor-650.webp?${ASSET_CACHE_KEY}`}
                alt="Interceptor 650"
                fill
                unoptimized
                sizes="250px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-semibold text-white drop-shadow">Interceptor 650</span>
              </div>
            </div>

            {/* Collage Card 3: Alienware Monitor (Bottom Left) */}
            <div className="absolute bottom-2 left-12 w-48 sm:w-56 aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-[0_12px_24px_-6px_rgba(17,17,16,0.12)] border border-[#E8E8E4] transform rotate-2 hover:rotate-0 transition-transform duration-300 z-30">
              <Image
                src={`/images/items/alienware-aw2725df.webp?${ASSET_CACHE_KEY}`}
                alt="Alienware 360Hz QD-OLED"
                fill
                unoptimized
                sizes="250px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-semibold text-white drop-shadow">Alienware 360Hz OLED</span>
              </div>
            </div>

            {/* Collage Card 4: Tissot Powermatic Watch (Bottom Right) */}
            <div className="absolute bottom-6 right-8 w-36 sm:w-44 aspect-square rounded-2xl overflow-hidden bg-white shadow-[0_12px_24px_-6px_rgba(17,17,16,0.1)] border border-[#E8E8E4] transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-20">
              <Image
                src={`/images/items/tissot-gentleman-powermatic.webp?${ASSET_CACHE_KEY}`}
                alt="Tissot Gentleman Powermatic"
                fill
                unoptimized
                sizes="200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                <span className="text-[10px] font-semibold text-white drop-shadow">Tissot Powermatic 80</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Live Stat Cards with Cursor Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {/* Stat 1: Total Items */}
          <SpotlightCard>
            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A8A80] mb-1">
              Catalogue Items
            </div>
            <div className="text-xl sm:text-3xl font-bold text-[#111110] tracking-tight tabular-nums flex items-baseline gap-1.5">
              <AnimatedNumber value={summary.totalItems} />
              <span className="text-xs font-normal text-[#8A8A80]">items</span>
            </div>
            <div className="text-[11px] sm:text-xs text-[#57574F] mt-2 truncate">
              Across 12 categorized blueprints
            </div>
          </SpotlightCard>

          {/* Stat 2: Core One-Time Estimate */}
          <SpotlightCard>
            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A8A80] mb-1 flex items-center justify-between">
              <span className="truncate">Core One-Time</span>
              <span className="text-[10px] font-mono text-[#8A8A80] shrink-0 ml-1">₹{rate}/$</span>
            </div>
            <div className="text-xl sm:text-3xl font-bold text-[#111110] tracking-tight tabular-nums">
              ${Math.round(summary.oneTimeUSD.min / 1000)}k&ndash;${Math.round(summary.oneTimeUSD.max / 1000)}k
            </div>
            <div className="text-[11px] sm:text-xs text-[#57574F] mt-2 truncate">
              ₹{(summary.oneTimeINR.min / 100000).toFixed(1)}L&ndash;₹{(summary.oneTimeINR.max / 100000).toFixed(1)}L INR
            </div>
          </SpotlightCard>

          {/* Stat 3: Completion Progress Ring */}
          <SpotlightCard>
            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A8A80] mb-1 flex items-center justify-between">
              <span>Acquired</span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#16A34A] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {summary.percentageComplete}%
              </span>
            </div>
            <div className="text-xl sm:text-3xl font-bold text-[#111110] tracking-tight tabular-nums flex items-baseline gap-1.5">
              <AnimatedNumber value={summary.totalAcquired} />
              <span className="text-xs sm:text-sm font-normal text-[#8A8A80]">/ {summary.totalItems}</span>
            </div>
            <div className="w-full h-1.5 bg-[#F1F1EE] rounded-full mt-3 overflow-hidden">
              <div
                style={{ width: `${Math.max(summary.percentageComplete, 2)}%` }}
                className="h-full bg-[#16A34A] rounded-full transition-all duration-700"
              />
            </div>
          </SpotlightCard>

          {/* Stat 4: Monthly Running Cost */}
          <SpotlightCard>
            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A8A80] mb-1 truncate">
              Monthly Running Cost
            </div>
            <div className="text-xl sm:text-3xl font-bold text-[#111110] tracking-tight tabular-nums">
              ${summary.monthlyRecurringUSD.min}&ndash;${summary.monthlyRecurringUSD.max}
              <span className="text-xs font-normal text-[#8A8A80]">/mo</span>
            </div>
            <div className="text-[11px] sm:text-xs text-[#57574F] mt-2 truncate">
              Grooming, diet, gym, bike &amp; insurance
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
