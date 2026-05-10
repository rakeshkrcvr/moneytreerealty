import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function checkBlogsTable() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log("Checking blogs table...");
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_name = 'blogs'`;
    if (tables.length > 0) {
      console.log("Blogs table exists.");
      const schema = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'blogs'`;
      console.table(schema);
    } else {
      console.log("Blogs table does not exist. Creating it...");
      await sql`
        CREATE TABLE blogs (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          excerpt TEXT,
          content TEXT,
          img TEXT,
          author TEXT,
          category TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log("Blogs table created.");
    }
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await sql.end();
  }
}

checkBlogsTable();
