import { Link } from "@tanstack/react-router";
import { Star, MapPin } from "lucide-react";

export function FeaturedProperties({ items = [] }: { items?: any[] }) {
  const featured = items.length > 0 ? items : [
    {
      slug: "address-seafront",
      title: "Address Seafront",
      location: "Golden Door Realty Beachfront",
      price: "From ₹ 3.2M",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000",
      tag: "Signature Edition"
    },
    {
      slug: "burj-crown",
      title: "Burj Crown",
      location: "Downtown Dubai",
      price: "From ₹ 2.1M",
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000",
      tag: "Investor's Choice"
    }
  ];

  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="container-realty">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-brand mb-4">Curated Selection</p>
            <h2 className="text-3xl md:text-6xl text-ink uppercase" style={{ fontFamily: "var(--font-serif)" }}>
              Featured <br /> <span className="text-muted-foreground/40 italic">Properties</span>
            </h2>
          </div>
          <Link to="/communities" className="text-[11px] font-bold tracking-[0.2em] uppercase text-ink border-b-2 border-brand pb-2 hover:text-brand transition">
            View All Collection
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {featured.map((p) => (
            <Link key={p.slug} to="/property/$slug" params={{ slug: p.slug }} className="group relative block overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden bg-muted mb-8">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-brand text-white px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest">
                  {p.tag}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl text-ink uppercase tracking-wider mb-2 group-hover:text-brand transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
                    <MapPin className="w-3 h-3 text-brand" /> {p.location}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-light text-ink mb-1">{p.price}</p>
                  <span className="text-[10px] uppercase tracking-tighter text-muted-foreground flex items-center justify-end gap-1">
                    <Star className="w-3 h-3 fill-gold text-gold" /> High Potential ROI
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
