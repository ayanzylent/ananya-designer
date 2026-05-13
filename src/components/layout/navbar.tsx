"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useScrolled } from "@/lib/hooks/use-scrolled";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavLinkItem({
  href,
  label,
  onClick,
}: NavLink & { onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium tracking-wide transition-colors duration-200",
        "text-foreground/80 hover:text-foreground",
        "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0",
        "after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
      )}
    >
      {label}
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Navbar() {
  const scrolled = useScrolled(80);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Cart count — zero now; ready to be connected to a cart store (e.g. Zustand)
  const cartCount: number = 0;

  return (
    <header
      role="banner"
      className={cn(
        "w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/0"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ── Logo ────────────────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="Ananya Designer – go to homepage"
            className="shrink-0"
          >
            <Image
              src="/logo-image.png"
              alt="Ananya Designer logo"
              width={120}
              height={40}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* ── Desktop nav links (center) ──────────────────────────────── */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <NavLinkItem key={link.href} {...link} />
            ))}
          </nav>

          {/* ── Right actions ───────────────────────────────────────────── */}
          <div className="flex items-center gap-1 sm:gap-2">

            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open search"
              className="rounded-full hover:bg-accent"
            >
              <Search className="h-[18px] w-[18px]" />
            </Button>

            {/* Bag / Cart */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Shopping bag, ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
              className="relative rounded-full hover:bg-accent"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center",
                    "rounded-full bg-foreground text-background text-[10px] font-bold leading-none"
                  )}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Button>

            {/* Shop Now – desktop only */}
            <Button
              asChild
              size="sm"
              className={cn(
                "hidden lg:inline-flex rounded-full px-5 text-sm font-semibold",
                "bg-foreground text-background hover:bg-foreground/85 transition-colors duration-200"
              )}
            >
              <Link href="/shop">Shop Now</Link>
            </Button>

            {/* Hamburger – mobile & tablet */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  className="lg:hidden rounded-full hover:bg-accent"
                >
                  {mobileOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>

              {/* ── Mobile / Tablet drawer ───────────────────────────────── */}
              <SheetContent
                side="left"
                className="w-72 sm:w-80 flex flex-col pt-10 px-6"
              >
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>

                {/* Drawer logo */}
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Ananya Designer – go to homepage"
                  className="mb-8 block"
                >
                  <Image
                    src="/logo-image.png"
                    alt="Ananya Designer logo"
                    width={100}
                    height={34}
                    className="h-8 w-auto object-contain"
                  />
                </Link>

                {/* Drawer nav links */}
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-1 flex-1"
                >
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center py-3 px-3 rounded-lg text-base font-medium",
                        "text-foreground/80 hover:text-foreground hover:bg-accent",
                        "transition-colors duration-150"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Drawer Shop Now CTA */}
                <div className="py-6">
                  <Button
                    asChild
                    className={cn(
                      "w-full rounded-full font-semibold",
                      "bg-foreground text-background hover:bg-foreground/85"
                    )}
                  >
                    <Link href="/shop" onClick={() => setMobileOpen(false)}>
                      Shop Now
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
