import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

      {/* ── Hero content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">

        {/* Heading — Cormorant Garamond, uppercase editorial style */}
        <h1
          className="font-heading font-light leading-[0.9] tracking-wider uppercase text-5xl sm:text-6xl md:text-7xl">
          <span className="block text-[#3a3733]">Elegance</span>
          <span className="block italic text-[#70574c]">Woven</span>
          <span className="block text-[#3a3733]">Timelessly.</span>
        </h1>

        {/* Decorative rule */}
        <div
          aria-hidden="true"
          className="mt-6 mb-6 h-px w-16 bg-white/50 md:w-24"
        />

        {/* Description */}
        <p className="max-w-sm text-sm font-light leading-relaxed tracking-wide text-[#494844] md:max-w-md md:text-base [text-shadow:0_0_5px_#fff,0_0_15px_#fff,0_0_30px_rgba(255,255,255,0.8)]">
          Discover premium sarees and ethnic wear crafted with passion,
          designed for you.
        </p>

        <Button className="mt-10 px-8 py-5 bg-[#2e3135] rounded-full">EXPLORE COLLECTION</Button>
      </div>
    </section>
  );
}