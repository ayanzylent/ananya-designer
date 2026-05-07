export interface Product {
  id: string;
  slug: string;
  name: string;
  fabric: string;
  actualPrice: number;
  discountedPrice: number;
  discountPercent: number;
  image: string;
  badge?: string; // e.g. "New", "Trending", "Limited"

  // ── Product detail page fields ──────────────────────────────────────────────
  description?: string;
  highlights?: string[];   // bullet points shown on detail page
  careInstructions?: string[];
  availableColors?: string[]; // colour names
  occasion?: string;       // "Wedding", "Festive", "Casual"
  origin?: string;         // "Varanasi, UP"
  sku?: string;
}