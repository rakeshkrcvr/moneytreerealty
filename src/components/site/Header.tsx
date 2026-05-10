import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X, Globe } from "lucide-react";
import { getAllPropertyTypes, getAllProperties } from "@/lib/server-functions";
import { useSiteSettings } from "./SiteSettingsContext";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showMega, setShowMega] = useState(false);
  const [open, setOpen] = useState(false);
  const [types, setTypes] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any>(null);
  const settings = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Fetch Menu Data
    const fetchMenuData = async () => {
      try {
        const [t, p] = await Promise.all([
          getAllPropertyTypes(),
          getAllProperties()
        ]);
        setTypes(t || []);
        if (p && p.length > 0) {
           setFeatured(p[0]); // Show the latest property as featured
        }
      } catch (e) {
        console.error("Failed to fetch menu data", e);
      }
    };
    fetchMenuData();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        scrolled || showMega ? "bg-white shadow-xl py-4" : "bg-transparent py-8"
      }`}
      onMouseLeave={() => setShowMega(false)}
    >
      <div className="container mx-auto px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt="Logo" className="h-20 w-auto object-contain" />
          ) : (
            <>
              <div className="w-10 h-10 bg-brand flex items-center justify-center text-white font-bold italic text-xl shadow-lg group-hover:scale-110 transition-transform">e</div>
              <span className={`font-bold text-lg tracking-tighter transition-colors ${scrolled || showMega ? "text-ink" : "text-white"}`}>
                {settings?.email?.includes('emaar') ? 'GOLDEN DOOR REALTY' : (settings?.phone ? 'ESTATE' : 'GOLDEN DOOR REALTY')}
              </span>
            </>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          <div 
            className="relative h-20 flex items-center group cursor-pointer"
            onMouseEnter={() => setShowMega(true)}
          >
            <span className={`text-[11px] font-semibold tracking-[0.15em] uppercase flex items-center gap-1 ${
              scrolled || showMega ? "text-ink" : "text-white"
            }`}>
              Properties <ChevronDown className={`w-3 h-3 transition-transform ${showMega ? "rotate-180" : ""}`} />
            </span>
          </div>
          <Link to="/communities" className={`text-[11px] font-semibold tracking-[0.15em] uppercase ${scrolled || showMega ? "text-ink" : "text-white"}`}>Communities</Link>
          <Link to="/about" className={`text-[11px] font-semibold tracking-[0.15em] uppercase ${scrolled || showMega ? "text-ink" : "text-white"}`}>About Us</Link>
          <Link to="/admin" className={`text-[10px] font-bold uppercase tracking-[0.2em] border border-brand/20 px-4 py-2 rounded-full hover:bg-brand hover:text-white transition ${scrolled || showMega ? "text-brand" : "text-white"}`}>Admin Panel</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {}}
            className="hidden md:inline-flex items-center bg-brand text-white px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-black transition-all rounded-sm shadow-lg shadow-brand/10"
          >
            Get in Touch
          </button>
          <button
            className={`lg:hidden ${scrolled || showMega ? "text-ink" : "text-white"}`}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      {showMega && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-slate-50 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
           <div className="container mx-auto p-12 grid grid-cols-4 gap-12">
              <div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Residential</h4>
                 <ul className="space-y-4">
                    {types.filter(t => t.category === 'Residential').length > 0 ? (
                      types.filter(t => t.category === 'Residential').map((t: any) => (
                        <li key={t.id}>
                          <Link 
                            to="/launches/" 
                            search={{ type: t.name }}
                            className="text-sm font-bold text-ink hover:text-brand transition-colors"
                          >
                            {t.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <>
                        <li><Link to="/launches/" search={{ type: 'Apartments' }} className="text-sm font-bold text-ink hover:text-brand transition-colors">Apartments</Link></li>
                        <li><Link to="/launches/" search={{ type: 'Villas' }} className="text-sm font-bold text-ink hover:text-brand transition-colors">Villas</Link></li>
                        <li><Link to="/launches/" search={{ type: 'Townhouses' }} className="text-sm font-bold text-ink hover:text-brand transition-colors">Townhouses</Link></li>
                      </>
                    )}
                 </ul>
              </div>
              <div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Commercial</h4>
                 <ul className="space-y-4">
                    {types.filter(t => t.category === 'Commercial').length > 0 ? (
                      types.filter(t => t.category === 'Commercial').map((t: any) => (
                        <li key={t.id}>
                          <Link 
                            to="/launches/" 
                            search={{ type: t.name }}
                            className="text-sm font-bold text-ink hover:text-brand transition-colors"
                          >
                            {t.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <>
                        <li><Link to="/launches/" search={{ type: 'Office' }} className="text-sm font-bold text-ink hover:text-brand transition-colors">Modern Offices</Link></li>
                        <li><Link to="/launches/" search={{ type: 'Retail' }} className="text-sm font-bold text-ink hover:text-brand transition-colors">Retail Spaces</Link></li>
                      </>
                    )}
                 </ul>
              </div>
              <div className="col-span-2 bg-slate-50 p-8 rounded-3xl flex items-center justify-between">
                 {featured ? (
                   <>
                     <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand mb-2">Featured Project</h4>
                        <h3 className="text-2xl font-black text-ink mb-2">{featured.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 max-w-xs line-clamp-2">{featured.description}</p>
                        <Link 
                          to="/property/$slug" 
                          params={{ slug: featured.slug }}
                          className="text-xs font-bold uppercase tracking-widest text-brand flex items-center gap-2 hover:gap-4 transition-all"
                        >
                          Explore Project <ChevronDown className="-rotate-90 w-3 h-3" />
                        </Link>
                     </div>
                     <div className="w-40 h-40 bg-white rounded-2xl shadow-sm overflow-hidden">
                        <img src={featured.img} className="w-full h-full object-cover" />
                     </div>
                   </>
                 ) : (
                   <>
                     <div>
                        <h3 className="text-2xl font-black text-ink mb-2">Golden Door Realty Beachfront</h3>
                        <p className="text-slate-500 text-sm mb-6 max-w-xs">Experience island living at its finest in Dubai's most exclusive coastal community.</p>
                        <button className="text-xs font-bold uppercase tracking-widest text-brand flex items-center gap-2 hover:gap-4 transition-all">Explore Project <ChevronDown className="-rotate-90 w-3 h-3" /></button>
                     </div>
                     <div className="w-40 h-40 bg-white rounded-2xl shadow-sm overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                     </div>
                   </>
                 )}
              </div>
           </div>
        </div>
      )}
    </header>
  );
}
