import postgres from "postgres";

async function testConnection(url, name) {
  try {
    const sql = postgres(url, { 
      ssl: "require",
      max: 1,
      prepare: false,
      idle_timeout: 5
    });
    await sql`SELECT 1`;
    console.log(`✅ Connection SUCCESS for ${name}`);
    await sql.end();
  } catch (e) {
    console.error(`❌ Connection FAILED for ${name}:`, e.message);
  }
}

async function run() {
  const envUrl = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  const backupUrl = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

  await testConnection(envUrl, ".env URL");
  await testConnection(backupUrl, "Backup URL");
}

run();
