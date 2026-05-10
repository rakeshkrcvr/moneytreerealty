import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

export function Communities({ items = [] }: { items?: any[] }) {
  const displayItems = items.length > 0 ? items.slice(0, 4) : [
    { title: "Downtown Dubai", tag: "Dubai", slug: "downtown-dubai", img: "" },
    { title: "Dubai Marina", tag: "Dubai", slug: "dubai-marina", img: "" },
    { title: "Dubai Hills Estate", tag: "Dubai", slug: "dubai-hills-estate", img: "" },
    { title: "Emaar Beachfront", tag: "Dubai", slug: "golden-door-beachfront", img: "" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-realty">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
          <div className="space-y-4">
            <p className="text-xs tracking-[0.4em] uppercase text-brand font-black">Elite Neighbourhoods</p>
            <h2 className="text-3xl md:text-5xl text-slate-900 uppercase tracking-tight font-serif">Our <span className="text-brand italic">Communities</span></h2>
          </div>
          <p className="text-sm text-slate-400 max-w-sm font-medium leading-relaxed">Experience the pinnacle of urban living in master-planned environments designed for luxury and comfort.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {displayItems.map((c: any) => (
            <Link 
              key={c.id || c.slug} 
              to="/communities/$slug" 
              params={{ slug: c.slug }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[32px] bg-slate-100 flex flex-col justify-end p-8"
            >
              {/* Background Image */}
              {c.img ? (
                <img 
                  src={c.img} 
                  alt={c.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300" />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                 <div className="flex items-center gap-2 text-brand mb-2">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{c.tag || 'Luxury Location'}</span>
                 </div>
                 <h3 className="text-2xl text-white uppercase tracking-tighter font-serif leading-tight">{c.title}</h3>
                 <div className="h-0.5 w-0 group-hover:w-12 bg-brand mt-4 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
