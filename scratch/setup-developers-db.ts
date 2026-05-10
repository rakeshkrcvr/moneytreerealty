import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function setupDevelopers() {
  const sql = postgres(DATABASE_URL, { ssl: "require" });

  try {
    console.log("Creating developers table...");
    await sql`
      CREATE TABLE IF NOT EXISTS developers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        logo_url TEXT,
        about TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Adding developer_id to properties table...");
    await sql`
      ALTER TABLE properties ADD COLUMN IF NOT EXISTS developer_id INTEGER REFERENCES developers(id)
    `;

    console.log("Database setup for developers completed!");
  } catch (error) {
    console.error("Setup failed:", error);
  } finally {
    await sql.end();
  }
}

setupDevelopers();
