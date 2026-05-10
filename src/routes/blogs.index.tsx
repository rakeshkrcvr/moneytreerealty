import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getAllBlogs } from "@/lib/server-functions";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/blogs/")({
  loader: async () => {
    const blogs = await getAllBlogs();
    return { blogs };
  },
  component: BlogsPage,
});

function BlogsPage() {
  const { blogs } = Route.useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter((b: any) => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>
        <div className="container-realty relative z-10 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-brand font-black mb-6">Expert Perspectives</p>
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter mb-8">The <span className="text-brand italic">Blog</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">Stay updated with the latest trends, investment guides, and news from the heart of Noida's real estate market.</p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 border-b border-slate-100 sticky top-20 bg-white/80 backdrop-blur-xl z-50">
         <div className="container-realty">
            <div className="relative max-w-2xl mx-auto">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
               <input 
                 type="text" 
                 placeholder="Search articles, categories, or trends..." 
                 className="w-full bg-slate-50 border-transparent rounded-full pl-16 pr-8 py-5 text-sm focus:bg-white focus:ring-2 focus:ring-brand/20 transition-all outline-none"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-24">
        <div className="container-realty">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-24">
               <p className="text-slate-400 italic">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-x-10 gap-y-16">
              {filteredBlogs.map((p: any) => (
                <Link 
                  key={p.slug} 
                  to="/blogs/$slug" 
                  params={{ slug: p.slug }}
                  className="group flex flex-col"
                >
                  <div className="relative overflow-hidden rounded-[40px] aspect-[4/3] mb-8 bg-slate-100 shadow-sm border border-slate-50">
                    <img 
                      src={p.img || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"} 
                      alt={p.title} 
                      loading="lazy" 
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                    />
                    <div className="absolute top-6 left-6">
                       <span className="bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-lg">{p.cat}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                     <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-brand" /> {new Date(p.date || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                     <div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-brand" /> {p.author || 'Admin'}</div>
                  </div>

                  <h3 className="text-2xl text-slate-900 leading-tight group-hover:text-brand transition-colors duration-500 font-serif line-clamp-2 uppercase tracking-tight">{p.title}</h3>
                  <p className="mt-5 text-slate-500 line-clamp-3 leading-relaxed font-medium">{p.excerpt}</p>
                  
                  <div className="mt-8 flex items-center gap-3 text-[10px] font-black text-brand uppercase tracking-[0.25em] group-hover:gap-5 transition-all duration-500">
                     Read Full Article <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
