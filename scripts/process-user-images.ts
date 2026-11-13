import fs from "fs";
import path from "path";
import sharp from "sharp";

const USER_IMAGES_DIR = path.join(process.cwd(), "images");
const TARGET_DIR = path.join(process.cwd(), "public", "images", "items");
const MANIFEST_PATH = path.join(process.cwd(), "data", "image-manifest.json");

// Mapping of filename in ./images to target filename in public/images/items/
const FILE_MAP: Record<string, string> = {
  "APC Back-UPS Pro 1100VA 660W Line-Interactive UPS.webp": "power-backup-apc-1100va.webp",
  "CE Level 2 Riding Gloves, Touring Boots & Bionic Knee Guards.webp": "motorcycle-gloves-boots-armor.webp",
  "acf.02.-Bastion-Bionic-Knee-Guard-Full-Width-Gallery-Pictures.webp": "motorcycle-gloves-boots-armor-2.webp",
  "CalDigit TS4 Thunderbolt 4 Dock, Laptop Stand, Samsung T7 2TB & Pi 5 Dev Lab.webp": "caldigit-ts4-dock-kit.webp",
  "TS4_Thunderbolt-4-Dock_Universally-Compatible_1000px_Updated.webp": "caldigit-ts4-dock-kit-2.webp",
  "Comprehensive Insurance Shield .webp": "health-term-insurance.webp",
  "Daikin Waizu 1.5-Ton 5-Star Inverter AC .webp": "daikin-inverter-ac.webp",
  "Dell-Alienware-27-Inch-360Hz-QD-OLED-Gaming-Monitor-7-1.webp": "alienware-aw2725df.webp",
  "Dermatological Skincare Suite.webp": "skincare-routine-arsenal.webp",
  "Fabindia Hand-Woven Pure Linen & Cotton Kurtas.webp": "fabindia-kurtas-pack.webp",
  "Floor-Length Heavyweight Blackout Thermal Curtains.webp": "blackout-thermal-curtains.webp",
  "Full-Grain Vegetable-Tanned Leather Belts.webp": "leather-belts-pack.webp",
  "Govee Philips Hue Smart Lights.webp": "gaming-room-lighting-acoustics.webp",
  "Govee philips Hue Smart Lights.webp": "gaming-room-lighting-acoustics-2.webp",
  "Hair Styling Clay, Beard Oil.webp": "barber-hair-derma-care.webp",
  "Keychron Q1 Pro Wireless Custom Mechanical Keyboard.webp": "keychron-q1-pro.webp",
  "Keychron Q1 Pro Wireless Custom Mechanical Keyboar.webp": "keychron-q1-pro-2.webp",
  "Keychron Q1 Pro Wireless Custom Mechanical Keyboa.webp": "keychron-q1-pro-3.webp",
  "LG-28MQ780-B-Monitor-desc.webp": "lg-dualup-28.webp",
  "LG-DualUp-Monitor-3-1024x683.webp": "lg-dualup-28-2.webp",
  "lg dual up monitor.webp": "lg-dualup-28-3.webp",
  "Optimum Nutrition Gold Standard Whey, Creapure & Omega-3.webp": "daily-supplements-stack.webp",
  "omega 3.webp": "daily-supplements-stack-2.webp",
  "Philips Digital Airfryer XXL, NutriBullet & Digital Scale.webp": "meal-prep-kitchen-arsenal.webp",
  "Philips Handheld Garment Steamer & Solid Cedar Hangers.webp": "garment-steamer-hangers.webp",
  "Philips Handheld Garment Steamer & Solid Cedar Hangers .webp": "garment-steamer-hangers-2.webp",
  "Philips OneBlade Pro Hybrid Beard Trimmer & Shaver.webp": "philips-oneblade.webp",
  "Philips OneBlade Pro Hybrid Beard Trimmer & Shave.webp": "philips-oneblade-2.webp",
  "Samsung 990 Pro 2TB PCIe 4.0 NVMe SSD.webp": "gaming-pc-ssd-2tb-990pro.webp",
  "samsung odyssey oled g9 g93sc.webp": "samsung-odyssey-oled-g9.webp",
  "Secretlab Titan Evo Ergonomic Gaming Chair.webp": "secretlab-titan-evo.webp",
  "Slim-Straight Cotton Chinos.webp": "cotton-chinos-pack.webp",
  "Slim-Straight Cotton Chinos .webp": "cotton-chinos-pack-2.webp",
  "SteelSeries QcK Heavy .webp": "desk-mat-qck-heavy.webp",
  "SteelSeries QcK Heavy.png": "desk-mat-qck-heavy-2.webp",
  "TP-Link Archer AX55 Wi-Fi 6 Gigabit Router .webp": "tp-link-archer-ax55.webp",
  "Triumph Speed 400 (Candidate 3 - British Modern Classic).webp": "triumph-speed-400.webp",
  "Under-Desk Cable Management Raceway Tray & Aluminum Headphone Mount.webp": "cable-management-suite.webp",
  "Wakefit Sleepwell 6-Inch Orthopedic Memory Foam Mattress.webp": "orthopedic-mattress.webp",
};

async function processUserImages() {
  console.log("Processing all 39 user-uploaded images from ./images ...");

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

  let processedCount = 0;

  for (const [srcName, targetName] of Object.entries(FILE_MAP)) {
    const srcPath = path.join(USER_IMAGES_DIR, srcName);
    if (!fs.existsSync(srcPath)) {
      console.warn(`[WARN] Source file not found: ${srcName}`);
      continue;
    }

    const destPath = path.join(TARGET_DIR, targetName);

    try {
      const buffer = fs.readFileSync(srcPath);

      // Process through sharp: resize if larger than 1400px, convert to high-quality webp
      await sharp(buffer)
        .resize({ width: 1400, withoutEnlargement: true, fit: "inside" })
        .webp({ quality: 90 })
        .toFile(destPath);

      // Extract base ID (e.g. keychron-q1-pro from keychron-q1-pro-2.webp)
      const baseId = targetName.replace(/(-[0-9]+)?\.webp$/, "");

      // If it is the primary image, update manifest
      if (!targetName.match(/-[0-9]+\.webp$/)) {
        const blurBuffer = await sharp(buffer)
          .resize(16, 16, { fit: "cover" })
          .webp({ quality: 20 })
          .toBuffer();

        manifest.items[baseId] = {
          ...(manifest.items[baseId] || {}),
          id: baseId,
          localPath: `/images/items/${targetName}`,
          status: "downloaded",
          blurDataURL: `data:image/webp;base64,${blurBuffer.toString("base64")}`,
          photographer: "User Verified Product Photo",
        };
      }

      processedCount++;
      console.log(`✓ Processed: ${srcName} -> ${targetName}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`✗ Error processing ${srcName}:`, msg);
    }
  }

  manifest.lastRun = new Date().toISOString();
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log(`\nSuccessfully processed ${processedCount} / ${Object.keys(FILE_MAP).length} user images!`);
}

processUserImages();
