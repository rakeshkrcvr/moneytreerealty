import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Intro } from "@/components/site/Intro";
import { FeaturedProperties } from "@/components/site/FeaturedProperties";
import { Communities } from "@/components/site/Communities";
import { Launches } from "@/components/site/Launches";
import { PropertyCategories, WhyChooseUs } from "@/components/site/PropertyCategories";
import { Testimonials, HomeFAQ } from "@/components/site/HomeTrust";
import { Developers } from "@/components/site/Developers";
import { TourBanner } from "@/components/site/TourBanner";
import { Blog } from "@/components/site/Blog";
import { Footer } from "@/components/site/Footer";

import { getAllBlogs, getAllTestimonials, getAllFAQs, getAllProperties, getAllCommunities, getAllPropertyTypes } from "@/lib/server-functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Golden Door Realty — Premium Properties in the Best Locations" },
      {
        name: "description",
        content:
          "Discover luxury apartments, villas and townhouses across Dubai's most sought-after master-planned communities.",
      },
    ],
  }),
  loader: async () => {
    const [blogs, testimonials, faqs, properties, communities, propertyTypes] = await Promise.all([
      getAllBlogs(),
      getAllTestimonials(),
      getAllFAQs(),
      getAllProperties(),
      getAllCommunities(),
      getAllPropertyTypes()
    ]);
    return { blogs, testimonials, faqs, properties, communities, propertyTypes };
  },
  component: Index,
});

function Index() {
  const { blogs, testimonials, faqs, properties, communities, propertyTypes } = Route.useLoaderData();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Intro />
        <FeaturedProperties items={properties.slice(0, 2)} />
        <PropertyCategories items={propertyTypes} />
        <Communities items={communities} />
        <Launches items={properties.slice(0, 3)} />
        <WhyChooseUs />
        <TourBanner />
        <Testimonials reviews={testimonials} />
        <Blog posts={blogs} />
        <Developers />
        <HomeFAQ items={faqs} />
      </main>
      <Footer />
    </div>
  );
}
