import postgres from "postgres";

const BACKUP_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function migrate() {
  const sql = postgres(BACKUP_URL, { ssl: "require" });
  
  console.log("Adding new columns to properties table...");
  
  try {
    await sql`
      ALTER TABLE properties 
      ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Sale',
      ADD COLUMN IF NOT EXISTS gallery TEXT[] DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS video_url TEXT,
      ADD COLUMN IF NOT EXISTS bedrooms INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS bathrooms INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS area TEXT,
      ADD COLUMN IF NOT EXISTS floor_number TEXT,
      ADD COLUMN IF NOT EXISTS furnishing TEXT DEFAULT 'Unfurnished',
      ADD COLUMN IF NOT EXISTS amenities_ids INTEGER[] DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS map_location TEXT,
      ADD COLUMN IF NOT EXISTS nearby_places JSONB DEFAULT '[]',
      ADD COLUMN IF NOT EXISTS agent_name TEXT,
      ADD COLUMN IF NOT EXISTS agent_phone TEXT,
      ADD COLUMN IF NOT EXISTS agent_image TEXT;
    `;
    console.log("Migration successful!");
  } catch (e) {
    console.error("Migration failed:", e);
  } finally {
    await sql.end();
  }
}

migrate();
