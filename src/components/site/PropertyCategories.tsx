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

export function WhyChooseUs() {
  const team = [
    { name: "Aman Sharma", role: "Corporate Director - Sales", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
    { name: "Garvit Sharma", role: "Corporate Director - Sales", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
    { name: "Monu Tyagi", role: "Corporate Director - Sales", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
    { name: "Nakul Tyagi", role: "Corporate Director - Sales", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  ];

  const others = [
    { name: "Neeraj Kataria", role: "Corporate Director - Sales", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" },
    { name: "Sachin Khurana", role: "Corporate Director - Sales", img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=100" },
    { name: "Sharda Prasad Kushwaha", role: "Corporate Director - Sales", img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6 tracking-tight">
            Meet Your <span className="text-[#004037]">Real Estate Investment</span> Dream Team
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            <span className="font-bold text-slate-800">Certified property experts</span> with deep market knowledge. From first consultation to keys in hand - we're with you every step.
          </p>
        </div>

        <div className="relative group mb-12">
          {/* Main Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="group/card relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-slate-100 transition-all duration-500 hover:shadow-2xl">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h4 className="text-2xl font-bold mb-1">{member.name}</h4>
                  <p className="text-xs text-white/70 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg border border-slate-200 text-[#004037] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
             <span className="sr-only">Previous</span>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg border border-slate-200 text-[#004037] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
             <span className="sr-only">Next</span>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
           {[...team, ...others].map((m, i) => (
             <div key={i} className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all cursor-pointer ${i === 0 ? "border-[#004037] bg-white shadow-md" : "border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-300"}`}>
               <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200">
                  <img src={m.img} className="w-full h-full object-cover" />
               </div>
               <div className="hidden sm:block text-left">
                  <p className="text-[10px] font-bold text-slate-800 leading-none">{m.name}</p>
                  <p className="text-[8px] text-slate-400 mt-0.5">{m.role}</p>
               </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
