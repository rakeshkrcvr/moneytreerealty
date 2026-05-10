import { Building2, Home, TreePine, Warehouse, LayoutGrid } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSiteSettings } from "./SiteSettingsContext";

export function PropertyCategories({ items = [] }: { items?: any[] }) {
  const displayCategories = items.length > 0 ? items.map((it: any, i: number) => ({
    icon: [Building2, Home, Warehouse, TreePine][i % 4] || LayoutGrid,
    label: it.name,
    count: "Explore Collection",
    img: it.img || [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"
    ][i % 4],
    slug: it.name
  })) : [
    { icon: Building2, label: "Apartments", count: "120+ Listings", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000", slug: "Apartments" },
    { icon: Home, label: "Villas", count: "45+ Listings", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000", slug: "Villas" },
    { icon: Warehouse, label: "Townhouses", count: "30+ Listings", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000", slug: "Townhouses" },
    { icon: TreePine, label: "Land Plots", count: "12+ Listings", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000", slug: "Land Plots" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container-realty">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-brand mb-4">Discovery</p>
          <h2 className="text-3xl md:text-5xl text-ink uppercase" style={{ fontFamily: "var(--font-serif)" }}>
            PROPERTY CATEGORIES
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((c: any, i: number) => (
            <Link 
              key={i} 
              to="/launches/" 
              search={{ type: c.slug }}
              className="group relative h-96 overflow-hidden cursor-pointer block"
            >
              <img 
                src={c.img} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors" />
              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <c.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl uppercase tracking-wider mb-1 font-light">{c.label}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/60">{c.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const settings = useSiteSettings();
  const content = settings?.page_content?.home || {};
  
  const whyImage = content.why_image || "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000";
  const whySubtitle = content.why_subtitle || "Unrivaled Excellence";
  const whyTitle = content.why_title || "Why Choose <br /> <span className=\"text-gold\">Golden Door Realty</span>";
  const whyDesc = content.why_desc || "As one of the world's most valuable and admired real estate development companies, Golden Door Realty shapes new lifestyles with a focus on design excellence and build quality.";
  
  const features = [
    { t: content.why_f1_t || "Global Legacy", d: content.why_f1_d || "Developing iconic landmarks like Burj Khalifa since 1997." },
    { t: content.why_f2_t || "Build Quality", d: content.why_f2_d || "Premium materials and meticulous attention to every detail." },
    { t: content.why_f3_t || "Smart Integration", d: content.why_f3_d || "Cutting-edge technology integrated into every home." },
    { t: content.why_f4_t || "After-Sales", d: content.why_f4_d || "Dedicated 24/7 community management and support." }
  ];

  return (
    <section className="py-24 bg-surface border-y border-border overflow-hidden">
      <div className="container-realty grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <div className="aspect-[4/5] bg-muted relative z-10">
            <img src={whyImage} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand/5 -z-0" />
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-ink/5 -z-0" />
        </div>

        <div className="space-y-12">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-brand mb-6">{whySubtitle}</p>
            <h2 
              className="text-3xl md:text-6xl text-ink uppercase leading-tight mb-8" 
              style={{ fontFamily: "var(--font-serif)" }}
              dangerouslySetInnerHTML={{ __html: whyTitle }}
            />
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              {whyDesc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-12">
            {features.map((it, i) => (
              <div key={i}>
                <h4 className="text-sm font-bold uppercase tracking-widest text-ink mb-3">{it.t}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
