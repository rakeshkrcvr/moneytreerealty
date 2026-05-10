import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function fixBlogsTable() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log("Updating blogs table schema...");
    // Check if ID exists
    const columns = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'blogs'`;
    const columnNames = columns.map(c => c.column_name);
    
    if (!columnNames.includes('id')) {
      await sql`ALTER TABLE blogs ADD COLUMN id SERIAL PRIMARY KEY`;
    }
    if (!columnNames.includes('content')) {
      await sql`ALTER TABLE blogs ADD COLUMN content TEXT`;
    }
    if (!columnNames.includes('excerpt')) {
      await sql`ALTER TABLE blogs ADD COLUMN excerpt TEXT`;
    }
    if (!columnNames.includes('author')) {
      await sql`ALTER TABLE blogs ADD COLUMN author TEXT DEFAULT 'Admin'`;
    }
    
    console.log("Blogs table schema updated.");
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await sql.end();
  }
}

fixBlogsTable();
