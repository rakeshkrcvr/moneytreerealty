import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X, Globe } from "lucide-react";
import { getAllPropertyTypes, getAllProperties, createLead } from "@/lib/server-functions";
import { useSiteSettings } from "./SiteSettingsContext";
import { toast } from "sonner";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showMega, setShowMega] = useState(false);
  const [open, setOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [types, setTypes] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any>(null);
  const settings = useSiteSettings();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setIsSubmitting(true);
    try {
      await createLead({
        data: {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          source: "Header Get In Touch"
        }
      });
      toast.success("Thank you! We will get in touch soon.");
      setShowContactModal(false);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className={`text-[11px] font-semibold tracking-[0.15em] uppercase ${scrolled || showMega ? "text-ink" : "text-white"}`}>Home</Link>
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
          <Link to="/services" className={`text-[11px] font-semibold tracking-[0.15em] uppercase ${scrolled || showMega ? "text-ink" : "text-white"}`}>Services</Link>
          <Link to="/blogs" className={`text-[11px] font-semibold tracking-[0.15em] uppercase ${scrolled || showMega ? "text-ink" : "text-white"}`}>Blogs</Link>
          <Link to="/about" className={`text-[11px] font-semibold tracking-[0.15em] uppercase ${scrolled || showMega ? "text-ink" : "text-white"}`}>About</Link>
          <Link to="/contact" className={`text-[11px] font-semibold tracking-[0.15em] uppercase ${scrolled || showMega ? "text-ink" : "text-white"}`}>Contact Us</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowContactModal(true)}
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
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowContactModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative animate-in fade-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowContactModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-ink mb-2">Get In Touch</h3>
            <p className="text-slate-500 text-sm mb-6">Leave your details and our property experts will contact you shortly.</p>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Name</label>
                <input required name="name" type="text" className="w-full bg-slate-50 border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand transition outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email</label>
                <input required name="email" type="email" className="w-full bg-slate-50 border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand transition outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Phone</label>
                <input required name="phone" type="tel" className="w-full bg-slate-50 border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand transition outline-none" placeholder="+1234567890" />
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full bg-brand text-white font-bold tracking-[0.2em] uppercase text-xs py-4 rounded-xl hover:bg-black transition-colors disabled:opacity-50 mt-4">
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
