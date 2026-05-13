import { Link } from "@tanstack/react-router";
import { Heart, Share2, Image as ImageIcon, Phone, MessageCircle, MapPin, Building2 } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

interface PropertyCardProps {
  property: any;
}

export function PropertyCard({ property: p }: PropertyCardProps) {
  const rawPrice = p.price?.toString() || "On Request";
  let formattedPrice = rawPrice;
  
  // Extract number using regex to handle cases like "From ₹ 5.300001 Cr"
  const numMatch = rawPrice.match(/(\d+\.?\d*)/);
  if (numMatch) {
    const num = parseFloat(numMatch[0]);
    formattedPrice = `₹ ${num.toFixed(2)} Cr* Onwards`;
  } else if (!rawPrice.includes('₹') && rawPrice.toLowerCase() !== 'on request') {
    formattedPrice = `₹ ${rawPrice} Onwards`;
  }

  const configs = p.config ? (Array.isArray(p.config) ? p.config : [p.config]) : ["3 BHK Flats", "4 BHK Flats"];

  return (
    <div className="group relative rounded-[24px] overflow-hidden bg-slate-200 aspect-[4/5] shadow-md hover:shadow-xl transition-all duration-700 border border-slate-100 h-full">
       {/* Background Image */}
       <ImageWithFallback 
         src={p.img} 
         alt={p.title} 
         className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
       />
       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

       {/* Top Left Ribbon Tag */}
       <div className="absolute top-6 left-0 z-20">
          <div className="bg-[#e31e24] px-4 py-2 text-[10px] font-black text-white uppercase tracking-wider shadow-lg relative rounded-r-md">
            {p.tag || (p.is_new ? 'NEW LAUNCH' : 'FEATURED')}
            <div className="absolute -bottom-[5px] left-0 w-[5px] h-[5px] brightness-50 bg-[#e31e24] origin-top-left" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
          </div>
       </div>

       {/* Top Right Buttons */}
       <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
          <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10 shadow-lg"><Heart className="w-4 h-4" /></button>
          <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10 shadow-lg"><Share2 className="w-4 h-4" /></button>
          <div className="bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 border border-white/10 shadow-lg">
             <ImageIcon className="w-3.5 h-3.5" /> 1/4
          </div>
       </div>

       {/* Configuration Tags */}
       <div className="absolute bottom-[190px] left-5 flex gap-1.5 z-20">
          {configs.slice(0, 2).map((c: string) => (
            <span key={c} className="text-[9px] font-bold bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full uppercase shadow-md border border-white/20">{c}</span>
          ))}
       </div>

       {/* White Info Box */}
       <div className="absolute bottom-4 left-4 right-4 bg-white rounded-[20px] p-4 shadow-xl z-10 transform transition-transform duration-500 group-hover:-translate-y-1">
          <div className="mb-3">
             <p className="text-[#004037] text-[15px] font-black leading-none mb-1">
                {formattedPrice}
             </p>
             <h3 className="text-[13px] font-bold text-slate-900 leading-tight line-clamp-1 mb-2">
                {p.title}
             </h3>
             <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                   <Building2 className="w-3 h-3 text-slate-400" /> {p.developer || "Golden Door Realty"}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                   <MapPin className="w-3 h-3 text-slate-400" /> {p.location}
                </div>
             </div>
        </div>

        <div className="flex gap-1.5">
           <Link 
            to="/property/$slug" 
            params={{ slug: p.slug }}
            className="flex-1 bg-[#004037] text-white py-2.5 rounded-lg text-[11px] font-bold text-center hover:bg-slate-900 transition-all shadow-md shadow-[#004037]/10 uppercase tracking-wide"
           >
             View Details
           </Link>
           <button className="w-[38px] h-[38px] rounded-lg bg-[#4285F4] text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-md shadow-blue-500/10"><Phone className="w-4 h-4" /></button>
           <button className="w-[38px] h-[38px] rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:bg-[#128C7E] transition-all shadow-md shadow-green-500/10"><MessageCircle className="w-4 h-4" /></button>
        </div>
     </div>
    </div>
  );
}
