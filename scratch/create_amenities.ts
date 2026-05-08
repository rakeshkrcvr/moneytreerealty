import postgres from "postgres";

const dbUrl = process.argv[2];
const sql = postgres(dbUrl, { ssl: "require" });

async function createAmenities() {
  console.log("Creating amenities table...");
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS amenities (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        icon TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const standardAmenities = [
      { name: "Infinity Pool", icon: "Waves" },
      { name: "Luxury Gym", icon: "Dumbbell" },
      { name: "24/7 Security", icon: "ShieldCheck" },
      { name: "Valet Parking", icon: "Car" },
      { name: "CCTV Cameras", icon: "Camera" },
      { name: "Children Play Area", icon: "Baby" },
      { name: "Lush Green Park", icon: "Trees" },
      { name: "Private Balcony", icon: "Layout" }
    ];

    console.log("Inserting standard amenities...");
    for (const amen of standardAmenities) {
      await sql`
        INSERT INTO amenities (name, icon) 
        VALUES (${amen.name}, ${amen.icon})
        ON CONFLICT (name) DO NOTHING
      `;
    }

    console.log("Amenities table is ready!");
  } catch (e) {
    console.error("Failed:", e);
  } finally {
    process.exit();
  }
}

createAmenities();
