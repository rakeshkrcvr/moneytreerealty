import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function fetchLeads() {
  const sql = postgres(DATABASE_URL);
  try {
    const leads = await sql`SELECT * FROM leads ORDER BY id DESC`;
    console.log(`Leads found: ${leads.length}`);
    console.table(leads);
  } catch (e) {
    console.error(e);
  } finally {
    await sql.end();
  }
}

fetchLeads();
