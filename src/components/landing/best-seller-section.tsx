import Image from "next/image";
import Link from "next/link";
import { BEST_SELLERS } from "@/lib/data";
import type { Product } from "@/types/product";


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
    <Link
      href={`/shop/${product.slug}`}
      id={`product-card-${product.id}`}
      className="group relative flex-none w-64 sm:w-72 block"
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
      </div>

      {/* Details */}
      <div className="mt-3 space-y-1 px-0.5">
        {/* Fabric tag */}
        <p className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
          {product.fabric}
        </p>

        {/* Name */}
        <h3 className="text-sm font-medium text-foreground leading-snug group-hover:underline underline-offset-2 decoration-foreground/30">
          {product.name}
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
    </Link>
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
