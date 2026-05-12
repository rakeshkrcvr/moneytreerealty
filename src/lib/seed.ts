import { sql } from "./db";

const launches = [
  { 
    slug: "aurora-heights", 
    title: "Aurora Heights", 
    location: "Downtown Noida", 
    price: "From ₹ 2.4M", 
    type: "Apartments", // This is the old type field
    category: "Residential", // NEW: Main Category
    sub_category: "Apartment", // NEW: Sub Category
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000",
    description: "Sky-high living in the heart of Downtown with panoramic Burj Khalifa views.",
    bedrooms: "1, 2 & 3 BR", 
    handover: "Q4 2027",
    gallery: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000"],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    amenities: [{ icon: "Waves", label: "Infinity Pool" }],
    floor_plans: [{ type: "1BR", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" }],
    nearby_places: [{ place: "Burj Khalifa", distance: "05 Mins" }],
    agent_info: { name: "Sarah Ahmed", role: "Senior Advisor" },
    reviews: [{ user: "Michael J.", text: "Stunning!", rating: 5 }]
  },
  { 
    slug: "business-bay-offices", 
    title: "Executive Suites", 
    location: "Business Bay", 
    price: "From ₹ 1.2M", 
    type: "Office",
    category: "Commercial",
    sub_category: "Office",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
    description: "Modern office spaces designed for global corporations.",
    bedrooms: "N/A", 
    handover: "Ready",
    gallery: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"],
    video_url: "",
    amenities: [{ icon: "Building2", label: "Meeting Rooms" }],
    floor_plans: [],
    nearby_places: [],
    agent_info: { name: "John Doe", role: "Commercial Lead" },
    reviews: []
  }
];

async function seed() {
  console.log("🚀 Seeding Hierarchical Property Data...");

  try {
    await sql`CREATE TABLE IF NOT EXISTS blogs (slug TEXT PRIMARY KEY, title TEXT, date TEXT, img TEXT, cat TEXT)`;
    await sql`CREATE TABLE IF NOT EXISTS testimonials (id SERIAL PRIMARY KEY, name TEXT, role TEXT, text TEXT)`;
    await sql`CREATE TABLE IF NOT EXISTS faqs (id SERIAL PRIMARY KEY, question TEXT, answer TEXT)`;
    await sql`CREATE TABLE IF NOT EXISTS leads (id SERIAL PRIMARY KEY, name TEXT, email TEXT, phone TEXT, property_slug TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    
    await sql`DROP TABLE IF EXISTS launches`;
    
    await sql`
      CREATE TABLE launches (
        slug TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        location TEXT,
        price TEXT,
        type TEXT,
        category TEXT, -- Residential, Commercial, Land, Rent
        sub_category TEXT, -- Apartment, Villa, Office, etc.
        img TEXT,
        description TEXT,
        bedrooms TEXT,
        handover TEXT,
        gallery TEXT[],
        video_url TEXT,
        amenities JSONB,
        floor_plans JSONB,
        nearby_places JSONB,
        agent_info JSONB,
        reviews JSONB
      )
    `;

    for (const l of launches) {
      await sql`
        INSERT INTO launches (
          slug, title, location, price, type, category, sub_category, img, description, bedrooms, handover,
          gallery, video_url, amenities, floor_plans, nearby_places, agent_info, reviews
        ) VALUES (
          ${l.slug}, ${l.title}, ${l.location}, ${l.price}, ${l.type}, ${l.category}, ${l.sub_category}, ${l.img}, ${l.description}, ${l.bedrooms}, ${l.handover},
          ${l.gallery}, ${l.video_url}, ${l.amenities}, ${l.floor_plans}, ${l.nearby_places}, ${l.agent_info}, ${l.reviews}
        )
      `;
    }

    console.log("✅ Hierarchical property data seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    process.exit();
  }
}

seed();
