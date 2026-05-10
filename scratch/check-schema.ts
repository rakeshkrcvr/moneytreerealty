import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function checkSchema() {
  const sql = postgres(DATABASE_URL, { ssl: "require" });
  try {
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'properties'
    `;
    console.log(columns);
  } catch (error) {
    console.error(error);
  } finally {
    await sql.end();
  }
}

checkSchema();
