import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Intro } from "@/components/site/Intro";
import { FeaturedProperties } from "@/components/site/FeaturedProperties";
import { Communities } from "@/components/site/Communities";
import { Launches } from "@/components/site/Launches";
import { PropertyCategories, WhyChooseUs } from "@/components/site/PropertyCategories";
import { Testimonials, HomeFAQ } from "@/components/site/HomeTrust";
import { TourBanner } from "@/components/site/TourBanner";
import { Blog } from "@/components/site/Blog";
import { Footer } from "@/components/site/Footer";

import { getAllProperties, getAllPropertyTypes, getAllBlogs, getAllTestimonials, getAllFAQs } from "@/lib/server-functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Emaar — Premium Properties in the Best Locations" },
      {
        name: "description",
        content:
          "Discover luxury apartments, villas and townhouses across Dubai's most sought-after master-planned communities.",
      },
    ],
  }),
  loader: async () => {
    const [properties, types, blogs, testimonials, faqs] = await Promise.all([
      getAllProperties(),
      getAllPropertyTypes(),
      getAllBlogs(),
      getAllTestimonials(),
      getAllFAQs(),
    ]);
    return { properties, types, blogs, testimonials, faqs };
  },
  component: Index,
});

function Index() {
  const { properties, types, blogs, testimonials, faqs } = Route.useLoaderData();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Intro />
        {/* Pass live data to components */}
        <FeaturedProperties properties={properties.slice(0, 2)} />
        <PropertyCategories />
        <Communities types={types} />
        <Launches properties={properties.slice(0, 3)} />
        <WhyChooseUs />
        <TourBanner />
        <Testimonials reviews={testimonials} />
        <Blog posts={blogs} />
        <HomeFAQ items={faqs} />
      </main>
      <Footer />
    </div>
  );
}
