
import postgres from 'postgres';
const url = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function check() {
  const sql = postgres(url, { ssl: 'require' });
  try {
    const rows = await sql`SELECT slug FROM properties LIMIT 20`;
    console.log('SLUGS:', rows.map(r => r.slug));
  } catch (e) {
    console.error('ERROR:', e);
  } finally {
    await sql.end();
  }
}
check();
