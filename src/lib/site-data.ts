import downtown from "@/assets/community-downtown.jpg";
import marina from "@/assets/community-marina.jpg";
import hills from "@/assets/community-hills.jpg";
import creek from "@/assets/community-creek.jpg";
import l1 from "@/assets/launch-1.jpg";
import l2 from "@/assets/launch-2.jpg";
import l3 from "@/assets/launch-3.jpg";

export interface CommunityItem {
  slug: string;
  title: string;
  tag: string;
  img: string;
  description: string;
  highlights: string[];
}

export interface LaunchItem {
  slug: string;
  title: string;
  location: string;
  price: string;
  type: string;
  img: string;
  description: string;
  bedrooms: string;
  handover: string;
}

export interface CompletedItem {
  slug: string;
  title: string;
  location: string;
  year: string;
  img: string;
  description: string;
}

export const communities: CommunityItem[] = [
  { slug: "downtown-dubai", title: "Downtown Dubai", tag: "Iconic", img: downtown,
    description: "Home to Burj Khalifa, The Dubai Mall and The Dubai Fountain — the centre of Now.",
    highlights: ["Burj Khalifa views", "Dubai Opera district", "Direct mall access", "Fine dining boulevard"] },
  { slug: "dubai-marina", title: "Dubai Marina", tag: "Waterfront", img: marina,
    description: "A vibrant waterfront community wrapped around a 3 km man-made marina.",
    highlights: ["Marina Walk promenade", "Yacht club access", "JBR beachfront", "Iconic skyline"] },
  { slug: "dubai-hills-estate", title: "Dubai Hills Estate", tag: "Family", img: hills,
    description: "A green oasis with championship golf, parks and quality international schools.",
    highlights: ["18-hole championship golf", "Dubai Hills Mall", "Family parks & trails", "Top-tier schools"] },
  { slug: "dubai-creek-harbour", title: "Dubai Creek Harbour", tag: "Lifestyle", img: creek,
    description: "The next-generation Dubai destination on the historic creek with a wildlife sanctuary nearby.",
    highlights: ["Creek Marina", "Central Park", "Skyline views of Downtown", "Wildlife sanctuary"] },
  { slug: "business-bay", title: "Business Bay", tag: "Urban", img: l1,
    description: "Dubai's central business district — a vibrant mix of corporate, residential and hospitality.",
    highlights: ["Downtown adjacency", "Canal-front living", "Premium hospitality", "Walkable urban core"] },
  { slug: "emaar-beachfront", title: "Emaar Beachfront", tag: "Beachfront", img: l3,
    description: "Private island living minutes from Downtown and Marina with 1.5 km of pristine beach.",
    highlights: ["Private beach access", "Marina & yacht club", "Skyline & sea views", "Resort-style amenities"] },
  { slug: "arabian-ranches", title: "Arabian Ranches", tag: "Suburban", img: hills,
    description: "Tranquil family villas surrounded by lush desert landscapes and equestrian facilities.",
    highlights: ["Polo & equestrian club", "Golf course", "Community retail", "Family-first design"] },
];

export const launches: LaunchItem[] = [
  { slug: "aurora-heights", title: "Aurora Heights", location: "Downtown Dubai", price: "From AED 2.4M", type: "Apartments", img: l1,
    description: "Sky-high living in the heart of Downtown with panoramic Burj Khalifa views.",
    bedrooms: "1, 2 & 3 BR", handover: "Q4 2027" },
  { slug: "park-greens", title: "Park Greens", location: "Dubai Hills Estate", price: "From AED 3.9M", type: "Townhouses", img: l2,
    description: "Family townhouses set within landscaped parks and walkable to Dubai Hills Mall.",
    bedrooms: "3 & 4 BR", handover: "Q2 2027" },
  { slug: "coral-bay", title: "Coral Bay", location: "Emaar Beachfront", price: "From AED 5.1M", type: "Villas", img: l3,
    description: "Beachfront villas with private pools and uninterrupted Arabian Gulf horizons.",
    bedrooms: "4 & 5 BR", handover: "Q1 2028" },
  { slug: "marina-vista", title: "Marina Vista", location: "Dubai Marina", price: "From AED 1.9M", type: "Apartments", img: marina,
    description: "Sleek waterfront residences overlooking the Marina and Palm Jumeirah.",
    bedrooms: "Studio – 3 BR", handover: "Q3 2026" },
  { slug: "creek-palace", title: "Creek Palace", location: "Dubai Creek Harbour", price: "From AED 2.8M", type: "Apartments", img: creek,
    description: "Elevated creek-side residences with dual skyline and water vistas.",
    bedrooms: "1, 2 & 3 BR", handover: "Q4 2026" },
  { slug: "hills-grove", title: "Hills Grove", location: "Dubai Hills Estate", price: "From AED 4.5M", type: "Villas", img: hills,
    description: "Modern villas backing onto the championship golf course.",
    bedrooms: "4, 5 & 6 BR", handover: "Q2 2027" },
];

export const completed: CompletedItem[] = [
  { slug: "burj-crown", title: "Burj Crown", location: "Downtown Dubai", year: "2025", img: downtown,
    description: "Slim-tower residences with framed Burj Khalifa views and refined finishes." },
  { slug: "sunrise-bay", title: "Sunrise Bay", location: "Emaar Beachfront", year: "2025", img: marina,
    description: "Twin-tower beachfront living on a private island just off Dubai Marina." },
  { slug: "golf-place-terraces", title: "Golf Place Terraces", location: "Dubai Hills Estate", year: "2025", img: hills,
    description: "Contemporary villas overlooking the 18-hole championship golf course." },
  { slug: "creek-edge", title: "Creek Edge", location: "Dubai Creek Harbour", year: "2024", img: creek,
    description: "Two slender towers at the water's edge with panoramic skyline views." },
  { slug: "forte-towers", title: "Forte Towers", location: "Downtown Dubai", year: "2024", img: l1,
    description: "Twin towers steps from Dubai Opera and the Burj Khalifa boulevard." },
  { slug: "park-heights", title: "Park Heights", location: "Dubai Hills Estate", year: "2024", img: l2,
    description: "Garden-view residences within the established Park Heights district." },
];
