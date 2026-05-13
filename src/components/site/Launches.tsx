import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { PropertyCard } from "./PropertyCard";
import { ImageWithFallback } from "./ImageWithFallback";

export function Launches({ items = [] }: { items?: any[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const displayItems = items.length > 0 ? items : [
    {
      slug: "shalimar-evara",
      title: "Shalimar Evara Lucknow",
      location: "Faizabad Road, Lucknow",
      price: "On Request",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000",
      tags: ["2 BHK Flats", "3 BHK Flats"]
    },
    {
      slug: "sobha-rivana",
      title: "Sobha Rivana Greater Noida West",
      location: "Sector 1, Greater Noida West",
      price: "₹1.80 Cr",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
      tags: ["2 BHK Flats", "3 BHK Flats", "4 BHK Flats"]
    }
  ];

  const next = () => setActiveIdx((prev) => (prev + 1) % displayItems.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + displayItems.length) % displayItems.length);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-[#1a365d] mb-4">
              Exclusive <span className="text-[#004037]">New Launches</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              As your real estate consultant in India, we've curated a selection of premium places for your luxury living.
            </p>
            <button className="mt-6 bg-[#004037] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#002a24] transition-all shadow-lg shadow-[#004037]/20">
              <MessageCircle className="w-5 h-5" /> Grab Your Deal
            </button>
          </div>

          {/* Thumbnails */}
          <div className="hidden lg:flex gap-3">
            {displayItems.slice(0, 5).map((item, i) => (
              <button 
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`w-24 group transition-all ${activeIdx === i ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
              >
                <div className={`aspect-video rounded-lg overflow-hidden mb-2 border-2 ${activeIdx === i ? "border-[#004037]" : "border-transparent"}`}>
                  <ImageWithFallback 
                    src={item.img} 
                    className="w-full h-full object-cover" 
                    alt={item.title} 
                  />
                </div>
                <p className="text-[9px] font-bold text-ink truncate text-center">{item.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Slider Area */}
        <div className="relative group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
             {/* We show 2 cards, starting from activeIdx */}
             {[0, 1].map((offset) => {
               const item = displayItems[(activeIdx + offset) % displayItems.length];
               if (!item) return null;
               return (
                 <div key={item.slug} className="flex-1">
                   <PropertyCard property={item} />
                 </div>
               );
             })}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-ink hover:text-[#004037] transition-all hover:scale-110 z-10 border border-slate-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={next}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-ink hover:text-[#004037] transition-all hover:scale-110 z-10 border border-slate-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {displayItems.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveIdx(i)}
              className={`h-2 transition-all rounded-full ${activeIdx === i ? "w-8 bg-[#004037]" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
