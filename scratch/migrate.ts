import postgres from "postgres";

// We'll get the URL from the command line argument
const dbUrl = process.argv[2];

if (!dbUrl) {
  console.error("Please provide DATABASE_URL as an argument");
  process.exit(1);
}

const sql = postgres(dbUrl, { ssl: "require" });

async function migrate() {
  console.log("Creating properties table...");
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS properties (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        location TEXT,
        price TEXT,
        type TEXT,
        category TEXT,
        img TEXT,
        description TEXT,
        amenities JSONB DEFAULT '[]',
        floor_plans JSONB DEFAULT '[]',
        nearby_places JSONB DEFAULT '[]',
        agent_info JSONB DEFAULT '{}',
        reviews JSONB DEFAULT '[]',
        gallery JSONB DEFAULT '[]',
        video_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Migration successful! 'properties' table is ready.");
  } catch (e) {
    console.error("Migration failed:", e);
  } finally {
    process.exit();
  }
}

migrate();
