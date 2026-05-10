import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function migrate() {
  const sql = postgres(DATABASE_URL, { ssl: "require" });

  console.log("Starting DB migration to Golden Door Realty...");

  try {
    // 1. Update site_settings
    await sql`UPDATE site_settings SET 
      email = 'info@goldendoorrealty.com',
      phone = '+91 98765 43210',
      whatsapp = '+91 98765 43210'
      WHERE id = 1`;
    console.log("Updated site_settings");

    // 2. Update currency in properties
    await sql`UPDATE properties SET price = REPLACE(price, 'AED', '₹')`;
    console.log("Updated prices in properties");

    // 3. Update Emaar mentions in properties
    await sql`UPDATE properties SET 
      title = REPLACE(title, 'Emaar', 'Golden Door Realty'),
      location = REPLACE(location, 'Emaar', 'Golden Door Realty'),
      description = REPLACE(description, 'Emaar', 'Golden Door Realty')`;
    console.log("Updated Emaar mentions in properties");

    // 4. Update Emaar mentions in communities
    await sql`UPDATE communities SET 
      title = REPLACE(title, 'Emaar', 'Golden Door Realty'),
      description = REPLACE(description, 'Emaar', 'Golden Door Realty')`;
    console.log("Updated Emaar mentions in communities");

    // 5. Update property_types
    await sql`UPDATE property_types SET name = REPLACE(name, 'Emaar', 'Golden Door Realty')`;
    console.log("Updated property_types");

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await sql.end();
  }
}

migrate();
