import postgres from "postgres";

async function main() {
  const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });
  try {
    await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS page_templates JSONB DEFAULT '{}'::jsonb`;
    console.log("Column added successfully!");
  } catch(e) {
    console.log("Error:", e);
  }
  process.exit(0);
}
main();
