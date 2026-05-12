import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL environment variable is not set");
  process.exit(1);
}

const sql = postgres(connectionString, { ssl: "require" });

async function init() {
  console.log("Seeding database with REAL MoneyTree Realty.com data...");

  // Create tables
  await sql`CREATE TABLE IF NOT EXISTS communities (slug TEXT PRIMARY KEY, title TEXT, tag TEXT, img TEXT, description TEXT, highlights TEXT[])`;
  // Create tables
  await sql`CREATE TABLE IF NOT EXISTS communities (slug TEXT PRIMARY KEY, title TEXT, tag TEXT, img TEXT, description TEXT, highlights TEXT[])`;
  await sql`CREATE TABLE IF NOT EXISTS properties (
    slug TEXT PRIMARY KEY, 
    title TEXT, 
    location TEXT, 
    price TEXT, 
    type TEXT, 
    img TEXT, 
    description TEXT, 
    bedrooms TEXT, 
    handover TEXT,
    category TEXT DEFAULT 'Residential',
    status TEXT DEFAULT 'Sale',
    gallery JSONB DEFAULT '[]',
    video_url TEXT DEFAULT '',
    bathrooms INTEGER DEFAULT 0,
    area TEXT DEFAULT '',
    floor_number TEXT DEFAULT '',
    furnishing TEXT DEFAULT 'Unfurnished',
    amenities_ids TEXT[] DEFAULT '{}',
    map_location TEXT DEFAULT '',
    nearby_places JSONB DEFAULT '[]',
    agent_name TEXT DEFAULT '',
    agent_phone TEXT DEFAULT '',
    agent_image TEXT DEFAULT '',
    floor_plan_img TEXT DEFAULT '',
    floor_plans JSONB DEFAULT '[]',
    developer_id INTEGER
  )`;
  await sql`CREATE TABLE IF NOT EXISTS completed (slug TEXT PRIMARY KEY, title TEXT, location TEXT, year TEXT, img TEXT, description TEXT)`;

  const communities = [
    { 
      slug: "lucknow", 
      title: "Lucknow", 
      tag: "CITY OF NAWABS", 
      img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=2000", 
      description: "Lucknow, the city of Nawabs, is a blend of heritage and modern development, offering premium residential and commercial opportunities.", 
      highlights: ["Heritage Architecture", "Booming IT Sector", "Luxury Living", "Connectivity"] 
    },
    { 
      slug: "mumbai", 
      title: "Mumbai", 
      tag: "DREAM CITY", 
      img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=2000", 
      description: "The financial capital of India, Mumbai offers the most exclusive and high-end real estate in the country.", 
      highlights: ["Financial Hub", "Marine Drive", "Premium Seafront", "Iconic Skyline"] 
    },
    { 
      slug: "gurugram", 
      title: "Gurugram", 
      tag: "MILLENNIUM CITY", 
      img: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=2000", 
      description: "Gurugram is the millennium city of India, a global hub for business and luxury residential developments.", 
      highlights: ["Corporate Hub", "Golf Course Road", "Cyber Hub", "Premium Gated Communities"] 
    },
    { 
      slug: "noida", 
      title: "Noida", 
      tag: "GREEN CITY", 
      img: "https://images.unsplash.com/photo-1588417631561-268393910c66?auto=format&fit=crop&q=80&w=2000", 
      description: "Noida is one of the fastest-growing cities in India, known for its infrastructure, green spaces, and high-ROI real estate.", 
      highlights: ["Planned Infrastructure", "Expressways", "Commercial Hub", "Metro Connectivity"] 
    },
    { 
      slug: "pune", 
      title: "Pune", 
      tag: "OXFORD OF EAST", 
      img: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?auto=format&fit=crop&q=80&w=2000", 
      description: "Pune is the cultural and educational capital of Maharashtra, offering a serene yet modern lifestyle.", 
      highlights: ["Educational Hub", "IT Parks", "Pleasant Climate", "Quality Living"] 
    },
    { 
      slug: "ghaziabad", 
      title: "Ghaziabad", 
      tag: "GATEWAY TO UP", 
      img: "https://images.unsplash.com/photo-1623101170068-0720a4449842?auto=format&fit=crop&q=80&w=2000", 
      description: "Ghaziabad is the gateway to Uttar Pradesh, offering affordable luxury and excellent connectivity to Delhi.", 
      highlights: ["Connectivity", "Residential Hub", "Commercial Growth", "Infrastructure"] 
    }
  ];

  const projects = [
    { 
      slug: "signature-global", 
      title: "Signature Global City", 
      location: "Gurugram", 
      price: "From ₹ 1.2 Cr*", 
      type: "Apartments", 
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000", 
      description: "Experience luxury living in the heart of Gurugram with Signature Global.", 
      bedrooms: "2 & 3 BHK", 
      handover: "2026",
      agent_name: "Amit Kumar",
      agent_phone: "+91 98765 43210"
    },
    { 
      slug: "m3m-the-line", 
      title: "M3M The Line", 
      location: "Noida", 
      price: "From ₹ 2.5 Cr*", 
      type: "Commercial", 
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000", 
      description: "The ultimate commercial destination in Noida.", 
      bedrooms: "Studio & Retail", 
      handover: "2027",
      agent_name: "Sonia Verma",
      agent_phone: "+91 87654 32109"
    },
    { 
      slug: "dlf-privana", 
      title: "DLF Privana", 
      location: "Gurugram", 
      price: "From ₹ 4.0 Cr*", 
      type: "Luxury Floors", 
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000", 
      description: "Ultra-luxury living by DLF in the heart of Gurugram.", 
      bedrooms: "4 BHK", 
      handover: "Ready",
      agent_name: "Rahul Sharma",
      agent_phone: "+91 76543 21098"
    }
  ];

  // Seed Communities
  for (const c of communities) {
    await sql`
      INSERT INTO communities ${sql(c)}
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        tag = EXCLUDED.tag,
        img = EXCLUDED.img,
        description = EXCLUDED.description,
        highlights = EXCLUDED.highlights
    `;
  }

  // Seed Properties
  for (const p of projects) {
    await sql`
      INSERT INTO properties ${sql(p)}
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        location = EXCLUDED.location,
        price = EXCLUDED.price,
        type = EXCLUDED.type,
        img = EXCLUDED.img,
        description = EXCLUDED.description,
        bedrooms = EXCLUDED.bedrooms,
        handover = EXCLUDED.handover,
        agent_name = EXCLUDED.agent_name,
        agent_phone = EXCLUDED.agent_phone
    `;
  }

  console.log("Real MoneyTree Realty data seeded successfully!");
  process.exit(0);
}

init().catch(err => { console.error(err); process.exit(1); });
