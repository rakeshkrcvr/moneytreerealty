import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import hero from "@/assets/community-marina.jpg";
import { completed } from "@/lib/site-data";

export const Route = createFileRoute("/completed/")({
  head: () => ({
    meta: [
      { title: "Recently Completed Projects — Golden Door Realty" },
      { name: "description", content: "Tour Golden Door Realty's most recently handed-over residential and lifestyle projects across Dubai." },
      { property: "og:title", content: "Recently Completed — Golden Door Realty" },
      { property: "og:description", content: "Move-in ready homes from Dubai's leading developer." },
    ],
  }),
  component: CompletedPage,
});

function CompletedPage() {
  return (
    <PageShell
      eyebrow="Move-In Ready"
      title="Recently Completed"
      intro="Step inside our most recently handed-over communities — keys ready, lifestyle delivered."
      heroImg={hero}
    >
      <section className="py-24 bg-background">
        <div className="container-realty grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {completed.map((p) => (
            <Link key={p.slug} to="/completed/$slug" params={{ slug: p.slug }} className="group cursor-pointer block">
              <div className="relative overflow-hidden aspect-[4/3] mb-5">
                <img src={p.img} alt={p.title} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                <span className="absolute top-4 left-4 bg-background/90 text-ink text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                  Handed Over · {p.year}
                </span>
              </div>
              <h3 className="text-2xl text-ink mb-1 group-hover:text-brand transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.location}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
