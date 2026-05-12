import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

export function Communities({ items = [] }: { items?: any[] }) {
  // Hardcoding the 6 specific locations to match the "same to same" design request
  const displayItems = [
    { title: "Lucknow", tag: "CITY OF NAWABS", slug: "lucknow", img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800" },
    { title: "Mumbai", tag: "DREAM CITY", slug: "mumbai", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=800" },
    { title: "Gurugram", tag: "MILLENNIUM CITY", slug: "gurugram", img: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800" },
    { title: "Noida", tag: "GREEN CITY", slug: "noida", img: "https://images.unsplash.com/photo-1588417631561-268393910c66?auto=format&fit=crop&q=80&w=800" },
    { title: "Pune", tag: "OXFORD OF EAST", slug: "pune", img: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?auto=format&fit=crop&q=80&w=800" },
    { title: "Ghaziabad", tag: "GATEWAY TO UP", slug: "ghaziabad", img: "https://images.unsplash.com/photo-1623101170068-0720a4449842?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
          <div className="space-y-4">
            <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#004037] font-black">Elite Neighbourhoods</p>
            <h2 className="text-4xl md:text-6xl text-slate-900 uppercase tracking-tighter font-serif">
              Our <span className="text-[#004037] italic">Communities</span>
            </h2>
          </div>
          <div className="max-w-md pt-4">
             <p className="text-slate-500 text-sm md:text-base leading-relaxed">
               Experience the pinnacle of urban living in master-planned environments designed for luxury and comfort.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayItems.map((c: any) => (
            <Link 
              key={c.slug} 
              to="/communities/$slug" 
              params={{ slug: c.slug }}
              className="group relative aspect-[4/6] overflow-hidden rounded-[32px] bg-slate-100 flex flex-col justify-end p-6 shadow-lg hover:shadow-2xl transition-all duration-700"
            >
              {/* Background Image */}
              <ImageWithFallback 
                src={c.img} 
                alt={c.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-700" />
              
              {/* Content */}
              <div className="relative z-10 transform transition-all duration-700 group-hover:-translate-y-2">
                 <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-3 h-3 text-[#c5a35d]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/90">{c.tag}</span>
                 </div>
                 <h3 className="text-xl text-white uppercase tracking-tighter font-serif leading-none">{c.title}</h3>
                 <div className="h-1 w-0 group-hover:w-12 bg-[#c5a35d] mt-4 transition-all duration-700 rounded-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
