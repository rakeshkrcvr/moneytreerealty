import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, MapPin, Building2, Home } from "lucide-react";

export function Hero() {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000"
          alt="Dubai Skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="container-realty relative z-10 text-center text-white mt-20">
        <p className="text-xs md:text-sm tracking-[0.5em] uppercase mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Welcome to the Future of Living
        </p>
        <h1 
          className="text-5xl md:text-8xl tracking-tighter mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          FIND YOUR <br /> <span className="text-gold">DREAM HOME</span>
        </h1>

        {/* Search Bar Container */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-sm shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
          {/* Tabs */}
          <div className="flex gap-4 mb-2 ml-2">
            {["buy", "rent", "off-plan"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] uppercase tracking-widest font-bold py-2 px-4 transition-all ${
                  activeTab === tab ? "bg-brand text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-white p-2 text-ink">
            <div className="flex items-center gap-3 px-4 border-r border-border py-3">
              <MapPin className="w-4 h-4 text-brand shrink-0" />
              <input 
                placeholder="Location" 
                className="w-full text-xs font-semibold focus:outline-none placeholder:text-muted-foreground uppercase tracking-widest"
              />
            </div>
            <div className="flex items-center gap-3 px-4 border-r border-border py-3">
              <Building2 className="w-4 h-4 text-brand shrink-0" />
              <select className="w-full text-xs font-semibold focus:outline-none appearance-none bg-transparent uppercase tracking-widest">
                <option>Property Type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Townhouse</option>
              </select>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <Home className="w-4 h-4 text-brand shrink-0" />
              <select className="w-full text-xs font-semibold focus:outline-none appearance-none bg-transparent uppercase tracking-widest">
                <option>Bedrooms</option>
                <option>1 BR</option>
                <option>2 BR</option>
                <option>3 BR</option>
                <option>4+ BR</option>
              </select>
            </div>
            <Link 
              to="/launches"
              className="bg-ink text-white w-full h-full py-4 flex items-center justify-center gap-2 hover:bg-brand transition uppercase text-[10px] font-bold tracking-[0.2em]"
            >
              <Search className="w-4 h-4" /> Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
