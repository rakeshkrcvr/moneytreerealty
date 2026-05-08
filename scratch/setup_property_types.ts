import postgres from "postgres";

const dbUrl = process.argv[2];
const sql = postgres(dbUrl, { ssl: "require" });

async function setupPropertyTypes() {
  console.log("Setting up property_types taxonomy...");
  try {
    // 1. Create the table
    await sql`
      CREATE TABLE IF NOT EXISTS property_types (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Insert standard types
    const types = [
      { name: "Apartments", slug: "apartments" },
      { name: "Villas", slug: "villas" },
      { name: "Townhouses", slug: "townhouses" },
      { name: "Penthouses", slug: "penthouses" },
      { name: "Commercial Office", slug: "commercial-office" },
      { name: "Retail Space", slug: "retail-space" }
    ];

    console.log("Seeding property types...");
    for (const t of types) {
      await sql`
        INSERT INTO property_types (name, slug) 
        VALUES (${t.name}, ${t.slug})
        ON CONFLICT (name) DO NOTHING
      `;
    }

    console.log("Property Types are ready!");
  } catch (e) {
    console.error("Setup failed:", e);
  } finally {
    process.exit();
  }
}

setupPropertyTypes();
