// src/utils/contact.ts
export type ContactInfo = {
  brand: string;
  email: string;
  phoneDisplay: string;
  phoneWA: string;
  address: string;
  hours: string;
  waUrl: string;
  mailto: string;
  mapsUrl: string;
};

const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || "FixPC — Soporte Técnico";
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "kalbert.contreras@gmail.com";
const CONTACT_PHONE_DISPLAY = import.meta.env.VITE_CONTACT_PHONE || "+56 9 3929 1484";
const CONTACT_PHONE_WA = import.meta.env.VITE_CONTACT_PHONE_WA || "56939291484";
const CONTACT_ADDRESS = import.meta.env.VITE_CONTACT_ADDRESS || "Rafael Sotomayor 71A, Santiago";
const CONTACT_HOURS = import.meta.env.VITE_CONTACT_HOURS || "L–V 10:00–20:00";

export const CONTACT: ContactInfo = {
  brand: BRAND_NAME,
  email: CONTACT_EMAIL,
  phoneDisplay: CONTACT_PHONE_DISPLAY,
  phoneWA: CONTACT_PHONE_WA,
  address: CONTACT_ADDRESS,
  hours: CONTACT_HOURS,
  waUrl: `https://wa.me/${CONTACT_PHONE_WA}`,
  mailto: `mailto:${CONTACT_EMAIL}`,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_ADDRESS)}`
};