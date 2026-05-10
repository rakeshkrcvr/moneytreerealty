import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowUpRight, MapPin, Compass } from "lucide-react";
import { getAllCommunities } from "@/lib/server-functions";

export const Route = createFileRoute("/communities/")({
  loader: async () => {
    const data = await getAllCommunities();
    // Force serialization by mapping to plain objects
    return JSON.parse(JSON.stringify(data));
  },
  component: CommunitiesListPage,
});

function CommunitiesListPage() {
  const communities = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      
      <section className="py-24 bg-surface border-b border-border">
        <div className="container-realty">
           <p className="text-[10px] tracking-[0.4em] uppercase text-brand mb-4 font-bold">The Master Collection</p>
           <h1 className="text-4xl md:text-7xl uppercase mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              Our <span className="text-muted-foreground/40 italic">Communities</span>
           </h1>
           <p className="max-w-2xl text-muted-foreground text-lg leading-relaxed">
              Explore the iconic districts that define Dubai's skyline. From waterfront marinas to serene golf estates, each Golden Door Realty community offers a unique lifestyle and unparalleled investment value.
           </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-realty space-y-12">
          {communities.map((c, i) => (
            <div key={c.slug} className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-0 border border-border overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-500`}>
               <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                  <img src={c.img} className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105" />
               </div>
               <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-brand font-bold mb-4">{c.tag}</p>
                  <h2 className="text-3xl md:text-5xl uppercase mb-6" style={{ fontFamily: "var(--font-serif)" }}>{c.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-10 text-lg">{c.description}</p>
                  
                  <Link 
                    to="/communities/$slug" 
                    params={{ slug: c.slug }}
                    className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-ink group"
                  >
                    Explore Community 
                    <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                       <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </Link>
               </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
