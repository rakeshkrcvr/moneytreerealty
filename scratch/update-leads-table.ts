import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function updateLeadsTable() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log("Updating leads table...");
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS message TEXT`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS remark TEXT`;
    console.log("Leads table updated.");
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await sql.end();
  }
}

updateLeadsTable();
