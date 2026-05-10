import { useEffect, useState } from "react";
import { getAllDevelopers } from "@/lib/server-functions";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";

export function Developers() {
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const devs = await getAllDevelopers();
        setDevelopers(devs || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return null;
  if (developers.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4 block">Trusted By</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 uppercase tracking-tight">Our Premium Developers</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {developers.slice(0, 8).map((dev) => (
            <div 
              key={dev.id} 
              className="group bg-[#FAF9F6] p-8 rounded-[40px] border border-slate-100 hover:border-brand/20 transition-all duration-500 hover:shadow-2xl hover:shadow-brand/5 flex flex-col items-center text-center gap-6"
            >
              <div className="w-24 h-24 bg-white rounded-3xl border border-slate-100 p-4 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                {dev.logo_url ? (
                  <img src={dev.logo_url} alt={dev.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                ) : (
                  <Building2 className="w-10 h-10 text-slate-200" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs mb-2 group-hover:text-brand transition-colors">{dev.name}</h3>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{dev.properties_count || 'Luxury'} Projects</p>
              </div>
            </div>
          ))}
        </div>

        {developers.length > 8 && (
          <div className="mt-16 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">And many more leading industry partners...</p>
          </div>
        )}
      </div>
    </section>
  );
}
