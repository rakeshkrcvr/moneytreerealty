import postgres from "postgres";

const dbUrl = process.argv[2];
if (!dbUrl) {
  console.error("Please provide DATABASE_URL");
  process.exit(1);
}

const sql = postgres(dbUrl, { ssl: "require" });

const dubaiLocations = ["Dubai Marina", "Downtown Dubai", "Dubai Creek Harbour", "Emaar Beachfront", "Arabian Ranches III", "The Valley", "Dubai Hills Estate"];
const propertyTypes = ["Apartments", "Villas", "Townhouses", "Penthouses"];
const categories = ["Residential", "Commercial"];

const images = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?w=800",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"
];

async function seed() {
  console.log("Seeding 50 properties...");
  
  for (let i = 1; i <= 50; i++) {
    const title = `Premium Property ${i} - ${dubaiLocations[i % dubaiLocations.length]}`;
    const slug = `property-${i}-${Date.now()}`;
    const location = dubaiLocations[i % dubaiLocations.length];
    const price = `AED ${(Math.random() * 5 + 1).toFixed(1)}M`;
    const type = propertyTypes[i % propertyTypes.length];
    const category = categories[i % categories.length];
    const img = images[i % images.length];
    
    const amenities = JSON.stringify([
      { label: "Infinity Pool", icon: "Waves" },
      { label: "Modern Gym", icon: "Dumbbell" },
      { label: "Concierge", icon: "ShieldCheck" }
    ]);
    
    const agent = JSON.stringify({ name: "Expert Agent", phone: "+971 50 000 0000" });

    try {
      await sql`
        INSERT INTO properties (
          title, slug, location, price, type, category, img, description, 
          amenities, floor_plans, nearby_places, agent_info, gallery
        ) VALUES (
          ${title}, ${slug}, ${location}, ${price}, ${type}, ${category}, ${img},
          'Experience the pinnacle of luxury living in this architectural masterpiece located in the heart of Dubai.',
          ${amenities}, '[]', '[]', ${agent}, ${JSON.stringify([img, img, img])}
        )
      `;
      if (i % 10 === 0) console.log(`Inserted ${i} properties...`);
    } catch (e) {
      console.error(`Failed at ${i}:`, e);
    }
  }
  
  console.log("Seeding complete! 50 properties added to 'properties' table.");
  process.exit();
}

seed();
