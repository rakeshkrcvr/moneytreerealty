import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is not set");
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { ssl: "require" });

const developers = [
  { name: "DLF Limited", slug: "dlf-limited", logo_url: "https://moneytreerealty.com/assets/img/developer/dlf.png", about: "DLF has over 75 years of track record of sustained growth, customer satisfaction, and innovation." },
  { name: "Godrej Properties", slug: "godrej-properties", logo_url: "https://moneytreerealty.com/assets/img/developer/godrej.png", about: "Godrej Properties brings the Godrej Group philosophy of innovation, sustainability, and excellence to the real estate industry." },
  { name: "M3M Group", slug: "m3m-group", logo_url: "https://moneytreerealty.com/assets/img/developer/m3m.png", about: "M3M Group is a renowned real estate developer with a focus on speed, class, and luxury." },
  { name: "Signature Global", slug: "signature-global", logo_url: "https://moneytreerealty.com/assets/img/developer/signature.png", about: "Signature Global is India's leading real estate development company focused on affordable and mid-segment housing." },
  { name: "Sobha Limited", slug: "sobha-limited", logo_url: "https://moneytreerealty.com/assets/img/developer/sobha.png", about: "Sobha Limited is one of the largest and only backward integrated real estate players in the country." },
  { name: "Elan Group", slug: "elan-group", logo_url: "https://moneytreerealty.com/assets/img/developer/elan.png", about: "Elan Group is one of the fastest-growing real estate developers in India, known for iconic commercial and residential projects." },
  { name: "Shalimar Corp Limited", slug: "shalimar-corp", logo_url: "https://moneytreerealty.com/assets/img/developer/shalimar.png", about: "Shalimar Corp is a leading real estate developer in North India with a focus on luxury and quality." },
  { name: "Prestige Group", slug: "prestige-group", logo_url: "https://moneytreerealty.com/assets/img/developer/prestige.png", about: "Prestige Group is one of the leading real estate developers in India with a diverse portfolio." },
  { name: "Mahindra Lifespaces", slug: "mahindra-lifespaces", logo_url: "https://moneytreerealty.com/assets/img/developer/mahindra.png", about: "Mahindra Lifespaces is the real estate and infrastructure development arm of the Mahindra Group." },
  { name: "Ace Group", slug: "ace-group", logo_url: "https://moneytreerealty.com/assets/img/developer/ace.png", about: "Ace Group is a renowned name in the real estate industry, known for its commitment to quality and delivery." }
];

const propertyTypes = [
  { name: "Residential", slug: "residential", category: "Residential", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" },
  { name: "Commercial", slug: "commercial", category: "Commercial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" },
  { name: "Plot", slug: "plot", category: "Land", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" },
  { name: "Villa", slug: "villa", category: "Residential", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2000" },
  { name: "Office", slug: "office", category: "Commercial", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" }
];

const communities = [
  { title: "Noida", slug: "noida", tag: "Green City", img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&q=80&w=2000", description: "Noida is a planned city in India's northern state of Uttar Pradesh, known for its modern infrastructure and green spaces." },
  { title: "Gurugram", slug: "gurugram", tag: "Millennium City", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000", description: "Gurugram is a major satellite city of Delhi and is part of the National Capital Region of India." },
  { title: "Mumbai", slug: "mumbai", tag: "Dream City", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=2000", description: "Mumbai is a densely populated city on India's west coast and is the financial capital of the country." },
  { title: "Lucknow", slug: "lucknow", tag: "City of Nawabs", img: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&q=80&w=2000", description: "Lucknow is the capital city of the Indian state of Uttar Pradesh and is known for its rich culture and history." }
];

const properties = [
  { title: "Chheda Greens Avighna", slug: "chheda-greens-avighna", location: "Mira road, Mumbai", price: "₹ 66 Lakh*", type: "Residential", category: "Residential", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000", description: "Premium 1, 2 & 2.5 BHK flats in the heart of Mumbai with modern amenities.", developer_name: "Chheda Group" },
  { title: "Shalimar Evara", slug: "shalimar-evara", location: "Faizabad Road, Lucknow", price: "On Request", type: "Residential", category: "Residential", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000", description: "Luxury living with 2 & 3 BHK apartments in Lucknow's prime location.", developer_name: "Shalimar Corp Limited" },
  { title: "Sobha Rivana", slug: "sobha-rivana", location: "Sector 1, Greater Noida West", price: "₹1.80 Cr*", type: "Residential", category: "Residential", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000", description: "Eco-friendly homes with 2, 3 & 4 BHK configurations in Greater Noida West.", developer_name: "Sobha Limited" },
  { title: "Signature Global Cloverdale", slug: "signature-global-cloverdale", location: "Sector 71, Gurugram", price: "₹3.88 Cr*", type: "Residential", category: "Residential", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000", description: "Ultra-luxury 3 & 4 BHK flats with premium finishes and high-end amenities.", developer_name: "Signature Global" },
  { title: "Trehan IRIS Omara", slug: "trehan-iris-omara", location: "Sector 80, Gurugram", price: "On Request", type: "Residential", category: "Residential", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000", description: "Exclusive residential project in Gurugram offering a blend of comfort and style.", developer_name: "Trehan IRIS" },
  { title: "Yatharth Eternia", slug: "yatharth-eternia", location: "Techzone 4, Greater Noida West", price: "₹ 1.72 CR*", type: "Residential", category: "Residential", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000", description: "Modern 3 & 4 BHK apartments designed for the contemporary lifestyle.", developer_name: "Yatharth Group" },
  { title: "Elan The Statement", slug: "elan-the-statement", location: "Sector 49, Gurugram", price: "On Request", type: "Commercial", category: "Commercial", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000", description: "Premium commercial spaces and luxury penthouses in Gurugram's business hub.", developer_name: "Elan Group" },
  { title: "Smartworld Elie Saab", slug: "smartworld-elie-saab", location: "Sector 98, Noida", price: "On Request", type: "Residential", category: "Residential", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2000", description: "Branded luxury residences by Elie Saab in Noida's most prestigious sector.", developer_name: "Smartworld Developers" },
  { title: "DLF The Arbour", slug: "dlf-the-arbour", location: "Sector 63, Gurugram", price: "₹ 7.5 Cr*", type: "Residential", category: "Residential", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000", description: "The next chapter in luxury living by DLF, featuring 4 BHK low-density apartments.", developer_name: "DLF Limited" },
  { title: "M3M Crown", slug: "m3m-crown", location: "Sector 111, Gurugram", price: "₹ 2.5 Cr*", type: "Residential", category: "Residential", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000", description: "A crown jewel of luxury living in Smart City Delhi Airport.", developer_name: "M3M Group" }
];

// Add 40 more property placeholders to reach 50
for (let i = 1; i <= 40; i++) {
  properties.push({
    title: `MoneyTree Luxury Project ${i}`,
    slug: `moneytree-luxury-project-${i}`,
    location: i % 2 === 0 ? "Sector 150, Noida" : "Sector 102, Gurugram",
    price: `From ₹ ${1.5 + (i * 0.1)} Cr`,
    type: i % 3 === 0 ? "Commercial" : "Residential",
    category: i % 3 === 0 ? "Commercial" : "Residential",
    img: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=2000`,
    description: "Experience premium living with world-class amenities and prime location advantages.",
    developer_name: developers[i % developers.length].name
  });
}

const blogs = [
  { title: "The Ultimate Commercial Property Investment Guide Gurgaon", slug: "commercial-property-investment-guide-gurgaon", date: "May 10, 2026", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000", cat: "Investment", content: "Full guide to commercial property in Gurgaon...", excerpt: "Gurgaon’s commercial property market with expert investment tips..." },
  { title: "3 BHK & 4 BHK Flats for Sale in Sector 94 Noida", slug: "3bhk-4bhk-flats-sector-94-noida", date: "May 08, 2026", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000", cat: "Real Estate", content: "Luxury 3 BHK & 4 BHK flats in Noida Sector 94...", excerpt: "Luxury 3 BHK & 4 BHK flats in Noida Sector 94 with premium amenities..." },
  { title: "Luxury Apartments in India", slug: "luxury-apartments-in-india", date: "May 05, 2026", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000", cat: "Lifestyle", content: "Luxury apartments in India with modern amenities...", excerpt: "Luxury apartments in India with modern amenities, prime locations..." },
  { title: "Your Dream Home Awaits in Greater Noida", slug: "dream-home-greater-noida", date: "May 02, 2026", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000", cat: "Real Estate", content: "Find your dream home in Greater Noida...", excerpt: "Find your dream home in Greater Noida with premium flats..." }
];

// Add more blogs
for (let i = 1; i <= 20; i++) {
  blogs.push({
    title: `MoneyTree Real Estate Insight ${i}`,
    slug: `moneytree-real-estate-insight-${i}`,
    date: `May ${15-i}, 2026`,
    img: `https://images.unsplash.com/photo-${1510000000000 + i}?auto=format&fit=crop&q=80&w=2000`,
    cat: i % 2 === 0 ? "Investment" : "News",
    content: "Detailed market analysis and insights for real estate investors...",
    excerpt: "Stay updated with the latest trends and market movements in Indian real estate."
  });
}

async function seed() {
  console.log("🚀 Starting MoneyTree Seeding...");

  try {
    // Drop and recreate tables to ensure clean schema
    console.log("Dropping existing tables...");
    await sql`DROP TABLE IF EXISTS properties CASCADE`;
    await sql`DROP TABLE IF EXISTS developers CASCADE`;
    await sql`DROP TABLE IF EXISTS property_types CASCADE`;
    await sql`DROP TABLE IF EXISTS communities CASCADE`;
    await sql`DROP TABLE IF EXISTS blogs CASCADE`;
    await sql`DROP TABLE IF EXISTS site_settings CASCADE`;
    await sql`DROP TABLE IF EXISTS leads CASCADE`;
    await sql`DROP TABLE IF EXISTS testimonials CASCADE`;
    await sql`DROP TABLE IF EXISTS faqs CASCADE`;

    console.log("Creating tables...");
    await sql`CREATE TABLE developers (id SERIAL PRIMARY KEY, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, logo_url TEXT, about TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    await sql`CREATE TABLE property_types (id SERIAL PRIMARY KEY, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, category TEXT DEFAULT 'Residential', img TEXT)`;
    await sql`CREATE TABLE communities (id SERIAL PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, tag TEXT, description TEXT, img TEXT, highlights TEXT[])`;
    await sql`CREATE TABLE properties (
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
      )`;
    await sql`CREATE TABLE blogs (id SERIAL PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, date TEXT, img TEXT, cat TEXT, content TEXT, excerpt TEXT, author TEXT DEFAULT 'Admin')`;
    await sql`CREATE TABLE site_settings (id SERIAL PRIMARY KEY, logo_url TEXT, logo_url_light TEXT, theme_color TEXT, email TEXT, phone TEXT, whatsapp TEXT, page_templates JSONB DEFAULT '{}', page_content JSONB DEFAULT '{}')`;
    await sql`CREATE TABLE leads (id SERIAL PRIMARY KEY, name TEXT, email TEXT, phone TEXT, property_slug TEXT, message TEXT, remark TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    await sql`CREATE TABLE testimonials (id SERIAL PRIMARY KEY, name TEXT, role TEXT, text TEXT)`;
    await sql`CREATE TABLE faqs (id SERIAL PRIMARY KEY, question TEXT, answer TEXT)`;

    // 1. developers
    console.log("Seeding developers...");
    for (const d of developers) {
      await sql`INSERT INTO developers (name, slug, logo_url, about) VALUES (${d.name}, ${d.slug}, ${d.logo_url}, ${d.about})`;
    }

    // 2. property_types
    console.log("Seeding property_types...");
    for (const pt of propertyTypes) {
      await sql`INSERT INTO property_types (name, slug, category, img) VALUES (${pt.name}, ${pt.slug}, ${pt.category}, ${pt.img})`;
    }

    // 3. communities
    console.log("Seeding communities...");
    for (const c of communities) {
      await sql`INSERT INTO communities (title, slug, tag, description, img) VALUES (${c.title}, ${c.slug}, ${c.tag}, ${c.description}, ${c.img})`;
    }

    // 4. properties
    console.log("Seeding properties...");
    const devs = await sql`SELECT id, name FROM developers`;
    const devMap = Object.fromEntries(devs.map(d => [d.name, d.id]));

    for (const p of properties) {
      const devId = devMap[p.developer_name] || null;
      await sql`
        INSERT INTO properties (
          title, slug, location, price, type, category, img, description, developer_id
        ) VALUES (
          ${p.title}, ${p.slug}, ${p.location}, ${p.price}, 
          ${p.type}, ${p.category}, ${p.img}, ${p.description}, ${devId}
        )
      `;
    }

    // 5. blogs
    console.log("Seeding blogs...");
    for (const b of blogs) {
      await sql`INSERT INTO blogs (title, slug, date, img, cat, content, excerpt) VALUES (${b.title}, ${b.slug}, ${b.date}, ${b.img}, ${b.cat}, ${b.content}, ${b.excerpt})`;
    }

    // 6. site_settings
    console.log("Seeding site_settings...");
    await sql`INSERT INTO site_settings (id, logo_url, theme_color, email, phone, whatsapp) VALUES (1, 'https://moneytreerealty.com/assets/img/logo.png', '#1a365d', 'customercare@moneytreerealty.com', '+91 97323 00007', '+91 97323 00007')`;

    console.log("✅ MoneyTree Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await sql.end();
    process.exit();
  }
}

seed();
