"use client";

import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Menu, X, Heart, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cartCount, setCartOpen } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header
        id="main-header"
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50"
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" id="brand-logo" className="flex flex-col items-start flex-shrink-0">
            <span
              className="text-lg sm:text-xl tracking-[0.25em] sm:tracking-[0.3em] font-bold uppercase leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ananya
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.35em] sm:tracking-[0.45em] text-muted-foreground uppercase -mt-0.5 font-medium">
              Designer
            </span>
          </Link>

          {/* Right Icons */}
          <nav className="flex items-center gap-2 sm:gap-3" aria-label="Utility navigation">
            <button
              id="search-btn"
              aria-label="Search"
              className="p-1.5 hover:bg-muted rounded-full transition-colors"
            >
              <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-foreground" strokeWidth={1.6} />
            </button>

            <button
              id="account-btn"
              aria-label="Account"
              className="p-1.5 hover:bg-muted rounded-full transition-colors"
            >
              <User className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-foreground" strokeWidth={1.6} />
            </button>

            <button
              id="cart-btn"
              onClick={() => setCartOpen(true)}
              aria-label="Shopping cart"
              className="p-1.5 hover:bg-muted rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-foreground" strokeWidth={1.6} />
              {mounted && cartCount > 0 && (
                <span className="animate-pulse absolute -top-0.5 -right-0.5 bg-foreground text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              id="menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 hover:bg-muted rounded-full transition-colors"
            >
              {menuOpen ? (
                <X className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-foreground" strokeWidth={1.6} />
              ) : (
                <Menu className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-foreground" strokeWidth={1.6} />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.nav
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white z-50 shadow-2xl overflow-y-auto"
              aria-label="Main navigation"
            >
              <div className="p-5 pt-4">
                {/* Drawer Header */}
                <div className="flex items-center justify-between mb-7">
                  <span
                    className="text-base tracking-[0.2em] font-bold uppercase"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Menu
                  </span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" strokeWidth={1.6} />
                  </button>
                </div>

                {/* Nav Links */}
                <ul className="space-y-0.5">
                  {[
                    "New Arrivals",
                    "Sarees",
                    "Lehengas",
                    "Suits & Sets",
                    "Dupattas",
                    "Blouses",
                    "Sale",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="/collection"
                        className="flex items-center justify-between py-3 px-3 text-foreground hover:bg-muted rounded-lg transition-all group"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="text-sm font-medium tracking-wide">
                          {item}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="my-5 border-t border-border" />

                {/* Secondary Links */}
                <ul className="space-y-0.5">
                  {["My Account", "Wishlist", "Track Order", "Contact Us"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="flex items-center gap-3 py-2.5 px-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
                        >
                          {item === "Wishlist" && <Heart className="w-4 h-4" />}
                          {item === "My Account" && <User className="w-4 h-4" />}
                          {item === "Track Order" && <ShoppingBag className="w-4 h-4" />}
                          {item === "Contact Us" && <Search className="w-4 h-4" />}
                          <span className="text-sm">{item}</span>
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
