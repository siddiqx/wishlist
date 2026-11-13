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

// Load manifest
let manifest: ImageManifest = { items: {}, categories: {} };
if (fs.existsSync(MANIFEST_PATH)) {
  manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
}

const EXACT_PRODUCT_IMAGES: Record<
  string,
  { url: string; credit: string; name: string }
> = {
  // Monitors & Desks
  "alienware-aw2725df": {
    name: 'Alienware AW2725DF 27" QD-OLED 360Hz',
    url: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/alienware/aw2725df/media-gallery/monitor-alienware-2725df-black-gallery-1.psd?fmt=jpg&wid=1200",
    credit: "Dell Alienware Official",
  },
  "dell-u2723qe-monitor": {
    name: 'Dell UltraSharp U2723QE 27" 4K IPS Black',
    url: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u2723qe/media-gallery/monitor-u2723qe-gallery-1.psd?fmt=jpg&wid=1200",
    credit: "Dell UltraSharp Official",
  },
  "lg-dualup-28": {
    name: 'LG DualUp 28" 16:18 Ergonomic Monitor',
    url: "https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/82e72cf3-fecc-4875-9e20-5b42030e01d1/md08002085-zoom-01-jpg",
    credit: "LG Electronics Official",
  },
  "flexispot-e7-desk": {
    name: "Flexispot E7 Dual-Motor Standing Desk",
    url: "https://s3.springbeetle.top/prod-common-bucket/commodity/item/1028_file_E7-800-20250326_20260325_wM49YfGB.jpg",
    credit: "Flexispot Official",
  },
  "secretlab-titan-evo": {
    name: "Secretlab Titan Evo Ergonomic Gaming Chair",
    url: "https://images.secretlab.co/theme/common/collections-v2-TITAN-Evo-hero.jpg",
    credit: "Secretlab Official",
  },
  "herman-miller-aeron": {
    name: "Herman Miller Aeron Chair",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Aeron_Chair.jpg",
    credit: "Herman Miller / Wikimedia Commons",
  },

  // Peripherals & Hardware
  "logitech-g-pro-x-superlight-2": {
    name: "Logitech G Pro X Superlight 2 Wireless Mouse",
    url: "https://resource.logitechg.com/w_1200,h_900,ar_4:3,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2/new-gallery-assets-2025/pro-x-superlight-2-mice-top-angle-white-gallery-1.png",
    credit: "Logitech G Official",
  },
  "sony-wh-1000xm6": {
    name: "Sony WH-1000XM6 / XM5 Wireless ANC Headphones",
    url: "https://helpguide.sony.net/mdr/wh1000xm5/v1/en/contents/image/Top_image_WH-1000XM5.png",
    credit: "Sony Corporation Official",
  },
  "playstation-5-pro": {
    name: "Sony PlayStation 5 Pro & DualSense Edge",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/82/PlayStation_5_Pro_no_disc_drive.jpg",
    credit: "Sony PlayStation / Wikimedia Commons",
  },
  "shure-mv7-plus": {
    name: "Shure MV7+ Broadcast Mic & Røde PSA1+",
    url: "https://products.shureweb.eu/cdn-cgi/image/width=1380,height=1380,format=auto/shure_product_db/product_images/files/b52/dda/ab-/original/780ff1532e5f3cb758123e44cec7768b.webp",
    credit: "Shure Official",
  },
  "daikin-inverter-ac": {
    name: "Daikin 1.5-Ton Inverter AC",
    url: "https://daikinindia.com/sites/default/files/inline-images/JTKJ35XV16VAA+RKJ35XV16VAA.jpg",
    credit: "Daikin India Official",
  },
  "synology-ds224-plus": {
    name: "Synology DS224+ 2-Bay NAS",
    url: "https://www.synology.com/img/products/detail/DS224plus/heading.png",
    credit: "Synology Official",
  },
  "caldigit-ts4-dock-kit": {
    name: "CalDigit TS4 Thunderbolt 4 Dock",
    url: "https://www.caldigit.com/wp-content/uploads/elementor/thumbs/TS4_Vertical-Right-Front-View_White-BG_Version-05-pk1fejiico67gdmehpu3r291s56bu8zot09mk1lmyw.jpg",
    credit: "CalDigit Official",
  },
  "gaming-pc-ssd-2tb-990pro": {
    name: "Samsung 990 Pro 2TB NVMe PCIe 4.0 SSD",
    url: "https://images.samsung.com/is/image/samsung/p6pim/in/mz-v9p2t0bw/gallery/in-990pro-nvme-m2-ssd-mz-v9p2t0bw-534630688?$1164_776_PNG$",
    credit: "Samsung Electronics Official",
  },
  "gaming-pc-ram-ddr5-32gb": {
    name: "G.Skill Flare X5 32GB DDR5-6000 CL30",
    url: "https://www.gskill.com/img/overview/flare-x5/01-flare-x5-black-white-main-expo.jpg",
    credit: "G.Skill International Official",
  },

  // Motorcycles & Touring
  "re-interceptor-650": {
    name: "Royal Enfield Interceptor 650",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/13/Royal_Enfield_650_Interceptor.jpg",
    credit: "Royal Enfield / Wikimedia Commons",
  },
  "re-himalayan-450": {
    name: "Royal Enfield Himalayan 450 Adventure",
    url: "https://static-cdn.team-bhp.com/prod/new-bike-cms/Royal-Enfield/Himalayan-450/2025/01/02/b6fe62a6-6a4b-4c32-a65a-b39067f72d93-Royal-Enfield_Himalayan-450_Right-Hand-View_Ride-Aesthetics_Brand-Image.jpg",
    credit: "Royal Enfield Media / Team-BHP",
  },
  "triumph-speed-400": {
    name: "Triumph Speed 400 Modern Classic",
    url: "https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto:eco/sitecoremedialibrary/media-library/images/motorcycles/modern-classics/t%20series/speed%20400/speed%20400%20family%20page/speed-400-my24-family-hero-1-1920x1080.jpg",
    credit: "Triumph Motorcycles Official Media",
  },
  "motorcycle-riding-gear": {
    name: "Axor Apex / MT Thunder 4 Helmet & Riding Armor",
    url: "https://axorhelmets.com/cdn/shop/files/633.jpg?v=1787206711",
    credit: "Axor Helmets Official",
  },
  "bike-touring-accessories": {
    name: "Quad Lock Pro Motorcycle Handlebar Mount",
    url: "https://cdn.sanity.io/images/3azemr64/production/36803f488284c57fa6294e23cbcd9116336b8a4e-1024x768.jpg",
    credit: "Quad Lock Official",
  },

  // Watches & Style
  "tissot-gentleman-powermatic": {
    name: "Tissot Gentleman Powermatic 80 Silicium",
    url: "https://www.tissotwatches.com/dw/image/v2/BKKD_PRD/on/demandware.static/-/Sites-Tissot-Catalogue/default/dw3f3555f3/product-pictures/935393fa-c1d5-4985-87c8-b0b2f7ae6ef9_T127_407_11_041_00_WRIST.png",
    credit: "Tissot Swiss Watches Official",
  },
  "seiko-5-srpe": {
    name: "Seiko 5 Sports SRPE51 DressKX",
    url: "https://www.seikowatches.com/middleeast-en/-/media/Images/Product--Image/All/Seiko/2022/02/20/02/23/SRPE51K1/SRPE51K1.png",
    credit: "Seiko Watch Corporation Official",
  },

  // Grooming & Fragrance
  "braun-series-9-pro": {
    name: "Braun Series 9 Pro+ Electric Shaver",
    url: "https://images.ctfassets.net/318t4e73nih6/1UFZ0JW8svDuBkZIuoXjDi/7c6e5e032bf963069a8df2f1f47ecea4/pdp-mpg-shelf-series-shavers-series-9-pro-9467cc.jpg",
    credit: "Braun / P&G Official",
  },
  "oral-b-io-series-9": {
    name: "Oral-B iO Series 9 Electric Toothbrush",
    url: "https://images.ctfassets.net/6azfn76zuilv/7hkxk1prmWYr9mKG1MUAWP/1e49654b7c923833526a35dbc7f229c2/Oral-B-io9_Front-w-pack_1500x1500px.jpg",
    credit: "Oral-B Official",
  },
  "dior-sauvage-edp": {
    name: "Dior Sauvage Eau de Parfum",
    url: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000493826058/-LxjXkk3I-000000000493826058_1.jpg",
    credit: "Christian Dior Parfums / Sephora",
  },
  "bleu-de-chanel-parfum": {
    name: "Bleu de Chanel Parfum",
    url: "https://www.sephora.com/productimages/sku/s3012754-main-zoom.jpg",
    credit: "Chanel Parfums / Sephora",
  },

  // Home & Health
  "xiaomi-smart-air-purifier-4-pro": {
    name: "Xiaomi Smart Air Purifier 4 Pro",
    url: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1666839240.67439522.png",
    credit: "Xiaomi Official Media",
  },
  "kent-supreme-water-purifier": {
    name: "Kent Supreme RO Water Purifier",
    url: "https://www.kent.co.in/cdn/shop/files/kent-supreme-1.webp?v=1774355349",
    credit: "Kent RO Systems Official",
  },

  // Vehicles & Gifts & Milestones
  "family-suv-creta-kushaq": {
    name: "Hyundai Creta 1.5 SX(O) / Skoda Kushaq AT",
    url: "https://static-cdn.team-bhp.com/prod/new-car-cms/Hyundai_Creta_2024_Exterior_1_67a9586146.jpg",
    credit: "Hyundai Motor / Team-BHP Press",
  },
  "titan-raga-viva-watch": {
    name: "Titan Raga Viva Rose Gold Watch",
    url: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw480b16bf/images/Titan/Catalog/2606WM01_1.jpg",
    credit: "Titan Watches Official",
  },
  "hidesign-leather-handbag": {
    name: "Hidesign Genuine Full-Grain Leather Structured Tote",
    url: "https://hidesign.com/cdn/shop/products/jaxon-womens-black-tote-bag_1_4e3ed552-db4e-4b51-a64f-90773ee07655_1024x1024.jpg",
    credit: "Hidesign India Official",
  },
  "college-fees-balance": {
    name: "Final College Degree Tuition Settlement",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    credit: "Higher Education / Graduation",
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

async function updateExactImages() {
  console.log("=== Updating All Incorrect Images with Exact Matching Products ===\n");

  const entries = Object.entries(EXACT_PRODUCT_IMAGES);

  for (const [id, info] of entries) {
    const targetFile = path.join(ITEMS_DIR, `${id}.webp`);
    const localPath = `/images/items/${id}.webp`;

    console.log(`[UPDATING] ${id} -> ${info.name}`);
    const buffer = await fetchBuffer(info.url);

    if (!buffer) {
      console.error(`  x Could not download image from: ${info.url}`);
      continue;
    }

    try {
      // Convert to WebP, max width 1200px
      await sharp(buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(targetFile);

      // Generate 16px blurDataURL
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

      console.log(`  ✓ Successfully updated ${localPath} (${info.credit})`);
    } catch (err) {
      console.error(`  x Sharp error on ${id}:`, err);
    }
  }

  // Save updated manifest
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nUpdated manifest written to ${MANIFEST_PATH}`);
}

updateExactImages().catch(console.error);
