import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

const developers = [
  { name: "ATS Infrastructure Ltd.", about: "ATS is known for its high-quality construction and green landscapes." },
  { name: "Godrej Properties", about: "Godrej Properties brings the Godrej Group philosophy of innovation, sustainability, and excellence to the real estate industry." },
  { name: "Mahagun Group", about: "Mahagun is a conglomerate of companies operating in real estate, commercial and hospitality sectors." },
  { name: "ACE Group", about: "ACE is a leading real estate developer known for its modern and luxury residential projects." },
  { name: "Supertech Limited", about: "Supertech is one of India's leading real estate developers with projects in residential, commercial and retail sectors." },
  { name: "Eldeco Group", about: "Eldeco Group has been at the forefront of Real Estate development in North India since 1985." },
  { name: "Gaursons India Limited", about: "Gaursons (Gaur Group) is a well-known name in the Indian real estate market, specifically in the NCR region." },
  { name: "Jaypee Greens", about: "Jaypee Greens is a premium brand of Jaypee Group, known for its vast golf-centric townships." },
  { name: "ABA Corp", about: "ABA Corp is known for its iconic theme-based luxury projects like Cleo County." },
  { name: "Amrapali Group", about: "Amrapali Group is a prominent real estate company in Noida." },
  { name: "M3M India", about: "M3M is known for its high-end luxury residential and commercial projects in Gurgaon and Noida." },
  { name: "Tata Housing", about: "Tata Housing is a trusted name in real estate, part of the TATA Group." },
  { name: "Prestige Group", about: "Prestige Group is one of India's leading real estate developers with a diverse portfolio." },
  { name: "Bhutani Infra", about: "Bhutani Infra is a leading commercial developer in Noida, known for tech-driven offices." },
  { name: "Experion Developers", about: "Experion is a 100% FDI funded real estate developer." },
  { name: "Prateek Group", about: "Prateek Group is a growing real estate developer in Noida." },
  { name: "Logix Group", about: "Logix Group is a prominent developer in Noida with IT parks and residential projects." }
];

async function seedDevelopers() {
  const sql = postgres(DATABASE_URL, { ssl: "require" });

  try {
    console.log("Seeding developers and linking properties...");

    for (const dev of developers) {
      const slug = dev.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const logo_url = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(dev.name)}&backgroundColor=004aad`;

      // Insert developer
      const [newDev] = await sql`
        INSERT INTO developers (name, slug, logo_url, about)
        VALUES (${dev.name}, ${slug}, ${logo_url}, ${dev.about})
        ON CONFLICT (slug) DO UPDATE SET name = ${dev.name}, about = ${dev.about}
        RETURNING id
      `;

      // Link properties that start with this developer name (e.g. "ATS Sky Heights")
      // Use the first word or prefix to match
      const prefix = dev.name.split(' ')[0];
      await sql`
        UPDATE properties SET developer_id = ${newDev.id}
        WHERE title ILIKE ${prefix + '%'}
      `;
      console.log(`Linked properties for ${dev.name}`);
    }

    console.log("Developer seeding and linking completed!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await sql.end();
  }
}

seedDevelopers();
