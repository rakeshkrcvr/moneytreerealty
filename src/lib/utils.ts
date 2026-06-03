import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_GOOGLE_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1785100234475!2d55.27138287607738!3d25.19719693170799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4334adcc6279%3A0xc3c5443e0160b73b!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1715360000000!5m2!1sen!2sae";

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function normalizeGoogleMapsEmbedUrl(value: FormDataEntryValue | string | null | undefined) {
  const rawValue = typeof value === "string" ? value.trim() : "";
  if (!rawValue) return DEFAULT_GOOGLE_MAP_EMBED_URL;

  const decodedValue = decodeHtmlEntities(rawValue);
  const iframeSrcMatch = decodedValue.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  const mapUrl = decodeHtmlEntities((iframeSrcMatch?.[1] || decodedValue).trim());

  try {
    const url = new URL(mapUrl);
    const isGoogleMapsEmbed =
      url.protocol === "https:" &&
      (url.hostname === "www.google.com" || url.hostname === "google.com" || url.hostname.endsWith(".google.com")) &&
      url.pathname.startsWith("/maps/embed");

    return isGoogleMapsEmbed ? url.toString() : DEFAULT_GOOGLE_MAP_EMBED_URL;
  } catch {
    return DEFAULT_GOOGLE_MAP_EMBED_URL;
  }
}
