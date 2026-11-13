"use client";

import { useState } from "react";
import Image from "next/image";
import { Laptop, Cpu, Gamepad2, Shirt, Compass, Sparkles, Flame, HeartPulse, GraduationCap, Gift, Plane, Building2, Package } from "lucide-react";
import { CategoryId } from "@/data/categories";

interface ItemImageProps {
  src?: string;
  alt: string;
  category: CategoryId;
  brand?: string;
  className?: string;
  priority?: boolean;
}

const CATEGORY_ICONS: Record<CategoryId, React.ComponentType<{ className?: string }>> = {
  "gaming-pc": Cpu,
  "gaming-room": Gamepad2,
  "dev-setup": Laptop,
  "outfits": Shirt,
  "bike": Compass,
  "grooming": Sparkles,
  "diet": Flame,
  "home-health": HeartPulse,
  "career": GraduationCap,
  "gifts": Gift,
  "travel": Plane,
  "big-purchases": Building2,
};

export function ItemImage({
  src,
  alt,
  category,
  brand,
  className = "",
  priority = false,
}: ItemImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const IconComponent = CATEGORY_ICONS[category] || Package;

  if (!src || hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-6 select-none relative overflow-hidden ${className}`}
        style={{
          background: "linear-gradient(135deg, #F5F5F4 0%, #E7E5E4 100%)",
        }}
        aria-label={alt}
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-sm border border-stone-200/60 flex items-center justify-center text-stone-600 mb-2 transition-transform duration-300 group-hover:scale-105">
          <IconComponent className="w-7 h-7" />
        </div>
        {brand && (
          <span className="text-[11px] font-medium tracking-wider uppercase text-stone-400 truncate max-w-[85%]">
            {brand}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-stone-100 ${className}`}>
      {/* Skeleton / Blur Background while loading */}
      <div
        className={`absolute inset-0 bg-stone-100 transition-opacity duration-500 flex items-center justify-center ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-10 h-10 rounded-xl bg-stone-200/70 animate-pulse flex items-center justify-center text-stone-400">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
        className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-98"
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
