import { useEffect, useState } from "react";
import { getAllDevelopers } from "@/lib/server-functions";
import { Building2 } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

export function Developers() {
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const devs = await getAllDevelopers();
        // Duplicate for seamless marquee
        setDevelopers([...(devs || []), ...(devs || [])]);
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
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-[900] text-slate-800 tracking-tight">
          Backed by <span className="text-[#004037]">India's most trusted developers</span>
        </h2>
      </div>

      <div className="space-y-6">
        {/* Row 1 */}
        <div className="relative overflow-hidden w-full" style={{ display: 'flex' }}>
          <div className="flex animate-marquee py-2" style={{ display: 'flex', flexWrap: 'nowrap' }}>
            {developers.map((dev, idx) => (
              <div 
                key={`${dev.id}-row1-${idx}`} 
                className="mx-3 bg-white rounded-2xl border border-slate-100 flex items-center justify-center p-6 shadow-sm hover:shadow-md transition-all duration-300 shrink-0"
                style={{ width: '200px', height: '110px', flexShrink: 0 }}
              >
                <ImageWithFallback 
                  src={dev.logo_url} 
                  alt={dev.name} 
                  className="w-full h-full object-contain"
                  fallback="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative overflow-hidden w-full" style={{ display: 'flex' }}>
          <div className="flex animate-marquee py-2" style={{ display: 'flex', flexWrap: 'nowrap', animationDirection: 'reverse' }}>
            {developers.map((dev, idx) => (
              <div 
                key={`${dev.id}-row2-${idx}`} 
                className="mx-3 bg-white rounded-2xl border border-slate-100 flex items-center justify-center p-6 shadow-sm hover:shadow-md transition-all duration-300 shrink-0"
                style={{ width: '200px', height: '110px', flexShrink: 0 }}
              >
                <ImageWithFallback 
                  src={dev.logo_url} 
                  alt={dev.name} 
                  className="w-full h-full object-contain"
                  fallback="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
