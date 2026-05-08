import postgres from "postgres";

const dbUrl = process.argv[2];
const sql = postgres(dbUrl, { ssl: "require" });

async function resetAndSeed() {
  console.log("Cleaning properties table...");
  await sql`DELETE FROM properties`;
  
  console.log("Seeding 50 properties...");
  const dubaiLocations = ["Dubai Marina", "Downtown Dubai", "Dubai Creek Harbour", "Emaar Beachfront", "Dubai Hills Estate"];
  const images = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
  ];

  const entries = [];
  for (let i = 1; i <= 50; i++) {
    const loc = dubaiLocations[i % dubaiLocations.length];
    entries.push({
      title: `Emaar Luxury ${i} - ${loc}`,
      slug: `lux-${i}-${Date.now()}`,
      location: loc,
      price: `AED ${(Math.random() * 3 + 1).toFixed(1)}M`,
      type: "Apartments",
      category: "Residential",
      img: images[i % images.length],
      description: "A premium luxury residence by Emaar."
    });
  }

  try {
    for (const p of entries) {
      await sql`
        INSERT INTO properties (title, slug, location, price, type, category, img, description)
        VALUES (${p.title}, ${p.slug}, ${p.location}, ${p.price}, ${p.type}, ${p.category}, ${p.img}, ${p.description})
      `;
    }
    const count = await sql`SELECT count(*) FROM properties`;
    console.log(`Success! Total properties in DB now: ${count[0].count}`);
  } catch (e) {
    console.error("Failed:", e);
  } finally {
    process.exit();
  }
}

resetAndSeed();
