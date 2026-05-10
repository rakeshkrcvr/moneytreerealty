import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function migrateSlugs() {
  const sql = postgres(DATABASE_URL, { ssl: "require" });

  console.log("Renaming 'emaar' slugs to 'golden-door' in DB...");

  try {
    // Update property slugs
    await sql`UPDATE properties SET slug = REPLACE(slug, 'emaar', 'golden-door') WHERE slug LIKE '%emaar%'`;
    console.log("Updated property slugs");

    // Update community slugs
    await sql`UPDATE communities SET slug = REPLACE(slug, 'emaar', 'golden-door') WHERE slug LIKE '%emaar%'`;
    console.log("Updated community slugs");

    // Update property_types slugs
    await sql`UPDATE property_types SET slug = REPLACE(slug, 'emaar', 'golden-door') WHERE slug LIKE '%emaar%'`;
    console.log("Updated property_type slugs");

    console.log("Slug migration completed!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await sql.end();
  }
}

migrateSlugs();
