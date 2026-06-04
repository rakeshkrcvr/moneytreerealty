import { Link } from "@tanstack/react-router";

export function PropertyCategories({ items = [] }: { items?: any[] }) {
  const fallbackCities = [
    { title: "Noida", slug: "noida", img: "https://images.unsplash.com/photo-1588417631561-268393910c66?auto=format&fit=crop&q=80&w=800" },
    { title: "Greater Noida West", slug: "greater-noida-west", img: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800" },
    { title: "Gurugram", slug: "gurugram", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" },
    { title: "Pune", slug: "pune", img: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?auto=format&fit=crop&q=80&w=800" },
    { title: "Greater Noida", slug: "greater-noida", img: "https://images.unsplash.com/photo-1623101170068-0720a4449842?auto=format&fit=crop&q=80&w=800" },
    { title: "Meerut", slug: "meerut", img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800" },
  ];
  const cities = items.length ? items : fallbackCities;

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
              key={city.id || city.slug || city.title || i} 
              to="/properties/$slug" 
              params={{ slug: city.slug || city.title.toLowerCase().replace(/\s+/g, '-') }}
              className="group relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-2xl cursor-pointer block shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={city.img} 
                alt={city.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-xl font-bold mb-1">{city.title}</h3>
                <p className="text-xs text-white/70 font-medium">View projects</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
