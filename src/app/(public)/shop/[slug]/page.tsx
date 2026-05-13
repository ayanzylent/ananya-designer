import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Check,
  ShoppingBag,
  Heart,
  Truck,
  RefreshCw,
  Ruler,
  Sparkles,
  Info,
} from "lucide-react";
import { BEST_SELLERS, getProductBySlug } from "@/lib/data";
import { buildProductEnquiryUrl } from "@/lib/constants";
import type { Metadata } from "next";

// ─── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return BEST_SELLERS.map((p) => ({ slug: p.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Ananya Designer`,
    description: product.description,
  };
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const savings = product.actualPrice - product.discountedPrice;
  const waUrl = buildProductEnquiryUrl(product.name, product.slug);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 lg:px-8 pt-6 pb-2 max-w-7xl mx-auto">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium truncate max-w-[180px]">{product.name}</li>
        </ol>
      </nav>

      {/* ── Back link (mobile) ──────────────────────────────────────────────── */}
      <div className="px-4 sm:hidden pt-2 pb-4">
        <Link href="/shop" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to Shop
        </Link>
      </div>

      {/* ── Main layout ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* ── Left: Image ─────────────────────────────────────────────────── */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-50 rounded-sm">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 bg-foreground text-background text-[10px] font-medium tracking-widest uppercase px-3 py-1.5">
                {product.badge}
              </span>
            )}
            <span className="absolute top-4 right-4 z-10 bg-red-600 text-white text-xs font-semibold tracking-wide px-2.5 py-1 rounded-sm">
              -{product.discountPercent}%
            </span>
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* ── Right: Details ──────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5 md:sticky md:top-28">

            {/* Fabric + SKU */}
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-muted-foreground">
                {product.fabric}
              </p>
              {product.sku && (
                <p className="text-[10px] text-muted-foreground/60 tracking-wide">SKU: {product.sku}</p>
              )}
            </div>

            {/* Name */}
            <h1 className="font-heading font-light text-3xl md:text-4xl leading-tight tracking-wide">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-border">
              <span className="text-2xl font-semibold text-foreground">
                {formatPrice(product.discountedPrice)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.actualPrice)}
              </span>
              <span className="text-sm font-medium text-red-600">
                Save {formatPrice(savings)}
              </span>
            </div>

            {/* Tax / Shipping / Delivery / Availability */}
            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              {product.taxInfo && <p>{product.taxInfo}</p>}
              {product.shippingInfo && <p>{product.shippingInfo}</p>}
              {product.deliveryTime && (
                <p className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  Delivery in {product.deliveryTime}
                </p>
              )}
              {product.availability && (
                <p className="flex items-center gap-1.5 text-green-600 font-medium">
                  <Check className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  {product.availability}
                </p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <button
                  id={`add-to-cart-${product.id}`}
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2.5 bg-foreground text-background py-4 text-xs font-medium tracking-widest uppercase hover:bg-foreground/85 transition-colors duration-200 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  Add to Bag
                </button>
                <button
                  id={`wishlist-${product.id}`}
                  type="button"
                  aria-label="Add to wishlist"
                  className="flex items-center justify-center gap-2 border border-border px-5 py-4 text-xs font-medium tracking-widest uppercase hover:border-foreground transition-colors duration-200 cursor-pointer"
                >
                  <Heart className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Wishlist</span>
                </button>
              </div>
              <a
                href={waUrl}
                id={`wa-enquiry-${product.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] text-white py-4 text-xs font-medium tracking-widest uppercase hover:bg-[#1ebe5d] transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enquire on WhatsApp
              </a>
            </div>

            {/* Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="pt-4 border-t border-border">
                <p className="text-xs font-medium tracking-widest uppercase mb-3">Product Highlights</p>
                <ul className="space-y-2">
                  {product.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-foreground" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dimensions */}
            {product.dimensions && (
              <details className="group border-t border-border pt-4" open>
                <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-medium tracking-widest uppercase">
                  <span className="flex items-center gap-2">
                    <Ruler className="w-3.5 h-3.5" aria-hidden="true" />
                    Dimensions
                  </span>
                  <span aria-hidden="true" className="text-muted-foreground transition-transform duration-200 group-open:rotate-180">↓</span>
                </summary>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {product.dimensions.length && (
                    <li className="flex items-center gap-3">
                      <span className="w-14 text-[10px] text-muted-foreground/60 uppercase tracking-wide">Length</span>
                      {product.dimensions.length}
                    </li>
                  )}
                  {product.dimensions.width && (
                    <li className="flex items-center gap-3">
                      <span className="w-14 text-[10px] text-muted-foreground/60 uppercase tracking-wide">Width</span>
                      {product.dimensions.width}
                    </li>
                  )}
                </ul>
              </details>
            )}

            {/* Style Tip */}
            {product.styleTip && (
              <div className="border-t border-border pt-4">
                <p className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  Style Tip
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{product.styleTip}&rdquo;
                </p>
              </div>
            )}

            {/* Care Instructions */}
            {product.careInstructions && product.careInstructions.length > 0 && (
              <details className="group border-t border-border pt-4">
                <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-medium tracking-widest uppercase">
                  Care Instructions
                  <span aria-hidden="true" className="text-muted-foreground transition-transform duration-200 group-open:rotate-180">↓</span>
                </summary>
                <ul className="mt-3 space-y-1.5">
                  {product.careInstructions.map((instruction) => (
                    <li key={instruction} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span aria-hidden="true" className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                      {instruction}
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {/* Note */}
            {product.note && (
              <div className="border-t border-border pt-4 flex items-start gap-2 text-xs text-muted-foreground/70 leading-relaxed">
                <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p>{product.note}</p>
              </div>
            )}

            {/* Return Policy */}
            {product.returnPolicy && (
              <div className="border-t border-border pt-4 flex items-start gap-2 text-xs text-muted-foreground">
                <RefreshCw className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p>{product.returnPolicy}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
