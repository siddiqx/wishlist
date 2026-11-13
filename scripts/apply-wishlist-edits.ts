import fs from "fs";
import path from "path";

const WISHLIST_PATH = path.join(process.cwd(), "data", "wishlist.ts");
let content = fs.readFileSync(WISHLIST_PATH, "utf-8");

// 1. Remove Shure MV7+ item block
// Match from { id: "shure-mv7-plus" ... to },
const shureRegex = /\s*\{\s*id:\s*"shure-mv7-plus"[\s\S]*?\n\s*\},/;
if (shureRegex.test(content)) {
  content = content.replace(shureRegex, "");
  console.log("✓ Removed Shure MV7+ & Rode PSA1+ from wishlist.ts");
} else {
  console.log("! Shure MV7+ not found via regex");
}

// 2. Replace Dell UltraSharp U2723QE with Samsung Odyssey OLED G9
const dellRegex = /\s*\{\s*id:\s*"dell-u2723qe-monitor"[\s\S]*?\n\s*\},/;
const samsungG9Block = `
  {
    id: "samsung-odyssey-oled-g9",
    category: "dev-setup",
    name: 'Samsung Odyssey OLED G9 (G93SC 49" Curved 240Hz)',
    brand: "Samsung",
    summary: "49-inch 32:9 Dual QHD (5120×1440) 1800R curved gaming/productivity monitor with QD-OLED panel, 240Hz refresh rate, 0.03ms response time, and Neo Quantum Processor Pro.",
    specs: [
      { label: "Screen & Aspect", value: "49-inch (32:9 Aspect Ratio) | 5120 × 1440 Dual QHD (Dual 27-inch 1440p seamless)" },
      { label: "Panel Technology", value: "QD-OLED (Quantum Dot OLED) | DisplayHDR True Black 400 | 1,000,000:1 Contrast" },
      { label: "Speed & Motion", value: "240Hz refresh rate with 0.03ms (GtG) near-instantaneous response time" },
      { label: "Curvature & Immersion", value: "1800R curve matching natural peripheral vision field" },
      { label: "Color Coverage", value: "99% DCI-P3 color gamut | Factory color calibrated" },
      { label: "Processor & Smart Engine", value: "Neo Quantum Processor Pro with AI burn-in mitigation algorithm" },
      { label: "Multitasking & Ports", value: "DisplayPort 1.4, HDMI 2.1, Micro HDMI 2.1, USB Hub, Picture-by-Picture (PBP/PIP)" },
    ],
    alternatives: ["Alienware AW3423DWF 34-inch QD-OLED ($800)", "LG UltraGear 45GR95QE 45-inch OLED ($1,200)"],
    priceUSD: { min: 1000, max: 1300 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: ["/images/items/samsung-odyssey-oled-g9.webp"],
    link: "https://www.samsung.com/us/computing/monitors/gaming/49-odyssey-oled-g95sc-dqhd-neo-quantum-processor-pro-0-03ms-240hz-curved-smart-gaming-monitor-ls49cg954snxza/",
    linkVerified: true,
    tags: ["monitor", "ultrawide", "oled", "qd-oled", "240hz", "dev-setup"],
  },`;

if (dellRegex.test(content)) {
  content = content.replace(dellRegex, samsungG9Block);
  console.log("✓ Replaced Dell UltraSharp with Samsung Odyssey OLED G9 (G93SC)");
} else {
  console.log("! Dell monitor not found via regex");
}

// 3. Multi-image updates
const multiImageUpdates: Record<string, string[]> = {
  "keychron-q1-pro": [
    "/images/items/keychron-q1-pro.webp",
    "/images/items/keychron-q1-pro-2.webp",
    "/images/items/keychron-q1-pro-3.webp",
  ],
  "lg-dualup-28": [
    "/images/items/lg-dualup-28.webp",
    "/images/items/lg-dualup-28-2.webp",
    "/images/items/lg-dualup-28-3.webp",
  ],
  "caldigit-ts4-dock-kit": [
    "/images/items/caldigit-ts4-dock-kit.webp",
    "/images/items/caldigit-ts4-dock-kit-2.webp",
  ],
  "philips-oneblade": [
    "/images/items/philips-oneblade.webp",
    "/images/items/philips-oneblade-2.webp",
  ],
  "garment-steamer-hangers": [
    "/images/items/garment-steamer-hangers.webp",
    "/images/items/garment-steamer-hangers-2.webp",
  ],
  "cotton-chinos-pack": [
    "/images/items/cotton-chinos-pack.webp",
    "/images/items/cotton-chinos-pack-2.webp",
  ],
  "desk-mat-qck-heavy": [
    "/images/items/desk-mat-qck-heavy.webp",
    "/images/items/desk-mat-qck-heavy-2.webp",
  ],
  "daily-supplements-stack": [
    "/images/items/daily-supplements-stack.webp",
    "/images/items/daily-supplements-stack-2.webp",
  ],
  "motorcycle-gloves-boots-armor": [
    "/images/items/motorcycle-gloves-boots-armor.webp",
    "/images/items/motorcycle-gloves-boots-armor-2.webp",
  ],
  "gaming-room-lighting-acoustics": [
    "/images/items/gaming-room-lighting-acoustics.webp",
    "/images/items/gaming-room-lighting-acoustics-2.webp",
  ],
};

for (const [id, images] of Object.entries(multiImageUpdates)) {
  const itemPattern = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?images:\\s*\\[)[^\\]]*(\\])`);
  if (itemPattern.test(content)) {
    const formattedImages = JSON.stringify(images, null, 6).replace(/\]$/, "    ]");
    content = content.replace(itemPattern, `$1${formattedImages.slice(1, -5)}$2`);
    console.log(`✓ Updated multiple images for: ${id} (${images.length} photos)`);
  } else {
    console.log(`! Item ${id} not matched for multi-images`);
  }
}

fs.writeFileSync(WISHLIST_PATH, content, "utf-8");
console.log("Successfully updated data/wishlist.ts!");
