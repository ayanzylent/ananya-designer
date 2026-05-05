import Image from "next/image";
import Link from "next/link";

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100dvh - var(--header-h))" }}
    >
      {/* ── Mobile background image (< md) ──────────────────────────────── */}
      <Image
        src="/hero/hero-mobile-view.jpeg"
        alt="Ananya Designer — premium sarees and ethnic wear"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center md:hidden"
      />

      {/* ── Desktop background image (≥ md) ─────────────────────────────── */}
      <Image
        src="/hero/hero-desktop-view.jpeg"
        alt="Ananya Designer — premium sarees and ethnic wear"
        fill
        priority
        sizes="(max-width: 767px) 0px, 100vw"
        className="hidden object-cover object-center md:block"
      />

      {/* ── Dark gradient overlay ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55"
      />

      {/* ── Hero content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">

        {/* Eyebrow line */}
        <p className="mb-4 text-xs font-medium tracking-[0.35em] uppercase text-white/70 md:text-sm">
          Est. 2020 &nbsp;·&nbsp; Handcrafted in India
        </p>

        {/* Heading — Cormorant Garamond, uppercase editorial style */}
        <h1
          className="font-heading font-light leading-[0.9] tracking-wider uppercase"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          <span className="block">Elegance</span>
          <span className="block italic">Woven</span>
          <span className="block">Timelessly.</span>
        </h1>

        {/* Decorative rule */}
        <div
          aria-hidden="true"
          className="mt-6 mb-6 h-px w-16 bg-white/50 md:w-24"
        />

        {/* Description */}
        <p className="max-w-sm text-sm font-light leading-relaxed tracking-wide text-white/85 md:max-w-md md:text-base">
          Discover premium sarees and ethnic wear crafted with passion,
          designed for you.
        </p>

        {/* CTA */}
        <Link
          href="/shop"
          id="hero-explore-now"
          className={[
            "mt-10 inline-flex items-center gap-2",
            "border border-white/70 px-8 py-3",
            "text-xs font-medium tracking-[0.25em] uppercase text-white",
            "transition-all duration-300",
            "hover:bg-white hover:text-black hover:border-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          ].join(" ")}
        >
          Explore Now
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}