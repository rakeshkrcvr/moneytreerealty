import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

const propertyNames = [
  "ATS Sky Heights", "ATS Imperial Residency", "ATS Elite Towers", "ATS Green Valley", "ATS Platinum Homes", "ATS Royal Enclave", "ATS Signature Residency", "ATS Urban Heights", "ATS Crown Avenue", "ATS Infinity Towers",
  "Godrej Emerald Greens", "Godrej Riverfront Residences", "Godrej Prime Heights", "Godrej Sky Villas", "Godrej Elite Avenue", "Godrej Serenity Homes", "Godrej Urban Park", "Godrej Palm Retreat", "Godrej Harmony Towers", "Godrej Imperial Court",
  "Mahagun Modern Heights", "Mahagun Crystal Homes", "Mahagun Grand Residency", "Mahagun Urban Nest", "Mahagun Elite Homes", "Mahagun Golden Avenue", "Mahagun Sky Residency", "Mahagun Royal Heights", "Mahagun Green Meadows", "Mahagun Signature Towers",
  "ACE Platinum Towers", "ACE Skyline Residency", "ACE Urban Homes", "ACE Royal Estate", "ACE Green Valley", "ACE Infinity Heights", "ACE Crystal Homes", "ACE Signature Residency", "ACE Elite Enclave", "ACE Grand Towers",
  "Supertech Eco Village", "Supertech Sky Heights", "Supertech Green Residency", "Supertech Crown Villas", "Supertech Infinity Towers", "Supertech Imperial Homes", "Supertech Urban Square", "Supertech Signature Heights", "Supertech Luxury Enclave", "Supertech Riverfront Homes",
  "Eldeco Green Meadows", "Eldeco Imperial Residency", "Eldeco Sky Towers", "Eldeco Urban Estate", "Eldeco Elite Villas", "Eldeco Crown Heights", "Eldeco Palm Residency", "Eldeco Signature Homes", "Eldeco Infinity Park", "Eldeco Royal Enclave",
  "Gaursons Smart City", "Gaursons Elite Residency", "Gaursons Sky Heights", "Gaursons Green Valley", "Gaursons Urban Homes", "Gaursons Royal Towers", "Gaursons Platinum Residency", "Gaursons Imperial Heights", "Gaursons Signature Villas", "Gaursons Infinity Homes",
  "Jaypee Greens Royal Residency", "Jaypee Greens Golf Estate", "Jaypee Greens Sky Villas", "Jaypee Greens Palm Retreat", "Jaypee Greens Imperial Towers", "Jaypee Greens Harmony Homes", "Jaypee Greens Urban Square", "Jaypee Greens Elite Residency", "Jaypee Greens Crown Heights", "Jaypee Greens Grand Avenue",
  "ABA Ivy Heights", "ABA Crystal Residency", "ABA Urban Nest", "ABA Royal Heights", "ABA Elite Towers", "ABA Signature Villas", "ABA Infinity Homes", "ABA Platinum Residency", "ABA Green Valley", "ABA Crown Estate",
  "Amrapali Dream Valley", "Amrapali Royal Heights", "Amrapali Sky Residency", "Amrapali Green Meadows", "Amrapali Elite Towers", "Amrapali Imperial Homes", "Amrapali Infinity Park", "Amrapali Signature Villas", "Amrapali Urban Residency", "Amrapali Crown Avenue",
  "M3M Capital Heights", "M3M Crown Residency", "M3M Sky City", "M3M Imperial Towers", "M3M Elite Homes", "M3M Urban Greens", "M3M Royal Estate", "M3M Signature Heights", "M3M Infinity Villas", "M3M Grand Residency",
  "Tata New Haven", "Tata Urban Residency", "Tata Sky Heights", "Tata Green Meadows", "Tata Elite Villas", "Tata Imperial Towers", "Tata Signature Homes", "Tata Infinity Residency", "Tata Royal Estate", "Tata Crown Heights",
  "Prestige City Towers", "Prestige Green Valley", "Prestige Elite Homes", "Prestige Royal Residency", "Prestige Sky Heights", "Prestige Imperial Estate", "Prestige Signature Villas", "Prestige Infinity Towers", "Prestige Urban Nest", "Prestige Crown Residency",
  "Bhutani Smart World", "Bhutani Tech Heights", "Bhutani Business Bay", "Bhutani Infinity Square", "Bhutani Sky Towers", "Bhutani Royal Avenue", "Bhutani Urban Plaza", "Bhutani Crown Residency", "Bhutani Signature Estate", "Bhutani Elite Square",
  "Experion Windchants Heights", "Experion Elite Residency", "Experion Urban Homes", "Experion Green Meadows", "Experion Sky Towers",
  "Prateek Grand City", "Prateek Royal Residency",
  "Logix Blossom Heights", "Logix Urban Square", "Logix Crown Residency",
  "ATS Zenith Towers", "ATS Aura Residency", "ATS Urban Crest", "ATS Blue Horizon", "ATS Nova Heights", "ATS Prime Residency", "ATS Vista Homes", "ATS Parkview Residency", "ATS Grande Towers", "ATS Metro Heights",
  "Godrej Horizon Greens", "Godrej Nova Residences", "Godrej Skyline Towers", "Godrej Elite Park", "Godrej Grand Vista", "Godrej Urban Crest", "Godrej River Heights", "Godrej Platinum Greens", "Godrej Prime Vista", "Godrej Aura Residency",
  "Mahagun Horizon Homes", "Mahagun Aura Heights", "Mahagun Prime Towers", "Mahagun Park Residency", "Mahagun Vista Enclave", "Mahagun Nova Homes", "Mahagun Skyline Towers", "Mahagun Urban Crest", "Mahagun Elite Vista", "Mahagun Metro Residency",
  "ACE Horizon Towers", "ACE Aura Residency", "ACE Nova Heights", "ACE Metro Homes", "ACE Prime Enclave", "ACE Skyline Villas", "ACE Urban Vista", "ACE Grand Horizon", "ACE Elite Park", "ACE Blue Ridge Homes",
  "Supertech Nova Residency", "Supertech Metro Heights", "Supertech Urban Vista", "Supertech Parkview Homes", "Supertech Aura Towers", "Supertech Prime Heights", "Supertech Horizon Estate", "Supertech Elite Park", "Supertech Skyline Homes", "Supertech Grand Crest",
  "Eldeco Horizon Greens", "Eldeco Metro Residency", "Eldeco Urban Crest", "Eldeco Prime Heights", "Eldeco Nova Villas", "Eldeco Aura Homes", "Eldeco Skyline Park", "Eldeco Elite Towers", "Eldeco Vista Residency", "Eldeco Grand Horizon",
  "Gaursons Horizon City", "Gaursons Nova Residency", "Gaursons Prime Homes", "Gaursons Metro Heights", "Gaursons Skyline Villas", "Gaursons Aura Residency", "Gaursons Elite Crest", "Gaursons Urban Vista", "Gaursons Parkview Homes", "Gaursons Grand Avenue",
  "Jaypee Greens Skyline Estate", "Jaypee Greens Nova Villas", "Jaypee Greens Horizon Homes", "Jaypee Greens Prime Residency", "Jaypee Greens Aura Heights", "Jaypee Greens Elite Crest", "Jaypee Greens Urban Vista", "Jaypee Greens Grand Towers", "Jaypee Greens Metro Heights", "Jaypee Greens Parkview Estate",
  "ABA Nova Heights", "ABA Horizon Residency", "ABA Metro Homes", "ABA Prime Towers", "ABA Skyline Villas", "ABA Elite Crest", "ABA Urban Vista", "ABA Grand Horizon", "ABA Parkview Residency", "ABA Blue Ridge Homes",
  "Amrapali Horizon City", "Amrapali Nova Towers", "Amrapali Metro Residency", "Amrapali Prime Villas", "Amrapali Skyline Heights", "Amrapali Aura Homes", "Amrapali Elite Crest", "Amrapali Urban Vista", "Amrapali Grand Avenue", "Amrapali Parkview Homes"
];

const noidaLocations = [
  "Sector 150, Noida", "Sector 128, Noida", "Sector 94, Noida", "Greater Noida West",
  "Sector 140A, Noida", "Sector 78, Noida", "Sector 121, Noida", "Sector 43, Noida",
  "Sector 137, Noida", "Sector 62, Noida", "Sector 107, Noida", "Sector 110, Noida",
  "Sector 129, Noida", "Sector 76, Noida", "Sector 75, Noida", "Sector 45, Noida"
];

async function updateProperties() {
  const sql = postgres(DATABASE_URL, { ssl: "require" });

  console.log(`Starting bulk update for ${propertyNames.length} properties...`);

  try {
    // 1. Clear existing
    await sql`DELETE FROM properties`;
    console.log("Cleared existing properties.");

    // 2. Insert in batches of 50 to avoid timeout/payload issues
    const batchSize = 50;
    for (let i = 0; i < propertyNames.length; i += batchSize) {
      const batch = propertyNames.slice(i, i + batchSize);
      
      const values = batch.map((title, index) => {
        const globalIdx = i + index;
        const location = noidaLocations[globalIdx % noidaLocations.length];
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const price = `₹ ${(0.8 + (globalIdx % 10) * 0.4).toFixed(2)} Cr onwards`;
        const type = title.includes('Villa') ? 'Villas' : (title.includes('Residency') || title.includes('Heights') || title.includes('Homes') ? 'Apartments' : 'Apartments');
        
        return {
          title,
          slug,
          location,
          price,
          type,
          category: 'Residential',
          img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000',
          description: `Discover ${title} at ${location}. A premium residential project offering luxury living with world-class amenities.`,
          status: 'Sale',
          bedrooms: 2 + (globalIdx % 3),
          bathrooms: 2 + (globalIdx % 2),
          area: `${1100 + (globalIdx % 15) * 150} sq ft`
        };
      });

      for (const v of values) {
        await sql`INSERT INTO properties (
          title, slug, location, price, type, category, img, description, status, area, bedrooms, bathrooms
        ) VALUES (
          ${v.title}, ${v.slug}, ${v.location}, ${v.price}, ${v.type}, ${v.category}, ${v.img}, ${v.description}, ${v.status}, ${v.area}, ${v.bedrooms}, ${v.bathrooms}
        )`;
      }
      console.log(`Inserted batch ${Math.floor(i/batchSize) + 1}`);
    }

    console.log("Bulk update successful!");
  } catch (error) {
    console.error("Update failed:", error);
  } finally {
    await sql.end();
  }
}

updateProperties();
