import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, X, Search, Phone } from "lucide-react";
import { getAllPropertyTypes, getAllProperties, getAllBlogs, createLead, getAllCommunities } from "@/lib/server-functions";
import { useSiteSettings } from "./SiteSettingsContext";
import { toast } from "sonner";
import { ImageWithFallback } from "./ImageWithFallback";

export function Header() {
// ... existing state ...
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [types, setTypes] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);
  
  const settings = useSiteSettings();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    const fetchData = async () => {
      try {
        const [t, p, b, c] = await Promise.all([
          getAllPropertyTypes(),
          getAllProperties(),
          getAllBlogs(),
          getAllCommunities()
        ]);
        setTypes(t || []);
        setProperties(p || []);
        setBlogs(b || []);
        setCommunities(c || []);
      } catch (e) {
        console.error("Failed to fetch menu data", e);
      }
    };
    fetchData();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          source: "Header Contact Button"
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

  const navLinks = [
    { label: "Projects", type: "mega", id: "projects" },
    { label: "CSR", path: "/csr" },
    { label: "Blogs", type: "mega", id: "blogs" },
    { label: "Career", path: "/career" },
    { label: "Contact", path: "/contact" },
    { label: "More", type: "mega", id: "more" },
  ];

  const cityCounts = communities.map(c => ({
    ...c,
    count: properties.filter(p => p.location?.toLowerCase().includes(c.title.toLowerCase())).length
  }));

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 bg-[#004037] text-white py-4 ${
        scrolled ? "shadow-2xl" : ""
      }`}
      onMouseLeave={() => setActiveMega(null)}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src={settings?.logo_url || "/logo.png"} 
            alt="MoneyTree" 
            className="h-12 md:h-14 w-auto object-contain" 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.label}
              className="relative group"
              onMouseEnter={() => link.type === "mega" ? setActiveMega(link.id) : setActiveMega(null)}
            >
              {link.path ? (
                <Link 
                  to={link.path as any} 
                  className="text-[13px] font-medium tracking-wide hover:text-white/80 transition-colors py-2 block"
                >
                  {link.label}
                </Link>
              ) : (
                <button className="text-[13px] font-medium tracking-wide flex items-center gap-1.5 hover:text-white/80 transition-colors py-2">
                  {link.label} {link.type === "mega" && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMega === link.id ? "rotate-180" : ""}`} />}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          
          <a 
            href={`tel:${settings?.phone || "+919732300007"}`} 
            className="hidden sm:flex items-center gap-2.5 px-4 py-2 border border-white/30 rounded-full hover:bg-white/10 transition-all group"
          >
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-[13px] font-bold tracking-tight">{settings?.phone || "+91 97323 00007"}</span>
          </a>

          <button 
            onClick={() => setShowContactModal(true)}
            className="bg-white text-[#004037] px-5 py-2.5 rounded-lg text-[13px] font-bold hover:bg-white/90 transition-all shadow-lg"
          >
            Contact
          </button>

          <button 
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mega Menus */}
      <div className={`absolute top-full left-0 w-full bg-white text-ink shadow-2xl border-t border-slate-100 transition-all duration-300 origin-top overflow-hidden ${
        activeMega ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      }`}>
        {activeMega === "projects" && (
          <div className="container mx-auto p-10 flex gap-12">
            <div className="w-1/4 border-r border-slate-100 pr-12">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Select City</h4>
              <ul className="space-y-4">
                {cityCounts.map(city => (
                  <li key={city.slug}>
                    <Link 
                      to="/properties/$slug" 
                      params={{ slug: city.slug }}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-sm font-bold text-ink group-hover:text-brand transition-colors">{city.title}</span>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">{city.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/4 border-r border-slate-100 pr-12">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Property Type</h4>
              <ul className="space-y-4">
                <li><Link to="/properties" className="text-sm font-bold text-ink hover:text-brand transition-colors block">All Types</Link></li>
                {types.map(type => (
                  <li key={type.id}>
                    <Link 
                      to="/properties" 
                      search={{ type: type.name }}
                      className="text-sm font-bold text-ink hover:text-brand transition-colors block"
                    >
                      {type.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-2/4 pl-4">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-bold text-ink">Properties in Gurugram</h4>
                <Link to="/properties/gurugram" className="text-[11px] font-bold text-brand uppercase tracking-wider hover:underline">View All in Gurugram →</Link>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {properties.filter(p => p.location?.toLowerCase().includes('gurugram')).slice(0, 2).map(p => (
                  <Link key={p.id} to="/property/$slug" params={{ slug: p.slug }} className="flex gap-4 group">
                    <div className="w-24 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <ImageWithFallback src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-ink line-clamp-1 group-hover:text-brand transition-colors">{p.title}</h5>
                      <p className="text-[11px] text-slate-500 mb-1">{p.location}</p>
                      <p className="text-[12px] font-bold text-brand">{p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMega === "blogs" && (
          <div className="container mx-auto p-10 flex gap-12">
            <div className="w-1/2 bg-slate-50 rounded-2xl p-8 flex gap-8">
              <div className="w-2/5 aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                <ImageWithFallback src={blogs[0]?.img} className="w-full h-full object-cover" />
              </div>
              <div className="w-3/5 flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-2">Featured</span>
                <h3 className="text-xl font-black text-ink mb-3 leading-tight">{blogs[0]?.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-3 mb-6">{blogs[0]?.excerpt}</p>
                <Link to="/blogs/$slug" params={{ slug: blogs[0]?.slug }} className="text-xs font-bold text-brand uppercase tracking-widest hover:underline">Read Now →</Link>
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-bold text-ink uppercase tracking-wide">More Articles</h4>
                <Link to="/blogs" className="text-[11px] font-bold text-brand uppercase tracking-wider hover:underline">View All →</Link>
              </div>
              <div className="space-y-6">
                {blogs.slice(1, 4).map(b => (
                  <Link key={b.id} to="/blogs/$slug" params={{ slug: b.slug }} className="flex gap-4 group">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <ImageWithFallback src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-ink line-clamp-1 group-hover:text-brand transition-colors">{b.title}</h5>
                      <span className="text-[11px] font-medium text-slate-400 mt-1 block group-hover:text-brand transition-colors">Read now</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMega === "more" && (
          <div className="container mx-auto py-10 px-8 flex justify-center">
             <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 w-72">
                <ul className="space-y-4">
                  {[
                    { label: "About Us", path: "/about" },
                    { label: "Associated Developers", path: "/developers" },
                    { label: "Real Estate", path: "/launches" },
                    { label: "Converters", path: "/converters" },
                    { label: "Events", path: "/events" },
                    { label: "Testimonials", path: "/testimonials" },
                    { label: "Vision & Mission", path: "/vision" },
                    { label: "Awards & Recognition", path: "/awards" }
                  ].map(item => (
                    <li key={item.label}>
                      <Link to={item.path as any} className="text-sm font-medium text-slate-600 hover:text-brand hover:pl-2 transition-all block">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#004037] border-t border-white/10 p-6 animate-in slide-in-from-top-4">
           <ul className="space-y-4 mb-8">
              {navLinks.map(link => (
                <li key={link.label}>
                  {link.path ? (
                    <Link to={link.path as any} className="text-lg font-bold block" onClick={() => setMobileMenuOpen(false)}>{link.label}</Link>
                  ) : (
                    <span className="text-lg font-bold block text-white/60">{link.label}</span>
                  )}
                </li>
              ))}
           </ul>
           <a 
              href={`tel:${settings?.phone || "+919732300007"}`} 
              className="flex items-center gap-3 px-6 py-4 bg-white/10 rounded-xl mb-4"
            >
              <Phone className="w-5 h-5" />
              <span className="font-bold">{settings?.phone || "+91 97323 00007"}</span>
            </a>
            <button 
              onClick={() => { setShowContactModal(true); setMobileMenuOpen(false); }}
              className="w-full bg-white text-[#004037] py-4 rounded-xl font-bold"
            >
              Contact Us
            </button>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowContactModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative animate-in fade-in zoom-in-95 text-ink" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowContactModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black mb-2">Get In Touch</h3>
            <p className="text-slate-500 text-sm mb-6">Leave your details and our property experts will contact you shortly.</p>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Name</label>
                <input required name="name" type="text" className="w-full bg-slate-50 border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#004037] transition outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email</label>
                <input required name="email" type="email" className="w-full bg-slate-50 border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#004037] transition outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Phone</label>
                <input required name="phone" type="tel" className="w-full bg-slate-50 border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#004037] transition outline-none" placeholder="+91 12345 67890" />
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full bg-[#004037] text-white font-bold tracking-[0.2em] uppercase text-xs py-4 rounded-xl hover:bg-black transition-colors disabled:opacity-50 mt-4">
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
