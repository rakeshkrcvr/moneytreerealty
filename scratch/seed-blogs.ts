import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

const blogs = [
  {
    title: "Why Noida Extension is the Best Real Estate Investment in 2026",
    cat: "Investment",
    excerpt: "Discover why Greater Noida West (Noida Extension) continues to be the top choice for first-time home buyers and savvy investors.",
    content: "Noida Extension, also known as Greater Noida West, has emerged as one of the most vibrant real estate hubs in India. With excellent connectivity to Delhi, Noida, and Ghaziabad, it offers affordable luxury that is hard to find elsewhere. In 2026, with the completion of major infrastructure projects, property prices are expected to soar...",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "noida-extension-investment-guide-2026"
  },
  {
    title: "Top 5 Luxury Projects in Sector 150, Noida",
    cat: "Luxury Living",
    excerpt: "Sector 150 is the greenest sector of Noida. Explore the most premium residential projects that offer a resort-like lifestyle.",
    content: "Sector 150 is often referred to as the 'Greenest Sector of Noida'. With low-density development and vast open spaces, it has become a magnet for luxury developers. Projects by Tata, Godrej, and ATS are setting new benchmarks in high-end living...",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "top-luxury-projects-sector-150-noida"
  },
  {
    title: "Impact of Noida International Airport on Property Prices",
    cat: "Market News",
    excerpt: "The Jewar Airport is a game-changer for the entire NCR region. Learn how it's impacting real estate in Yamuna Expressway and beyond.",
    content: "The Noida International Airport at Jewar is not just an airport; it's a massive economic engine. From industrial hubs to residential townships, the entire stretch of Yamuna Expressway is witnessing unprecedented growth...",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "noida-airport-impact-property-prices"
  },
  {
    title: "Commercial vs Residential: Where Should You Invest in Noida?",
    cat: "Advisory",
    excerpt: "Struggling to choose between a shop in a mall or a 3BHK apartment? We break down the ROI and risks for both.",
    content: "Noida offers diverse investment opportunities. While residential property provides stability and long-term capital appreciation, commercial real estate in sectors like 62 and 132 offers higher rental yields...",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "commercial-vs-residential-noida-investment"
  },
  {
    title: "A Complete Guide to Living in Noida for New Residents",
    cat: "Lifestyle",
    excerpt: "Moving to Noida? Here's everything you need to know about schools, hospitals, shopping malls, and commute.",
    content: "Noida is one of the best-planned cities in India. From world-class hospitals like Max and Fortis to shopping destinations like DLF Mall of India, the city offers a high quality of life...",
    img: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "noida-living-guide-new-residents"
  },
  {
    title: "The Rise of Studio Apartments in Noida Sector 135",
    cat: "Trends",
    excerpt: "Why young professionals and IT employees are opting for smart studio apartments near corporate hubs.",
    content: "With the presence of major IT parks and SEZs in Sector 135 and 142, the demand for compact living spaces has surged. Studio apartments are now a preferred choice for young professionals working in firms like Genpact and MetLife...",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "studio-apartments-noida-sector-135"
  },
  {
    title: "Eco-Friendly Living: Top Sustainable Projects in Noida",
    cat: "Eco Living",
    excerpt: "Green buildings are the future. Explore projects in Noida that offer rainwater harvesting, solar power, and waste management.",
    content: "Sustainability is no longer a luxury; it's a necessity. Several developers in Noida are now focusing on LEED-certified buildings that reduce the carbon footprint while providing a healthy environment...",
    img: "https://images.unsplash.com/photo-1518005020411-38b8121051aa?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "sustainable-real-estate-noida"
  },
  {
    title: "Noida Expressway: The Lifeline of Real Estate Growth",
    cat: "Infrastructure",
    excerpt: "Connecting Delhi to Greater Noida, this expressway has become the backbone of the city's residential and commercial boom.",
    content: "The Noida-Greater Noida Expressway is more than just a road. It is a corridor of dreams, lined with high-rise apartments, luxury villas, and corporate headquarters...",
    img: "https://images.unsplash.com/photo-1545143333-57ad3b1441ed?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "noida-expressway-real-estate-lifeline"
  },
  {
    title: "Smart Homes in Noida: Embracing Future Technology",
    cat: "Technology",
    excerpt: "From voice-controlled lights to smart security, see how Noida developers are integrating IoT in new projects.",
    content: "The future of living is here. Smart homes in Noida now offer automated climate control, remote security monitoring, and intelligent energy management, making life easier and safer...",
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "smart-homes-noida-trends"
  },
  {
    title: "Investing in Yamuna Expressway: What You Should Know",
    cat: "Investment",
    excerpt: "With the Film City and Medical Device Park coming up, Yamuna Expressway is the next big frontier for real estate.",
    content: "Yamuna Expressway is witnessing a massive transformation. Beyond the airport, projects like the International Film City and various industrial corridors are making it a goldmine for long-term investors...",
    img: "https://images.unsplash.com/photo-1449156003053-c3065067f802?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "yamuna-expressway-investment-2026"
  }
];

async function seedBlogs() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log("Seeding blogs...");
    for (const blog of blogs) {
      await sql`
        INSERT INTO blogs (title, slug, date, img, cat, content, excerpt, author)
        VALUES (${blog.title}, ${blog.slug}, ${new Date().toISOString()}, ${blog.img}, ${blog.cat}, ${blog.content}, ${blog.excerpt}, ${blog.author})
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          img = EXCLUDED.img,
          cat = EXCLUDED.cat,
          content = EXCLUDED.content,
          excerpt = EXCLUDED.excerpt,
          author = EXCLUDED.author
      `;
      console.log(`Seeded: ${blog.title}`);
    }
    console.log("Seeding completed successfully.");
  } catch (e) {
    console.error("Error seeding blogs:", e);
  } finally {
    await sql.end();
  }
}

seedBlogs();
