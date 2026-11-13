import fs from "fs";
import path from "path";
import { INITIAL_WISHLIST_ITEMS } from "../data/wishlist";

const WISHLIST_PATH = path.join(process.cwd(), "data", "wishlist.ts");
const PUBLIC_ITEMS_DIR = path.join(process.cwd(), "public", "images", "items");

let content = fs.readFileSync(WISHLIST_PATH, "utf-8");

console.log(`Standardizing image paths to local verified WebP assets for ${INITIAL_WISHLIST_ITEMS.length} items...`);

let updatedCount = 0;

for (const item of INITIAL_WISHLIST_ITEMS) {
  const images: string[] = [`/images/items/${item.id}.webp`];

  const p2 = path.join(PUBLIC_ITEMS_DIR, `${item.id}-2.webp`);
  if (fs.existsSync(p2)) {
    images.push(`/images/items/${item.id}-2.webp`);
  }

  const p3 = path.join(PUBLIC_ITEMS_DIR, `${item.id}-3.webp`);
  if (fs.existsSync(p3)) {
    images.push(`/images/items/${item.id}-3.webp`);
  }

  // Regex to find item block and replace its images: [...]
  const pattern = new RegExp(`(id:\\s*"${item.id}"[\\s\\S]*?images:\\s*\\[)[^\\]]*(\\])`);
  if (pattern.test(content)) {
    const formatted = JSON.stringify(images, null, 6).replace(/\]$/, "    ]");
    content = content.replace(pattern, `$1${formatted.slice(1, -5)}$2`);
    updatedCount++;
  } else {
    console.warn(`Could not match item in content: ${item.id}`);
  }
}

fs.writeFileSync(WISHLIST_PATH, content, "utf-8");
console.log(`Successfully standardized all ${updatedCount} items in data/wishlist.ts!`);
