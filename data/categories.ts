export type CategoryId =
  | "gaming-pc"
  | "gaming-room"
  | "dev-setup"
  | "outfits"
  | "bike"
  | "grooming"
  | "diet"
  | "home-health"
  | "career"
  | "gifts"
  | "travel"
  | "big-purchases";

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  estimatedUSD: { min: number; max: number };
  accentColor: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "gaming-pc",
    name: "Gaming PC Builds",
    shortName: "Gaming PC",
    tagline: "Ryzen 9800X3D + RTX 5070 Ti high-end rig & 1440p value options",
    description: "Peak 1440p & 4K gaming rig engineered with optimal thermals, PCIe 5.0 speed, and clean aesthetic components.",
    iconName: "Cpu",
    estimatedUSD: { min: 2100, max: 2800 },
    accentColor: "indigo",
  },
  {
    id: "gaming-room",
    name: "Gaming Battlestation",
    shortName: "Gaming Room",
    tagline: "Alienware 360Hz QD-OLED, Wooting 60HE, Secretlab & PS5 Pro",
    description: "A distraction-free, acoustically treated high-performance battlestation for esports and cinematic gaming.",
    iconName: "Gamepad2",
    estimatedUSD: { min: 4000, max: 5100 },
    accentColor: "violet",
  },
  {
    id: "dev-setup",
    name: "Development Setup",
    shortName: "Dev Setup",
    tagline: "14\" MacBook Pro M-series, Dell 4K + LG DualUp, Herman Miller Aeron",
    description: "Industrial-grade workstation for systems programming, data engineering pipelines, and focused deep work.",
    iconName: "Laptop",
    estimatedUSD: { min: 6400, max: 8600 },
    accentColor: "blue",
  },
  {
    id: "outfits",
    name: "Outfits & Wardrobe",
    shortName: "Outfits",
    tagline: "European linen, Raymond MTM tailoring, Tissot Powermatic & classics",
    description: "Refined, timeless aesthetic: high-breathability Irish linen, bespoke tailored suits, handcrafted shoes and horology.",
    iconName: "Shirt",
    estimatedUSD: { min: 2150, max: 3650 },
    accentColor: "amber",
  },
  {
    id: "bike",
    name: "Motorcycle & Touring",
    shortName: "Bike & Gear",
    tagline: "Interceptor 650 / Himalayan 450, CE armor, Quad Lock & touring kit",
    description: "The ideal two-wheel machine for coastal highway cruises, Western Ghats corners, and long-range touring.",
    iconName: "Compass",
    estimatedUSD: { min: 3850, max: 5800 },
    accentColor: "orange",
  },
  {
    id: "grooming",
    name: "Grooming & Fragrance",
    shortName: "Grooming",
    tagline: "Dermatologist-grade skincare, Philips OneBlade & signature scents",
    description: "Strict morning and evening skin health protocols, Oral-B electric care, and luxury olfactory signatures.",
    iconName: "Sparkles",
    estimatedUSD: { min: 420, max: 650 },
    accentColor: "rose",
  },
  {
    id: "diet",
    name: "High-Protein Diet",
    shortName: "Nutrition & Gym",
    tagline: "137g/day daily protein blueprint, meal-prep gear, supplements & gym",
    description: "Evidence-based daily nutritional intake for muscle hypertrophy, recovery, and consistent metabolic energy.",
    iconName: "Flame",
    estimatedUSD: { min: 1800, max: 2200 },
    accentColor: "emerald",
  },
  {
    id: "home-health",
    name: "Home, Sleep & Health",
    shortName: "Home & Health",
    tagline: "Orthopedic mattress, Xiaomi HEPA, Garmin Forerunner & iPhone Pro",
    description: "Sleep quality optimization, clean indoor air, water filtration, cardiovascular tracking, and home strength equipment.",
    iconName: "HeartPulse",
    estimatedUSD: { min: 3600, max: 5500 },
    accentColor: "teal",
  },
  {
    id: "career",
    name: "College & Certifications",
    shortName: "Career",
    tagline: "Final tuition settlement, AWS & Databricks Certified Data Engineer",
    description: "Closing academic obligations and earning high-leverage data engineering credentials.",
    iconName: "GraduationCap",
    estimatedUSD: { min: 1700, max: 1700 },
    accentColor: "sky",
  },
  {
    id: "gifts",
    name: "Gifts for Girlfriend",
    shortName: "Gifts",
    tagline: "Titan Raga Viva, Hidesign tote, Pandora jewelry, curated escapes",
    description: "Thoughtful milestones, anniversary celebrations, luxury leathercraft, and future engagement planning.",
    iconName: "Gift",
    estimatedUSD: { min: 1020, max: 2380 },
    accentColor: "pink",
  },
  {
    id: "travel",
    name: "Travel & Expeditions",
    shortName: "Travel",
    tagline: "Ooty, Coorg, Kerala, Goa, Pondicherry & Spiti/Ladakh motorcycle ride",
    description: "Quarterly weekend rejuvenation getaways across South India plus an annual high-altitude motorcycle expedition.",
    iconName: "Plane",
    estimatedUSD: { min: 1100, max: 2100 },
    accentColor: "cyan",
  },
  {
    id: "big-purchases",
    name: "Big Purchases (Future)",
    shortName: "Big Purchases",
    tagline: "1 ground Chennai plot (DTCP/CMDA), 1,200 sq ft RCC home, Creta / Kushaq",
    description: "Long-term generational foundation: residential land title, sustainable solar home construction, and family SUV.",
    iconName: "Building2",
    estimatedUSD: { min: 63000, max: 127000 },
    accentColor: "slate",
  },
];
