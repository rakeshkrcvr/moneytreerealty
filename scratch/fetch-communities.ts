import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function fetchCommunities() {
  const sql = postgres(DATABASE_URL);
  try {
    const comms = await sql`SELECT * FROM communities LIMIT 5`;
    console.table(comms);
  } catch (e) {
    console.error(e);
  } finally {
    await sql.end();
  }
}

fetchCommunities();
