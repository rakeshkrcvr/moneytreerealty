import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function checkCommunitiesSchema() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log("Communities table schema:");
    const schema = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'communities'
    `;
    console.table(schema);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await sql.end();
  }
}

checkCommunitiesSchema();
