import { Link } from "@tanstack/react-router";

export function Communities({ types }: { types: any[] }) {
  const displayTypes = types || [];

  return (
    <section className="py-24 bg-surface">
      <div className="container-emaar">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
          <h2 className="text-3xl md:text-5xl text-ink uppercase tracking-tight">Our <span className="text-brand italic">Communities</span></h2>
          <p className="text-sm text-muted-foreground max-w-sm">Discover master-planned developments that redefine luxury living in the heart of the city.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayTypes.length === 0 ? (
             <div className="col-span-4 py-10 text-center text-slate-200 uppercase font-black tracking-widest">No Communities Defined</div>
          ) : (
            displayTypes.map((c) => (
              <Link 
                key={c.id} 
                to="/communities" 
                className="group relative aspect-square overflow-hidden bg-muted flex items-center justify-center p-8 text-center"
              >
                <div className="absolute inset-0 bg-ink/5 group-hover:bg-brand/90 transition-colors duration-500" />
                <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                   <h3 className="text-xl md:text-2xl text-ink group-hover:text-white uppercase tracking-tighter font-serif transition-colors">{c.name}</h3>
                   <div className="w-8 h-px bg-brand group-hover:bg-white mx-auto mt-4" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
