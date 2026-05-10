import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!);

async function check() {
  try {
    const res = await sql`SELECT * FROM communities`;
    console.log('COMMUNITIES_COUNT:', res.length);
    console.log('DATA:', JSON.stringify(res, null, 2));
  } catch (e) {
    console.error('ERROR:', e);
  } finally {
    await sql.end();
  }
}

check();
