export function Blog({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) return null;
  
  return (
    <section className="py-24 bg-surface">
      <div className="container-emaar">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-brand mb-4">Insights</p>
            <h2 className="text-3xl md:text-5xl text-ink max-w-xl">Discover our Blogs</h2>
            <p className="mt-4 text-muted-foreground max-w-md">Expert tips on property management, investor guides, and market insights.</p>
          </div>
          <a href="#" className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink border-b border-ink pb-1 hover:text-brand hover:border-brand transition self-start">View All</a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article key={p.slug} className="group cursor-pointer">
              <div className="overflow-hidden aspect-[4/3] mb-5">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-brand mb-3">{p.cat} · {p.date}</p>
              <h3 className="text-xl text-ink leading-snug group-hover:text-brand transition-colors">{p.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
