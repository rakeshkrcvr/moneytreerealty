import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight } from "lucide-react";
import { communities } from "@/lib/site-data";

export const Route = createFileRoute("/communities")({
  head: () => ({
    meta: [
      { title: "Master Communities — Emaar Properties" },
      { name: "description", content: "Explore the most iconic master-planned communities in Dubai, developed by Emaar." },
    ],
  }),
  component: CommunitiesPage,
});

function CommunitiesPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero */}
      <section className="bg-ink text-white py-24 border-b border-white/5">
        <div className="container-emaar text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6 font-bold">Master-Planned Destinations</p>
          <h1 className="text-4xl md:text-7xl uppercase" style={{ fontFamily: "var(--font-serif)" }}>Our Communities</h1>
          <p className="mt-8 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            From the world's most visited heart of the city to serene coastal retreats, we've defined the modern skyline of Dubai.
          </p>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="py-24 bg-background">
        <div className="container-emaar space-y-12">
          {communities.map((it, idx) => (
            <Link 
              key={it.slug} 
              to="/communities/$slug" 
              params={{ slug: it.slug }} 
              className={`group flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-0 border border-border overflow-hidden bg-surface hover:border-brand transition-colors duration-500`}
            >
              <div className="flex-1 aspect-video lg:aspect-auto overflow-hidden">
                <img src={it.img} alt={it.title} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
              </div>
              <div className="flex-1 p-12 lg:p-20 flex flex-col justify-center">
                <p className="text-[10px] tracking-[0.3em] uppercase text-brand mb-4 font-bold">{it.tag}</p>
                <h3 className="text-3xl md:text-5xl text-ink uppercase mb-6" style={{ fontFamily: "var(--font-serif)" }}>{it.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">{it.description}</p>
                <div className="flex items-center gap-4 text-ink font-bold uppercase tracking-widest text-[10px] group-hover:gap-6 transition-all duration-300">
                  Explore Community <ArrowRight className="w-4 h-4 text-brand" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
