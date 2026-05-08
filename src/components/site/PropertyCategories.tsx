import { Building2, Home, TreePine, Warehouse } from "lucide-react";

const categories = [
  { icon: Building2, label: "Apartments", count: "120+ Listings", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000" },
  { icon: Home, label: "Villas", count: "45+ Listings", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" },
  { icon: Warehouse, label: "Townhouses", count: "30+ Listings", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" },
  { icon: TreePine, label: "Land Plots", count: "12+ Listings", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" },
];

export function PropertyCategories() {
  return (
    <section className="py-24 bg-background">
      <div className="container-emaar">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-brand mb-4">Discovery</p>
          <h2 className="text-3xl md:text-5xl text-ink uppercase" style={{ fontFamily: "var(--font-serif)" }}>
            PROPERTY CATEGORIES
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <div key={i} className="group relative h-96 overflow-hidden cursor-pointer">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-surface border-y border-border overflow-hidden">
      <div className="container-emaar grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <div className="aspect-[4/5] bg-muted relative z-10">
            <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand/5 -z-0" />
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-ink/5 -z-0" />
        </div>

        <div className="space-y-12">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-brand mb-6">Unrivaled Excellence</p>
            <h2 className="text-3xl md:text-6xl text-ink uppercase leading-tight mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              Why Choose <br /> <span className="text-gold">Emaar Properties</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              As one of the world's most valuable and admired real estate development companies, Emaar shapes new lifestyles with a focus on design excellence and build quality.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-12">
            {[
              { t: "Global Legacy", d: "Developing iconic landmarks like Burj Khalifa since 1997." },
              { t: "Build Quality", d: "Premium materials and meticulous attention to every detail." },
              { t: "Smart Integration", d: "Cutting-edge technology integrated into every home." },
              { t: "After-Sales", d: "Dedicated 24/7 community management and support." }
            ].map((it, i) => (
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
