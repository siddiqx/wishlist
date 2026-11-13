import fs from "fs";
import path from "path";
import sharp from "sharp";
import { INITIAL_WISHLIST_ITEMS } from "../data/wishlist";

const MANIFEST_PATH = path.join(process.cwd(), "data", "image-manifest.json");
const ITEMS_DIR = path.join(process.cwd(), "public", "images", "items");

async function downloadAndProcess(url: string, destPath: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const buffer = Buffer.from(await res.arrayBuffer());

    // Generate webp
    await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true, fit: "inside" })
      .webp({ quality: 85 })
      .toFile(destPath);

    // Generate blur placeholder base64
    const blurBuffer = await sharp(buffer)
      .resize(16, 16, { fit: "cover" })
      .webp({ quality: 20 })
      .toBuffer();

    return `data:image/webp;base64,${blurBuffer.toString("base64")}`;
  } finally {
    clearTimeout(timeout);
  }
}

async function run() {
  if (!fs.existsSync(ITEMS_DIR)) {
    fs.mkdirSync(ITEMS_DIR, { recursive: true });
  }

  let manifest: {
    lastRun: string;
    items: Record<string, unknown>;
  } = {
    lastRun: new Date().toISOString(),
    items: {},
  };

  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
    } catch {
      // fresh
    }
  }

  console.log(`Starting image audit and download for ${INITIAL_WISHLIST_ITEMS.length} items...`);

  let newlyDownloaded = 0;
  let alreadyPresent = 0;
  let failed = 0;

  for (const item of INITIAL_WISHLIST_ITEMS) {
    const destPath = path.join(ITEMS_DIR, `${item.id}.webp`);

    if (fs.existsSync(destPath)) {
      alreadyPresent++;
      const entry = manifest.items[item.id] as { status?: string } | undefined;
      if (!entry || entry.status !== "downloaded") {
        manifest.items[item.id] = {
          id: item.id,
          name: item.name,
          category: item.category,
          sourceUrl: item.images?.[0] || "",
          localPath: `/images/items/${item.id}.webp`,
          status: "downloaded",
          photographer: item.brand || "Official Studio Press",
        };
      }
      continue;
    }

    const sourceUrl = item.images?.[0];
    if (!sourceUrl) {
      console.log(`[SKIP] No image URL configured for: ${item.id}`);
      continue;
    }

    console.log(`[DOWNLOADING] ${item.id} from ${sourceUrl.slice(0, 70)}...`);
    try {
      const blurDataURL = await downloadAndProcess(sourceUrl, destPath);
      manifest.items[item.id] = {
        id: item.id,
        name: item.name,
        category: item.category,
        sourceUrl,
        localPath: `/images/items/${item.id}.webp`,
        status: "downloaded",
        blurDataURL,
        photographer: item.brand || "Curated Photography",
      };
      newlyDownloaded++;
      console.log(`  ✓ Saved: ${item.id}.webp`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ✗ Failed to download ${item.id}: ${msg}`);
      failed++;
    }
  }

  manifest.lastRun = new Date().toISOString();
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log("\n=================================");
  console.log(`Done!`);
  console.log(`  Already present: ${alreadyPresent}`);
  console.log(`  Newly downloaded: ${newlyDownloaded}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total items on disk: ${alreadyPresent + newlyDownloaded} / ${INITIAL_WISHLIST_ITEMS.length}`);
  console.log("=================================\n");
}

run();
