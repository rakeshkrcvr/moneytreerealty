import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MapPin, ChevronRight, Building2, Sparkles, Navigation, Compass } from "lucide-react";
import { getCommunityBySlug, getProjectsInCommunity } from "@/lib/server-functions";
import { PropertyCard } from "@/components/site/PropertyCard";
import { ImageWithFallback } from "@/components/site/ImageWithFallback";

export const Route = createFileRoute("/properties/$slug")({
  loader: async ({ params }) => {
    const community = await getCommunityBySlug(params.slug);
    const cityTitle = community?.title || cityTitleBySlug[params.slug];
    if (cityTitle) {
      throw redirect({
        to: "/properties",
        search: { city: cityTitle },
      });
    }

    if (!community) throw notFound();
    const projects = await getProjectsInCommunity(params.slug);
    return JSON.parse(JSON.stringify({ community, projects }));
  },
  component: CommunityDetail,
});

const cityTitleBySlug: Record<string, string> = {
  ghaziabad: "Ghaziabad",
  "greater-noida": "Greater Noida",
  "greater-noida-west": "Greater Noida West",
  gurugram: "Gurugram",
  lucknow: "Lucknow",
  meerut: "Meerut",
  mumbai: "Mumbai",
  noida: "Noida",
  pune: "Pune",
  "yamuna-expressway": "Yamuna Expressway",
};

function CommunityDetail() {
  const { community, projects } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <img src={community.img} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" />
        <div className="container-realty relative z-10 text-white">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 font-bold">{community.tag}</p>
            <h1 className="text-5xl md:text-8xl uppercase mb-8 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
               {community.title}
            </h1>
            <div className="flex gap-12 items-center">
               <div className="flex items-center gap-3">
                  <Navigation className="w-5 h-5 text-gold" />
                  <span className="text-[11px] uppercase tracking-widest font-bold">Premier Location</span>
               </div>
               <div className="flex items-center gap-3 border-l border-white/20 pl-12">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <span className="text-[11px] uppercase tracking-widest font-bold">Master Planned</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-32 container-realty">
        <div className="grid md:grid-cols-2 gap-24 items-start">
           <div>
              <h2 className="text-3xl uppercase tracking-widest mb-10" style={{ fontFamily: "var(--font-serif)" }}>Community Overview</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{community.description} This master-planned community represents the pinnacle of luxury urban living, combining modern architecture with verdant landscapes and world-class amenities.</p>
           </div>
           <div className="bg-surface p-12 border border-border">
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-8">Districts & Highlights</h4>
              <div className="space-y-4">
                 {community.highlights?.map((h, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm uppercase tracking-wider font-medium text-ink">
                       <ChevronRight className="w-4 h-4 text-brand" /> {h}
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-32 bg-ink text-white">
        <div className="container-realty">
          <div className="mb-20">
             <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 font-bold">The Collection</p>
             <h2 className="text-4xl md:text-6xl uppercase" style={{ fontFamily: "var(--font-serif)" }}>Active Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
             {projects.active.map((p: any) => (
               <PropertyCard key={p.slug} property={p} />
             ))}
          </div>

          {projects.handedOver.length > 0 && (
            <>
              <div className="mt-40 mb-20 border-t border-white/10 pt-20">
                <h2 className="text-4xl uppercase" style={{ fontFamily: "var(--font-serif)" }}>Handed Over</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-8">
                {projects.handedOver.map((p: any) => (
                  <div key={p.slug} className="group cursor-default">
                    <div className="aspect-square bg-white/5 overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-700">
                      <ImageWithFallback src={p.img} className="w-full h-full object-cover opacity-60" alt={p.title} />
                    </div>
                    <p className="text-xs uppercase font-bold tracking-widest text-white/40">{p.title}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
