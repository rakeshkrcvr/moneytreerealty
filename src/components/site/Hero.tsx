import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, MapPin, Building2, Home } from "lucide-react";
import { useSiteSettings } from "./SiteSettingsContext";
import { ImageWithFallback } from "./ImageWithFallback";

export function Hero() {
  const [activeTab, setActiveTab] = useState("buy");
  const settings = useSiteSettings();
  
  const heroContent = settings?.page_content?.home || {};
  const heroImage = heroContent.hero_image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000";
  const heroVideo = heroContent.hero_video;
  const heroSubtitle = heroContent.hero_subtitle || "Welcome to the Future of Living";
  const heroTitleHtml = heroContent.hero_title || "FIND YOUR <br /> <span className=\"text-gold\">DREAM HOME</span>";

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        {heroVideo ? (
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageWithFallback
            src={heroImage}
            alt="Property Background"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="container-realty relative z-10 text-center text-white mt-20">
        <p className="text-xs md:text-sm tracking-[0.5em] uppercase mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {heroSubtitle}
        </p>
        <h1 
          className="text-5xl md:text-8xl tracking-tighter mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200"
          style={{ fontFamily: "var(--font-serif)" }}
          dangerouslySetInnerHTML={{ __html: heroTitleHtml }}
        />

        {/* Search Bar Container */}
        <div className="max-w-3xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
          <div className="bg-black/20 backdrop-blur-xl p-4 rounded-full flex items-center border border-white/10 shadow-2xl">
             <div className="flex-1 px-6 border-r border-white/10 flex items-center gap-3">
                <Search className="w-5 h-5 text-white/60" />
                <input 
                  type="text" 
                  placeholder="Search for properties..." 
                  className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/40 text-sm font-medium"
                />
             </div>
             <button className="bg-white text-[#004037] px-8 py-3 rounded-full text-sm font-bold hover:bg-white/90 transition-all flex items-center gap-2">
                Search
             </button>
          </div>
          <p className="mt-4 text-xs text-white/60 tracking-widest uppercase">Popular: Residential in Noida, Commercial in Gurugram</p>
        </div>
      </div>
    </section>
  );
}
