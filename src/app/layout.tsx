import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProviders } from "@/providers/AppProviders";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ananya Designer | Premium Indian Sarees",
    template: "%s | Ananya Designer",
  },
  description:
    "Discover premium Indian sarees — Benarasi, Kanjivaram, Modal Silk, Organza, Cotton & more. Elegant designs for weddings, festivals, and everyday elegance. Shop now.",
  keywords: [
    "Indian sarees",
    "Benarasi saree",
    "Kanjivaram saree",
    "designer sarees",
    "buy sarees online",
    "Ananya Designer",
    "wedding sarees",
    "festive sarees",
  ],
  openGraph: {
    type: "website",
    siteName: "Ananya Designer",
    title: "Ananya Designer | Premium Indian Sarees",
    description:
      "Shop premium Indian sarees — Benarasi, Kanjivaram, Modal Silk, Organza, Cotton & more for weddings and festive occasions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ananya Designer | Premium Indian Sarees",
    description:
      "Shop premium Indian sarees — Benarasi, Kanjivaram, Modal Silk, Organza, Cotton & more for weddings and festive occasions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, cormorant.variable)}
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>
          {children}
        </AppProviders>
        <Toaster position="top-right" richColors />

      </body>
    </html>
  );
}
