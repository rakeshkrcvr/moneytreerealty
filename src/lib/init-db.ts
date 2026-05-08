import postgres from "postgres";

const connectionString = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const sql = postgres(connectionString, { ssl: "require" });

async function init() {
  console.log("Seeding database with REAL Emaar.com data...");

  // Create tables
  await sql`CREATE TABLE IF NOT EXISTS communities (slug TEXT PRIMARY KEY, title TEXT, tag TEXT, img TEXT, description TEXT, highlights TEXT[])`;
  await sql`CREATE TABLE IF NOT EXISTS launches (slug TEXT PRIMARY KEY, title TEXT, location TEXT, price TEXT, type TEXT, img TEXT, description TEXT, bedrooms TEXT, handover TEXT)`;
  await sql`CREATE TABLE IF NOT EXISTS completed (slug TEXT PRIMARY KEY, title TEXT, location TEXT, year TEXT, img TEXT, description TEXT)`;

  const communities = [
    { 
      slug: "downtown-dubai", 
      title: "Downtown Dubai", 
      tag: "The Centre of Now", 
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000", 
      description: "Emaar's flagship mega-development, home to Burj Khalifa, The Dubai Mall, and The Dubai Fountain. It represents the pinnacle of urban luxury.", 
      highlights: ["World's Tallest Building", "Dubai Opera District", "Luxury Retail & Dining", "Burj Park Living"] 
    },
    { 
      slug: "dubai-creek-harbour", 
      title: "Dubai Creek Harbour", 
      tag: "The Future of Dubai", 
      img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&q=80&w=2000", 
      description: "A sustainable and walkable mega-city featuring a massive waterfront promenade, yacht clubs, and the future Creek Tower.", 
      highlights: ["Waterfront Lifestyle", "Creek Marina", "Central Park", "Stunning Skyline Views"] 
    },
    { 
      slug: "emaar-beachfront", 
      title: "Emaar Beachfront", 
      tag: "Private Island Living", 
      img: "https://images.unsplash.com/photo-1544161515-4ad6ce6e8320?auto=format&fit=crop&q=80&w=2000", 
      description: "An exclusive residential community situated between JBR and Palm Jumeirah, offering 1.5km of pristine private beach.", 
      highlights: ["Private Beach Access", "Marina Views", "Gated Community", "Seaside Dining"] 
    },
    { 
      slug: "dubai-hills-estate", 
      title: "Dubai Hills Estate", 
      tag: "The Green Heart", 
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000", 
      description: "A master-planned community designed around an 18-hole championship golf course, featuring vast green spaces and the Dubai Hills Mall.", 
      highlights: ["Championship Golf Course", "Dubai Hills Park", "Top-tier Schools", "King's College Hospital"] 
    }
  ];

  const launches = [
    { 
      slug: "valo", 
      title: "Valo", 
      location: "Dubai Creek Harbour", 
      price: "From AED 1.8M", 
      type: "Apartments", 
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000", 
      description: "A modern residential masterpiece offering 1, 2, and 3-bedroom apartments with breathtaking views of the Creek and Dubai skyline.", 
      bedrooms: "1, 2 & 3 BR", 
      handover: "Q1 2028" 
    },
    { 
      slug: "address-seafront", 
      title: "Address Seafront", 
      location: "Emaar Beachfront", 
      price: "From AED 3.5M", 
      type: "Branded Residences", 
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000", 
      description: "Experience the ultimate in beachfront living with the luxury and service of the world-renowned Address Hotels + Resorts.", 
      bedrooms: "1 - 4 BR", 
      handover: "Q2 2027" 
    },
    { 
      slug: "aeon", 
      title: "Aeon", 
      location: "Dubai Creek Harbour", 
      price: "From AED 1.6M", 
      type: "Apartments", 
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000", 
      description: "Urban living redefined at Aeon, where sleek architecture meets functional design in Dubai's most exciting new district.", 
      bedrooms: "1 & 2 BR", 
      handover: "Q4 2027" 
    },
    { 
        slug: "bayview-address", 
        title: "Bayview", 
        location: "Emaar Beachfront", 
        price: "From AED 2.9M", 
        type: "Luxury Apartments", 
        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000", 
        description: "The first ever Address branded project in Emaar Beachfront, offering unparalleled views of the Arabian Gulf.", 
        bedrooms: "1 - 4 BR", 
        handover: "Q3 2028" 
    }
  ];

  // Seed Communities
  for (const c of communities) {
    await sql`
      INSERT INTO communities ${sql(c)}
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        tag = EXCLUDED.tag,
        img = EXCLUDED.img,
        description = EXCLUDED.description,
        highlights = EXCLUDED.highlights
    `;
  }

  // Seed Launches
  for (const l of launches) {
    await sql`
      INSERT INTO launches ${sql(l)}
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        location = EXCLUDED.location,
        price = EXCLUDED.price,
        type = EXCLUDED.type,
        img = EXCLUDED.img,
        description = EXCLUDED.description,
        bedrooms = EXCLUDED.bedrooms,
        handover = EXCLUDED.handover
    `;
  }

  console.log("Real Emaar data seeded successfully!");
  process.exit(0);
}

init().catch(err => { console.error(err); process.exit(1); });
