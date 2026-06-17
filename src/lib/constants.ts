// ─── Site-wide constants ──────────────────────────────────────────────────────

export const SITE_NAME = "Ananya Designer";

// WhatsApp — replace with the actual business number (with country code, no +)
export const WHATSAPP_NUMBER = "919641472617";
export const PHONE_NUMBER = "+91 9641472617"

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const FACEBOOK = 'https://facebook.com/AnanyaDesignerOfficial'
export const INSTAGRAM = 'https://instagram.com/saree.by.ananyadesigner'

export function buildProductEnquiryUrl(productName: string, productSlug: string): string {
  const message =
    `Hi! I'm interested in *${productName}* (${SITE_NAME}).\n` +
    `Product link: ${typeof window !== "undefined" ? window.location.origin : ""}/shop/${productSlug}\n\n` +
    `Could you please share more details?`;
  return buildWhatsAppUrl(message);
}

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  // Union Territories
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
] as const;
