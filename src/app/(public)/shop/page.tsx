import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { BEST_SELLERS } from "@/lib/data";
import { buildProductEnquiryUrl, WHATSAPP_NUMBER } from "@/lib/constants";
import type { Metadata } from "next";
import type { Product } from "@/types/product";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Shop All Sarees | Ananya Designer",
  description:
    "Browse our full collection of premium handcrafted sarees — Banarasi, Kanjivaram, Chiffon, Chanderi and more.",
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ShopProductCard({ product }: { product: Product }) {
  const waUrl = buildProductEnquiryUrl(product.name, product.slug);

  return (
    <article
      className="group relative"
      aria-label={product.name}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-50 rounded-sm">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

        {/* Hover action bar */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex">
          <Link
            href={`/shop/${product.slug}`}
            id={`shop-card-view-${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background py-3 text-[10px] font-medium tracking-widest uppercase hover:bg-foreground/90 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            View Details
          </Link>
          <a
            href={waUrl}
            id={`shop-card-wa-${product.id}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="flex items-center justify-center w-12 bg-[#25D366] text-white hover:bg-[#1ebe5d] transition-colors"
          >
            {/* WhatsApp SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4.5 h-4.5"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Details */}
      <div className="mt-3 space-y-1 px-0.5">
        <p className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
          {product.fabric}
        </p>
        <h3 className="text-sm font-medium text-foreground leading-snug">
          <Link
            href={`/shop/${product.slug}`}
            className="hover:underline underline-offset-2 decoration-foreground/30"
          >
            {product.name}
          </Link>
        </h3>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-base font-semibold text-foreground">
            {formatPrice(product.discountedPrice)}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            {formatPrice(product.actualPrice)}
          </span>
        </div>
        {/* WhatsApp link below card on mobile (always visible) */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-[#25D366] mt-1"
        >
          <MessageCircle className="w-3 h-3" aria-hidden="true" />
          Enquire on WhatsApp
        </a>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-2">
            Handcrafted in India
          </p>
          <h1 className="font-heading font-light text-4xl md:text-5xl tracking-wide">
            All Collections
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-lg">
            Explore our curated range of premium sarees — each woven with tradition,
            passion, and timeless elegance.
          </p>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-8 tracking-wide">
          Showing {BEST_SELLERS.length} products
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8">
          {BEST_SELLERS.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* WhatsApp CTA banner at bottom */}
        <div className="mt-16 md:mt-24 border border-border p-8 md:p-12 text-center">
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Need help choosing?
          </p>
          <h2 className="font-heading font-light text-2xl md:text-3xl tracking-wide mb-4">
            Chat with us on WhatsApp
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Our style experts are here to help you find the perfect saree for any
            occasion.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to explore your saree collection and get some help choosing.")}`}
            id="shop-wa-cta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-8 py-3.5 text-xs font-medium tracking-widest uppercase hover:bg-[#1ebe5d] transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Start a Chat
          </a>
        </div>
      </div>
    </div>
  );
}
