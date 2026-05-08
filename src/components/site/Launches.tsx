import { Link } from "@tanstack/react-router";

export function Launches({ properties }: { properties: any[] }) {
  const items = properties || [];
  
  return (
    <section className="py-24 bg-background">
      <div className="container-emaar">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.4em] uppercase text-brand mb-4">New</p>
          <h2 className="text-3xl md:text-5xl text-ink">Latest Launches</h2>
          <div className="mt-6 h-px w-16 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.length === 0 ? (
             <div className="col-span-3 py-10 text-center text-slate-300 font-bold uppercase tracking-widest italic">
                Awaiting new launches...
             </div>
          ) : (
            items.map((l) => (
              <Link
                key={l.slug}
                to="/launches/$slug"
                params={{ slug: l.slug }}
                className="group cursor-pointer block"
              >
                <div className="overflow-hidden aspect-[4/5] mb-5 bg-muted">
                  <img
                    src={l.img}
                    alt={l.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                </div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-brand mb-2">
                  {l.type} · {l.location}
                </p>
                <h3 className="text-2xl text-ink mb-2 group-hover:text-brand transition-colors">{l.title}</h3>
                <p className="text-sm text-muted-foreground">{l.price}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-ink border-b border-ink pb-1">
                  Discover
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
