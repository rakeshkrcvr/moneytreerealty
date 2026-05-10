import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function recreateBlogsTable() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log("Dropping and recreating blogs table...");
    await sql`DROP TABLE IF EXISTS blogs`;
    await sql`
      CREATE TABLE blogs (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        date TEXT,
        img TEXT,
        cat TEXT,
        excerpt TEXT,
        content TEXT,
        author TEXT DEFAULT 'Admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Blogs table recreated with full schema.");
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await sql.end();
  }
}

recreateBlogsTable();
