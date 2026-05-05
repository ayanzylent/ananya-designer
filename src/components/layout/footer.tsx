"use client";

import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer id="main-footer" className="bg-foreground text-white/90">
      <div className="px-5 py-10">
        {/* Brand */}
        <div className="mb-8">
          <div className="mb-4">
            <span
              className="text-xl tracking-[0.3em] font-bold uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ananya
            </span>
            <br />
            <span className="text-[9px] tracking-[0.45em] text-white/50 uppercase font-medium">
              Designer
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            Crafting timeless elegance through handpicked sarees and ethnic wear.
            Each piece tells a story of tradition and artistry.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {["New Arrivals", "Sarees", "Lehengas", "Sale", "About Us"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">
              Help
            </h3>
            <ul className="space-y-2.5">
              {[
                "Track Order",
                "Shipping Info",
                "Returns",
                "Size Guide",
                "Contact Us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-8 space-y-3">
          <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">
            Get in Touch
          </h3>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>Mumbai, Maharashtra, India</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span>hello@ananyadesigner.com</span>
          </div>
        </div>

        {/* Social */}
        <div className="flex items-center gap-4 mb-8">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Social link"
            >
              <Icon className="w-4 h-4 text-white/70" strokeWidth={1.5} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-white/40 text-center">
            © 2026 Ananya Designer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
