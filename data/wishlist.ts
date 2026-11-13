import { CategoryId } from "./categories";

export interface Spec {
  label: string;
  value: string;
}

export interface PriceUSD {
  min: number;
  max: number;
}

export interface SubItem {
  name: string;
  detail?: string;
  costUSD?: number;
  cost?: string;
}

export interface Item {
  id: string;
  category: CategoryId;
  name: string;
  brand: string;
  summary: string;
  specs: Spec[];
  alternatives?: string[];
  priceUSD: PriceUSD;
  when: "now" | "later";
  priority: "high" | "medium" | "low";
  status: "wishlist" | "planned" | "saving" | "bought";
  recurring?: "monthly" | "yearly";
  subItems?: SubItem[];
  checklist?: string[];
  notes?: string;
  images: string[];
  link?: string;
  linkVerified?: boolean;
  tags?: string[];
  candidateGroup?: string; // Grouping for "Pick One" decisions like motorcycles
  focal?: string;
}

export const INITIAL_WISHLIST_ITEMS: Item[] = [
  // ==========================================
  // 1. GAMING PC (All components of the build)
  // Option B (High-End: ~$2,100–2,800) is the primary wishlist configuration.
  // Option A (Sweet Spot: ~$1,300–1,700) components are documented as alternatives.
  // ==========================================
  {
    id: "gaming-pc-cpu-ryzen",
    category: "gaming-pc",
    name: "AMD Ryzen 7 9800X3D (8C/16T, 3D V-Cache)",
    brand: "AMD",
    summary: "2nd-Gen 3D V-Cache flagship gaming processor with 96MB L3 cache, unlocked for multiplier overclocking on AM5.",
    specs: [
      { label: "Core Configuration", value: "8 Cores / 16 Threads (Zen 5 Architecture)" },
      { label: "Clock Speeds", value: "4.7 GHz Base Clock | Up to 5.2 GHz Max Boost" },
      { label: "Cache Hierarchy", value: "96MB 3D V-Cache L3 + 8MB L2 (104MB Total)" },
      { label: "Socket & Process", value: "Socket AM5 | TSMC 4nm FinFET" },
      { label: "Power & Thermals", value: "120W TDP | 95°C Max Tjmax" },
      { label: "Memory Support", value: "DDR5-6000 MT/s dual-channel AMD EXPO native" },
    ],
    alternatives: [
      "AMD Ryzen 5 9600X (Value Configuration: 6C/12T, 65W TDP, ~$200–$330)",
      "AMD Ryzen 7 9700X (8C/16T, 65W TDP, ~$330–$360)",
    ],
    priceUSD: { min: 500, max: 620 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/gaming-pc-cpu-ryzen.webp"
],
    link: "https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-7-9800x3d.html",
    linkVerified: true,
    tags: ["cpu", "processor", "am5", "gaming-pc"],
  },
  {
    id: "gaming-pc-gpu-rtx",
    category: "gaming-pc",
    name: "NVIDIA GeForce RTX 5070 Ti 16GB GDDR7",
    brand: "NVIDIA",
    summary: "Next-gen Blackwell gaming GPU with 16GB high-bandwidth GDDR7 VRAM, DLSS 4 multi-frame generation, and 4K/1440p high-refresh capability.",
    specs: [
      { label: "Architecture", value: "NVIDIA Blackwell (TSMC 4NP process)" },
      { label: "Memory & Bus", value: "16GB GDDR7 on 256-bit bus (896 GB/s bandwidth)" },
      { label: "Compute Hardware", value: "8,960 CUDA Cores | 4th-Gen Tensor Cores | 3rd-Gen RT Cores" },
      { label: "Display Outputs", value: "3× DisplayPort 2.1b (UHBR20) + 1× HDMI 2.1a" },
      { label: "Power & Connector", value: "300W TGP | Single native 16-pin 12V-2x6 cable" },
      { label: "Cooling Clearance", value: "Triple-slot / 305mm card length (Lian Li 216 clearance)" },
    ],
    alternatives: [
      "NVIDIA GeForce RTX 5070 12GB GDDR7 (Value Configuration: ~$550–$600)",
      "AMD Radeon RX 9070 XT 16GB (RDNA 4 architecture, ~$650–$750)",
    ],
    priceUSD: { min: 850, max: 1000 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/gaming-pc-gpu-rtx.webp"
],
    link: "https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-5070ti/",
    linkVerified: true,
    tags: ["gpu", "graphics-card", "blackwell", "rtx", "gaming-pc"],
  },
  {
    id: "gaming-pc-ram-ddr5-32gb",
    category: "gaming-pc",
    name: "G.Skill Flare X5 32GB (2×16GB) DDR5-6000 CL30",
    brand: "G.Skill",
    summary: "Low-profile 33mm dual-channel DDR5 kit optimized for AMD EXPO with tight CL30-38-38-96 timings at 1.35V.",
    specs: [
      { label: "Capacity & Kit", value: "32GB Kit (2× 16GB dual-rank/single-rank DIMMs)" },
      { label: "Speed & Timings", value: "DDR5-6000 MT/s at CL30-38-38-96 (1:1 UCLK:MCLK sweet spot)" },
      { label: "Profile Support", value: "AMD EXPO certified for one-click BIOS tuning" },
      { label: "Module Height", value: "33mm ultra-low profile (100% cooler compatibility)" },
      { label: "Operating Voltage", value: "1.35V with on-die ECC (ODECC)" },
      { label: "Heatspreader", value: "Matte black anodized aluminum with classic grille cutout" },
    ],
    alternatives: [
      "Corsair Vengeance RGB 32GB DDR5-6000 CL30 ($130)",
      "Kingston Fury Beast 32GB DDR5-6000 ($120)",
    ],
    priceUSD: { min: 115, max: 225 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/gaming-pc-ram-ddr5-32gb.webp"
],
    link: "https://www.gskill.com/product/165/396/1683010824/F5-6000J4048F24GX2-FX5",
    linkVerified: true,
    tags: ["ram", "memory", "ddr5", "expo", "gaming-pc"],
  },
  {
    id: "gaming-pc-ssd-2tb-990pro",
    category: "gaming-pc",
    name: "Samsung 990 Pro 2TB PCIe 4.0 NVMe SSD",
    brand: "Samsung",
    summary: "Flagship PCIe 4.0 SSD reaching up to 7,450 MB/s sequential read with Samsung Pascal controller and 2GB LPDDR4 cache.",
    specs: [
      { label: "Form Factor & Bus", value: "M.2 2280 | PCIe 4.0 x4 (NVMe 2.0)" },
      { label: "Sequential Speed", value: "Up to 7,450 MB/s Read | 6,900 MB/s Write" },
      { label: "Random IOPS", value: "Up to 1,600,000 IOPS Read | 1,550,000 IOPS Write" },
      { label: "DRAM Cache", value: "2GB Low-Power DDR4 dedicated buffer" },
      { label: "NAND Flash", value: "Samsung V-NAND 3-bit TLC (176-layer)" },
      { label: "Endurance & Warranty", value: "1,200 TBW endurance | 5-Year Limited Warranty" },
    ],
    alternatives: [
      "WD Black SN850X 1TB / 2TB PCIe 4.0 ($80–$150)",
      "Crucial T500 2TB PCIe 4.0 NVMe ($140)",
    ],
    priceUSD: { min: 135, max: 200 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/gaming-pc-ssd-2tb-990pro.webp"
],
    link: "https://www.samsung.com/in/memory-storage/nvme-ssd/990-pro-2tb-nvme-pcie-4-0-mz-v9p2t0bw/",
    linkVerified: true,
    tags: ["storage", "ssd", "nvme", "pcie4", "gaming-pc"],
  },
  {
    id: "gaming-pc-mobo-x870",
    category: "gaming-pc",
    name: "ASUS TUF Gaming X870-PLUS Wi-Fi Motherboard",
    brand: "ASUS",
    summary: "Military-grade AM5 motherboard featuring 16+2+1 power stages, PCIe 5.0 graphics, Wi-Fi 7, and dual USB4 40Gbps ports.",
    specs: [
      { label: "Socket & Chipset", value: "AMD Socket AM5 | AMD X870 Chipset" },
      { label: "VRM Power Stages", value: "16+2+1 DrMOS Power Stages (80A) with enlarged heatsinks" },
      { label: "PCIe & Storage Slots", value: "1× PCIe 5.0 x16 SafeSlot | 2× PCIe 5.0 M.2 + 2× PCIe 4.0 M.2" },
      { label: "Networking", value: "Wi-Fi 7 (802.11be, 160MHz) + Realtek 2.5Gb Ethernet" },
      { label: "USB & Thunderbolt", value: "2× USB4 40Gbps Type-C ports on rear panel" },
      { label: "Audio Solution", value: "Realtek ALC1220P 7.1 HD Surround Sound with Savitech amp" },
    ],
    alternatives: [
      "ASUS TUF Gaming B650-PLUS Wi-Fi (Value Configuration: ~$130–$200)",
      "MSI MAG X870 Tomahawk Wi-Fi ($290)",
    ],
    priceUSD: { min: 200, max: 340 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/gaming-pc-mobo-x870.webp"
],
    link: "https://www.asus.com/motherboards-components/motherboards/tuf-gaming/tuf-gaming-x870-plus-wifi/",
    linkVerified: true,
    tags: ["motherboard", "am5", "x870", "wifi7", "gaming-pc"],
  },
  {
    id: "gaming-pc-psu-corsair-850w",
    category: "gaming-pc",
    name: "Corsair RM850e 850W 80+ Gold Fully Modular ATX 3.1 PSU",
    brand: "Corsair",
    summary: "High-efficiency ATX 3.1 power supply with native 12V-2x6 cable for modern RTX 50-series GPUs and Zero-RPM silent fan mode.",
    specs: [
      { label: "Rated Wattage", value: "850W Continuous Output at 40°C" },
      { label: "Efficiency Rating", value: "80 PLUS Gold certified (up to 90% efficiency) & Cybenetics Gold" },
      { label: "Standards & Cabling", value: "ATX 3.1 & PCIe 5.1 compliant with native 12V-2x6 GPU cable" },
      { label: "Modularity", value: "100% Fully Modular low-profile flat black cables" },
      { label: "Acoustics & Fan", value: "120mm rifle-bearing fan with Zero-RPM mode under low loads" },
      { label: "Capacitor Quality", value: "105°C-rated industrial grade electrolytic capacitors" },
    ],
    alternatives: [
      "Corsair RM750e 750W 80+ Gold (Value Configuration: ~$90–$110)",
      "Seasonic Focus GX-850 ATX 3.0 ($140)",
    ],
    priceUSD: { min: 100, max: 135 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/gaming-pc-psu-corsair-850w.webp"
],
    link: "https://www.corsair.com/us/en/p/psu/cp-9020263-na/rme-series-rm850e-fully-modular-low-noise-atx-power-supply-cp-9020263-na",
    linkVerified: true,
    tags: ["psu", "power-supply", "gold", "atx3", "gaming-pc"],
  },
  {
    id: "gaming-pc-cooler-arctic-360",
    category: "gaming-pc",
    name: "Arctic Liquid Freezer III 360mm AIO Liquid Cooler",
    brand: "Arctic",
    summary: "Award-winning 360mm liquid cooler featuring a dedicated 40mm VRM fan on the CPU block, thick 38mm radiator, and P12 PWM fans.",
    specs: [
      { label: "Radiator Dimensions", value: "398 × 120 × 38mm extra-thick high-density aluminum radiator" },
      { label: "Pump & VRM Cooling", value: "PWM-controlled pump + integrated 40mm motherboard VRM fan" },
      { label: "Fan Configuration", value: "3× Arctic P12 PWM PST 120mm static-pressure fans (200–1800 RPM)" },
      { label: "Mounting Bracket", value: "AMD AM5 specific contact-frame offset mount for Zen 5 hotspots" },
      { label: "Thermal Compound", value: "Pre-applied Arctic MX-6 high-viscosity paste included" },
      { label: "Warranty", value: "6-Year Manufacturer Warranty" },
    ],
    alternatives: [
      "Thermalright Peerless Assassin 120 SE Air Cooler (Value Configuration: ~$35–$45)",
      "DeepCool LT720 360mm AIO Liquid Cooler ($120)",
    ],
    priceUSD: { min: 100, max: 150 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/gaming-pc-cooler-arctic-360.webp"
],
    link: "https://www.arctic.de/en/Liquid-Freezer-III-360/",
    linkVerified: true,
    tags: ["cooler", "aio", "cooling", "liquid-cooler", "gaming-pc"],
  },
  {
    id: "gaming-pc-case-lancool-216",
    category: "gaming-pc",
    name: "Lian Li Lancool 216 Mesh High-Airflow Mid-Tower Case",
    brand: "Lian Li",
    summary: "Optimized high-airflow chassis with full-mesh front and top, 2× 160mm front ARGB fans, and dedicated 360mm radiator clearance.",
    specs: [
      { label: "Chassis Form Factor", value: "Mid-Tower ATX (480.9 × 235 × 491.7 mm)" },
      { label: "Stock Airflow Fans", value: "2× 160mm PWM front fans (118.85 CFM) + 1× 140mm rear PWM fan" },
      { label: "Radiator Support", value: "Top up to 360mm / Front up to 360mm" },
      { label: "GPU & Cooler Clearance", value: "Up to 392mm GPU length | 180.5mm CPU cooler height" },
      { label: "Special Features", value: "Included GPU anti-sag support bracket, modular I/O relocate" },
      { label: "Side Panel", value: "4.0mm edge-to-edge tinted tempered glass" },
    ],
    alternatives: [
      "Fractal Design North Charcoal ($130)",
      "Fractal Pop Air Mesh (Value Configuration: ~$80–$110)",
    ],
    priceUSD: { min: 80, max: 115 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/gaming-pc-case-lancool-216.webp"
],
    link: "https://lian-li.com/product/lancool-216/",
    linkVerified: true,
    tags: ["case", "chassis", "airflow", "lian-li", "gaming-pc"],
  },
  {
    id: "gaming-pc-windows-build-kit",
    category: "gaming-pc",
    name: "Windows 11 Home License & Complete System Build Kit",
    brand: "Microsoft & Arctic",
    summary: "Authentic Windows 11 64-bit OS license, aluminum GPU anti-sag support bracket, high-thermal Arctic MX-6 paste, and cable management kit.",
    specs: [
      { label: "Operating System", value: "Microsoft Windows 11 Home 64-bit USB Retail License" },
      { label: "Hardware Support", value: "Heavy-duty aluminum GPU anti-sag telescopic support stand" },
      { label: "Thermal Compound", value: "Arctic MX-6 High-Performance Thermal Paste (4g syringe)" },
      { label: "Cable Management", value: "50-pack reusable nylon hook-and-loop velcro straps & ties" },
      { label: "Toolkit", value: "Precision magnetic screwdriver set with PH2 and hex bits" },
    ],
    alternatives: [
      "Windows 11 Pro 64-bit Retail License ($180)",
      "iFixit Pro Tech Toolkit ($75)",
    ],
    priceUSD: { min: 100, max: 140 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/gaming-pc-windows-build-kit.webp"
],
    link: "https://www.microsoft.com/en-us/d/windows-11-home/dg7gmgf0krt0",
    linkVerified: true,
    tags: ["os", "software", "windows", "accessories", "gaming-pc"],
  },

  // ==========================================
  // 2. GAMING ROOM
  // ==========================================
  {
    id: "alienware-aw2725df",
    category: "gaming-room",
    name: 'Alienware AW2725DF 27" QD-OLED 360Hz',
    brand: "Dell Alienware",
    summary: "3rd-Gen Quantum Dot OLED panel with 360Hz native refresh rate, 0.03ms response time, and infinite contrast.",
    specs: [
      { label: "Screen Size & Resolution", value: "26.7-inch (16:9) | 2560 × 1440 QHD at 110.84 PPI" },
      { label: "Panel Technology", value: "3rd-Gen QD-OLED with semi-gloss anti-reflective coating" },
      { label: "Refresh Rate & Response", value: "360 Hz native | 0.03 ms (GtG) response time" },
      { label: "Contrast & Brightness", value: "1,500,000:1 (true infinite black) | 1,000 nits peak HDR" },
      { label: "Color Gamut & Accuracy", value: "99.3% DCI-P3 | Delta E < 2 factory calibrated" },
      { label: "I/O Ports", value: "2× DP 1.4, 1× HDMI 2.1 (FRL), 4× USB 3.2 Gen 1 downstream" },
      { label: "Warranty & Burn-in", value: "3-Year Dell Advanced Exchange with OLED burn-in warranty" },
    ],
    alternatives: ["LG UltraGear 27GR95QE-B 240Hz OLED ($590)", "ASUS ROG Swift PG27AQDM ($680)"],
    priceUSD: { min: 510, max: 680 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/alienware-aw2725df.webp"
],
    link: "https://www.dell.com/en-us/shop/alienware-27-360hz-qd-oled-gaming-monitor-aw2725df/apd/210-blkg/",
    linkVerified: true,
    tags: ["monitor", "qd-oled", "esports", "360hz"],
  },
  {
    id: "secretlab-titan-evo",
    category: "gaming-room",
    name: "Secretlab Titan Evo Ergonomic Gaming Chair",
    brand: "Secretlab",
    summary: "4-way L-ADAPT dynamic lumbar system, cold-cure foam cushion, magnetic memory foam head pillow.",
    specs: [
      { label: "Upholstery", value: "Secretlab SoftWeave Plus Fabric / NEO Hybrid Leatherette" },
      { label: "Lumbar Support", value: "4-Way L-ADAPT dynamic internal lumbar system (in/out & up/down)" },
      { label: "Armrests", value: "Full-metal 4D with CloudSwap magnetic replacement tops" },
      { label: "Head Pillow", value: "Magnetic memory foam pillow with cooling gel layer" },
      { label: "Recline & Tilt", value: "165° multi-tilt mechanism with tilt angle lock" },
      { label: "Sizing", value: "Regular (height 170–189cm, <100kg) or XL" },
    ],
    alternatives: ["Herman Miller Embody Gaming Chair ($1,650)", "Noblechairs Hero ($420)"],
    priceUSD: { min: 455, max: 625 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/secretlab-titan-evo.webp"
],
    link: "https://secretlab.co/products/titan-evo-2022-series",
    linkVerified: true,
    tags: ["chair", "ergonomic", "furniture"],
  },
  {
    id: "flexispot-e7-desk",
    category: "gaming-room",
    name: "Flexispot E7 Dual-Motor Standing Desk (160×80cm)",
    brand: "Flexispot",
    summary: "Heavy-duty electric standing desk with dual three-stage motors, 355 lbs capacity, and 4 memory presets.",
    specs: [
      { label: "Desktop Dimensions", value: "160 × 80 × 2.5 cm solid rubberwood / bamboo top" },
      { label: "Height Adjustment", value: "58cm to 123cm (smooth dual motors at 38mm/s)" },
      { label: "Lifting Capacity", value: "160 kg (355 lbs) maximum load rating" },
      { label: "Controller Keypad", value: "Touchscreen with 4 memory height presets + USB-A charging" },
      { label: "Leg Construction", value: "Three-stage carbon steel inverted column frame" },
      { label: "Safety System", value: "Anti-collision sensor with auto-reverse sensitivity" },
    ],
    alternatives: ["Uplift V2 Commercial Desk ($600)", "Fully Jarvis Bamboo ($520)"],
    priceUSD: { min: 340, max: 455 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/flexispot-e7-desk.webp"
],
    link: "https://www.flexispot.com/flexispot-pro-standing-desk-e7",
    linkVerified: true,
    tags: ["desk", "standing-desk", "workspace"],
  },
  {
    id: "desk-mat-qck-heavy",
    category: "gaming-room",
    name: "SteelSeries QcK Heavy / Artisan Large Cloth Desk Mat (90×40cm)",
    brand: "SteelSeries & Artisan",
    summary: "Extra-thick 4mm micro-woven cloth surface engineered for precise esports tracking and wrist ergonomics.",
    specs: [
      { label: "Dimensions", value: "900 × 400 × 4.0 mm extra-thick desk coverage" },
      { label: "Surface Texture", value: "Exclusive QcK micro-woven cloth for low/high CPI tracking" },
      { label: "Base Material", value: "Durable non-slip natural rubber base to eliminate movement" },
      { label: "Edge Treatment", value: "Precision anti-fray stitched perimeter seams" },
    ],
    alternatives: ["Artisan Ninja FX Zero XL Soft ($65)", "Razer Gigantus V2 XXL ($35)"],
    priceUSD: { min: 25, max: 60 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/desk-mat-qck-heavy.webp",
      "/images/items/desk-mat-qck-heavy-2.webp"
],
    link: "https://steelseries.com/gaming-mousepads/qck-heavy-series?size=xxl",
    linkVerified: true,
    tags: ["deskmat", "mousepad", "esports"],
  },
  {
    id: "wooting-60he",
    category: "gaming-room",
    name: "Wooting 60HE Hall-Effect Keyboard",
    brand: "Wooting",
    summary: "Magnetic Hall-effect analog switches with Rapid Trigger down to 0.1mm actuation and web-based Wootility configuration.",
    specs: [
      { label: "Switch Mechanism", value: "Gateron Lekker L60 magnetic analog linear Hall-effect" },
      { label: "Actuation Range", value: "0.1mm to 4.0mm adjustable in 0.1mm increments" },
      { label: "Rapid Trigger", value: "Instant key reset on release down to 0.1mm" },
      { label: "Form Factor", value: "60% compact layout with universal GH60 case mounting" },
      { label: "Keycaps & Plate", value: "Double-shot PBT keycaps | Steel switch plate with silicone dampener" },
      { label: "Polling Rate", value: "True 1,000 Hz with tachyon mode under 1ms latency" },
    ],
    alternatives: ["Razer Huntsman V3 Pro Mini ($180)", "SteelSeries Apex Pro Mini ($170)"],
    priceUSD: { min: 205, max: 285 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/wooting-60he.webp"
],
    link: "https://wooting.io/wooting-60he",
    linkVerified: true,
    tags: ["keyboard", "hall-effect", "esports"],
  },
  {
    id: "logitech-g-pro-x-superlight-2",
    category: "gaming-room",
    name: "Logitech G Pro X Superlight 2 Wireless Mouse",
    brand: "Logitech G",
    summary: "60-gram ultralight esports mouse with LIGHTFORCE hybrid optical-mechanical switches and HERO 2 sensor.",
    specs: [
      { label: "Weight", value: "60 grams ultralight without honeycomb cutouts" },
      { label: "Sensor", value: "HERO 2 (100–32,000 DPI, >500 IPS tracking, 40G acceleration)" },
      { label: "Switches", value: "LIGHTFORCE Hybrid Optical-Mechanical tactile switches" },
      { label: "Polling Rate", value: "Up to 4,000 Hz LIGHTSPEED wireless connection" },
      { label: "Battery Life", value: "Up to 95 hours continuous motion | USB-C charging" },
      { label: "Feet", value: "Zero-additive PTFE glides for smooth glide" },
    ],
    alternatives: ["Razer Viper V3 Pro ($160)", "Finalmouse UltralightX ($190)"],
    priceUSD: { min: 160, max: 195 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/logitech-g-pro-x-superlight-2.webp"
],
    link: "https://www.logitechg.com/en-us/products/gaming-mice/pro-x-superlight-2-dex-wireless.html",
    linkVerified: true,
    tags: ["mouse", "wireless", "esports", "lightweight"],
  },
  {
    id: "sony-wh-1000xm6",
    category: "gaming-room",
    name: "Sony WH-1000XM6 / XM5 Wireless ANC Headphones",
    brand: "Sony",
    summary: "Industry-leading noise cancelling with dual processor architecture, 8 microphones, and LDAC Hi-Res Audio support.",
    specs: [
      { label: "Noise Cancellation", value: "Integrated Processor V1 + HD QN1 noise cancelling chip (8 mics)" },
      { label: "Audio Drivers", value: "30mm precision-engineered carbon-fiber composite dome" },
      { label: "Codecs Supported", value: "LDAC, AAC, SBC with DSEE Extreme AI upscaling" },
      { label: "Battery Life", value: "30 hours with ANC active (3-minute charge = 3 hours playback)" },
      { label: "Connectivity", value: "Bluetooth 5.3 multipoint pairing + 3.5mm wired analog jack" },
      { label: "Weight & Fit", value: "250 grams lightweight soft-fit leather headband" },
    ],
    alternatives: ["Bose QuietComfort Ultra ($430)", "Sennheiser Momentum 4 ($350)"],
    priceUSD: { min: 430, max: 510 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/sony-wh-1000xm6.webp"
],
    link: "https://www.sony.co.in/headphones/products/wh-1000xm5",
    linkVerified: true,
    tags: ["audio", "anc", "headphones", "wireless"],
  },
  {
    id: "edifier-r1700bt-speakers",
    category: "gaming-room",
    name: "Edifier R1700BT 2.0 Bluetooth Active Bookshelf Speakers",
    brand: "Edifier",
    summary: "66W RMS active studio monitors with 4-inch bass drivers, 19mm silk dome tweeters, and walnut wood enclosure.",
    specs: [
      { label: "Total Power Output", value: "66W RMS (15W × 2 tweeters + 18W × 2 mid/bass drivers)" },
      { label: "Driver Units", value: "19mm Eagle Eye silk dome tweeters | 4-inch bass units" },
      { label: "Cabinet Construction", value: "10-degree angled acoustic MDF walnut wood housing" },
      { label: "Inputs", value: "Dual RCA analog inputs (PC/AUX) + Bluetooth 5.1" },
      { label: "Controls", value: "Side-mounted bass (-6dB/+6dB), treble, and master volume dials" },
    ],
    alternatives: ["Audioengine A2+ Wireless ($270)", "PreSonus Eris E3.5 BT ($130)"],
    priceUSD: { min: 100, max: 125 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/edifier-r1700bt-speakers.webp"
],
    link: "https://www.edifier.com/product-r1700bt.html",
    linkVerified: true,
    tags: ["speakers", "audio", "bluetooth", "bookshelf"],
  },
  {
    id: "playstation-5-pro",
    category: "gaming-room",
    name: "Sony PlayStation 5 Pro 2TB & DualSense Edge",
    brand: "Sony PlayStation",
    summary: "Flagship gaming console with 2TB internal storage, 67% more GPU compute units, PSSR AI upscaling, and DualSense Edge controller.",
    specs: [
      { label: "GPU Performance", value: "Upgraded RDNA GPU with 67% more Compute Units (28% faster memory)" },
      { label: "Ray Tracing", value: "Advanced hardware ray tracing casting rays at 2× to 3× standard PS5 speeds" },
      { label: "Upscaling Engine", value: "PlayStation Spectral Super Resolution (PSSR) machine learning upscaler" },
      { label: "Internal Storage", value: "2TB ultra-fast PCIe 4.0 NVMe SSD built-in" },
      { label: "Controller Suite", value: "DualSense Edge wireless controller with swappable stick modules & back paddles" },
      { label: "Wireless", value: "Wi-Fi 7 (IEEE 802.11be) support for lower latency" },
    ],
    alternatives: ["Base PlayStation 5 Slim 1TB ($499)", "Xbox Series X 2TB ($599)"],
    priceUSD: { min: 830, max: 965 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/playstation-5-pro.webp"
],
    link: "https://www.playstation.com/en-us/ps5/ps5-pro/",
    linkVerified: true,
    tags: ["console", "ps5", "gaming", "playstation"],
  },
  {
    id: "gaming-room-lighting-acoustics",
    category: "gaming-room",
    name: "Govee / Philips Hue Smart Light Strips & Studio Acoustic Panels",
    brand: "Govee & Sonic Acoustics",
    summary: "RGBIC adaptive monitor bias backlighting paired with 6× high-density beveled acoustic studio wall panels.",
    specs: [
      { label: "Bias Lighting", value: "Govee RGBIC Wi-Fi LED light strip behind desk and monitor mount" },
      { label: "Acoustic Insulation", value: "6-Pack high-density (230kg/m³) beveled polyester fiber sound dampening tiles" },
      { label: "Noise Reduction", value: "NRC 0.95 rating for flutter echo absorption during voice/gaming" },
      { label: "Smart Control", value: "App and Google Home / HomeKit automation integration" },
    ],
    alternatives: ["Philips Hue Play Light Bar Duo ($160)", "Nanoleaf Lines ($180)"],
    priceUSD: { min: 90, max: 170 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/gaming-room-lighting-acoustics.webp",
      "/images/items/gaming-room-lighting-acoustics-2.webp"
],
    link: "https://us.govee.com/",
    linkVerified: true,
    tags: ["lighting", "acoustics", "smart-home", "studio"],
  },
  {
    id: "daikin-inverter-ac",
    category: "gaming-room",
    name: "Daikin Waizu 1.5-Ton 5-Star Inverter AC & Surge Suite",
    brand: "Daikin India",
    summary: "Variable-speed inverter split AC with copper condenser, Dew Clean self-cleaning, and Belkin surge protection.",
    specs: [
      { label: "Cooling Capacity", value: "1.5 Ton (5,000 Watts rated cooling capacity)" },
      { label: "Energy Rating", value: "BEE 5-Star (ISEER 5.2 high efficiency rating)" },
      { label: "Condenser Coil", value: "100% Copper condenser tubes with anti-corrosion blue fins" },
      { label: "Filtration", value: "PM 2.5 air purification filter + Dew Clean indoor auto-wash" },
      { label: "Surge Protection", value: "Belkin 8-Socket Gold Series surge protector (900 Joules rating)" },
    ],
    alternatives: ["Voltas 1.5-Ton 5-Star Adjustable Inverter ($460)", "LG AI Dual Inverter 1.5-Ton ($520)"],
    priceUSD: { min: 480, max: 630 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/daikin-inverter-ac.webp"
],
    link: "https://www.daikinindia.com/products/room-air-conditioners/split-air-conditioners",
    linkVerified: true,
    tags: ["appliance", "cooling", "air-conditioner", "comfort"],
  },
  {
    id: "cable-management-suite",
    category: "gaming-room",
    name: "Under-Desk Cable Management Raceway Tray & Aluminum Headphone Mount",
    brand: "VIVO & Kanto",
    summary: "Heavy-duty steel mesh under-desk cable tray, clamp-on silicone headphone hook, and reusable cable sleeving.",
    specs: [
      { label: "Raceway Construction", value: "Solid carbon steel wire mesh tray (90cm length, no-drill clamps)" },
      { label: "Headphone Hook", value: "Under-desk clamp-on dual aluminum headphone cradle" },
      { label: "Cable Organization", value: "50-pack reusable nylon hook-and-loop velcro ties + braided cord sleeves" },
    ],
    alternatives: ["IKEA Signum Cable Channel ($20)", "Uplift Wire Management Modesty Panel ($85)"],
    priceUSD: { min: 30, max: 50 },
    when: "now",
    priority: "low",
    status: "wishlist",
    images: [
      "/images/items/cable-management-suite.webp"
],
    link: "https://vivo-us.com/products/desk-ac01-2c",
    linkVerified: true,
    tags: ["accessories", "organization", "desk"],
  },

  // ==========================================
  // 3. DEVELOPMENT SETUP
  // ==========================================
  {
    id: "macbook-pro-14-m-pro",
    category: "dev-setup",
    name: '14" Apple MacBook Pro (M-Series Pro, 32GB RAM, 1TB SSD)',
    brand: "Apple",
    summary: "Flagship Unix engineering machine with 12-core CPU, 18-core GPU, 32GB unified memory, and 120Hz Liquid Retina XDR.",
    specs: [
      { label: "Processor Chip", value: "Apple M-Series Pro (12-core CPU: 8 performance + 4 efficiency)" },
      { label: "Unified Memory", value: "32GB Unified Memory with 150GB/s bandwidth" },
      { label: "Storage Drive", value: "1TB PCIe NVMe SSD (up to 7.4 GB/s read speeds)" },
      { label: "Display Panel", value: "14.2-inch Liquid Retina XDR (3024 × 1964), mini-LED, 1600 nits peak HDR, 120Hz ProMotion" },
      { label: "Ports & I/O", value: "3× Thunderbolt 4 (USB-C), HDMI 2.1, SDXC card slot, MagSafe 3" },
      { label: "Battery Life", value: "Up to 18 hours battery life with 70Wh battery & 96W USB-C charger" },
    ],
    alternatives: [
      "Lenovo ThinkPad X1 Carbon Gen 12 (32GB RAM, 1TB SSD, Ubuntu Linux, ~$2,100)",
      "Dell XPS 14 OLED (Core Ultra 7, 32GB RAM, ~$2,200)",
    ],
    priceUSD: { min: 2270, max: 3180 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/macbook-pro-14-m-pro.webp"
],
    link: "https://www.apple.com/in/macbook-pro/",
    linkVerified: true,
    tags: ["laptop", "macbook", "workstation", "dev-setup"],
  },
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
    images: [
      "/images/items/samsung-odyssey-oled-g9.webp"
],
    link: "https://www.samsung.com/us/computing/monitors/gaming/49-odyssey-oled-g95sc-dqhd-neo-quantum-processor-pro-0-03ms-240hz-curved-smart-gaming-monitor-ls49cg954snxza/",
    linkVerified: true,
    tags: ["monitor", "ultrawide", "oled", "qd-oled", "240hz", "dev-setup"],
  },
  {
    id: "lg-dualup-28",
    category: "dev-setup",
    name: 'LG DualUp 28" 16:18 Ergonomic Vertical Monitor',
    brand: "LG Electronics",
    summary: "Revolutionary 16:18 aspect ratio monitor equivalent to two stacked 21.5-inch displays, mounted on an Ergo arm.",
    specs: [
      { label: "Screen & Resolution", value: "27.6-inch diagonal (16:18 Aspect Ratio) | 2560 × 2880 Square Double QHD" },
      { label: "Panel Technology", value: "Nano IPS panel with 98% DCI-P3 color gamut, HDR10" },
      { label: "Mounting Arm", value: "LG Ergo clamp-on arm (extend/retract 180mm, swivel ±335°, pivot 90°)" },
      { label: "PBP Feature", value: "Picture-by-Picture dual-input simultaneous display without bezel gap" },
      { label: "USB-C Hub", value: "USB Type-C with 90W host power delivery + audio pass-through" },
    ],
    alternatives: ["Dell UltraSharp 24-inch Vertical Pivot ($240)", "ASUS ProArt PA278CV ($320)"],
    priceUSD: { min: 570, max: 740 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/lg-dualup-28.webp",
      "/images/items/lg-dualup-28-2.webp",
      "/images/items/lg-dualup-28-3.webp"
],
    link: "https://www.lg.com/us/monitors/lg-28mq780-b-dualup-monitor",
    linkVerified: true,
    tags: ["monitor", "vertical", "coding", "productivity"],
  },
  {
    id: "keychron-q1-pro",
    category: "dev-setup",
    name: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    brand: "Keychron",
    summary: "75% full CNC aluminum wireless mechanical keyboard with south-facing RGB, hot-swappable tactile switches, and QMK/VIA.",
    specs: [
      { label: "Chassis Material", value: "Full CNC machined 6063 aluminum body with double-gasket design" },
      { label: "Layout & Keys", value: "75% compact layout with programmable rotary aluminum knob" },
      { label: "Switch Mechanism", value: "Hot-swappable Keychron K Pro Banana tactile switches (pre-lubed)" },
      { label: "Connectivity", value: "Broadcom Bluetooth 5.1 wireless (3 devices) + Type-C wired (1000Hz)" },
      { label: "Keycaps", value: "KSA profile double-shot non-shine PBT keycaps" },
      { label: "Software", value: "Open-source QMK/VIA web configurator for custom macro layers" },
    ],
    alternatives: ["Keychron V1 Max ($95)", "Epomaker Galaxy80 ($110)"],
    priceUSD: { min: 205, max: 250 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/keychron-q1-pro.webp",
      "/images/items/keychron-q1-pro-2.webp",
      "/images/items/keychron-q1-pro-3.webp"
],
    link: "https://www.keychron.com/products/keychron-q1-pro-qmk-via-wireless-custom-mechanical-keyboard",
    linkVerified: true,
    tags: ["keyboard", "mechanical", "wireless", "aluminum"],
  },
  {
    id: "logitech-mx-master-3s",
    category: "dev-setup",
    name: "Logitech MX Master 3S Performance Wireless Mouse",
    brand: "Logitech",
    summary: "Ergonomic productivity mouse with 8,000 DPI Darkfield glass tracking, MagSpeed electromagnetic scroll, and quiet click switches.",
    specs: [
      { label: "Sensor", value: "8,000 DPI Darkfield sensor (tracks on glass surfaces 4mm+)" },
      { label: "Scroll Wheel", value: "MagSpeed electromagnetic scroll (scrolls 1,000 lines/sec, ratcheted or free-spin)" },
      { label: "Switch Type", value: "Quiet Click acoustic dampening (90% quieter clicks)" },
      { label: "Ergonomics", value: "Sculpted palm contour with thumb rest and horizontal gesture wheel" },
      { label: "Battery Life", value: "Up to 70 days on full charge (1-min quick charge = 3 hours)" },
      { label: "Multi-OS Flow", value: "Logitech Flow cross-computer control between Mac and Windows" },
    ],
    alternatives: ["Logitech MX Anywhere 3S ($80)", "Razer Pro Click ($90)"],
    priceUSD: { min: 100, max: 125 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/logitech-mx-master-3s.webp"
],
    link: "https://www.logitech.com/en-us/products/mice/mx-master-3s.html",
    linkVerified: true,
    tags: ["mouse", "ergonomic", "productivity", "wireless"],
  },
  {
    id: "herman-miller-aeron",
    category: "dev-setup",
    name: "Herman Miller Aeron Chair (Size B, Fully Loaded)",
    brand: "Herman Miller",
    summary: "The benchmark in ergonomic engineering with PostureFit SL dual-zone sacral support, 8Z Pellicle breathable mesh, and forward tilt.",
    specs: [
      { label: "Chair Sizing", value: "Size B (Medium: height 160–188cm, weight up to 350 lbs / 159 kg)" },
      { label: "Lumbar Technology", value: "PostureFit SL adjustable dual-pad sacral and lumbar stabilizing pads" },
      { label: "Suspension Material", value: "8Z Pellicle breathable elastomeric mesh with 8 tension zones" },
      { label: "Armrest Adjustability", value: "Fully adjustable 3D arms (height, depth, and pivot inward/outward)" },
      { label: "Tilt Mechanism", value: "Harmonic 2 tilt with tilt limiter and 5° forward seat angle for typing" },
      { label: "Warranty", value: "12-Year 24/7 commercial usage warranty on frame and mechanics" },
    ],
    alternatives: ["Steelcase Gesture ($1,400)", "Herman Miller Mirra 2 ($1,150)"],
    priceUSD: { min: 1480, max: 2050 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/herman-miller-aeron.webp"
],
    link: "https://www.hermanmiller.com/products/seating/office-chairs/aeron-chairs/",
    linkVerified: true,
    tags: ["chair", "ergonomic", "herman-miller", "luxury"],
  },
  {
    id: "power-backup-apc-1100va",
    category: "dev-setup",
    name: "APC Back-UPS Pro 1100VA / 660W Line-Interactive UPS",
    brand: "Schneider Electric / APC",
    summary: "Line-interactive uninterruptible power supply with Automatic Voltage Regulation (AVR) protecting Mac and monitors.",
    specs: [
      { label: "Output Capacity", value: "1100 VA / 660 Watts continuous clean sine-wave output" },
      { label: "Voltage Regulation", value: "Automatic Voltage Regulation (AVR) corrects brownouts without battery drain" },
      { label: "Outlet Configuration", value: "4× Battery Backup + Surge Outlets, 2× Surge-Only Outlets" },
      { label: "Runtime", value: "Approx 25–40 minutes for MacBook Pro + Dell 4K display workstation" },
      { label: "Battery Chemistry", value: "Sealed lead-acid maintenance-free with hot-swap replacement" },
    ],
    alternatives: ["CyberPower CP1500PFCLCD ($210)", "Microtek Legend 1000VA ($75)"],
    priceUSD: { min: 80, max: 115 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/power-backup-apc-1100va.webp"
],
    link: "https://www.apc.com/shop/us/en/products/APC-Back-UPS-Pro-1100VA-120V-AVR-LCD-10-outlets-2-USB-ports/P-BR1100M2",
    linkVerified: true,
    tags: ["ups", "power-backup", "protection", "hardware"],
  },
  {
    id: "tp-link-archer-ax55",
    category: "dev-setup",
    name: "TP-Link Archer AX55 Wi-Fi 6 Gigabit Router & Broadband Setup",
    brand: "TP-Link",
    summary: "Dual-band AX3000 Wi-Fi 6 router with Qualcomm CPU, OFDMA, HomeShield security, and fiber optical terminal allocation.",
    specs: [
      { label: "Wireless Standard", value: "Wi-Fi 6 (802.11ax) | AX3000 (2402 Mbps 5GHz + 574 Mbps 2.4GHz)" },
      { label: "Processor & Memory", value: "Dual-Core Qualcomm high-performance networking CPU" },
      { label: "Antennas & Beamforming", value: "4× High-gain external antennas with beamforming coverage" },
      { label: "Ethernet Ports", value: "1× Gigabit WAN + 4× Gigabit LAN ports" },
      { label: "Broadband Fund", value: "Allocates 300+ Mbps symmetrical fiber broadband setup" },
    ],
    alternatives: ["Asus RT-AX58U ($110)", "Netgear Nighthawk AX4 ($90)"],
    priceUSD: { min: 70, max: 100 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/tp-link-archer-ax55.webp"
],
    link: "https://www.tp-link.com/us/home-networking/wifi-router/archer-ax55/",
    linkVerified: true,
    tags: ["networking", "router", "wifi6", "broadband"],
  },
  {
    id: "synology-ds224-plus",
    category: "dev-setup",
    name: "Synology DS224+ NAS with 2×4TB IronWolf RAID 1",
    brand: "Synology & Seagate",
    summary: "2-bay network attached storage running DiskStation Manager (DSM) with 2×4TB CMR drives in mirrored RAID 1 for automated local backup.",
    specs: [
      { label: "Processor & RAM", value: "Intel Celeron J4125 4-core 2.0GHz (burst to 2.7GHz) | 6GB DDR4 RAM" },
      { label: "Drives Included", value: "2× 4TB Seagate IronWolf 3.5-inch CMR NAS Hard Drives (5900 RPM, 64MB Cache)" },
      { label: "Storage Array", value: "4TB Usable Capacity in RAID 1 (1-drive fault tolerance mirror)" },
      { label: "Network I/O", value: "Dual 1GbE LAN ports with Link Aggregation and failover support" },
      { label: "Backup Services", value: "Synology Drive, Active Backup for Mac/PC, Time Machine target, Docker hosting" },
    ],
    alternatives: ["QNAP TS-264-8G ($480)", "Asustor Drivestor 2 Pro ($280)"],
    priceUSD: { min: 510, max: 660 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/synology-ds224-plus.webp"
],
    link: "https://www.synology.com/en-us/products/DS224+",
    linkVerified: true,
    tags: ["nas", "storage", "backup", "synology", "raid"],
  },
  {
    id: "caldigit-ts4-dock-kit",
    category: "dev-setup",
    name: "CalDigit TS4 Thunderbolt 4 Dock, Laptop Stand, Samsung T7 2TB & Pi 5 Dev Lab",
    brand: "CalDigit & Raspberry Pi",
    summary: "18-port expansion dock delivering 98W host charging, aluminum riser stand, 2TB portable NVMe, and Raspberry Pi 5 8GB cluster kit.",
    specs: [
      { label: "Dock Connectivity", value: "CalDigit TS4 (18 ports: 3× TB4, 2.5GbE LAN, DisplayPort 1.4, SD/microSD UHS-II)" },
      { label: "Power Delivery", value: "98W dynamic Power Delivery to charge 14-inch MacBook Pro under full load" },
      { label: "Portable Storage", value: "Samsung T7 Shield 2TB Rugged External NVMe SSD (1,050 MB/s)" },
      { label: "Home Lab Computer", value: "Raspberry Pi 5 8GB RAM kit with active cooler, 128GB microSD & official PSU" },
      { label: "Ergonomics", value: "Rain Design mStand anodized aluminum laptop riser" },
    ],
    alternatives: ["OWC Thunderbolt 4 Dock ($280)", "Anker Apex 12-in-1 ($250)"],
    priceUSD: { min: 520, max: 670 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/caldigit-ts4-dock-kit.webp",
      "/images/items/caldigit-ts4-dock-kit-2.webp"
],
    link: "https://www.caldigit.com/thunderbolt-station-4/",
    linkVerified: true,
    tags: ["dock", "thunderbolt4", "raspberry-pi", "storage"],
  },
  {
    id: "engineering-books",
    category: "dev-setup",
    name: "Foundational Systems & Data Engineering Books",
    brand: "O'Reilly Media",
    summary: "Comprehensive physical reference editions: 'Designing Data-Intensive Applications' (Kleppmann) and 'Fundamentals of Data Engineering' (Reis & Housley).",
    specs: [
      { label: "Volume 1", value: "'Designing Data-Intensive Applications' by Martin Kleppmann (O'Reilly, 616 pages)" },
      { label: "Volume 2", value: "'Fundamentals of Data Engineering' by Joe Reis & Matt Housley (O'Reilly, 446 pages)" },
      { label: "Binding Quality", value: "Authentic print editions with high-opacity acid-free archival paper" },
      { label: "Domain Focus", value: "Distributed consensus, partition tolerance, streaming data lifecycle, OLAP modeling" },
    ],
    alternatives: ["Database Internals by Alex Petrov ($45)", "Designing Distributed Systems ($40)"],
    priceUSD: { min: 100, max: 130 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/engineering-books.webp"
],
    link: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
    linkVerified: true,
    tags: ["books", "engineering", "data", "learning"],
  },

  // ==========================================
  // 4. OUTFITS (Old Money, Linen & Bespoke Formal)
  // ==========================================
  {
    id: "linen-shirts-pack",
    category: "outfits",
    name: "100% European / Irish Linen Shirts (6-Pack)",
    brand: "Linen Club & M&S",
    summary: "Breathable natural flax linen long-sleeve shirts in white, cream, sand, light blue, french navy, and sage green.",
    specs: [
      { label: "Material Composition", value: "100% Pure European / Irish Flax Linen (60s lea count)" },
      { label: "Fit & Style", value: "Relaxed tailored fit with semi-spread soft collar and mother-of-pearl buttons" },
      { label: "Color Palette", value: "6 Shirts: Crisp White, Warm Cream, Sand Dune, Sky Blue, French Navy, Sage Green" },
      { label: "Fabric Weight", value: "145 GSM airy summer weave for tropical South Indian climate" },
    ],
    alternatives: ["Massimo Dutti 100% Linen Shirts ($80 each)", "Uniqlo Premium Linen ($40 each)"],
    priceUSD: { min: 170, max: 270 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/linen-shirts-pack.webp"
],
    link: "https://www.linenclub.com/",
    linkVerified: true,
    tags: ["linen", "wardrobe", "shirts", "summer"],
  },
  {
    id: "linen-trousers-pack",
    category: "outfits",
    name: "Tailored & Drawstring Linen Trousers (4-Pack)",
    brand: "Linen Club / Raymond",
    summary: "Pure linen trousers in cream, sand, and navy with tailored waistband and discreet inner drawstring.",
    specs: [
      { label: "Fabric", value: "100% Pure Flax Linen (50s count heavy-drape weave)" },
      { label: "Styles Included", value: "2× Tailored waistband with side tab adjusters + 2× Relaxed drawstring waist" },
      { label: "Colorways", value: "Cream Off-White, Natural Sand Beige, Deep Navy Blue, Olive" },
      { label: "Pockets & Details", value: "Slanted side pockets, double welt back pockets with horn buttons" },
    ],
    alternatives: ["Massimo Dutti Linen Trousers ($95 each)", "Zara Linen Blend ($50 each)"],
    priceUSD: { min: 135, max: 205 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/linen-trousers-pack.webp"
],
    link: "https://www.linenclub.com/menswear/trousers",
    linkVerified: true,
    tags: ["linen", "trousers", "tailored"],
  },
  {
    id: "fabindia-kurtas-pack",
    category: "outfits",
    name: "Fabindia Hand-Woven Pure Linen & Cotton Kurtas (3-Pack)",
    brand: "Fabindia",
    summary: "Knee-length long kurtas in white, off-white, and pastel tones crafted from handloom linen and breathable cotton.",
    specs: [
      { label: "Material", value: "Handloom pure flax linen and textured long-staple cotton" },
      { label: "Cut & Silhouette", value: "Straight cut knee-length with Mandarin band collar and side slits" },
      { label: "Colors Included", value: "Ivory White, Pearl Cream, Pastel Powder Blue" },
    ],
    alternatives: ["Manyavar Kurta Collection ($45 each)", "Raw Mango Artisan Silk ($180)"],
    priceUSD: { min: 70, max: 120 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/fabindia-kurtas-pack.webp"
],
    link: "https://www.fabindia.com/men-clothing/kurtas",
    linkVerified: true,
    tags: ["kurta", "ethnic", "handloom", "fabindia"],
  },
  {
    id: "raymond-mtm-navy-blazer",
    category: "outfits",
    name: "Raymond Made to Measure Navy Wool Blazer",
    brand: "Raymond MTM",
    summary: "Single-breasted 2-button blazer cut from Super 120s pure wool with half-canvas chest construction and horn buttons.",
    specs: [
      { label: "Fabric & Weight", value: "Super 120s Australian Merino Wool (260 GSM four-season weight)" },
      { label: "Canvas Construction", value: "Half-canvas floating chest piece for natural drape over time" },
      { label: "Cut & Lapel", value: "Single-breasted 2-button with 3.25-inch notch lapels and pick stitching" },
      { label: "Finishing Details", value: "Genuine natural horn buttons, Bemberg cupro breathable lining, dual vents" },
    ],
    alternatives: ["SuitSupply Havana Navy Blazer ($450)", "Brooks Brothers 1818 Blazer ($600)"],
    priceUSD: { min: 170, max: 285 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/raymond-mtm-navy-blazer.webp"
],
    link: "https://www.myraymond.com/made-to-measure",
    linkVerified: true,
    tags: ["blazer", "formal", "bespoke", "wool"],
  },
  {
    id: "raymond-mtm-charcoal-suit",
    category: "outfits",
    name: "Raymond Made to Measure Charcoal 2-Piece Suit",
    brand: "Raymond MTM",
    summary: "Tailored 2-piece business suit in deep charcoal grey wool, flat-front trousers, and half-canvas construction.",
    specs: [
      { label: "Fabric", value: "100% Super 120s Wool in Charcoal Herringbone or Plain Weave" },
      { label: "Jacket Design", value: "2-button notch lapel jacket, flap pockets, ticket pocket, double vented back" },
      { label: "Trouser Design", value: "Flat-front mid-rise trousers with extended tab waistband and side adjusters" },
      { label: "Fit Guarantee", value: "Bespoke pattern draft customized across 22 personal measurements" },
    ],
    alternatives: ["SuitSupply Napoli Charcoal Suit ($499)", "Massimo Dutti Wool Suit ($380)"],
    priceUSD: { min: 285, max: 455 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/raymond-mtm-charcoal-suit.webp"
],
    link: "https://www.myraymond.com/",
    linkVerified: true,
    tags: ["suit", "charcoal", "tailoring", "formal"],
  },
  {
    id: "grey-flannel-trousers",
    category: "outfits",
    name: "Tailored Grey Flannel Pleated Trousers",
    brand: "Raymond MTM",
    summary: "Mid-grey Super 100s wool flannel trousers with single pleats, side adjusters, and turn-up cuffs.",
    specs: [
      { label: "Material", value: "100% Super 100s Wool Flannel with brushed soft hand-feel" },
      { label: "Waistband", value: "Extended tab closure with stainless steel side adjusters (no belt loops)" },
      { label: "Pleat & Hem", value: "Single forward pleat | 1.75-inch turned cuffs (cuff hem)" },
    ],
    alternatives: ["Spier & Mackay Grey Flannel ($130)", "Suitsupply Flannel Trousers ($180)"],
    priceUSD: { min: 70, max: 115 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/grey-flannel-trousers.webp"
],
    link: "https://www.myraymond.com/",
    linkVerified: true,
    tags: ["trousers", "flannel", "wool", "classic"],
  },
  {
    id: "oxford-shirts-pack",
    category: "outfits",
    name: "Classic Oxford Cotton Button-Down (OCBD) Shirts (3-Pack)",
    brand: "Uniqlo / M&S",
    summary: "Durable 100% cotton Oxford cloth button-down shirts in white, light blue, and blue university stripe.",
    specs: [
      { label: "Fabric", value: "100% Heavyweight long-staple Oxford cotton weave (basket-weave texture)" },
      { label: "Collar Architecture", value: "Generous 3-inch button-down collar with natural elegant collar roll" },
      { label: "Colors Included", value: "Crisp White, University Light Blue, Classic Blue & White Bengal Stripe" },
    ],
    alternatives: ["Brooks Brothers Traditional Fit OCBD ($120 each)", "Spier & Mackay Oxford ($55 each)"],
    priceUSD: { min: 50, max: 100 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/oxford-shirts-pack.webp"
],
    link: "https://www.uniqlo.com/",
    linkVerified: true,
    tags: ["shirts", "oxford", "ocbd", "casual-smart"],
  },
  {
    id: "pique-polos-pack",
    category: "outfits",
    name: "Premium Piqué Cotton Polos (3-Pack)",
    brand: "Lacoste / Ralph Lauren",
    summary: "Heavyweight 100% Petit Piqué cotton short-sleeve polos in classic navy, crisp white, and heather grey.",
    specs: [
      { label: "Material", value: "100% Two-Ply Cotton Petit Piqué with ribbed collar and armbands" },
      { label: "Colors Included", value: "Classic Navy Blue, Pure White, Heather Melange Grey" },
      { label: "Fit & Placket", value: "Classic slim-straight fit with 2-button genuine mother-of-pearl placket" },
    ],
    alternatives: ["Sunspel Riviera Polo ($150 each)", "Uniqlo Dry Pique ($25 each)"],
    priceUSD: { min: 70, max: 135 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/pique-polos-pack.webp"
],
    link: "https://www.lacoste.com/",
    linkVerified: true,
    tags: ["polo", "pique", "casual", "classic"],
  },
  {
    id: "cotton-chinos-pack",
    category: "outfits",
    name: "Slim-Straight Cotton Chinos (3-Pack)",
    brand: "Marks & Spencer",
    summary: "Four-season stretch cotton twill chinos in British khaki, stone cream, and deep navy with tailored waistband.",
    specs: [
      { label: "Fabric Blend", value: "98% Combed Cotton Twill / 2% Elastane for all-day comfort stretch" },
      { label: "Colors Included", value: "British Khaki Tan, Stone Cream Off-White, Dark Navy Blue" },
      { label: "Cut", value: "Mid-rise slim-straight cut through the thigh with gentle taper to ankle" },
    ],
    alternatives: ["Dockers Signature Chino ($55 each)", "Bonobos Stretch Washed Chinos ($99 each)"],
    priceUSD: { min: 70, max: 100 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/cotton-chinos-pack.webp",
      "/images/items/cotton-chinos-pack-2.webp"
],
    link: "https://www.marksandspencer.in/",
    linkVerified: true,
    tags: ["chinos", "cotton", "trousers", "smart-casual"],
  },
  {
    id: "tan-penny-loafers",
    category: "outfits",
    name: "Handcrafted Tan Leather Penny Loafers",
    brand: "Hidesign / Clarks",
    summary: "Full-grain burnished tan leather penny loafers with Blake-stitched leather outsole and stacked wooden heel.",
    specs: [
      { label: "Upper Leather", value: "Full-Grain European Calfskin Leather with hand-burnished cognac patina" },
      { label: "Sole Construction", value: "Blake stitched leather outsole with rubber grip heel cap" },
      { label: "Lining & Insole", value: "Breathable glove leather lining with cushioned arch support" },
      { label: "Design", value: "Classic penny keeper strap with hand-sewn apron moccasin toe" },
    ],
    alternatives: ["Meermin Mallorca Penny Loafers ($195)", "Bass Weejuns Larson ($135)"],
    priceUSD: { min: 70, max: 170 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/tan-penny-loafers.webp"
],
    link: "https://hidesign.com/collections/men-shoes",
    linkVerified: true,
    tags: ["shoes", "loafers", "leather", "classic"],
  },
  {
    id: "minimal-white-sneakers",
    category: "outfits",
    name: "Minimalist White Leather Sneakers",
    brand: "Adidas Stan Smith Lux / Veja",
    summary: "Clean low-top sneakers in premium full-grain white calfskin leather with stitched rubber cupsole.",
    specs: [
      { label: "Upper Material", value: "Supple full-grain white leather with unlined butter-soft collar" },
      { label: "Sole Unit", value: "Abrasion-resistant stitched rubber cupsole in off-white / milk tone" },
      { label: "Branding", value: "Minimal debossed tongue logo with zero exterior garish branding" },
    ],
    alternatives: ["Common Projects Original Achilles Low ($425)", "Oliver Cabell Low 1 ($190)"],
    priceUSD: { min: 57, max: 115 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/minimal-white-sneakers.webp"
],
    link: "https://www.adidas.co.in/stan-smith",
    linkVerified: true,
    tags: ["shoes", "sneakers", "minimalist", "white-sneakers"],
  },
  {
    id: "clarks-desert-boots",
    category: "outfits",
    name: "Clarks Original Desert Boots (Sand Suede)",
    brand: "Clarks Originals",
    summary: "Iconic 1950 ankle chukka boot in premium English sand suede with natural plantation crepe rubber sole.",
    specs: [
      { label: "Upper Leather", value: "Premium English sand suede from historic Charles F. Stead tannery" },
      { label: "Sole Material", value: "FSC-certified natural plantation crepe rubber sole for all-day cushion" },
      { label: "Closure", value: "Simple 2-eyelet lace-up closure with clean tonal stitching" },
    ],
    alternatives: ["Astorflex Driftflex Suede ($175)", "Red Wing Weekender Chukka ($240)"],
    priceUSD: { min: 100, max: 125 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/clarks-desert-boots.webp"
],
    link: "https://www.clarks.com/en-us/originals/desert-boot/mens",
    linkVerified: true,
    tags: ["shoes", "boots", "suede", "chukka"],
  },
  {
    id: "shoe-care-suite",
    category: "outfits",
    name: "Luxury Shoe Care Kit & Aromatic Cedar Shoe Trees",
    brand: "Saphir & Hanger Project",
    summary: "2 pairs of solid aromatic red cedar split-toe shoe trees, 100% horsehair brushes, and Saphir wax cream.",
    specs: [
      { label: "Shoe Trees", value: "2× Pairs solid aromatic American red cedar split-toe trees with brass knobs" },
      { label: "Brushes", value: "2× 100% genuine horsehair applicator and polishing brushes (beechwood handle)" },
      { label: "Creams & Conditioner", value: "Saphir Médaille d'Or Renovateur cleaner & Pommadier cream polish" },
      { label: "Accessories", value: "Real oxhorn 7-inch shoehorn + microfiber buffing cloths" },
    ],
    alternatives: ["Woodlore Cedar Shoe Trees ($35)", "Kiwi Ultimate Shoe Polish Kit ($20)"],
    priceUSD: { min: 30, max: 45 },
    when: "now",
    priority: "low",
    status: "wishlist",
    images: [
      "/images/items/shoe-care-suite.webp"
],
    link: "https://saphir.com/",
    linkVerified: true,
    tags: ["shoe-care", "leather", "cedar", "maintenance"],
  },
  {
    id: "tissot-gentleman-powermatic",
    category: "outfits",
    name: "Tissot Gentleman Powermatic 80 Silicium",
    brand: "Tissot",
    summary: "Swiss automatic luxury watch featuring an 80-hour power reserve, anti-magnetic silicon balance spring, and blue sunray dial.",
    specs: [
      { label: "Case & Diameter", value: "316L Stainless Steel | 40.0mm diameter, 11.5mm thickness, 48mm lug-to-lug" },
      { label: "Dial & Crystal", value: "Sunray Blue crosshair dial with applied beveled indices | Domed sapphire crystal" },
      { label: "Movement", value: "Swiss Powermatic 80.811 Automatic (25 jewels, 21,600 vph, 80hr reserve)" },
      { label: "Silicon Technology", value: "Patented Silicium (silicon) hairspring offering superior anti-magnetic resistance" },
      { label: "Bracelet", value: "Solid stainless steel 3-link bracelet with butterfly push-button clasp" },
      { label: "Water Resistance", value: "100 meters (10 bar / 330 ft)" },
    ],
    alternatives: [
      "Seiko Presage 'Cocktail Time' Skydiving ($425)",
      "Hamilton Khaki Field Auto 38mm ($575)",
    ],
    priceUSD: { min: 400, max: 570 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/tissot-gentleman-powermatic.webp"
],
    link: "https://www.tissotwatches.com/en-us/t1274071104100.html",
    linkVerified: true,
    tags: ["watch", "automatic", "swiss", "tissot", "luxury"],
  },
  {
    id: "seiko-5-srpe",
    category: "outfits",
    name: "Seiko 5 Sports SRPE51 'DressKX'",
    brand: "Seiko",
    summary: "Versatile 40mm everyday automatic watch with sunburst anthracite grey dial and reliable 4R36 movement.",
    specs: [
      { label: "Case Dimensions", value: "40.0mm diameter, 11.5mm thickness, 44.6mm compact lug-to-lug" },
      { label: "Dial", value: "Sunburst Anthracite Grey with LumiBrite hands and indices" },
      { label: "Movement", value: "Seiko In-House Caliber 4R36 automatic (manual hand-winding and hacking)" },
      { label: "Power Reserve", value: "Approx 41 hours power reserve" },
      { label: "Water Resistance", value: "100 meters (10 bar) with exhibition caseback" },
    ],
    alternatives: ["Citizen Tsuyosa Automatic ($299)", "Orient Bambino V4 ($160)"],
    priceUSD: { min: 180, max: 240 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/seiko-5-srpe.webp"
],
    link: "https://www.seikowatches.com/global-en/products/5sports/srpe51k1",
    linkVerified: true,
    tags: ["watch", "automatic", "seiko", "dresskx"],
  },
  {
    id: "leather-belts-pack",
    category: "outfits",
    name: "Full-Grain Vegetable-Tanned Leather Belts (2-Pack)",
    brand: "Hidesign",
    summary: "1.25-inch dress and casual belts crafted from thick full-grain vegetable-tanned leather in cognac tan and black.",
    specs: [
      { label: "Leather Grade", value: "Solid single-ply full-grain vegetable-tanned harness leather (3.5mm thick)" },
      { label: "Color Pair", value: "1× Burnished Cognac Tan + 1× Formal Jet Black" },
      { label: "Buckles", value: "Brushed solid brass and matte nickel-finished square buckles" },
    ],
    alternatives: ["Tanner Goods Classic Belt ($95)", "Saddleback Leather Belt ($85)"],
    priceUSD: { min: 23, max: 45 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/leather-belts-pack.webp"
],
    link: "https://hidesign.com/collections/men-belts",
    linkVerified: true,
    tags: ["belt", "leather", "accessories"],
  },
  {
    id: "sunglasses-wayfarer-persol",
    category: "outfits",
    name: "Ray-Ban Original Wayfarer / Persol 649 Sunglasses",
    brand: "Ray-Ban & Persol",
    summary: "Timeless eyewear with hand-polished Italian acetate frame, green G-15 mineral glass lenses, and 100% UV protection.",
    specs: [
      { label: "Frame Material", value: "Handcrafted Italian glossy tortoiseshell / black cellulose acetate" },
      { label: "Lens Technology", value: "Polarized G-15 crystal mineral glass (scratch-resistant, 100% UV400)" },
      { label: "Fit", value: "Classic 50mm lens diameter, 22mm keyhole bridge, 150mm temple arms" },
    ],
    alternatives: ["Persol 714 Steve McQueen Folding ($380)", "Moscot Lemtosh ($340)"],
    priceUSD: { min: 57, max: 135 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/sunglasses-wayfarer-persol.webp"
],
    link: "https://www.ray-ban.com/usa/sunglasses/RB2140%20ORIGINAL%20WAYFARER%20CLASSIC-black/805289126577",
    linkVerified: true,
    tags: ["eyewear", "sunglasses", "classic", "style"],
  },
  {
    id: "handcrafted-bandhgala",
    category: "outfits",
    name: "Handcrafted Raymond Bespoke Bandhgala Jacket",
    brand: "Raymond Bespoke Tailor",
    summary: "Royal Indian bespoke bandhgala jacket in dark navy/charcoal wool with structured mandarin collar and antique metal buttons.",
    specs: [
      { label: "Fabric", value: "Super 100s worsted wool blend in deep midnight navy" },
      { label: "Collar", value: "Structured stand-up Mandarin bandhgala collar with hook-and-eye throat latch" },
      { label: "Closure", value: "5-button front with custom antique silver/brass embossed buttons" },
    ],
    alternatives: ["Manyavar Royal Bandhgala ($160)", "Raghavendra Rathore Bespoke ($800)"],
    priceUSD: { min: 170, max: 340 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/handcrafted-bandhgala.webp"
],
    link: "https://www.myraymond.com/",
    linkVerified: true,
    tags: ["bandhgala", "ethnic", "formal", "bespoke"],
  },
  {
    id: "garment-steamer-hangers",
    category: "outfits",
    name: "Philips Handheld Garment Steamer & Solid Cedar Hangers (12-Pack)",
    brand: "Philips & Hanger Project",
    summary: "Fast handheld 32g/min continuous garment steamer paired with 12 broad-shoulder wooden cedar suit hangers.",
    specs: [
      { label: "Steamer Power", value: "Philips 8000 Series (1600W, ready in 60 seconds, 32g/min steam rate)" },
      { label: "Suit Hangers", value: "12× Solid natural aromatic red cedar contoured broad-shoulder hangers (2.25-inch flared ends)" },
      { label: "Trouser Bar", value: "Flocked non-slip velvet trouser bar to prevent creasing" },
    ],
    alternatives: ["Conair Turbo Steamer ($60)", "IKEA Bumerang Hangers ($15)"],
    priceUSD: { min: 60, max: 100 },
    when: "now",
    priority: "low",
    status: "wishlist",
    images: [
      "/images/items/garment-steamer-hangers.webp",
      "/images/items/garment-steamer-hangers-2.webp"
],
    link: "https://www.philips.co.in/c-m-ho/garment-steamers",
    linkVerified: true,
    tags: ["care", "steamer", "hangers", "wardrobe"],
  },

  // ==========================================
  // 5. MOTORCYCLES & TOURING
  // Pick One Candidate (Interceptor 650 is default active in plan)
  // ==========================================
  {
    id: "re-interceptor-650",
    category: "bike",
    candidateGroup: "motorcycle-choice",
    name: "Royal Enfield Interceptor 650",
    brand: "Royal Enfield",
    summary: "648cc parallel-twin roadster with 270° firing order crank, 47 bhp, ByBre twin-disc brakes, and timeless classic poise.",
    specs: [
      { label: "Engine Type", value: "648cc Air/Oil-Cooled SOHC 4-Valve Parallel-Twin" },
      { label: "Power & Torque", value: "47 bhp (34.9 kW) @ 7,150 rpm | 52.3 Nm @ 5,250 rpm (80% from 2500 rpm)" },
      { label: "Gearbox & Clutch", value: "6-Speed constant mesh with slipper and assist clutch" },
      { label: "Brakes & ABS", value: "ByBre 320mm front disc caliper | 240mm rear disc | Dual-channel Bosch ABS" },
      { label: "Chassis & Suspension", value: "Harris Performance steel tubular double-cradle | 41mm front forks (130mm)" },
      { label: "Wheels & Tires", value: "18-inch alloy wheels with tubeless Ceat Zoom Cruz tires" },
      { label: "Dimensions", value: "202 kg kerb weight | 13.7L fuel tank | 804mm seat height | 174mm clearance" },
    ],
    alternatives: ["Royal Enfield Himalayan 450", "Triumph Speed 400", "KTM 390 Duke"],
    priceUSD: { min: 3400, max: 4200 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/re-interceptor-650.webp"
],
    link: "https://www.royalenfield.com/in/en/motorcycles/interceptor-650/",
    linkVerified: true,
    tags: ["motorcycle", "twin-cylinder", "roadster", "candidate-pick-one"],
  },
  {
    id: "re-himalayan-450",
    category: "bike",
    candidateGroup: "motorcycle-choice",
    name: "Royal Enfield Himalayan 450",
    brand: "Royal Enfield",
    summary: "452cc liquid-cooled Sherpa DOHC engine delivering 40PS, 200mm Showa long-travel suspension, and Google Maps navigation.",
    specs: [
      { label: "Engine Architecture", value: "451.65cc Liquid-Cooled Single-Cylinder DOHC 4-Valve (Sherpa 450)" },
      { label: "Power & Torque", value: "40.02 PS (29.44 kW) @ 8,000 rpm | 40 Nm @ 5,500 rpm" },
      { label: "Suspension Travel", value: "Showa 43mm USD separate-function forks (200mm) | Linkage monoshock (200mm)" },
      { label: "Off-Road Geometry", value: "21-inch front / 17-inch rear spoke wheels | 230mm ground clearance" },
      { label: "Smart Display", value: "4-inch round full-color TFT display with native Google Maps screen mirroring" },
      { label: "Braking & Modes", value: "Switchable dual-channel ABS (rear ABS switchable off for gravel trails)" },
      { label: "Tank & Range", value: "17-liter fuel tank (~450+ km touring range between fills)" },
    ],
    alternatives: ["KTM 390 Adventure ($4,400)", "BMW G 310 GS ($4,200)"],
    priceUSD: { min: 3500, max: 4300 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/re-himalayan-450.webp"
],
    link: "https://www.royalenfield.com/in/en/motorcycles/himalayan-450/",
    linkVerified: true,
    tags: ["motorcycle", "adventure", "touring", "candidate-pick-one"],
  },
  {
    id: "triumph-speed-400",
    category: "bike",
    candidateGroup: "motorcycle-choice",
    name: "Triumph Speed 400",
    brand: "Triumph Motorcycles",
    summary: "398cc TR-series engine producing 40PS with signature British roadster poise, 176kg lightweight handling, and premium finish.",
    specs: [
      { label: "Engine", value: "398.15cc Liquid-Cooled 4-Valve DOHC Single Cylinder (TR-Series)" },
      { label: "Power & Torque", value: "40 PS (39.5 bhp) @ 8,000 rpm | 37.5 Nm @ 6,500 rpm" },
      { label: "Chassis & Weight", value: "Tubular steel hybrid spine perimeter frame | 176 kg light kerb weight" },
      { label: "Suspension", value: "43mm upside-down big-piston front forks (140mm travel) | Monoshock with reservoir" },
      { label: "Rider Safety", value: "Bosch dual-channel ABS + Switchable Traction Control (Ride-by-wire)" },
      { label: "Service Interval", value: "16,000 km or 12 months (lowest running downtime in class)" },
    ],
    alternatives: ["Royal Enfield Guerrilla 450 ($3,200)", "Honda CB300R ($3,100)"],
    priceUSD: { min: 3400, max: 4100 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/triumph-speed-400.webp"
],
    link: "https://www.triumphmotorcycles.in/motorcycles/classic/speed-400",
    linkVerified: true,
    tags: ["motorcycle", "roadster", "triumph", "candidate-pick-one"],
  },
  {
    id: "ktm-390-duke",
    category: "bike",
    candidateGroup: "motorcycle-choice",
    name: "KTM 390 Duke",
    brand: "KTM",
    summary: "399cc LC4c engine punching out 46PS, adjustable WP APEX suspension, Cornering ABS with Supermoto mode, and Launch Control.",
    specs: [
      { label: "Engine Displacement", value: "398.7cc Liquid-Cooled DOHC 4-Valve Single (LC4c Gen 3)" },
      { label: "Power Output", value: "46 PS (45.3 bhp) @ 8,500 rpm | 39 Nm @ 6,500 rpm" },
      { label: "Suspension", value: "WP APEX 43mm open-cartridge USD (5-click rebound/compression) | Offset monoshock" },
      { label: "Electronics Suite", value: "Cornering ABS with Supermoto mode, Quickshifter+ up/down, Launch Control" },
      { label: "Display & Connectivity", value: "5-inch color bonded TFT with turn-by-turn navigation and music controls" },
      { label: "Weight", value: "168.3 kg wet kerb weight without fuel" },
    ],
    alternatives: ["Yamaha MT-03 ($4,300)", "BMW G 310 R ($3,900)"],
    priceUSD: { min: 3600, max: 4400 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/ktm-390-duke.webp"
],
    link: "https://www.ktmindia.com/ktm-bikes/naked-bike/ktm-390-duke",
    linkVerified: true,
    tags: ["motorcycle", "naked", "ktm", "sport", "candidate-pick-one"],
  },
  {
    id: "motorcycle-helmet-axor-apex",
    category: "bike",
    name: "Axor Apex / Steelbird ISI/DOT/ECE 22.06 Full-Face Helmet",
    brand: "Axor & Steelbird",
    summary: "ECE 22.06 & DOT certified aerodynamic full-face helmet with Pinlock anti-fog visor and dual-density EPS liner.",
    specs: [
      { label: "Safety Certification", value: "ECE 22.06 (European standard) & DOT (US) & ISI certified" },
      { label: "Shell Material", value: "High-impact thermoplastic shell with integrated aerodynamic rear spoiler" },
      { label: "Optics & Vision", value: "Scratch-resistant polycarbonate visor with Pinlock 30 anti-fog insert included" },
      { label: "Ventilation", value: "Multi-channel intake vents with EPS channel exhaust ventilation" },
      { label: "Strap System", value: "Double D-ring titanium-coated steel safety retention strap" },
    ],
    alternatives: ["MT Thunder 4 SV ECE 22.06 ($140)", "AGV K1 S ($240)"],
    priceUSD: { min: 60, max: 200 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/motorcycle-helmet-axor-apex.webp"
],
    link: "https://axorhelmets.com/collections/apex",
    linkVerified: true,
    tags: ["helmet", "safety", "gear", "bike"],
  },
  {
    id: "motorcycle-jacket-rynox-storm-evo",
    category: "bike",
    name: "Rynox Storm Evo CE Level 2 Armored All-Weather Riding Jacket",
    brand: "Rynox Gears",
    summary: "Heavy-duty Cordura 600D chassis with Knox Micro-Lock CE Level 2 armor at back, shoulders, elbows, and chest.",
    specs: [
      { label: "Armor Specification", value: "Knox Micro-Lock CE Level 2 certified protectors on Back, Shoulders & Elbows" },
      { label: "Abrasion Resistance", value: "Invista Cordura 600D with heavy-duty mesh ventilation zones" },
      { label: "Weather Liners", value: "Dual detachable liners: External 100% waterproof rain jacket + Thermal winter vest" },
      { label: "Visibility", value: "3M Scotchlite reflective panels on chest, arms, and back for night riding" },
    ],
    alternatives: ["Alpinestars T-GP Plus R v3 ($260)", "Revit Eclipse 2 Mesh ($180)"],
    priceUSD: { min: 140, max: 200 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/motorcycle-jacket-rynox-storm-evo.webp"
],
    link: "https://rynoxgears.com/products/storm-evo-jacket",
    linkVerified: true,
    tags: ["jacket", "armor", "rynox", "safety", "bike"],
  },
  {
    id: "motorcycle-gloves-boots-armor",
    category: "bike",
    name: "CE Level 2 Riding Gloves, Touring Boots & Bionic Knee Guards",
    brand: "Rynox & Royal Enfield",
    summary: "Full leather carbon-knuckle touch-screen gloves, waterproof ankle-protecting touring boots, and ergonomic bionic knee guards.",
    specs: [
      { label: "Gloves", value: "Full-grain goat leather chassis with real carbon fiber knuckle armor & Scaphoid palm slider" },
      { label: "Touring Boots", value: "Waterproof microfiber leather boots with TPU shin, heel, and ankle disc reinforcements" },
      { label: "Knee Guards", value: "Dual-pivot ergonomic knee armor with CE Level 2 certified impact absorption" },
    ],
    alternatives: ["Alpinestars SMX-1 R V2 Boots ($190)", "TCX Blend 2 Waterproof ($220)"],
    priceUSD: { min: 100, max: 280 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/motorcycle-gloves-boots-armor.webp",
      "/images/items/motorcycle-gloves-boots-armor-2.webp"
],
    link: "https://rynoxgears.com/",
    linkVerified: true,
    tags: ["gear", "boots", "gloves", "safety"],
  },
  {
    id: "motorcycle-touring-accessories",
    category: "bike",
    name: "Crash Guards, Quad Lock Pro Phone Mount, Disc Lock & Bike Cover",
    brand: "Quad Lock & Mototorque",
    summary: "Heavy-duty CNC machined vibration-damped phone mount, stainless steel engine guard, alarm disc lock, and UV cover.",
    specs: [
      { label: "Phone Navigation Mount", value: "Quad Lock Handlebar Mount Pro + Vibration Dampener + Weatherproof Wireless Charger" },
      { label: "Engine Protection", value: "Heavy-duty tubular steel crash guards with replaceable Delrin frame sliders" },
      { label: "Security & Theft Defense", value: "120dB motion-activated alarm disc lock with hardened 14mm carbide-reinforced steel pin" },
      { label: "Weather Protection", value: "Heat-resistant waterproof 300D Oxford fabric motorcycle outdoor cover" },
    ],
    alternatives: ["Ram Mounts X-Grip ($80)", "Kovix Alarm Disc Lock ($60)"],
    priceUSD: { min: 150, max: 250 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/motorcycle-touring-accessories.webp"
],
    link: "https://www.quadlockcase.asia/collections/motorcycle",
    linkVerified: true,
    tags: ["accessories", "quad-lock", "protection", "bike"],
  },
  {
    id: "motorcycle-running-maintenance",
    category: "bike",
    name: "Motorcycle Running Costs: Zero-Dep Insurance, Motul 300V Oil & Service",
    brand: "Comprehensive Shield",
    summary: "Bumper-to-bumper zero-depreciation insurance policy, periodic 5,000 km oil service with Motul 300V synthetic, and petrol.",
    specs: [
      { label: "Insurance Coverage", value: "1-Year Comprehensive Zero-Depreciation + 5-Year Third-Party Mandatory Shield" },
      { label: "Periodic Maintenance", value: "Every 5,000 km oil change with Motul 300V Factory Line 15W-50 & OEM oil filter" },
      { label: "Chain & Cable Care", value: "Motul C1 chain clean + C2 chain lube applied every 500 km" },
      { label: "Fuel Allocation", value: "Approx 800–1,200 km highway and commute fuel on 95-octane petrol" },
    ],
    alternatives: ["Third-party only insurance ($35/yr)", "Standard mineral oil servicing ($40)"],
    priceUSD: { min: 120, max: 150 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/motorcycle-running-maintenance.webp"
],
    link: "https://www.motul.com/",
    linkVerified: true,
    tags: ["running-cost", "insurance", "service", "fuel"],
  },

  // ==========================================
  // 6. GROOMING (Monthly & Hardware)
  // ==========================================
  {
    id: "skincare-routine-arsenal",
    category: "grooming",
    name: "Dermatological Skincare Suite: CeraVe, Minimalist & La Roche-Posay",
    brand: "CeraVe & La Roche-Posay",
    summary: "Complete morning and evening dermatological regimen: CeraVe Foaming Cleanser, Minimalist Vitamin C, and Anthelios SPF 50.",
    specs: [
      { label: "Morning Cleanser", value: "CeraVe Foaming Facial Cleanser (Niacinamide, Hyaluronic Acid, 3 Ceramides)" },
      { label: "Morning Antioxidant", value: "Minimalist 10% Vitamin C Serum with Centella Asiatica Water" },
      { label: "Sunscreen Shield", value: "La Roche-Posay Anthelios UVMune 400 Invisible Fluid SPF 50+ (Broad UVA/UVB)" },
      { label: "Night Barrier Cream", value: "CeraVe Moisturizing Cream with MVE Controlled Release Technology" },
      { label: "Night Treatment", value: "Minimalist 0.3% Retinol in Squalane + 2% Salicylic Acid BHA exfoliant" },
    ],
    alternatives: ["Kiehl's Facial Fuel Regimen ($140)", "The Ordinary Complete Set ($55)"],
    priceUSD: { min: 57, max: 75 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/skincare-routine-arsenal.webp"
],
    link: "https://www.cerave.com/",
    linkVerified: true,
    tags: ["skincare", "grooming", "routine", "sunscreen"],
  },
  {
    id: "fragrance-trio",
    category: "grooming",
    name: "Signature Luxury Fragrance Wardrobe: Sauvage, Bleu & Acqua di Giò",
    brand: "Dior, Chanel & Armani",
    summary: "Curation of signature daytime, evening, and fresh summer scents: Dior Sauvage EDP, Bleu de Chanel EDP, and Acqua di Giò.",
    specs: [
      { label: "Signature Scent", value: "Dior Sauvage Eau de Parfum (100ml: Calabrian Bergamot, Sichuan Pepper, Vanilla)" },
      { label: "Evening Sophistication", value: "Bleu de Chanel Eau de Parfum (100ml: Sandalwood, Cedar, Incense, Grapefruit)" },
      { label: "Fresh Daytime", value: "Giorgio Armani Acqua di Giò EDT (100ml: Marine notes, Green Tangerine, Rosemary)" },
      { label: "Concentration", value: "Eau de Parfum (15–20% perfume oil) for 8–10 hours lingering sillage" },
    ],
    alternatives: ["Tom Ford Noir Extreme ($180)", "Terre d'Hermès Pure Parfum ($160)"],
    priceUSD: { min: 280, max: 380 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/fragrance-trio.webp"
],
    link: "https://www.dior.com/",
    linkVerified: true,
    tags: ["fragrance", "perfume", "dior", "chanel", "luxury"],
  },
  {
    id: "philips-oneblade",
    category: "grooming",
    name: "Philips OneBlade Pro Hybrid Beard Trimmer & Shaver",
    brand: "Philips",
    summary: "Revolutionary dual-sided cutter moving 12,000 times/min that trims, edges, and shaves any length of hair without razor burn.",
    specs: [
      { label: "Blade Mechanism", value: "Dual-sided stainless steel blade with protective glide coating & rounded tips" },
      { label: "Cutting Speed", value: "200 oscillations per second (12,000 cuts/min)" },
      { label: "Precision Comb", value: "14-length adjustable precision comb (0.4mm to 10mm)" },
      { label: "Battery & Charging", value: "Lithium-Ion battery with 90-minute runtime & LED digital display" },
      { label: "Usage", value: "100% waterproof for wet, dry, or in-shower shaving" },
    ],
    alternatives: ["Braun Series X Hybrid ($45)", "Panasonic Arc3 ($65)"],
    priceUSD: { min: 23, max: 35 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/philips-oneblade.webp",
      "/images/items/philips-oneblade-2.webp"
],
    link: "https://www.philips.co.in/c-m-pe/oneblade-trim-edge-and-shave",
    linkVerified: true,
    tags: ["trimmer", "shaver", "oneblade", "grooming"],
  },
  {
    id: "oral-b-io-series-9",
    category: "grooming",
    name: "Oral-B iO Series 9 / Series 5 Electric Toothbrush",
    brand: "Oral-B",
    summary: "Magnetic iO drive system delivering micro-vibrations with 3D teeth tracking, interactive color display, and smart pressure sensor.",
    specs: [
      { label: "Motor System", value: "Frictionless linear magnetic drive transferring energy directly to bristle tips" },
      { label: "Smart Pressure Sensor", value: "Displays green when brushing with optimal pressure, red when too hard" },
      { label: "3D Tracking", value: "Artificial Intelligence tracking 16 surfaces in real time via Oral-B app" },
      { label: "Brushing Modes", value: "7 Modes: Daily Clean, Sensitive, Whiten, Gum Care, Intense, Super Sensitive, Tongue Clean" },
      { label: "Charging", value: "Magnetic quick charger (charges in 3 hours) + Power2Go charging travel case" },
    ],
    alternatives: ["Philips Sonicare DiamondClean ($180)", "Oral-B Pro 3 3000 ($60)"],
    priceUSD: { min: 115, max: 160 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/oral-b-io-series-9.webp"
],
    link: "https://oral-b.co.in/en-in/products/electric-toothbrushes/io-series-9",
    linkVerified: true,
    tags: ["oral-care", "toothbrush", "electric", "health"],
  },
  {
    id: "barber-hair-derma-care",
    category: "grooming",
    name: "Hair Styling Clay, Beard Oil, Monthly Barber & Quarterly Dermatology",
    brand: "Beardo & Apollo Derma",
    summary: "Premium matte hair clay, cold-pressed beard oil, monthly master barber grooming, and quarterly board-certified dermatologist review.",
    specs: [
      { label: "Hair & Beard Products", value: "Matte texturing styling clay + Cold-pressed jojoba/argan beard conditioning oil" },
      { label: "Barber Fund", value: "Monthly professional haircut, hot towel beard sculpting, and facial steam" },
      { label: "Dermatology", value: "Quarterly clinical checkup for barrier assessment, moles, and scalp health" },
    ],
    priceUSD: { min: 45, max: 70 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/barber-hair-derma-care.webp"
],
    tags: ["barber", "grooming", "haircare", "beard"],
  },

  // ==========================================
  // 7. HIGH-PROTEIN DIET (130g+ Daily Nutrition)
  // ==========================================
  {
    id: "protein-diet-monthly",
    category: "diet",
    name: "Daily 137g High-Protein Nutrition Blueprint (Monthly Grocery)",
    brand: "Fresh Whole Foods",
    summary: "Scientifically structured 137g daily protein blueprint: 120 farm eggs, 4.5kg chicken breast, 6L curd, 1.5kg soya chunks, almonds.",
    specs: [
      { label: "Daily Protein Target", value: "137g protein/day (1.8g to 2.0g per kg target bodyweight)" },
      { label: "Eggs Allocation", value: "4 whole farm eggs daily (120 eggs/month = 24g protein/day)" },
      { label: "Chicken Breast", value: "150g raw lean breast daily (~4.5kg/month = 33g protein/day)" },
      { label: "Soya & Dairy", value: "50g dry soya chunks (26g protein) + 200g Greek yogurt/curd (15g protein)" },
      { label: "Whole Food Base", value: "Brown rice, whole wheat rotis, dal, seasonal vegetables, cold-pressed oils" },
      { label: "Vegetarian Swaps", value: "Paneer, organic tofu, extra soya chunks, and whey isolate substitutions" },
    ],
    priceUSD: { min: 110, max: 140 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/protein-diet-monthly.webp"
],
    tags: ["nutrition", "protein", "diet", "meal-prep"],
  },
  {
    id: "daily-supplements-stack",
    category: "diet",
    name: "Optimum Nutrition Gold Standard Whey, Creapure & Omega-3",
    brand: "Optimum Nutrition & Nordic Naturals",
    summary: "Third-party tested performance supplements: 100% Whey Protein Isolate, 5g Creapure Creatine Monohydrate, and Nordic Naturals EPA/DHA.",
    specs: [
      { label: "Whey Protein", value: "Optimum Nutrition Gold Standard 100% Whey (24g protein, 5.5g BCAAs per scoop, Informed Choice)" },
      { label: "Creatine", value: "Creapure 100% Pure Micronized Creatine Monohydrate (5g daily serving for ATP power)" },
      { label: "Omega-3 Fish Oil", value: "Nordic Naturals Ultimate Omega (1280mg purified EPA/DHA molecularly distilled)" },
      { label: "Multivitamin", value: "Daily multimineral complex with Zinc Picolinate and Magnesium Glycinate" },
    ],
    alternatives: ["MyProtein Impact Whey ($65)", "MuscleBlaze Biozyme Whey ($45)"],
    priceUSD: { min: 65, max: 95 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/daily-supplements-stack.webp",
      "/images/items/daily-supplements-stack-2.webp"
],
    link: "https://www.optimumnutrition.co.in/",
    linkVerified: true,
    tags: ["supplements", "whey", "creatine", "fitness"],
  },
  {
    id: "meal-prep-kitchen-arsenal",
    category: "diet",
    name: "Philips Digital Airfryer XXL, NutriBullet & Digital Scale",
    brand: "Philips & NutriBullet",
    summary: "Kitchen performance tools for rapid meal preparation: Philips Rapid Air XXL Airfryer, 900W extractor blender, and tare digital scale.",
    specs: [
      { label: "Airfryer", value: "Philips XXL 1.4kg capacity (Rapid Air technology, 90% less oil, digital presets)" },
      { label: "Blender Extractor", value: "NutriBullet Pro 900W (stainless steel cyclonic blades for daily whey shakes)" },
      { label: "Scale", value: "High-precision 1g digital kitchen scale with tare function" },
      { label: "Containers", value: "6-Pack borosilicate glass airtight leakproof meal prep bento containers" },
    ],
    alternatives: ["Instant Vortex Plus Airfryer ($120)", "Ninja Professional Blender ($100)"],
    priceUSD: { min: 135, max: 195 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/meal-prep-kitchen-arsenal.webp"
],
    link: "https://www.philips.co.in/c-m-ho/cooking/airfryer",
    linkVerified: true,
    tags: ["kitchen", "airfryer", "blender", "meal-prep"],
  },
  {
    id: "gym-membership",
    category: "diet",
    name: "Commercial Strength & Conditioning Gym Annual Access",
    brand: "Fitness Center",
    summary: "Annual membership to a full commercial strength facility equipped with Olympic barbells, power cages, and dumbbell racks up to 40kg.",
    specs: [
      { label: "Equipment Suite", value: "Olympic deadlift platforms, bumper plates, 3× power cages, cable crossover" },
      { label: "Free Weights", value: "Commercial rubber hex dumbbells from 2.5kg to 45kg in 2.5kg increments" },
      { label: "Cardio & Recovery", value: "Concept2 rowing machines, air bikes, sauna and shower locker facilities" },
    ],
    priceUSD: { min: 275, max: 400 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/gym-membership.webp"
],
    tags: ["gym", "fitness", "training", "health"],
  },

  // ==========================================
  // 8. HOME, SLEEP & HEALTH
  // ==========================================
  {
    id: "orthopedic-mattress",
    category: "home-health",
    name: "Wakefit / Sleepwell 6-Inch Orthopedic Memory Foam Mattress",
    brand: "Wakefit / Sleepwell",
    summary: "6-inch medium-firm orthopedic mattress with differential pressure-relief zones and two supportive ergonomic pillows.",
    specs: [
      { label: "Dimensions & Core", value: "Queen / King Size (78 × 60 × 6 inches) | High resilience supportive foam base" },
      { label: "Comfort Layer", value: "High-density open-cell memory foam with 7-zone body contouring pressure relief" },
      { label: "Cover Fabric", value: "Breathable removable quilted spun knitted fabric (anti-microbial)" },
      { label: "Pillows", value: "2× Contoured cervical memory foam orthopedic sleeping pillows included" },
      { label: "Warranty", value: "10-Year Manufacturer Replacement Warranty" },
    ],
    alternatives: ["Sunday Orthopedic 4 ($380)", "The Sleep Company SmartGRID ($420)"],
    priceUSD: { min: 170, max: 340 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/orthopedic-mattress.webp"
],
    link: "https://www.wakefit.co/mattress/orthopedic-memory-foam-mattress",
    linkVerified: true,
    tags: ["mattress", "sleep", "orthopedic", "comfort"],
  },
  {
    id: "blackout-thermal-curtains",
    category: "home-health",
    name: "Floor-Length Heavyweight Blackout Thermal Curtains",
    brand: "Deconovo",
    summary: "100% light-blocking triple-weave polyester thermal drapes insulating the bedroom from morning light and street noise.",
    specs: [
      { label: "Light Blocking", value: "100% True Blackout (0 lux light penetration for deep circadian sleep)" },
      { label: "Thermal & Acoustic", value: "Triple-weave insulated fabric blocks outside heat and dampens ambient noise" },
      { label: "Dimensions", value: "Floor-to-ceiling (96-inch height × 52-inch width each, 2 panels per window)" },
    ],
    alternatives: ["IKEA Majgull Blackout ($45)", "Nicetown Thermal Drapes ($55)"],
    priceUSD: { min: 35, max: 57 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/blackout-thermal-curtains.webp"
],
    tags: ["curtains", "sleep", "blackout", "home"],
  },
  {
    id: "xiaomi-smart-air-purifier-4-pro",
    category: "home-health",
    name: "Xiaomi Smart Air Purifier 4 Pro (High CADR HEPA)",
    brand: "Xiaomi",
    summary: "High Clean Air Delivery Rate room air purifier with 3-in-1 true HEPA filtration, PM 2.5 laser sensor, and OLED display.",
    specs: [
      { label: "Clean Air Delivery Rate", value: "Up to 500 m³/h Particle CADR (cleans 40m² room in 11 minutes)" },
      { label: "Filter Filtration", value: "3-in-1 True HEPA filter capturing 99.97% of particles down to 0.3 microns" },
      { label: "Air Sensors", value: "High-precision laser particle sensor for PM 2.5 and PM 10 detection" },
      { label: "Acoustics & Night Mode", value: "Ultra-quiet 33.7 dB(A) sleep mode with display light shut-off" },
      { label: "Smart Connectivity", value: "Mi Home App, Google Assistant, and Alexa voice integration" },
    ],
    alternatives: ["Levoit Core 400S ($220)", "Dyson Purifier Hot+Cool ($650)"],
    priceUSD: { min: 115, max: 170 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/xiaomi-smart-air-purifier-4-pro.webp"
],
    link: "https://www.mi.com/global/product/xiaomi-smart-air-purifier-4-pro/",
    linkVerified: true,
    tags: ["air-purifier", "health", "smart-home", "clean-air"],
  },
  {
    id: "kent-supreme-water-purifier",
    category: "home-health",
    name: "Kent Supreme 8-Stage RO + UV + UF + TDS Water Purifier",
    brand: "Kent / Aquaguard",
    summary: "Multi-stage residential water purification system with RO membrane, UV disinfection, and Mineral ROTM technology.",
    specs: [
      { label: "Purification Tech", value: "RO + UV + UF + TDS Control + In-tank UV disinfection" },
      { label: "Purification Rate", value: "Up to 20 Liters per hour with 8-liter storage tank capacity" },
      { label: "Mineral Controller", value: "Retains essential natural minerals (calcium and magnesium) in purified water" },
      { label: "Water Recovery", value: "Zero Water Wastage technology recalculates rejected water back to overhead tank" },
      { label: "Display & Monitor", value: "Digital display of minerals, filter life, and water flow status" },
    ],
    alternatives: ["Aquaguard Aura RO+UV ($180)", "Havells Max Alkaline RO ($190)"],
    priceUSD: { min: 135, max: 205 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/kent-supreme-water-purifier.webp"
],
    link: "https://www.kent.co.in/water-purifiers/ro/kent-supreme",
    linkVerified: true,
    tags: ["water-purifier", "ro", "health", "home"],
  },
  {
    id: "kindle-paperwhite",
    category: "home-health",
    name: 'Amazon Kindle Paperwhite 7" 16GB Glare-Free E-Reader',
    brand: "Amazon",
    summary: "7-inch 300 PPI glare-free e-ink display with adjustable warm light, IPX8 waterproof rating, and 10-week battery life.",
    specs: [
      { label: "Display Screen", value: "7-inch Paperwhite display with flush-front design and 300 PPI e-ink Carta" },
      { label: "Lighting", value: "17-LED array with adjustable warm white-to-amber color temperature" },
      { label: "Internal Storage", value: "16GB (holds thousands of books and engineering manuals)" },
      { label: "Battery & Charging", value: "Up to 10 weeks battery life on single USB-C charge" },
      { label: "Waterproofing", value: "IPX8 rated (survives 2 meters accidental immersion in water for 60 min)" },
    ],
    alternatives: ["Kobo Clara 2E ($140)", "Kindle Oasis ($250)"],
    priceUSD: { min: 180, max: 205 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/kindle-paperwhite.webp"
],
    link: "https://www.amazon.in/dp/B08N3TCP2F",
    linkVerified: true,
    tags: ["ereader", "kindle", "books", "reading"],
  },
  {
    id: "garmin-forerunner-265",
    category: "home-health",
    name: "Garmin Forerunner 265 AMOLED Multisport Watch",
    brand: "Garmin",
    summary: "Brilliant 1.3-inch AMOLED touchscreen GPS running watch with HRV status, Training Readiness, and sleep tracking.",
    specs: [
      { label: "Display Screen", value: "1.3-inch colorful AMOLED touchscreen with Corning Gorilla Glass 3" },
      { label: "Health Metrics", value: "HRV Status, Morning Report, Training Readiness score, Body Battery, Pulse Ox" },
      { label: "GPS Tracking", value: "Multi-band GNSS with SatIQ technology for precision satellite positioning" },
      { label: "Battery Life", value: "Up to 13 days in smartwatch mode | Up to 20 hours in GPS mode" },
      { label: "Water Rating", value: "5 ATM (50 meters water resistant for swimming and open water)" },
      { label: "Onboard Music", value: "Download offline playlists from Spotify, Amazon Music, or Deezer" },
    ],
    alternatives: ["Apple Watch Series 9 ($399)", "Garmin Forerunner 965 Titanium ($599)"],
    priceUSD: { min: 400, max: 570 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/garmin-forerunner-265.webp"
],
    link: "https://www.garmin.co.in/products/wearables/forerunner-265-black/",
    linkVerified: true,
    tags: ["watch", "fitness", "garmin", "running", "health"],
  },
  {
    id: "iphone-pro-latest",
    category: "home-health",
    name: "Apple iPhone 16 Pro (256GB, Natural Titanium)",
    brand: "Apple",
    summary: "Grade 5 titanium design, A18 Pro chip, 48MP Fusion camera system with 5× optical zoom, and 4K 120fps Dolby Vision.",
    specs: [
      { label: "Construction", value: "Grade 5 Titanium frame with textured matte glass back and Ceramic Shield front" },
      { label: "Display", value: "6.3-inch Super Retina XDR OLED, ProMotion 120Hz, Always-On, 2000 nits outdoor peak" },
      { label: "Processor Chip", value: "Apple A18 Pro (6-core CPU, 6-core GPU with hardware ray tracing, 16-core NPU)" },
      { label: "Camera System", value: "48MP Fusion (24mm, f/1.78) + 48MP Ultra Wide + 12MP 5× Telephoto (120mm)" },
      { label: "Video Capabilities", value: "4K 120 fps Dolby Vision, ProRes recording directly to external SSD via USB 3" },
      { label: "I/O & Battery", value: "USB-C port with USB 3 speeds (up to 10Gb/s) | MagSafe 25W wireless charging" },
    ],
    alternatives: ["Samsung Galaxy S24 Ultra ($1,299)", "Google Pixel 9 Pro ($999)"],
    priceUSD: { min: 1530, max: 2050 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/iphone-pro-latest.webp"
],
    link: "https://www.apple.com/in/iphone-16-pro/",
    linkVerified: true,
    tags: ["phone", "iphone", "apple", "titanium"],
  },
  {
    id: "home-gym-strength-station",
    category: "home-health",
    name: "Home Strength Studio: Adjustable Dumbbells 2–32kg & Incline Bench",
    brand: "Decathlon & Bowflex",
    summary: "Compact home strength setup: quick-dial adjustable dumbbells from 2kg to 32kg each, paired with a 7-position heavy-duty bench.",
    specs: [
      { label: "Dumbbells", value: "Pair of quick-turn dial adjustable dumbbells (2kg to 32kg in 2kg increments)" },
      { label: "Weight Replacement", value: "Replaces 16 pairs of individual free weights with compact storage cradle" },
      { label: "Adjustable Bench", value: "Heavy-duty steel bench (Decline -20°, Flat 0°, Incline 30°, 45°, 60°, 85°)" },
      { label: "Load Capacity", value: "Bench rated up to 350 kg total weight limit with high-density tear-resistant vinyl" },
    ],
    alternatives: ["Nuobell 32kg Dumbbells ($600)", "PowerBlock Pro EXP ($500)"],
    priceUSD: { min: 250, max: 685 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/home-gym-strength-station.webp"
],
    tags: ["gym", "dumbbells", "fitness", "strength"],
  },
  {
    id: "power-rack-safety-bars",
    category: "home-health",
    name: "Compact Multi-Grip Half Power Rack with Safety Bars",
    brand: "Rogue / Syndicate",
    summary: "Heavy-gauge 75×75mm steel half rack with J-hooks, full-length spotter arms, and multi-angle pull-up bar for safe solo lifting.",
    specs: [
      { label: "Frame Steel", value: "75 × 75 mm 11-gauge heavy structural steel uprights with laser-cut numbering" },
      { label: "Safety System", value: "600mm heavy-duty safety spotter arms lined with protective UHMW plastic" },
      { label: "Weight Capacity", value: "Tested to 400 kg load capacity for squats and bench press" },
      { label: "Upper Assembly", value: "Multi-grip ergonomic chin-up bar for wide, narrow, and neutral pull-ups" },
    ],
    alternatives: ["Titan T-3 Series Half Rack ($420)", "Decathlon 900 Power Rack ($450)"],
    priceUSD: { min: 340, max: 680 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/power-rack-safety-bars.webp"
],
    tags: ["power-rack", "gym", "squat", "bench"],
  },
  {
    id: "health-term-insurance",
    category: "home-health",
    name: "Comprehensive Insurance Shield (₹1 Cr Term + ₹10 L Health)",
    brand: "HDFC Life & Care Health",
    summary: "₹1 Crore pure term life insurance with critical illness waiver, paired with ₹10 Lakh super top-up comprehensive health insurance.",
    specs: [
      { label: "Term Life Sum Assured", value: "₹1,00,00,000 (₹1 Crore) pure term life cover until age 65 with accident rider" },
      { label: "Health Cover", value: "₹10,00,000 (₹10 Lakh) cashless in-patient hospital cover with zero room rent cap" },
      { label: "Annual Cost Breakdown", value: "Approx ₹15,000 to ₹25,000 per year ($170–$285) locked at young entry age" },
      { label: "Claim Settlement", value: "99.3% claim settlement ratio provider with cashless hospital network across India" },
    ],
    priceUSD: { min: 170, max: 285 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/health-term-insurance.webp"
],
    tags: ["insurance", "health", "protection", "finance"],
  },
  {
    id: "annual-checkups-dental",
    category: "home-health",
    name: "Annual Comprehensive Executive Health & Dental Diagnostic Suite",
    brand: "Apollo / Metropolis",
    summary: "Annual preventive healthcare protocol: full lipid panel, HbA1c, kidney/liver LFT, vitamin D3/B12, ECG, and ultrasonic dental scaling.",
    specs: [
      { label: "Blood Diagnostic Panel", value: "Complete Hemogram, Lipid Profile, HbA1c, LFT, KFT, Serum Ferritin, Thyroid T3/T4/TSH" },
      { label: "Vitamins & Hormones", value: "Vitamin D3 (25-OH) & Vitamin B12 levels test" },
      { label: "Cardiac Screening", value: "Resting 12-lead Electrocardiogram (ECG) and blood pressure assessment" },
      { label: "Dental Care", value: "Annual ultrasonic dental scaling, plaque polishing, and preventative bite evaluation" },
    ],
    priceUSD: { min: 60, max: 90 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/annual-checkups-dental.webp"
],
    tags: ["health", "checkup", "preventive", "dental"],
  },

  // ==========================================
  // 9. COLLEGE & CAREER PROGRESSION
  // ==========================================
  {
    id: "college-fees-balance",
    category: "career",
    name: "Final College Degree Tuition Settlement",
    brand: "University",
    summary: "₹48,000 (~$545) tuition settlement clearing all university accounts for official graduation and degree certificate release.",
    specs: [
      { label: "Tuition Balance", value: "₹48,000 exact university dues clearance" },
      { label: "Deliverable Outcome", value: "Official B.Tech / B.E. Degree Certificate, Consolidated Marksheet, Provisional Transcripts" },
      { label: "Milestone Impact", value: "Eliminates academic debt and fulfills employment background verification requirements" },
    ],
    priceUSD: { min: 545, max: 545 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/college-fees-balance.webp"
],
    tags: ["education", "degree", "tuition", "milestone"],
  },
  {
    id: "academic-contingency-fund",
    category: "career",
    name: "Academic Examination & Project Contingency Fund",
    brand: "University & Project Lab",
    summary: "₹50,000 (~$570) reserve allocated for final semester examination fees, capstone lab components, and degree convocation.",
    specs: [
      { label: "Reserve Allocation", value: "₹50,000 buffer reserve" },
      { label: "Covered Expenses", value: "Semester exam fees, project hardware components, journal publication fees, convocation attire" },
    ],
    priceUSD: { min: 570, max: 570 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/academic-contingency-fund.webp"
],
    tags: ["education", "fund", "exams"],
  },
  {
    id: "college-commute-transit",
    category: "career",
    name: "Metropolitan Commute & Transit Pass (18 Months)",
    brand: "Metropolitan Transit",
    summary: "₹2,000/month (~$23) subsidized commuter transit pass for university campus and internship transit over 18 months ($410 total).",
    specs: [
      { label: "Monthly Transit Pass", value: "₹2,000 per month on contactless smartcard" },
      { label: "Duration", value: "18 months duration ($410 cumulative total)" },
      { label: "Coverage", value: "Unlimited metro rail transit and feeder bus system" },
    ],
    priceUSD: { min: 410, max: 410 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/college-commute-transit.webp"
],
    tags: ["transit", "commute", "travel"],
  },
  {
    id: "aws-data-engineer-cert",
    category: "career",
    name: "AWS Certified Data Engineer – Associate Exam",
    brand: "Amazon Web Services",
    summary: "AWS DEA-C01 certification validating expertise in AWS Glue, Amazon EMR, Amazon Redshift, Kinesis, and Lake Formation.",
    specs: [
      { label: "Exam Code", value: "AWS Certified Data Engineer – Associate (DEA-C01)" },
      { label: "Validated Domains", value: "Data Ingestion (Kinesis, Kafka), Storage (S3, Redshift), Transformation (Glue, EMR), Security" },
      { label: "Exam Format", value: "65 questions (multiple choice & multiple response) across 130 minutes" },
      { label: "Credential Validity", value: "3 Years globally recognized industry credential" },
    ],
    priceUSD: { min: 150, max: 150 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/aws-data-engineer-cert.webp"
],
    link: "https://aws.amazon.com/certification/certified-data-engineer-associate/",
    linkVerified: true,
    tags: ["certification", "aws", "data-engineering", "career"],
  },
  {
    id: "databricks-data-engineer-cert",
    category: "career",
    name: "Databricks Certified Data Engineer Associate Exam",
    brand: "Databricks",
    summary: "Industry benchmark credential testing Apache Spark SQL, Delta Lake architecture, and Medallion Lakehouse pipeline automation.",
    specs: [
      { label: "Exam Focus", value: "Databricks Lakehouse Platform, Delta Lake, Apache Spark SQL, Delta Live Tables (DLT)" },
      { label: "Practical Skills", value: "ETL pipelines, data modeling, incremental data processing with Auto Loader" },
      { label: "Exam Format", value: "45 multiple-choice questions over 90 minutes" },
    ],
    priceUSD: { min: 200, max: 200 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/databricks-data-engineer-cert.webp"
],
    link: "https://www.databricks.com/learn/certification/data-engineer-associate",
    linkVerified: true,
    tags: ["certification", "databricks", "spark", "delta-lake"],
  },

  // ==========================================
  // 10. GIFTS FOR PARTNER
  // ==========================================
  {
    id: "titan-raga-viva-watch",
    category: "gifts",
    name: "Titan Raga Viva / Fossil Carlie Rose Gold Watch",
    brand: "Titan / Fossil",
    summary: "Jewelry-inspired timepiece with mother-of-pearl dial, Swarovski crystal accents, and polished rose gold mesh bracelet.",
    specs: [
      { label: "Case & Finish", value: "30mm slim brass/steel case in PVD rose gold plating with jewelry clasp" },
      { label: "Dial & Crystal", value: "Natural iridescent Mother-of-Pearl dial with mineral glass" },
      { label: "Movement", value: "High-precision Japanese quartz movement (3-year battery life)" },
      { label: "Water Resistance", value: "30 meters splash-proof" },
    ],
    alternatives: ["Fossil Carlie Mini Rose Gold ($115)", "Daniel Wellington Petite ($140)"],
    priceUSD: { min: 90, max: 135 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/titan-raga-viva-watch.webp"
],
    link: "https://www.titan.co.in/product/titan-raga-viva-rose-gold-watch-2606wm01.html",
    linkVerified: true,
    tags: ["gift", "watch", "jewelry", "rose-gold"],
  },
  {
    id: "hidesign-leather-handbag",
    category: "gifts",
    name: "Hidesign Genuine Full-Grain Leather Structured Tote",
    brand: "Hidesign",
    summary: "Handcrafted structured shoulder tote in vegetable-tanned full-grain leather with solid brass fittings and padded laptop sleeve.",
    specs: [
      { label: "Leather Quality", value: "100% Genuine Full-Grain Vegetable-Tanned Ranch Leather (develops rich patina)" },
      { label: "Hardware & Zippers", value: "Solid cast brass hardware with smooth running YKK metal zippers" },
      { label: "Interior Layout", value: "Padded center compartment for iPad/13-inch laptop, phone slot, zippered security pocket" },
      { label: "Lining", value: "Signature striped cotton twill lining with leather binding" },
    ],
    alternatives: ["Coach City Tote ($180)", "Michael Kors Voyager ($195)"],
    priceUSD: { min: 70, max: 115 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/hidesign-leather-handbag.webp"
],
    link: "https://hidesign.com/collections/tote-bags",
    linkVerified: true,
    tags: ["gift", "handbag", "leather", "tote"],
  },
  {
    id: "gift-kindle-paperwhite",
    category: "gifts",
    name: "Amazon Kindle Paperwhite (Partner's Reading Edition)",
    brand: "Amazon",
    summary: "Personalized e-reader with 6.8-inch glare-free 300 PPI display, adjustable warm light, and leather folio case.",
    specs: [
      { label: "Screen", value: "6.8-inch glare-free Paperwhite screen (reads like real paper even in bright sunlight)" },
      { label: "Personal Touch", value: "Pre-loaded with curated literature and protected in an official leather cover" },
      { label: "Battery Life", value: "Up to 10 weeks of reading on a single charge" },
    ],
    priceUSD: { min: 180, max: 205 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/gift-kindle-paperwhite.webp"
],
    link: "https://www.amazon.in/dp/B08N3TCP2F",
    linkVerified: true,
    tags: ["gift", "kindle", "ereader", "books"],
  },
  {
    id: "luxury-perfume-marc-jacobs-dior",
    category: "gifts",
    name: "Marc Jacobs Daisy / Dior Miss Dior Eau de Parfum",
    brand: "Dior & Marc Jacobs",
    summary: "Iconic feminine floral fragrance: Grasse rose, iris, fresh bergamot, and soft white musks in a couture bottle.",
    specs: [
      { label: "Fragrance Family", value: "Floral Bouquet (Centifolia rose, Lily-of-the-valley, Peony, Iris, Powdery vanilla)" },
      { label: "Bottle Size", value: "100ml Eau de Parfum spray with signature hand-tied fabric bow" },
      { label: "Longevity", value: "8+ hours delicate floral projection" },
    ],
    alternatives: ["Jo Malone English Pear & Freesia ($155)", "Chanel Chance Eau Tendre ($165)"],
    priceUSD: { min: 90, max: 135 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/luxury-perfume-marc-jacobs-dior.webp"
],
    tags: ["gift", "perfume", "dior", "fragrance"],
  },
  {
    id: "fine-jewelry-tanishq",
    category: "gifts",
    name: "Tanishq 18k Yellow Gold Diamond Stud Earrings / Pandora Moments",
    brand: "Tanishq & Pandora",
    summary: "Timeless 18k BIS-hallmarked yellow gold solitaire diamond stud earrings, or sterling silver Pandora Moments charm bracelet.",
    specs: [
      { label: "Gold Purity", value: "18k (750) BIS Hallmarked Yellow / Rose Gold" },
      { label: "Diamonds", value: "Natural brilliant-cut diamonds (GH color, SI clarity) with secure screw backs" },
      { label: "Certification", value: "Tanishq Certificate of Authenticity and purity guarantee" },
    ],
    alternatives: ["CaratLane Bloom Diamond Studs ($180)", "Swarovski Attract Studs ($85)"],
    priceUSD: { min: 115, max: 340 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/fine-jewelry-tanishq.webp"
],
    link: "https://www.tanishq.co.in/shop/earrings",
    linkVerified: true,
    tags: ["gift", "jewelry", "gold", "diamonds"],
  },
  {
    id: "curated-experience-escapes",
    category: "gifts",
    name: "Curated Fine Dining & Pondicherry Coastal Weekend Escapes",
    brand: "Experiences",
    summary: "Memorable celebration experiences: seaside candlelight dinner at a heritage French quarter boutique villa, and custom photo book.",
    specs: [
      { label: "Occasions", value: "Birthday, Anniversary, Valentine's Day, and Graduation celebration" },
      { label: "Experience Details", value: "Boutique heritage French villa stay in White Town, degustation seafood dinner, custom hardcover photo memory album" },
    ],
    priceUSD: { min: 60, max: 170 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/curated-experience-escapes.webp"
],
    tags: ["gift", "experience", "travel", "dining"],
  },
  {
    id: "solitaire-engagement-ring",
    category: "gifts",
    name: "Milestone Solitaire Diamond Engagement Ring (18k Gold)",
    brand: "Tanishq / CaratLane",
    summary: "Milestone future acquisition: certified brilliant-cut diamond solitaire set in a classic four-prong 18k white/yellow gold band.",
    specs: [
      { label: "Precious Metal", value: "18k Solid Hallmarked White / Yellow Gold (approx 3.5g weight)" },
      { label: "Diamond Specification", value: "0.50 to 0.75 Carat Round Brilliant Cut (VVS1/VS2 clarity, E-F colorless)" },
      { label: "Certification", value: "IGI (International Gemological Institute) or GIA certified with laser inscription" },
      { label: "Setting", value: "Classic tapered 4-prong cathedral solitaire setting" },
    ],
    alternatives: ["Blue Nile Petite Solitaire ($1,200)", "Tiffany & Co Setting ($2,800+)"],
    priceUSD: { min: 680, max: 1700 },
    when: "later",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/solitaire-engagement-ring.webp"
],
    link: "https://www.caratlane.com/solitaire-rings",
    linkVerified: true,
    tags: ["engagement", "ring", "diamond", "milestone", "later"],
  },

  // ==========================================
  // 11. TRAVEL & EXPEDITIONS
  // ==========================================
  {
    id: "south-india-quarterly-trips",
    category: "travel",
    name: "Bi-Annual South India Escapes (Ooty / Coorg / Kerala)",
    brand: "Retreat Expeditions",
    summary: "Two annual restorative weekend road trips exploring Ooty colonial tea estates, Coorg coffee plantations, and Alleppey backwaters.",
    specs: [
      { label: "Frequency", value: "2 Trips per year (~$340–$680 each trip, $680–$1,360 annual budget)" },
      { label: "Destinations", value: "Ooty Nilgiri Hills, Coorg Estate Homestay, Kerala Backwaters Houseboat, Goa Beach Retreat" },
      { label: "Inclusions", value: "Heritage boutique homestay, local culinary trails, fuel, and toll passes" },
    ],
    priceUSD: { min: 680, max: 1360 },
    when: "now",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/south-india-quarterly-trips.webp"
],
    tags: ["travel", "weekend", "south-india", "retreat"],
  },
  {
    id: "spiti-ladakh-motorcycle-expedition",
    category: "travel",
    name: "High-Altitude Motorcycle Expedition (Spiti Valley / Ladakh)",
    brand: "Himalayan Ride",
    summary: "12-day high-altitude trans-Himalayan motorcycle expedition crossing high mountain passes (Khardung La, Rohtang, Kunzum).",
    specs: [
      { label: "Route Itinerary", value: "Manali – Kaza – Kunzum Pass – Chandratal – Key Monastery – Leh – Khardung La – Nubra Valley – Pangong Tso" },
      { label: "Permits & Safety", value: "Inner Line Permits (ILP), portable medical oxygen can, high-altitude gear" },
      { label: "Duration", value: "10 to 14 days rugged touring circuit" },
    ],
    priceUSD: { min: 450, max: 800 },
    when: "now",
    priority: "medium",
    status: "wishlist",
    images: [
      "/images/items/spiti-ladakh-motorcycle-expedition.webp"
],
    tags: ["travel", "motorcycle", "himalayas", "adventure"],
  },

  // ==========================================
  // 12. BIG PURCHASES (Later Milestones)
  // ==========================================
  {
    id: "residential-land-chennai",
    category: "big-purchases",
    name: "Residential Land Plot (1 Ground / 2,400 sq ft)",
    brand: "Real Estate Foundation",
    summary: "1 ground (2,400 sq ft) freehold residential land plot located in an emerging Chennai development corridor.",
    specs: [
      { label: "Plot Area", value: "1 Ground (2,400 sq ft / 223 sq meters) with minimum 40-ft frontage" },
      { label: "Approvals Required", value: "DTCP (Directorate of Town and Country Planning) or CMDA approved residential layout" },
      { label: "Legal Title Verification", value: "Clear Patta & Chitta in seller name, 30-year Encumbrance Certificate (EC), Parent Deeds, FMB sketch" },
      { label: "Site Infrastructure", value: "Minimum 30-ft wide blacktop road, reliable groundwater table, 3-phase electricity, flood-safe elevation" },
      { label: "Estimated Stamp Duty & Tax", value: "9% Tamil Nadu registration & stamp duty (~$1,500–$5,100) + legal fees ($340–$680)" },
    ],
    priceUSD: { min: 17000, max: 57000 },
    when: "later",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/residential-land-chennai.webp"
],
    tags: ["land", "real-estate", "chennai", "investment", "later"],
  },
  {
    id: "custom-2bhk-rcc-home",
    category: "big-purchases",
    name: "Custom 1,200 sq ft 2BHK Home with Rooftop Solar",
    brand: "Architectural Build",
    summary: "Architect-designed 1,200 sq ft 2-bedroom home built with RCC framed structure, modular kitchen, and 3–5kW grid-tied rooftop solar.",
    specs: [
      { label: "Built-up Area", value: "Approx 1,200 sq ft (2 Bedrooms, 2 Bathrooms, Living, Dining, Utility Kitchen, Verandah)" },
      { label: "Structural Engineering", value: "Reinforced Cement Concrete (RCC) column-and-beam frame, fly ash brick walls, seismic compliant" },
      { label: "Green Energy & Water", value: "3kW to 5kW Grid-Tied Rooftop Solar Photovoltaic system + Rainwater harvesting percolation pit" },
      { label: "Interior Finishes", value: "Large-format 4×2 ft vitrified glazed porcelain tiles, solid teak main door, modular acrylic kitchen" },
      { label: "Electrical & Data", value: "Concealed copper wiring with dedicated 16A AC lines and Cat6 Ethernet drops in all rooms" },
    ],
    priceUSD: { min: 29500, max: 41000 },
    when: "later",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/custom-2bhk-rcc-home.webp"
],
    tags: ["home", "house", "architecture", "solar", "later"],
  },
  {
    id: "family-suv-creta-kushaq",
    category: "big-purchases",
    name: "Hyundai Creta 1.5 SX(O) / Skoda Kushaq AT",
    brand: "Hyundai / Skoda",
    summary: "Safe 5-seater family SUV with 6 airbags, panoramic sunroof, Level 2 ADAS, automatic transmission, and ventilated seats.",
    specs: [
      { label: "Powertrain", value: "1.5L Turbo Petrol (160 PS / 253 Nm) with 7-speed DCT / 6-speed Torque Converter AT" },
      { label: "Safety Rating", value: "6 Airbags standard, Electronic Stability Control (ESC), ISOFIX, Level 2 ADAS suite" },
      { label: "Cabin Technology", value: "Dual 10.25-inch integrated touchscreens, wireless Apple CarPlay/Android Auto, Bose 8-speaker audio" },
      { label: "Comfort Features", value: "Ventilated front seats, voice-enabled smart panoramic sunroof, dual-zone climate control" },
      { label: "Boot Capacity", value: "433 Liters luggage capacity for family road trips" },
    ],
    alternatives: ["Kia Seltos GTX+ ($22,000)", "Volkswagen Taigun GT ($21,000)"],
    priceUSD: { min: 16000, max: 28500 },
    when: "later",
    priority: "high",
    status: "wishlist",
    images: [
      "/images/items/family-suv-creta-kushaq.webp"
],
    link: "https://www.hyundai.com/in/en/find-a-car/creta/highlights",
    linkVerified: true,
    tags: ["car", "suv", "hyundai", "creta", "later"],
  },
];
