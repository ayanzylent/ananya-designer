import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  slug: string;
  name: string;
  fabric: string;
  actualPrice: number;
  discountedPrice: number;
  discountPercent: number;
  image: string;
  badge?: string; // e.g. "New", "Trending", "Limited"
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const BEST_SELLERS: Product[] = [
  {
    id: "bs-001",
    slug: "burgundy-banarasi-silk",
    name: "Crimson Heritage Banarasi",
    fabric: "Pure Silk · Banarasi",
    actualPrice: 18500,
    discountedPrice: 13999,
    discountPercent: 24,
    image: "/products/saree-burgundy-banarasi.png",
    badge: "Bestseller",
  },
  {
    id: "bs-002",
    slug: "royal-blue-kanjivaram",
    name: "Peacock Royal Kanjivaram",
    fabric: "Pure Silk · Kanjivaram",
    actualPrice: 22000,
    discountedPrice: 16499,
    discountPercent: 25,
    image: "/products/saree-blue-kanjivaram.png",
    badge: "Trending",
  },
  {
    id: "bs-003",
    slug: "blush-pink-chiffon",
    name: "Blossom Chiffon Elegance",
    fabric: "Pure Chiffon · Embroidered",
    actualPrice: 9800,
    discountedPrice: 7499,
    discountPercent: 23,
    image: "/products/saree-pink-chiffon.png",
  },
  {
    id: "bs-004",
    slug: "emerald-chanderi-silk",
    name: "Emerald Chanderi Grace",
    fabric: "Chanderi Silk · Handwoven",
    actualPrice: 12500,
    discountedPrice: 9299,
    discountPercent: 26,
    image: "/products/saree-green-chanderi.png",
    badge: "New",
  },
  {
    id: "bs-005",
    slug: "black-georgette-embroidery",
    name: "Midnight Zardozi Georgette",
    fabric: "Georgette · Zardozi Work",
    actualPrice: 24000,
    discountedPrice: 17999,
    discountPercent: 25,
    image: "/products/saree-black-georgette.png",
    badge: "Limited",
  },
  {
    id: "bs-006",
    slug: "tussar-kalamkari",
    name: "Golden Kalamkari Tussar",
    fabric: "Tussar Silk · Hand-painted",
    actualPrice: 15000,
    discountedPrice: 11499,
    discountPercent: 23,
    image: "/products/saree-tussar-kalamkari.png",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className="group relative flex-none w-64 sm:w-72"
      aria-label={product.name}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-50 rounded-sm">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 256px, 288px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-medium tracking-widest uppercase px-2.5 py-1">
            {product.badge}
          </span>
        )}

        {/* Discount chip */}
        <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-semibold tracking-wide px-2 py-1 rounded-sm">
          -{product.discountPercent}%
        </span>

        {/* Quick add overlay — appears on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <Link
            href={`/shop/${product.slug}`}
            id={`quick-add-${product.id}`}
            className="flex items-center justify-center gap-2 w-full bg-foreground text-background py-3 text-xs font-medium tracking-widest uppercase hover:bg-foreground/90 transition-colors duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            Quick Add
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="mt-3 space-y-1 px-0.5">
        {/* Fabric tag */}
        <p className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
          {product.fabric}
        </p>

        {/* Name */}
        <h3 className="text-sm font-medium text-foreground leading-snug">
          <Link
            href={`/shop/${product.slug}`}
            className="hover:underline underline-offset-2 decoration-foreground/30"
          >
            {product.name}
          </Link>
        </h3>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-base font-semibold text-foreground">
            {formatPrice(product.discountedPrice)}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            {formatPrice(product.actualPrice)}
          </span>
          <span className="text-xs font-medium text-red-600">
            Save {formatPrice(product.actualPrice - product.discountedPrice)}
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── Best Seller Section ──────────────────────────────────────────────────────

export function BestSellerSection() {
  return (
    <section
      aria-labelledby="bestseller-heading"
      className="py-16 md:py-24 bg-background"
    >
      {/* Section header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-10 flex items-end justify-between max-w-7xl mx-auto">
        <div>
          <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-2">
            Curated for you
          </p>
          <h2
            id="bestseller-heading"
            className="font-heading font-light text-4xl md:text-5xl leading-tight tracking-wide"
          >
            Best Sellers
          </h2>
        </div>
        <Link
          href="/shop"
          id="bestseller-view-all"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 border-b border-transparent hover:border-foreground pb-px"
        >
          View All
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Horizontal scroll track — scrollbar hidden via CSS */}
      <div
        className="scrollbar-hidden flex gap-4 sm:gap-5 px-4 sm:px-6 lg:px-8 overflow-x-auto scroll-smooth"
        style={{
          scrollbarWidth: "none",        /* Firefox */
          msOverflowStyle: "none",       /* IE / Edge legacy */
        }}
      >
        {BEST_SELLERS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* End spacer so last card isn't flush against viewport edge */}
        <div className="flex-none w-4 sm:w-6 lg:w-8" aria-hidden="true" />
      </div>

      {/* Mobile "View All" CTA */}
      <div className="sm:hidden mt-8 px-4 text-center">
        <Link
          href="/shop"
          id="bestseller-view-all-mobile"
          className="inline-flex items-center gap-2 border border-foreground/30 px-8 py-3 text-xs font-medium tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-300"
        >
          View All Products
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
