import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is not set");
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { ssl: "require" });

const amenities = [
  { name: "Gymnasium", icon: "Dumbbell" },
  { name: "Swimming Pool", icon: "Waves" },
  { name: "Power Backup", icon: "Zap" },
  { name: "24x7 Security", icon: "ShieldCheck" },
  { name: "Club House", icon: "Home" },
  { name: "Lift", icon: "ArrowUpCircle" },
  { name: "Intercom", icon: "PhoneCall" },
  { name: "Car Parking", icon: "ParkingCircle" },
  { name: "Visitor Parking", icon: "ParkingSquare" },
  { name: "CCTV", icon: "Camera" },
  { name: "Fire Fighting System", icon: "Flame" },
  { name: "Rain Water Harvesting", icon: "Droplets" },
  { name: "Wi-Fi Connectivity", icon: "Wifi" },
  { name: "Kids Play Area", icon: "ToyBrick" },
  { name: "Jogging Track", icon: "Footprints" },
  { name: "Landscaped Garden", icon: "TreePine" },
  { name: "Maintenance Staff", icon: "Wrench" },
  { name: "Vaastu Compliant", icon: "Map" },
  { name: "Air Conditioned", icon: "AirVent" },
  { name: "Gas Pipeline", icon: "Fuel" },
  { name: "Shopping Center", icon: "ShoppingBag" },
  { name: "Banquet Hall", icon: "Users" },
  { name: "Library", icon: "BookOpen" },
  { name: "Indoor Games", icon: "Puzzle" },
  { name: "Amphitheatre", icon: "Mic" },
  { name: "Sports Facility", icon: "Trophy" },
  { name: "Badminton Court", icon: "Activity" },
  { name: "Tennis Court", icon: "Activity" },
  { name: "Basketball Court", icon: "Activity" },
  { name: "Yoga/Meditation Area", icon: "Flower2" },
  { name: "Sewage Treatment Plant", icon: "Filter" },
  { name: "ATM", icon: "DollarSign" },
  { name: "Cafeteria", icon: "Coffee" },
  { name: "Food Court", icon: "Utensils" },
  { name: "Hospital", icon: "PlusSquare" },
  { name: "School", icon: "GraduationCap" },
  { name: "Pharmacy", icon: "Pill" },
  { name: "Laundry Service", icon: "Shirt" },
  { name: "Salon", icon: "Scissors" },
  { name: "Spa/Sauna", icon: "Bath" },
  { name: "Multi-purpose Room", icon: "LayoutPanelLeft" },
  { name: "Earthquake Resistant", icon: "Shovel" },
  { name: "Concierge Service", icon: "Bell" },
  { name: "Business Center", icon: "Briefcase" },
  { name: "Conference Room", icon: "Presentation" },
  { name: "Solar Water Heating", icon: "Sun" },
  { name: "Piped Gas", icon: "Container" },
  { name: "Servant Quarter", icon: "User" },
  { name: "24x7 Water Supply", icon: "GlassWater" },
  { name: "Waste Disposal", icon: "Trash2" }
];

async function seed() {
  console.log("🚀 Starting Amenities Seeding...");

  try {
    console.log("Cleaning amenities table...");
    await sql`DELETE FROM amenities`;

    console.log("Seeding 50 amenities...");
    for (const a of amenities) {
      await sql`INSERT INTO amenities (name, icon) VALUES (${a.name}, ${a.icon})`;
    }

    console.log("✅ Amenities Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await sql.end();
    process.exit();
  }
}

seed();
