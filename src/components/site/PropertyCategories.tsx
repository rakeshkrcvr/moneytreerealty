import { Link } from "@tanstack/react-router";
import { useSiteSettings } from "./SiteSettingsContext";

export function PropertyCategories() {
  const cities = [
    { name: "Noida", img: "https://images.unsplash.com/photo-1588417631561-268393910c66?auto=format&fit=crop&q=80&w=800" },
    { name: "Greater Noida West", img: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800" },
    { name: "Gurugram", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" },
    { name: "Pune", img: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?auto=format&fit=crop&q=80&w=800" },
    { name: "Greater Noida", img: "https://images.unsplash.com/photo-1623101170068-0720a4449842?auto=format&fit=crop&q=80&w=800" },
    { name: "Meerut", img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-[900] text-[#004037] uppercase tracking-tight flex items-center gap-3">
             <span className="w-1.5 h-8 bg-[#004037] inline-block"></span>
             EXPLORE BY CITY
          </h2>
          <p className="text-slate-400 text-sm mt-2 ml-4 font-medium">Find projects in India's top real estate markets</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {cities.map((city, i) => (
            <Link 
              key={i} 
              to="/property/$slug" 
              params={{ slug: city.name.toLowerCase().replace(/ /g, '-') }}
              className="group relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-2xl cursor-pointer block shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={city.img} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                <p className="text-xs text-white/70 font-medium">View projects</p>
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
  const whyTitle = "Why Choose <br /> <span className=\"text-[#c5a35d]\">MoneyTree Realty</span>";
  const whyDesc = "MoneyTree Realty is the top real estate property consultant in India, offering luxury apartments, commercial projects, and expert investment advice in Noida and Gurugram.";
  
  const features = [
    { t: "Expert Guidance", d: "Professional real estate advice from seasoned market experts." },
    { t: "Premium Selection", d: "Access to the most exclusive luxury and commercial properties." },
    { t: "Client First", d: "A commitment to transparency and long-term relationships." },
    { t: "Smooth Transitions", d: "Comprehensive support from site visits to final documentation." }
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
