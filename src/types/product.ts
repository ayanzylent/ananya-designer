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

  // ── Pricing & availability ───────────────────────────────────────────────────
  taxInfo?: string;          // e.g. "Taxes included"
  shippingInfo?: string;     // e.g. "Shipping calculated at checkout"
  deliveryTime?: string;     // e.g. "3-7 business days"
  availability?: string;     // e.g. "In stock"

  // ── Product detail page fields ──────────────────────────────────────────────
  description?: string;
  highlights?: string[];     // bullet points shown on detail page
  dimensions?: {
    length?: string;         // e.g. "6.30 meters including blouse piece"
    width?: string;          // e.g. "45-47 inches"
  };
  careInstructions?: string[];
  careTip?: string;          // short single-line care tip
  styleTip?: string;         // styling suggestion
  note?: string;             // e.g. colour variation disclaimer
  returnPolicy?: string;     // e.g. "Easy replacement available..."
  sku?: string;
}