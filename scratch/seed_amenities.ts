import postgres from "postgres";

const dbUrl = process.argv[2];
const sql = postgres(dbUrl, { ssl: "require" });

async function seedAmenities() {
  console.log("Seeding 50 amenities...");
  
  const amenityList = [
    "Infinity Pool", "Luxury Gym", "24/7 Security", "Valet Parking", "CCTV Cameras",
    "Children Play Area", "Lush Green Park", "Private Balcony", "Smart Home System",
    "Yoga Studio", "Cigar Lounge", "Sky Garden", "Concierge Service", "Library",
    "Movie Theater", "Games Room", "Steam Room", "Sauna", "Spa & Wellness",
    "Barbecue Area", "Tennis Court", "Padel Court", "Basketball Court", "Jogging Track",
    "Cycling Track", "Pet Park", "Nursery", "Business Center", "Meeting Rooms",
    "Roof Top Lounge", "Outdoor Cinema", "Zen Garden", "Water Features", "Fire Pit",
    "Wine Cellar", "Golf Simulator", "Kids Splash Pad", "Retail Outlets", "Cafeterias",
    "Fine Dining", "Supermarket", "Pharmacy", "Clinic", "Covered Parking",
    "Electric Car Charging", "Guest Suites", "Housekeeping", "Laundry Service",
    "High-speed Elevators", "Grand Lobby"
  ];

  try {
    for (const name of amenityList) {
      await sql`
        INSERT INTO amenities (name, icon) 
        VALUES (${name}, 'Check')
        ON CONFLICT (name) DO NOTHING
      `;
    }
    const count = await sql`SELECT count(*) FROM amenities`;
    console.log(`Success! Total amenities in master table: ${count[0].count}`);
  } catch (e) {
    console.error("Failed:", e);
  } finally {
    process.exit();
  }
}

seedAmenities();
