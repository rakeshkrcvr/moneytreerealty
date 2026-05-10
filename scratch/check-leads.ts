import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function checkLeads() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log("Checking leads table...");
    const leads = await sql`SELECT * FROM leads`;
    console.log(`Found ${leads.length} leads.`);
    if (leads.length > 0) {
      console.table(leads);
    } else {
      console.log("Inserting a test lead...");
      await sql`INSERT INTO leads (name, email, phone, property_slug) VALUES ('Test User', 'test@example.com', '1234567890', 'Test Property')`;
      console.log("Test lead inserted.");
    }
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await sql.end();
  }
}

checkLeads();
