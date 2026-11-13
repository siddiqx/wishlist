import fs from "fs";
import path from "path";
import sharp from "sharp";

const ITEMS_DIR = path.join(process.cwd(), "public", "images", "items");
const MANIFEST_PATH = path.join(process.cwd(), "data", "image-manifest.json");

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

let manifest: ImageManifest = { items: {}, categories: {} };
if (fs.existsSync(MANIFEST_PATH)) {
  manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
}

const UPGRADED_EXACT_IMAGES: Record<
  string,
  { url: string; credit: string; name: string }
> = {
  // Calibrated Displays & Setup
  "alienware-aw2725df": {
    name: 'Alienware AW2725DF 27" QD-OLED 360Hz',
    url: "https://i.rtings.com/assets/products/2vl7SnXp/dell-alienware-aw2725df/design-large.jpg",
    credit: "RTINGS Laboratory Display Photography",
  },
  "dell-u2723qe-monitor": {
    name: 'Dell UltraSharp U2723QE 27" 4K IPS Black',
    url: "https://i.rtings.com/assets/products/LfEkmKrO/dell-u2723qe/design-large.jpg",
    credit: "RTINGS Laboratory Display Photography",
  },

  // Motorcycles (Studio Shoots)
  "re-interceptor-650": {
    name: "Royal Enfield Interceptor 650",
    url: "https://static-cdn.team-bhp.com/prod/new-bike-cms/Royal-Enfield/Interceptor-650/2025/01/01/2d6002b0-fab0-4040-bc4f-8485e13ad8a0-Royal-Enfield_Interceptor-650_Front-View_Ride-Aesthetics_Brand-Image.jpg",
    credit: "Royal Enfield / Team-BHP Studio",
  },
  "re-himalayan-450": {
    name: "Royal Enfield Himalayan 450 Adventure",
    url: "https://static-cdn.team-bhp.com/prod/new-bike-cms/Royal-Enfield/Himalayan-450/2025/01/02/b6fe62a6-6a4b-4c32-a65a-b39067f72d93-Royal-Enfield_Himalayan-450_Right-Hand-View_Ride-Aesthetics_Brand-Image.jpg",
    credit: "Royal Enfield / Team-BHP Press",
  },
  "triumph-speed-400": {
    name: "Triumph Speed 400 Modern Classic",
    url: "https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto:eco/sitecoremedialibrary/media-library/images/motorcycles/modern-classics/t%20series/speed%20400/speed%20400%20family%20page/speed-400-my24-family-hero-1-1920x1080.jpg",
    credit: "Triumph Motorcycles Official Media",
  },
  "ktm-390-duke": {
    name: "KTM 390 Duke Corner Rocket",
    url: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/220872/390-duke-right-side-view-3.png",
    credit: "KTM / BikeWale Studio",
  },
  "motorcycle-jacket-rynox-storm-evo": {
    name: "Rynox Storm Evo CE Level 2 Riding Jacket",
    url: "https://motocentral.in/cdn/shop/products/RynoxStormEvoJacketBlackSandBrown1.jpg?v=1620223422",
    credit: "Rynox Gears Official",
  },

  // PC Components (No more fake bundles)
  "gaming-pc-cooler-arctic-360": {
    name: "Arctic Liquid Freezer III 360mm AIO Liquid Cooler",
    url: "https://www.arctic.de/media/9d/26/30/1725369416/Liquid_Freezer_III_360_Black_G01_eha_3_awards.png",
    credit: "Arctic Cooling Official",
  },
  "gaming-pc-case-lancool-216": {
    name: "Lian Li Lancool 216 Mesh High-Airflow Mid-Tower Case",
    url: "https://lian-li.com/wp-content/uploads/2022/11/1007_136-b.jpg",
    credit: "Lian Li Official",
  },
  "gaming-pc-psu-corsair-850w": {
    name: "Corsair RM850e 850W 80+ Gold Fully Modular ATX 3.1 PSU",
    url: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024,f_auto/products/rme-series-2025/Gallery/CP-9020296-NA_01.webp",
    credit: "Corsair Official",
  },
  "gaming-pc-windows-build-kit": {
    name: "Windows 11 Home License & Complete System Build Kit",
    url: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/PT_RGB_Windows11_Home_EN_1555x1555-1?qlt=90&hei=1200&wid=1200&bgc=FFFFFFFF&fmt=jpg",
    credit: "Microsoft Corporation Official",
  },

  // Developer Hardware
  "keychron-q1-pro": {
    name: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    url: "https://www.keychron.com/cdn/shop/products/Keychron-Q1-Pro-QMK-VIA-wireless-custom-mechanical-keyboard-knob-75_-layout-full-aluminum-black-frame-for-Mac-Windows-Linux-barebone.jpg",
    credit: "Keychron Official",
  },
  "logitech-mx-master-3s": {
    name: "Logitech MX Master 3S Performance Wireless Mouse",
    url: "https://resource.logitech.com/content/dam/logitech/en/products/mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-top-view-graphite-new-1.png",
    credit: "Logitech Official",
  },
  "kindle-paperwhite": {
    name: 'Amazon Kindle Paperwhite 7" 16GB Glare-Free E-Reader',
    url: "https://upload.wikimedia.org/wikipedia/commons/3/37/2023_Amazon_Kindle_Paperwhite_%281%29.jpg",
    credit: "Amazon / Wikimedia Commons",
  },
};

async function fetchBuffer(url: string, timeoutMs = 12000): Promise<Buffer | null> {
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

    if (!response.ok) {
      console.warn(`[HTTP ${response.status}] for ${url}`);
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    clearTimeout(id);
    console.warn(`[FETCH FAIL] ${url}:`, err);
    return null;
  }
}

async function run() {
  console.log("=== Ingesting Studio Product Photography ===");

  for (const [id, info] of Object.entries(UPGRADED_EXACT_IMAGES)) {
    const targetFile = path.join(ITEMS_DIR, `${id}.webp`);
    const localPath = `/images/items/${id}.webp`;

    console.log(`[INGEST] ${id} -> ${info.name}`);
    const buffer = await fetchBuffer(info.url);

    if (!buffer) {
      console.error(`  x Could not download from: ${info.url}`);
      continue;
    }

    try {
      await sharp(buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 86 })
        .toFile(targetFile);

      const blurBuffer = await sharp(buffer)
        .resize({ width: 16 })
        .webp({ quality: 20 })
        .toBuffer();

      const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

      manifest.items[id] = {
        localPath,
        sourceUrl: info.url,
        status: "downloaded",
        blurDataURL,
        credit: info.credit,
        width: 1200,
        height: 900,
      };

      console.log(`  ✓ Saved ${localPath} (${info.credit})`);
    } catch (err) {
      console.error(`  x Sharp error on ${id}:`, err);
    }
  }

  // Remove deprecated bundles from manifest
  delete manifest.items["gaming-pc-opt-b-bundle"];
  delete manifest.items["gaming-pc-opt-a-sweetspot"];

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nUpdated manifest saved to ${MANIFEST_PATH}`);
}

run().catch(console.error);
