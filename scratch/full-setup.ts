import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is not set");
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { ssl: "require" });

async function setup() {
  console.log("🚀 Starting full database setup...");

  try {
    // 1. developers
    console.log("Creating developers table...");
    await sql`
      CREATE TABLE IF NOT EXISTS developers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        logo_url TEXT,
        about TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 2. properties
    console.log("Creating properties table...");
    await sql`
      CREATE TABLE IF NOT EXISTS properties (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        location TEXT,
        price TEXT,
        type TEXT,
        category TEXT DEFAULT 'Residential',
        img TEXT,
        description TEXT,
        status TEXT DEFAULT 'Sale',
        gallery JSONB DEFAULT '[]',
        video_url TEXT,
        bedrooms INTEGER DEFAULT 0,
        bathrooms INTEGER DEFAULT 0,
        area TEXT,
        floor_number TEXT,
        furnishing TEXT DEFAULT 'Unfurnished',
        amenities_ids INTEGER[] DEFAULT '{}',
        map_location TEXT,
        nearby_places JSONB DEFAULT '[]',
        agent_name TEXT,
        agent_phone TEXT,
        agent_image TEXT,
        floor_plan_img TEXT,
        floor_plans JSONB DEFAULT '[]',
        developer_id INTEGER REFERENCES developers(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 3. property_types
    console.log("Creating property_types table...");
    await sql`
      CREATE TABLE IF NOT EXISTS property_types (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT DEFAULT 'Residential',
        img TEXT
      )
    `;

    // 4. site_settings
    console.log("Creating site_settings table...");
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        logo_url TEXT,
        logo_url_light TEXT,
        theme_color TEXT,
        email TEXT,
        phone TEXT,
        whatsapp TEXT,
        page_templates JSONB DEFAULT '{}',
        page_content JSONB DEFAULT '{}'
      )
    `;

    // Insert default site settings if empty
    const settings = await sql`SELECT * FROM site_settings WHERE id = 1`;
    if (settings.length === 0) {
      console.log("Inserting default site settings...");
      await sql`
        INSERT INTO site_settings (id, logo_url, theme_color, email, phone, whatsapp)
        VALUES (1, 'https://via.placeholder.com/150', '#000000', 'info@example.com', '+91 1234567890', '+91 1234567890')
      `;
    }

    // 5. amenities
    console.log("Creating amenities table...");
    await sql`
      CREATE TABLE IF NOT EXISTS amenities (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT
      )
    `;

    // 6. leads
    console.log("Creating leads table...");
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        phone TEXT,
        property_slug TEXT,
        message TEXT,
        remark TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 7. communities
    console.log("Creating communities table...");
    await sql`
      CREATE TABLE IF NOT EXISTS communities (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        tag TEXT,
        description TEXT,
        img TEXT,
        highlights TEXT[]
      )
    `;

    // 8. blogs
    console.log("Creating blogs table...");
    await sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        date TEXT,
        img TEXT,
        cat TEXT,
        content TEXT,
        excerpt TEXT,
        author TEXT DEFAULT 'Admin'
      )
    `;

    // 9. testimonials
    console.log("Creating testimonials table...");
    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT,
        role TEXT,
        text TEXT
      )
    `;

    // 10. faqs
    console.log("Creating faqs table...");
    await sql`
      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT,
        answer TEXT
      )
    `;

    console.log("✅ Full database setup completed successfully!");
  } catch (error) {
    console.error("❌ Setup failed:", error);
  } finally {
    await sql.end();
    process.exit();
  }
}

setup();
