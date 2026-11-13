import fs from "fs";
import path from "path";
import sharp from "sharp";
import { INITIAL_WISHLIST_ITEMS } from "../data/wishlist";
import { CATEGORIES } from "../data/categories";

const ITEMS_DIR = path.join(process.cwd(), "public", "images", "items");
const CATEGORIES_DIR = path.join(process.cwd(), "public", "images", "categories");
const MANIFEST_PATH = path.join(process.cwd(), "data", "image-manifest.json");

fs.mkdirSync(ITEMS_DIR, { recursive: true });
fs.mkdirSync(CATEGORIES_DIR, { recursive: true });

interface ManifestEntry {
  localPath: string;
  sourceUrl?: string;
  status: "downloaded" | "fallback";
  blurDataURL?: string;
  credit?: string;
  width?: number;
  height?: number;
}

interface ImageManifest {
  items: Record<string, ManifestEntry>;
  categories: Record<string, ManifestEntry>;
}

// Load existing manifest if present
let manifest: ImageManifest = { items: {}, categories: {} };
if (fs.existsSync(MANIFEST_PATH)) {
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  } catch {
    manifest = { items: {}, categories: {} };
  }
}

// Helper: fetch buffer with timeout and polite headers
async function fetchBuffer(url: string, timeoutMs = 8000): Promise<Buffer | null> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    });
    clearTimeout(id);

    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch {
    clearTimeout(id);
    return null;
  }
}

// Helper: scrape og:image or twitter:image from a webpage
async function scrapePageImage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    clearTimeout(timer);

    if (!res.ok) return null;
    const html = await res.text();

    const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    if (ogMatch?.[1]) return ogMatch[1];

    const twMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
    if (twMatch?.[1]) return twMatch[1];

    return null;
  } catch {
    return null;
  }
}

// Process single item image
async function processItem(item: (typeof INITIAL_WISHLIST_ITEMS)[0]) {
  const targetFile = path.join(ITEMS_DIR, `${item.id}.webp`);
  const localPath = `/images/items/${item.id}.webp`;

  // Skip if already downloaded and exists on disk
  if (fs.existsSync(targetFile) && manifest.items[item.id]?.status === "downloaded") {
    console.log(`[SKIP] ${item.id} already exists`);
    return;
  }

  let imageBuffer: Buffer | null = null;
  let sourceUrl: string | undefined = undefined;

  // Layer 1: Scrape official page if verified link exists
  if (item.link && item.linkVerified && !item.link.includes("google.com/search")) {
    try {
      console.log(`[LAYER 1] Checking official link for ${item.name}...`);
      const scrapedUrl = await scrapePageImage(item.link);
      if (scrapedUrl) {
        imageBuffer = await fetchBuffer(scrapedUrl);
        if (imageBuffer) {
          sourceUrl = scrapedUrl;
          console.log(`[LAYER 1 SUCCESS] Fetched from ${scrapedUrl.slice(0, 50)}...`);
        }
      }
    } catch {
      // Continue to next layer
    }
  }

  // Layer 2: Curated high-res URL from item definition
  if (!imageBuffer && item.images && item.images.length > 0) {
    for (const url of item.images) {
      if (url.startsWith("http")) {
        console.log(`[LAYER 2] Downloading curated photo for ${item.name}...`);
        imageBuffer = await fetchBuffer(url);
        if (imageBuffer) {
          sourceUrl = url;
          break;
        }
      }
    }
  }

  // Convert with sharp and save as WebP
  if (imageBuffer) {
    try {
      const pipeline = sharp(imageBuffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 82 });

      await pipeline.toFile(targetFile);

      // Generate a tiny 16px wide blur placeholder
      const blurBuffer = await sharp(imageBuffer)
        .resize({ width: 16 })
        .webp({ quality: 20 })
        .toBuffer();

      const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

      manifest.items[item.id] = {
        localPath,
        sourceUrl,
        status: "downloaded",
        blurDataURL,
        credit: "Curated Product Photography",
        width: 1200,
        height: 900,
      };

      console.log(`[SAVED] ${localPath}`);
      return;
    } catch (err) {
      console.warn(`[SHARP ERROR] Failed processing ${item.id}:`, err);
    }
  }

  // Layer 3: Mark as fallback tile
  console.log(`[LAYER 3 FALLBACK] ${item.id} will use designed tile`);
  manifest.items[item.id] = {
    localPath,
    status: "fallback",
    credit: "The Needs List Editorial Tile",
  };
}

// Category covers
const CATEGORY_COVERS: Record<string, string> = {
  "gaming-pc": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1400&q=80",
  "gaming-room": "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1400&q=80",
  "dev-setup": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80",
  "outfits": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80",
  "bike": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=80",
  "grooming": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=80",
  "diet": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80",
  "home-health": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1400&q=80",
  "career": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80",
  "gifts": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80",
  "travel": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1400&q=80",
  "big-purchases": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
};

async function processCategories() {
  for (const cat of CATEGORIES) {
    const target = path.join(CATEGORIES_DIR, `${cat.id}.webp`);
    const localPath = `/images/categories/${cat.id}.webp`;

    if (fs.existsSync(target) && manifest.categories[cat.id]?.status === "downloaded") {
      continue;
    }

    const coverUrl = CATEGORY_COVERS[cat.id];
    if (coverUrl) {
      const buffer = await fetchBuffer(coverUrl);
      if (buffer) {
        try {
          await sharp(buffer)
            .resize({ width: 1400, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(target);

          const blur = await sharp(buffer).resize({ width: 16 }).webp({ quality: 20 }).toBuffer();

          manifest.categories[cat.id] = {
            localPath,
            sourceUrl: coverUrl,
            status: "downloaded",
            blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
          };
          console.log(`[CATEGORY COVER SAVED] ${localPath}`);
        } catch (e) {
          console.warn(`Failed category cover ${cat.id}:`, e);
        }
      }
    }
  }
}

// Concurrency runner (3 at a time)
async function run() {
  console.log("=== Starting Image Ingestion ===");

  const items = INITIAL_WISHLIST_ITEMS;
  const concurrency = 3;

  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);
    await Promise.all(chunk.map((item) => processItem(item)));
  }

  console.log("=== Processing Category Covers ===");
  await processCategories();

  // Save manifest
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to ${MANIFEST_PATH}`);

  const total = items.length;
  const downloaded = Object.values(manifest.items).filter((e) => e.status === "downloaded").length;
  const fallbacks = total - downloaded;

  console.log(`\nSummary:`);
  console.log(`- Total items: ${total}`);
  console.log(`- Downloaded local WebPs: ${downloaded}`);
  console.log(`- Layer 3 designed fallbacks: ${fallbacks}`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
