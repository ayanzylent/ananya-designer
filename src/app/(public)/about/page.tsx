import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/about-page-content";

export const metadata: Metadata = {
  title: "About Us | Ananya Designer",
  description:
    "Learn about Ananya Designer — a homegrown fashion brand rooted in Ranaghat, West Bengal, celebrating elegance, individuality, and craftsmanship.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
