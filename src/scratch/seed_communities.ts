import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);

const originalCommunities = [
  { slug: "downtown-dubai", title: "Downtown Noida", tag: "Iconic", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
    description: "Home to Burj Khalifa, The Noida Mall and The Noida Fountain — the centre of Now." },
  { slug: "dubai-marina", title: "Noida Marina", tag: "Waterfront", img: "https://images.unsplash.com/photo-1537640538966-79f369b41e8f?auto=format&fit=crop&q=80&w=1000",
    description: "A vibrant waterfront community wrapped around a 3 km man-made marina." },
  { slug: "dubai-hills-estate", title: "Noida Hills Estate", tag: "Family", img: "https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&q=80&w=1000",
    description: "A green oasis with championship golf, parks and quality international schools." },
  { slug: "dubai-creek-harbour", title: "Noida Creek Harbour", tag: "Lifestyle", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=1000",
    description: "The next-generation Noida destination on the historic creek with a wildlife sanctuary nearby." },
  { slug: "business-bay", title: "Business Bay", tag: "Urban", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
    description: "Noida's central business district — a vibrant mix of corporate, residential and hospitality." },
  { slug: "golden-door-beachfront", title: "Golden Door Beachfront", tag: "Beachfront", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000",
    description: "Private island living minutes from Downtown and Marina with 1.5 km of pristine beach." },
  { slug: "arabian-ranches", title: "Arabian Ranches", tag: "Suburban", img: "https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&q=80&w=1000",
    description: "Tranquil family villas surrounded by lush desert landscapes and equestrian facilities." },
];

async function seed() {
  try {
    console.log('Seeding original communities...');
    for (const c of originalCommunities) {
      // Check if already exists by slug
      const existing = await sql`SELECT 1 FROM communities WHERE slug = ${c.slug}`;
      if (existing.length === 0) {
        await sql`INSERT INTO communities (slug, title, tag, img, description) VALUES (${c.slug}, ${c.title}, ${c.tag}, ${c.img}, ${c.description})`;
        console.log(`Added: ${c.title}`);
      } else {
        console.log(`Skipped (already exists): ${c.title}`);
      }
    }
    console.log('Done!');
  } catch (e) {
    console.error('SEED ERROR:', e);
  } finally {
    await sql.end();
  }
}

seed();
