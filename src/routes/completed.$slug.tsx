import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { completed } from "@/lib/site-data";

export const Route = createFileRoute("/completed/$slug")({
  head: ({ params }) => {
    const p = completed.find((x) => x.slug === params.slug);
    const title = p ? `${p.title} — ${p.location} | Emaar` : "Completed Project — Emaar";
    const desc = p?.description ?? "Move-in ready homes from Emaar.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: p?.img },
      ],
    };
  },
  loader: ({ params }) => {
    const p = completed.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4" style={{ fontFamily: "var(--font-serif)" }}>Project not found</h1>
        <Link to="/completed" className="text-brand underline">Back to projects</Link>
      </div>
    </div>
  ),
  component: CompletedDetail,
});

function CompletedDetail() {
  const p = Route.useLoaderData();
  return (
    <PageShell eyebrow={`Handed Over · ${p.year}`} title={p.title} intro={p.description} heroImg={p.img}>
      <section className="py-24 bg-background">
        <div className="container-emaar grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-brand mb-4">Overview</p>
            <h2 className="text-3xl md:text-4xl text-ink mb-6" style={{ fontFamily: "var(--font-serif)" }}>{p.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{p.description}</p>
            <p className="text-muted-foreground leading-relaxed">
              Located in {p.location}, this Emaar development was handed over in {p.year} and forms part of a
              thriving, fully serviced community with retail, leisure and connectivity built in.
            </p>
          </div>
          <div className="bg-surface p-8 space-y-4">
            <div className="flex justify-between border-b pb-4"><span className="text-muted-foreground">Status</span><span className="text-ink font-medium">Handed Over</span></div>
            <div className="flex justify-between border-b pb-4"><span className="text-muted-foreground">Year</span><span className="text-ink font-medium">{p.year}</span></div>
            <div className="flex justify-between border-b pb-4"><span className="text-muted-foreground">Location</span><span className="text-ink font-medium">{p.location}</span></div>
            <Link to="/contact" className="block mt-6 text-[11px] font-semibold tracking-[0.18em] uppercase text-ink border-b border-ink pb-1 hover:text-brand hover:border-brand transition w-fit">
              Resale Enquiry
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container-emaar">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl md:text-4xl text-ink" style={{ fontFamily: "var(--font-serif)" }}>More completed projects</h2>
            <Link to="/completed" className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink border-b border-ink pb-1 hover:text-brand hover:border-brand transition">View all</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {completed.filter((x) => x.slug !== p.slug).slice(0, 3).map((o) => (
              <Link key={o.slug} to="/completed/$slug" params={{ slug: o.slug }} className="group">
                <div className="overflow-hidden aspect-[4/3] mb-4">
                  <img src={o.img} alt={o.title} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                </div>
                <h3 className="text-xl text-ink group-hover:text-brand transition-colors">{o.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{o.location} · {o.year}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
