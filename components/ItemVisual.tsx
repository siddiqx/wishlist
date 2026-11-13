"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Laptop,
  Cpu,
  Gamepad2,
  Shirt,
  Compass,
  Sparkles,
  Flame,
  HeartPulse,
  GraduationCap,
  Gift,
  Plane,
  Building2,
  Package,
} from "lucide-react";
import { CategoryId } from "@/data/categories";

// Global cache-busting token to ensure no browser serves stale image caches
export const ASSET_CACHE_KEY = "v=blueprint-20261113-v7";

interface ItemVisualProps {
  item: {
    id: string;
    name: string;
    brand?: string;
    category: CategoryId;
    focal?: string;
    images?: string[];
  };
  aspectRatio?: "4/3" | "16/10" | "1/1" | "custom";
  className?: string;
  priority?: boolean;
  imageIndex?: number;
  overrideSrc?: string;
}

const CATEGORY_ICONS: Record<CategoryId, React.ComponentType<{ className?: string }>> = {
  "gaming-pc": Cpu,
  "gaming-room": Gamepad2,
  "dev-setup": Laptop,
  outfits: Shirt,
  bike: Compass,
  grooming: Sparkles,
  diet: Flame,
  "home-health": HeartPulse,
  career: GraduationCap,
  gifts: Gift,
  travel: Plane,
  "big-purchases": Building2,
};

const CATEGORY_THEMES: Record<
  CategoryId,
  {
    bgGradient: string;
    iconColor: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  "gaming-pc": {
    bgGradient: "from-indigo-100/60 via-stone-50 to-indigo-50/40",
    iconColor: "text-indigo-600",
    badgeBg: "bg-indigo-50 border-indigo-200",
    badgeText: "text-indigo-700",
  },
  "gaming-room": {
    bgGradient: "from-violet-100/60 via-stone-50 to-violet-50/40",
    iconColor: "text-violet-600",
    badgeBg: "bg-violet-50 border-violet-200",
    badgeText: "text-violet-700",
  },
  "dev-setup": {
    bgGradient: "from-blue-100/60 via-stone-50 to-blue-50/40",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-50 border-blue-200",
    badgeText: "text-blue-700",
  },
  outfits: {
    bgGradient: "from-amber-100/60 via-stone-50 to-amber-50/40",
    iconColor: "text-amber-700",
    badgeBg: "bg-amber-50 border-amber-200",
    badgeText: "text-amber-800",
  },
  bike: {
    bgGradient: "from-slate-200/60 via-stone-50 to-slate-100/40",
    iconColor: "text-slate-700",
    badgeBg: "bg-slate-100 border-slate-200",
    badgeText: "text-slate-800",
  },
  grooming: {
    bgGradient: "from-rose-100/60 via-stone-50 to-rose-50/40",
    iconColor: "text-rose-600",
    badgeBg: "bg-rose-50 border-rose-200",
    badgeText: "text-rose-700",
  },
  diet: {
    bgGradient: "from-emerald-100/60 via-stone-50 to-emerald-50/40",
    iconColor: "text-emerald-700",
    badgeBg: "bg-emerald-50 border-emerald-200",
    badgeText: "text-emerald-800",
  },
  "home-health": {
    bgGradient: "from-teal-100/60 via-stone-50 to-teal-50/40",
    iconColor: "text-teal-700",
    badgeBg: "bg-teal-50 border-teal-200",
    badgeText: "text-teal-800",
  },
  career: {
    bgGradient: "from-sky-100/60 via-stone-50 to-sky-50/40",
    iconColor: "text-sky-700",
    badgeBg: "bg-sky-50 border-sky-200",
    badgeText: "text-sky-800",
  },
  gifts: {
    bgGradient: "from-pink-100/60 via-stone-50 to-pink-50/40",
    iconColor: "text-pink-600",
    badgeBg: "bg-pink-50 border-pink-200",
    badgeText: "text-pink-700",
  },
  travel: {
    bgGradient: "from-cyan-100/60 via-stone-50 to-cyan-50/40",
    iconColor: "text-cyan-700",
    badgeBg: "bg-cyan-50 border-cyan-200",
    badgeText: "text-cyan-800",
  },
  "big-purchases": {
    bgGradient: "from-stone-200/70 via-stone-100 to-stone-50",
    iconColor: "text-stone-700",
    badgeBg: "bg-stone-100 border-stone-200",
    badgeText: "text-stone-800",
  },
};

export function ItemVisual({
  item,
  aspectRatio = "4/3",
  className = "",
  priority = false,
  imageIndex = 0,
  overrideSrc,
}: ItemVisualProps) {
  const [hasError, setHasError] = useState(false);

  // Resolve source: overrideSrc -> item.images[imageIndex] -> /images/items/${item.id}.webp
  let rawSrc = `/images/items/${item.id}.webp`;
  if (overrideSrc) {
    rawSrc = overrideSrc;
  } else if (item.images && item.images[imageIndex]) {
    rawSrc = item.images[imageIndex];
  }

  // Append cache busting version token to bust stale browser/server cache
  const imageSrc = rawSrc.includes("?")
    ? `${rawSrc}&${ASSET_CACHE_KEY}`
    : `${rawSrc}?${ASSET_CACHE_KEY}`;

  const Icon = CATEGORY_ICONS[item.category] || Package;
  const theme = CATEGORY_THEMES[item.category] || CATEGORY_THEMES["big-purchases"];

  const aspectClass =
    aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : aspectRatio === "16/10"
      ? "aspect-[16/10]"
      : aspectRatio === "1/1"
      ? "aspect-square"
      : "";

  // Graceful fallback ONLY if the image actually fails to load (e.g. 404 network error)
  if (hasError) {
    return (
      <div
        className={`relative w-full h-full ${aspectClass} overflow-hidden bg-gradient-to-br ${theme.bgGradient} p-6 flex flex-col justify-between border border-stone-200/70 select-none ${className}`}
      >
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#111110_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <span
            className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${theme.badgeBg} ${theme.badgeText}`}
          >
            {item.brand || item.category.replace("-", " ")}
          </span>
          <div className="w-8 h-8 rounded-xl bg-white/80 shadow-sm border border-stone-200/50 flex items-center justify-center">
            <Icon className={`w-4 h-4 ${theme.iconColor}`} />
          </div>
        </div>

        <div className="relative z-10 my-auto py-2 text-center">
          <div className="font-display text-2xl sm:text-3xl text-stone-900 leading-tight tracking-tight line-clamp-2">
            {item.name}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 font-mono">
          <span>THE BLUEPRINT</span>
          <span className="capitalize">{item.category}</span>
        </div>
      </div>
    );
  }

  // Direct, unoptimized high-res WebP rendering: 100% opacity immediately
  return (
    <div className={`relative w-full h-full ${aspectClass} overflow-hidden bg-stone-100 ${className}`}>
      {/* Subtle background placeholder (behind the image at z-0) */}
      <div className="absolute inset-0 bg-stone-100 flex items-center justify-center z-0 pointer-events-none">
        <Icon className="w-6 h-6 text-stone-300" />
      </div>

      <Image
        src={imageSrc}
        alt={item.name}
        fill
        unoptimized
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
        className={`object-cover ${item.focal || "object-center"} relative z-1 transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
