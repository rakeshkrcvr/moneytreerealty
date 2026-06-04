import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Intro } from "@/components/site/Intro";
import { FeaturedProperties } from "@/components/site/FeaturedProperties";
import { Launches } from "@/components/site/Launches";
import { PropertyCategories } from "@/components/site/PropertyCategories";
import { Testimonials, HomeFAQ } from "@/components/site/HomeTrust";
import { Developers } from "@/components/site/Developers";
import { TourBanner } from "@/components/site/TourBanner";
import { Blog } from "@/components/site/Blog";
import { Footer } from "@/components/site/Footer";
import { TrustSection } from "@/components/site/TrustSection";
import { CTABanner } from "@/components/site/CTABanner";

import { getAllBlogs, getAllTestimonials, getAllFAQs, getAllProperties, getAllCommunities } from "@/lib/server-functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Golden Door Realty | Real Estate Property Consultant in India" },
      {
        name: "description",
        content:
          "Golden Door Realty is a top real estate property consultant in India, offering luxury apartments, commercial projects, and expert investment advice in Noida and Gurugram.",
      },
    ],
  }),
  loader: async () => {
    const [blogs, testimonials, faqs, properties, communities] = await Promise.all([
      getAllBlogs(),
      getAllTestimonials(),
      getAllFAQs(),
      getAllProperties(),
      getAllCommunities(),
    ]);
    return { blogs, testimonials, faqs, properties, communities };
  },
  component: Index,
});

function Index() {
  const { blogs, testimonials, faqs, properties, communities } = Route.useLoaderData();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Intro />
        <FeaturedProperties items={properties} />
        <PropertyCategories items={communities} />
        <Launches items={properties} />
        <TourBanner />
        <Testimonials reviews={testimonials} />
        <Developers />
        <TrustSection />
        <HomeFAQ items={faqs} />
        <CTABanner />
        <Blog posts={blogs} />
      </main>
      <Footer />
    </div>
  );
}
