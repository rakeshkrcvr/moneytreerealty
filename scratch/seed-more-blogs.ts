import postgres from "postgres";

const DATABASE_URL = "postgresql://neondb_owner:npg_3nqjkzrFX8vN@ep-raspy-smoke-ap7s3j49-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

const blogs = [
  {
    title: "Greater Noida West Metro Expansion: A Boon for Homeowners",
    cat: "Infrastructure",
    excerpt: "The extension of the Aqua Line to Noida Extension is set to transform the daily commute for thousands.",
    content: "The upcoming metro connectivity to Greater Noida West is one of the most awaited infrastructure developments. It will not only reduce travel time but also lead to a significant appreciation in property values in nearby sectors like 1, 4, and 16...",
    img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "greater-noida-west-metro-expansion"
  },
  {
    title: "Noida: The New Data Center Capital of India",
    cat: "Industrial",
    excerpt: "Learn why global giants like Google and Microsoft are choosing Noida for their massive data centers.",
    content: "Noida is rapidly transforming into a data center hub. With government incentives and robust power infrastructure, sectors like 132 and 144 are attracting billion-dollar investments, creating new job opportunities and boosting local economy...",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "noida-data-center-capital"
  },
  {
    title: "Ready-to-Move-In vs Under-Construction: Choosing Your Noida Home",
    cat: "Buyer Guide",
    excerpt: "Immediate possession or higher appreciation? We compare the pros and cons for current market conditions.",
    content: "In the current Noida real estate market, buyers are often torn between the security of a ready-to-move-in flat and the lower entry price of an under-construction project. While ready homes offer peace of mind, under-construction ones provide better payment plans...",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "ready-to-move-vs-under-construction-noida"
  },
  {
    title: "Sector 128: The Ultimate Golf-Facing Luxury Lifestyle",
    cat: "Luxury",
    excerpt: "Explore the serene and exclusive life at Jaypee Greens, Sector 128, where luxury meets nature.",
    content: "Sector 128 is synonymous with elite living in Noida. Home to sprawling golf courses and premium townships, it offers a lifestyle that is unmatched in terms of serenity and exclusivity...",
    img: "https://images.unsplash.com/photo-1534854638093-baf1091cf29e?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "sector-128-noida-golf-living"
  },
  {
    title: "Noida's IT Corridor: Why Global Firms are Flocking to Sector 144",
    cat: "Commercial",
    excerpt: "Sector 144 is becoming the new office hub of Noida. See what makes it attractive for Fortune 500 companies.",
    content: "With world-class office spaces and proximity to the metro, Sector 144 has emerged as a preferred destination for global corporations. The infrastructure here is designed to support the needs of modern businesses...",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "noida-it-corridor-sector-144"
  },
  {
    title: "The Ultimate Guide to Penthouses in Noida",
    cat: "Luxury Living",
    excerpt: "Dreaming of a home in the clouds? Discover the most spectacular penthouses available in Noida today.",
    content: "Penthouses in Noida offer more than just a home; they offer a statement. With private terraces, personal pools, and panoramic views of the city skyline, these are the pinnacle of urban luxury...",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "penthouses-in-noida-guide"
  },
  {
    title: "Understanding Property Tax in Noida: A Guide for Homeowners",
    cat: "Advisory",
    excerpt: "Stay compliant and avoid penalties. Everything you need to know about calculating and paying your Noida property tax.",
    content: "Paying property tax is a crucial responsibility for homeowners. In Noida, the process has been simplified with online portals. Learn how to use the self-assessment tool to calculate your dues accurately...",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "property-tax-noida-guide"
  },
  {
    title: "Best Banks for Home Loans in Noida (2026 Edition)",
    cat: "Finance",
    excerpt: "Comparing interest rates and processing fees of top banks to help you fund your Noida dream home.",
    content: "Getting the right home loan is as important as choosing the right home. We've analyzed the latest offerings from HDFC, SBI, ICICI, and Axis Bank to see who offers the best deals for Noida properties...",
    img: "https://images.unsplash.com/photo-1601597111158-2fcee27019ed?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "best-home-loans-noida-2026"
  },
  {
    title: "Interior Design Trends for Modern Noida Apartments",
    cat: "Design",
    excerpt: "Transform your Noida flat into a masterpiece with these trending decor ideas for 2026.",
    content: "Noida apartments are becoming smarter and more stylish. From minimalist Japandi styles to bold industrial themes, see how you can elevate your living space with the latest design trends...",
    img: "https://images.unsplash.com/photo-1616489953149-80496f84948c?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "interior-design-trends-noida-2026"
  },
  {
    title: "Safety First: Top 5 Secure Gated Communities in Noida",
    cat: "Living",
    excerpt: "Peace of mind is priceless. These projects offer the best security features for your family in Noida.",
    content: "Safety is a top priority for families when choosing a home. Explore townships that offer 24/7 CCTV surveillance, 5-tier security systems, and restricted access to ensure a safe environment for all residents...",
    img: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=800&auto=format&fit=crop",
    author: "Admin",
    slug: "secure-gated-communities-noida"
  }
];

async function seedMoreBlogs() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log("Seeding 10 more blogs...");
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
    console.log("Total 20 blogs now in database.");
  } catch (e) {
    console.error("Error seeding more blogs:", e);
  } finally {
    await sql.end();
  }
}

seedMoreBlogs();
