"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` once the page has scrolled past `threshold` pixels.
 * Safe to use in client components only.
 */
export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);

    // Set initial state in case page is already scrolled on mount
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
