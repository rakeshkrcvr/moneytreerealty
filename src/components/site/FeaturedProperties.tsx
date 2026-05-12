import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star, MapPin, Heart, Share2, Image as ImageIcon, Phone, MessageCircle, ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

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

  const displayItems = items.length > 0 ? items : [
    // fallbacks...
  ];

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
              const rawPrice = p.price?.toString() || "On Request";
              let formattedPrice = rawPrice;
              
              // Extract number using regex to handle cases like "From ₹ 5.300001 Cr"
              const numMatch = rawPrice.match(/(\d+\.?\d*)/);
              if (numMatch) {
                const num = parseFloat(numMatch[0]);
                formattedPrice = `From ₹ ${num.toFixed(1)} Cr`;
              } else if (!rawPrice.includes('₹') && rawPrice.toLowerCase() !== 'on request') {
                formattedPrice = `₹ ${rawPrice}`;
              }

              return (
                <div key={p.slug} className="flex-1 group relative rounded-[30px] overflow-hidden bg-slate-200 h-[500px] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                   {/* Background Image */}
                   <ImageWithFallback 
                     src={p.img} 
                     alt={p.title} 
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                   {/* Top Left Ribbon Tag */}
                   <div className="absolute top-5 left-0 z-20">
                      <div className={`px-4 py-2 text-[10px] font-black text-white uppercase tracking-wider shadow-lg relative ${p.tag === 'NEW LAUNCH' || p.is_new ? 'bg-[#ff003c]' : 'bg-[#ff005c]'}`}>
                        {p.tag || (p.is_new ? 'NEW LAUNCH' : 'FEATURED')}
                        <div className="absolute -bottom-[5px] left-0 w-[5px] h-[5px] brightness-50 bg-inherit origin-top-left" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
                      </div>
                   </div>

                   {/* Top Right Buttons */}
                   <div className="absolute top-5 right-5 flex flex-col gap-2 z-20">
                      <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10 shadow-lg"><Heart className="w-4 h-4" /></button>
                      <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10 shadow-lg"><Share2 className="w-4 h-4" /></button>
                      <div className="bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[9px] font-black flex items-center gap-1 border border-white/10 shadow-lg">
                         <ImageIcon className="w-3.5 h-3.5" /> 1/3
                      </div>
                   </div>

                   {/* Configuration Tags */}
                   <div className="absolute bottom-[205px] left-5 flex gap-1.5 z-20">
                      {(p.config || ["2 BHK", "3 BHK"]).map((c: string) => (
                        <span key={c} className="text-[9px] font-black bg-white text-[#1a365d] px-3 py-1 rounded-full uppercase shadow-lg border border-white/10">{c}</span>
                      ))}
                   </div>

                   {/* White Info Box */}
                   <div className="absolute bottom-4 left-4 right-4 bg-white rounded-[28px] p-5 shadow-2xl z-10">
                      <div className="mb-3">
                         <p className="text-[#004037] text-[17px] font-[900] leading-none mb-0">
                            {formattedPrice}
                            <span className="text-slate-400 text-[10px] ml-0.5 mt-1">*</span>
                         </p>
                         <h3 className="text-[15px] font-[800] text-[#1a365d] leading-[1.3] line-clamp-2">
                            {p.title}
                         </h3>
                    </div>

                    <div className="space-y-1.5 mb-5">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                          <Building2 className="w-3.5 h-3.5 text-slate-300" /> {p.developer || "MoneyTree Realty"}
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-slate-300" /> {p.location}
                       </div>
                    </div>

                    <div className="flex gap-2">
                       <Link 
                        to="/property/$slug" 
                        params={{ slug: p.slug }}
                        className="flex-1 bg-[#004037] text-white py-3 rounded-xl text-[12px] font-[900] text-center hover:bg-[#002a24] transition-all shadow-lg shadow-[#004037]/20 uppercase"
                       >
                         View Details
                       </Link>
                       <button className="w-[44px] h-[44px] rounded-xl bg-[#4d8eff] text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"><Phone className="w-5 h-5" /></button>
                       <button className="w-[44px] h-[44px] rounded-xl bg-[#25D366] text-white flex items-center justify-center hover:bg-[#128C7E] transition-all shadow-lg shadow-green-500/20"><MessageCircle className="w-5 h-5" /></button>
                    </div>
                 </div>
              </div>
            );
          })}
          </div>
        </div>

        <div className="mt-16 text-center">
           <Link to="/launches" className="inline-flex items-center gap-2 text-sm font-black text-[#004037] hover:gap-4 transition-all uppercase tracking-widest">
              Explore more Premium Properties →
           </Link>
        </div>
      </div>
    </section>
  );
}
