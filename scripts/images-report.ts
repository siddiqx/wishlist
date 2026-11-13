import fs from "fs";
import path from "path";
import { INITIAL_WISHLIST_ITEMS } from "../data/wishlist";

const MANIFEST_PATH = path.join(process.cwd(), "data", "image-manifest.json");

function report() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.log("No manifest found. Please run: pnpm images:fetch");
    return;
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  const items = INITIAL_WISHLIST_ITEMS;

  const downloadedList: string[] = [];
  const fallbackList: { id: string; name: string; category: string }[] = [];

  for (const item of items) {
    const entry = manifest.items[item.id];
    const filePath = path.join(process.cwd(), "public", "images", "items", `${item.id}.webp`);

    if (entry?.status === "downloaded" && fs.existsSync(filePath)) {
      downloadedList.push(item.id);
    } else {
      fallbackList.push({ id: item.id, name: item.name, category: item.category });
    }
  }

  console.log("\n==========================================");
  console.log("       IMAGE MANIFEST AUDIT REPORT        ");
  console.log("==========================================");
  console.log(`Total catalogue items: ${items.length}`);
  console.log(`Local WebP images ready (Layer 1 & 2): ${downloadedList.length} (${Math.round((downloadedList.length / items.length) * 100)}%)`);
  console.log(`Designed fallback tiles (Layer 3): ${fallbackList.length}`);
  console.log("------------------------------------------");

  if (fallbackList.length > 0) {
    console.log("\nItems currently using designed Layer 3 fallback tiles:");
    fallbackList.forEach((f, idx) => {
      console.log(`  ${idx + 1}. [${f.category}] ${f.name} (id: ${f.id})`);
    });
    console.log("\nTip: To replace any fallback, place an image at /public/images/items/<id>.webp");
  } else {
    console.log("\nAll items have verified local WebP images! (0 missing)");
  }
  console.log("==========================================\n");
}

report();
