import postgres from "postgres";

const dbUrl = process.argv[2];
const sql = postgres(dbUrl, { ssl: "require" });

async function updatePropertyTypes() {
  console.log("Adding new categories to property_types...");
  try {
    const newTypes = [
      { name: "New Launches", slug: "new-launches" },
      { name: "Communities", slug: "communities" },
      { name: "Completed Projects", slug: "completed-projects" }
    ];

    for (const t of newTypes) {
      await sql`
        INSERT INTO property_types (name, slug) 
        VALUES (${t.name}, ${t.slug})
        ON CONFLICT (name) DO NOTHING
      `;
    }

    const all = await sql`SELECT * FROM property_types`;
    console.log("Updated Property Types:", all.map(x => x.name));
  } catch (e) {
    console.error("Update failed:", e);
  } finally {
    process.exit();
  }
}

updatePropertyTypes();
