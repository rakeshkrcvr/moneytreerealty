import { Link } from "@tanstack/react-router";
import { Calendar, User, ArrowRight } from "lucide-react";

export function Blog({ posts = [] }: { posts?: any[] }) {
  if (!posts || posts.length === 0) return null;
  
  // Show only 3 blogs on the home page
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-realty">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="space-y-4">
            <p className="text-xs tracking-[0.4em] uppercase text-brand font-black">Latest Insights</p>
            <h2 className="text-4xl md:text-6xl text-slate-900 uppercase tracking-tighter font-serif">Market <span className="text-brand italic">Updates</span></h2>
            <p className="text-slate-400 max-w-md font-medium leading-relaxed">Expert tips on property management, investor guides, and real estate market insights in Noida.</p>
          </div>
          <Link 
            to="/blogs" 
            className="group flex items-center gap-3 text-[11px] font-black tracking-[0.2em] uppercase text-slate-900 bg-slate-50 px-8 py-4 rounded-full hover:bg-brand hover:text-white transition-all duration-500 shadow-sm self-start"
          >
            View All Articles <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {displayPosts.map((p) => (
            <Link 
              key={p.slug} 
              to="/blogs/$slug" 
              params={{ slug: p.slug }}
              className="group flex flex-col"
            >
              <div className="relative overflow-hidden rounded-[32px] aspect-[4/3] mb-6 bg-slate-100 shadow-sm border border-slate-50">
                <img 
                  src={p.img || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"} 
                  alt={p.title} 
                  loading="lazy" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop";
                  }}
                />
                <div className="absolute top-4 left-4">
                   <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">{p.cat}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                 <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-brand" /> {new Date(p.date || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                 <div className="flex items-center gap-1.5"><User className="w-3 h-3 text-brand" /> {p.author || 'Admin'}</div>
              </div>

              <h3 className="text-2xl text-slate-900 leading-tight group-hover:text-brand transition-colors duration-500 font-serif line-clamp-2 uppercase tracking-tight">{p.title}</h3>
              <p className="mt-4 text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">{p.excerpt}</p>
              
              <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-brand uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-500">
                 Read Full Article <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
