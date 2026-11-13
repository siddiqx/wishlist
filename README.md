# The Blueprint ("Siddiq's Blueprint")

A personal, interactive product catalogue and budget planning web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Designed to feel like a premium, tactile product catalogue (Apple / Linear / Stripe level polish) rather than a generic checklist.

---

## UI/UX Overhaul & Architecture

### Design Tokens (Single Source of Truth)
- **Surfaces:** page `#F7F7F5`, card `#FFFFFF`, subtle `#F1F1EE`, border `#E8E8E4`.
- **Text:** primary `#111110`, secondary `#57574F`, muted `#8A8A80`.
- **Accent:** restrained indigo (`#4F46E5`) with soft tint (`#EEF0FF`) for chips, badges, and active states.
- **Semantic:** success `#16A34A` (with tint `#F0FDF4`), warning `#D97706` (tint `#FFFBEB`), danger `#DC2626` (tint `#FEF2F2`).
- **Typography:**
  - Display font: `Instrument Serif` (tight tracking `-0.02em`, line height 1.1) for headings and branding.
  - UI font: `Inter` (line height 1.5) for body, controls, and technical specs.
- **Radius Scale:** 8px (`rounded-lg`), 12px (`rounded-xl`), 16px (`rounded-2xl`), 24px (`rounded-3xl`), 9999px (`rounded-full`).
- **Layered Shadows:** 4 opacity-tuned levels (`shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`).
- **Motion:** 150ms fast, 250ms base, 450ms slow; cubic-bezier `[0.22, 1, 0.36, 1]`; full `prefers-reduced-motion` compliance.

---

## 3-Layer Image Strategy (Zero Runtime Hotlinking)

Every item in the catalogue is guaranteed to display a high-fidelity visual with zero runtime hotlinking:

1. **Layer 1: Real Product Images (`scripts/fetch-images.ts`)**
   - Automatically visits verified product links, extracts `og:image` / `twitter:image` metadata, downloads the image, resizes to 1200px width with `sharp`, generates base64 `blurDataURL` placeholders, and stores them in `/public/images/items/<id>.webp`.
2. **Layer 2: Curated High-Res Photography**
   - For custom or specialized items, downloads high-resolution stock photography, optimizes to WebP, and generates blur placeholders.
3. **Layer 3: Intentional Designed Fallback Tile (`<ItemVisual />`)**
   - If an image is unavailable or network is restricted, renders a luxury packaging-inspired tile featuring category-specific tints, Lucide iconography, and typography in `Instrument Serif` over a subtle noise texture.

### Image Audit Report
Run the dev report anytime to inspect local image coverage:
```bash
pnpm images:report
```
*Current status: 95% of items have local WebP images ready (63/66), with 3 items using designed Layer 3 fallback tiles.*

### How to Run or Re-fetch Images
```bash
pnpm images:fetch
```

### How to Replace an Image Manually
Place any 1200px image in WebP format at:
```
/public/images/items/<id>.webp
```
Next.js will immediately serve it with local caching and zero layout shift.

---

## Features & UX Details

- **Two-Column Hero:** Left column with headline, subtitle, and primary CTAs; right column with an animated floating collage of real items (MacBook Pro, Interceptor 650, Alienware OLED, Tissot watch).
- **Spotlight Stat Cards:** Hero statistics feature an interactive cursor spotlight glow effect following mouse movement.
- **Top Priorities Featured Band:** Horizontal scroll-snap carousel showcasing high-priority immediate essentials.
- **Full-Width Category Banners:** Rich visual cover headers for all 12 categories with subtotal budget calculations.
- **Bento-Style Rhythm:** First item of each category expands into an editorial hero card.
- **Persistent Plan Summary Pill:** Floating bottom-center badge (`X items in plan · $min–$max`) providing one-click access to the budget planner from anywhere on the page.
- **Dismissible Onboarding Tour:** 3-step tour introducing Search (`/`), Quick View, and Budget Planning.
- **Side-by-Side Product Comparison:** Select up to 3 items in any category and inspect aligned specifications.
- **4-Stage Kanban Roadmap:** Wishlist → Planned → Saving → Bought with drag-and-drop and confetti celebration upon acquisition.
- **Interactive Budget Planner:** Running USD / INR totals with editable exchange rates (default: ₹88/$1), category bar charts, and CSV export.
- **State Persistence & Backup:** Local notes, priorities, statuses, and plans saved via Zustand to `localStorage` with JSON export and import restore.

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run image audit report
pnpm images:report

# Run production build
pnpm build
pnpm start

# Run linter
pnpm lint
```

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` | Focus search bar in TopBar |
| `⌘ + K` / `Ctrl + K` | Open Command Palette |
| `ESC` | Close active drawer, modal, or command palette |
| `←` / `→` | Navigate to previous / next item in the Item Detail drawer |

---

## License

Personal project &middot; Siddiq's Blueprint.
