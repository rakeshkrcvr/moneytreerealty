import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getAllLaunches } from "@/lib/server-functions";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronRight, X, LayoutGrid, List } from "lucide-react";

export const Route = createFileRoute("/properties/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      type: (search.type as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Properties Portfolio — MoneyTree Realty" },
      { name: "description", content: "Explore our comprehensive portfolio of residential, commercial, and luxury properties." },
    ],
  }),
  loader: async () => {
    const launches = await getAllLaunches();
    return { launches };
  },
  component: LaunchesPage,
});

const filters = {
  purpose: ["Buy", "Rent", "Commercial", "Plots & Land"],
  buy: ["Apartments", "Villas", "Independent Houses", "Builder Floors", "Studio Apartments", "Luxury Homes"],
  rent: ["Apartments", "PG / Hostel", "Villas", "Office Spaces", "Shops"],
  commercial: ["Office Space", "Retail Shops", "Warehouses", "Showrooms", "Co-working Spaces"],
  plots: ["Residential Plots", "Commercial Plots", "Agricultural Land"],
  tags: ["New Launch", "Ready To Move", "Luxury Projects", "Affordable Housing", "RERA Approved", "Verified"]
};

import { useSearch } from "@tanstack/react-router";

function LaunchesPage() {
  const { type } = useSearch({ from: "/properties/" });
  const { launches } = Route.useLoaderData();
  const [activePurpose, setActivePurpose] = useState("Buy");
  const [selectedSub, setSelectedSub] = useState<string | null>(type || null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return launches.filter(it => {
      const matchSearch = it.title.toLowerCase().includes(search.toLowerCase()) || 
                          it.location.toLowerCase().includes(search.toLowerCase());
      
      const matchSub = selectedSub ? it.type === selectedSub : true;
      
      return matchSearch && matchSub;
    });
  }, [search, selectedSub, launches]);

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero / Header Section */}
      <section className="bg-ink text-white py-20 border-b border-white/5">
        <div className="container-realty text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">MoneyTree Realty Portfolio</p>
          <h1 className="text-4xl md:text-6xl uppercase" style={{ fontFamily: "var(--font-serif)" }}>Properties</h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 bg-background">
        <div className="container-realty flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-72 shrink-0 space-y-10">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search location or project..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface border border-border px-10 py-3 text-xs focus:outline-none focus:border-brand uppercase tracking-wider"
              />
            </div>

            {/* Purpose Selection */}
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-3 h-3" /> Purpose
              </h4>
              <div className="flex flex-col gap-2">
                {filters.purpose.map(p => (
                  <button 
                    key={p} 
                    onClick={() => { setActivePurpose(p); setSelectedSub(null); }}
                    className={`text-left px-4 py-2 text-xs uppercase tracking-widest transition-colors ${activePurpose === p ? "bg-brand text-white font-bold" : "text-muted-foreground hover:text-ink"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4">Categories</h4>
              <div className="flex flex-col gap-1">
                {(activePurpose === "Buy" ? filters.buy : 
                  activePurpose === "Rent" ? filters.rent : 
                  activePurpose === "Commercial" ? filters.commercial : filters.plots).map(c => (
                  <label key={c} className="flex items-center gap-3 px-4 py-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedSub === c} 
                      onChange={() => setSelectedSub(selectedSub === c ? null : c)}
                      className="w-3 h-3 accent-brand" 
                    />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-ink transition-colors">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags Selection */}
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4">Project Tags</h4>
              <div className="flex flex-wrap gap-2">
                {filters.tags.map(t => (
                  <button 
                    key={t}
                    onClick={() => setSelectedTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                    className={`px-3 py-1.5 text-[9px] border uppercase tracking-widest font-bold transition-colors ${selectedTags.includes(t) ? "bg-ink text-white border-ink" : "border-border text-muted-foreground hover:border-ink hover:text-ink"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Listings Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-border">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Showing {filteredItems.length} results</p>
              <div className="flex items-center gap-4">
                <select className="text-[10px] uppercase tracking-widest font-bold bg-transparent focus:outline-none border-none cursor-pointer">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <div className="flex gap-2 border-l border-border pl-4">
                  <LayoutGrid className="w-4 h-4 text-ink cursor-pointer" />
                  <List className="w-4 h-4 text-muted-foreground cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((it) => (
                <Link key={it.slug} to="/property/$slug" params={{ slug: it.slug }} className="group block border border-border bg-white p-4 hover:border-brand transition shadow-sm">
                  <div className="overflow-hidden aspect-[4/5] mb-5 relative">
                    <img src={it.img} alt={it.title} loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-ink/80 text-white text-[9px] px-3 py-1 uppercase tracking-widest backdrop-blur-sm">
                      {it.type}
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl text-ink group-hover:text-brand transition-colors uppercase tracking-widest">{it.title}</h3>
                    <p className="text-sm font-bold text-brand">{it.price}</p>
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2 mb-4">
                    <Search className="w-3 h-3" /> {it.location}
                  </p>
                  <div className="pt-4 border-t border-border flex justify-between items-center group/btn">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-ink">View Details</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/btn:text-brand group-hover/btn:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="py-24 text-center border border-dashed border-border">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl uppercase tracking-widest text-ink mb-2">No properties found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
                <button onClick={() => { setSearch(""); setSelectedSub(null); setSelectedTags([]); }} className="mt-6 text-[10px] font-bold uppercase tracking-widest text-brand border-b border-brand pb-1">Clear all filters</button>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
