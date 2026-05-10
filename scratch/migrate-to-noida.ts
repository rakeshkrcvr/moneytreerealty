import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

const developers = [
  "ATS Infrastructure Ltd.", "Godrej Properties", "Mahagun Group", "ACE Group",
  "Supertech Limited", "Eldeco Group", "Gaursons India Limited", "Jaypee Greens",
  "ABA Corp", "Amrapali Group", "M3M India", "Tata Housing", "Prestige Group",
  "Bhutani Infra", "Experion Developers", "Prateek Group", "Logix Group"
];

const noidaLocations = [
  "Sector 150, Noida", "Sector 128, Noida", "Sector 94, Noida", "Greater Noida West",
  "Sector 140A, Noida", "Sector 78, Noida", "Sector 121, Noida", "Sector 43, Noida",
  "Sector 137, Noida", "Sector 62, Noida"
];

async function migrateToNoida() {
  const sql = postgres(DATABASE_URL, { ssl: "require" });

  console.log("Updating properties and communities to Noida...");

  try {
    // 1. Properties
    await sql`DELETE FROM properties`;
    for (let i = 0; i < developers.length; i++) {
      const dev = developers[i];
      const location = noidaLocations[i % noidaLocations.length];
      const title = `${dev} - Premium Project ${i + 1}`;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const price = `₹ ${(1.5 + (i * 0.5)).toFixed(1)} Cr onwards`;

      await sql`INSERT INTO properties (
        title, slug, location, price, type, category, img, description, status, area, bedrooms, bathrooms
      ) VALUES (
        ${title}, ${slug}, ${location}, ${price}, 'Apartments', 'Residential', 
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000',
        ${`Experience luxury living with ${dev} at ${location}. This project offers premium amenities and prime connectivity in Noida.`},
        'Sale', '1200 sq ft', ${2 + (i % 3)}, ${2 + (i % 2)}
      )`;
    }
    console.log(`Inserted ${developers.length} properties.`);

    // 2. Communities
    await sql`DELETE FROM communities`;
    const communities = [
      { title: "Sector 150", slug: "sector-150-noida", tag: "Greenest Sector", desc: "The sports city of Noida with 80% green cover." },
      { title: "Greater Noida West", slug: "greater-noida-west", tag: "Affordable Luxury", desc: "Most popular residential hub with great connectivity." },
      { title: "Sector 128", slug: "sector-128-noida", tag: "Premium Living", desc: "Home to Jaypee Wish Town and luxury golf courses." },
      { title: "Sector 140A", slug: "sector-140a-noida", tag: "IT Hub", desc: "The upcoming commercial and IT destination." }
    ];

    for (const c of communities) {
      await sql`INSERT INTO communities (title, slug, tag, description, img) VALUES (
        ${c.title}, ${c.slug}, ${c.tag}, ${c.desc},
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80'
      )`;
    }
    console.log("Updated communities.");

    console.log("Noida migration successful!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await sql.end();
  }
}

migrateToNoida();
