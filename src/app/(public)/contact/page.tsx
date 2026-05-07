import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata: Metadata = {
  title: "Contact Us | Ananya Designer",
  description:
    "Get in touch with Ananya Designer. Call or WhatsApp us at +91 9641472617 or visit our store in Ranaghat, West Bengal.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
