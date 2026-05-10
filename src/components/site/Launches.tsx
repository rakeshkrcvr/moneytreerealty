import { Link } from "@tanstack/react-router";

export function Launches({ items = [] }: { items?: any[] }) {
  const displayItems = items.length > 0 ? items.slice(0, 3) : [
    {
      slug: "seascape",
      title: "Seascape at Rashid Yachts & Marina",
      location: "Mina Rashid",
      price: "From ₹ 1.4M",
      type: "Apartments",
      img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000"
    },
    {
      slug: "creek-edge",
      title: "Creek Edge",
      location: "Dubai Creek Harbour",
      price: "From ₹ 1.2M",
      type: "Apartments",
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      slug: "hills-park",
      title: "Hills Park",
      location: "Dubai Hills Estate",
      price: "From ₹ 1.1M",
      type: "Apartments",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container-realty">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.4em] uppercase text-brand mb-4">New</p>
          <h2 className="text-3xl md:text-5xl text-ink">Latest Launches</h2>
          <div className="mt-6 h-px w-16 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayItems.map((l: any) => (
            <Link
              key={l.slug}
              to="/property/$slug"
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
          ))}
        </div>
      </div>
    </section>
  );
}
