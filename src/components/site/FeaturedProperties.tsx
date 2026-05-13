import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star, MapPin, Heart, Share2, Image as ImageIcon, Phone, MessageCircle, ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { PropertyCard } from "./PropertyCard";

export function FeaturedProperties({ items = [] }: { items?: any[] }) {
  const [filter, setFilter] = useState("All Properties");

  const featured = items.length > 0 ? items : [
    {
      slug: "elan-statement",
      title: "Elan The Statement Sector 49 Gurugram",
      developer: "Elan Group",
      location: "Sector 49, Gurugram",
      price: "On Request",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
      tag: "NEW LAUNCH",
      config: ["4 BHK Flats", "Penthouses"]
    },
    {
      slug: "smartworld-elie-saab",
      title: "Smartworld Elie Saab Noida",
      developer: "Elie Saab and Smartworld",
      location: "Sector 98, Noida",
      price: "On Request",
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
      tag: "NEW LAUNCH",
      config: ["1 BHK Flats", "2 BHK Flats", "3 BHK Flats"]
    },
    {
      slug: "life-republic-aros",
      title: "Life Republic Aros",
      developer: "Kolte Patil Developers",
      location: "Hinjewadi, Pune",
      price: "On Request",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
      tag: "FEATURED",
      config: ["2 BHK Flats", "3 BHK Flats"]
    },
    {
      slug: "m3m-jewel",
      title: "M3M Jewel Crest Sector 97 Noida",
      developer: "M3M India Pvt. Ltd.",
      location: "Sector 97, Noida",
      price: "₹6 Cr onwards",
      img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000",
      tag: "FEATURED",
      config: ["3 BHK Flats", "4 BHK Flats", "5 BHK Flats"]
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const displayItems = items.length > 0 ? items : featured;

  const cardsToShow = 4;
  const maxIdx = Math.max(0, displayItems.length - cardsToShow);

  const next = () => setActiveIdx((prev) => (prev < maxIdx ? prev + 1 : 0));
  const prev = () => setActiveIdx((prev) => (prev > 0 ? prev - 1 : maxIdx));

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-[#1a365d] mb-4 leading-tight">
              Handpicked <span className="text-[#004037]">Premium Properties</span> Just for You
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Exclusive access to <strong>luxury apartments, ready-to-move homes,</strong> and <strong>high-ROI investment properties</strong> – curated by the best real estate consultant in India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
             {["All Properties", "Luxury 3/4 BHK", "Commercial"].map(f => (
               <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold border-2 transition-all ${
                  filter === f ? "bg-[#004037] border-[#004037] text-white" : "border-slate-100 text-slate-500 hover:border-[#004037]"
                }`}
               >
                 {f}
               </button>
             ))}
             <div className="flex gap-2 ml-4">
                <button onClick={prev} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-[#004037] hover:text-white transition-all"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={next} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-[#004037] hover:text-white transition-all"><ChevronRight className="w-5 h-5" /></button>
             </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative mt-8">
          <div 
            className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${activeIdx * (100 / displayItems.length)}%)`, width: `${(displayItems.length / cardsToShow) * 100}%` }}
          >
            {displayItems.map((p) => {
              return (
                <div key={p.slug} className="flex-1">
                   <PropertyCard property={p} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
           <Link to="/properties" className="inline-flex items-center gap-2 text-sm font-black text-[#004037] hover:gap-4 transition-all uppercase tracking-widest">
              Explore more Premium Properties →
           </Link>
        </div>
      </div>
    </section>
  );
}
