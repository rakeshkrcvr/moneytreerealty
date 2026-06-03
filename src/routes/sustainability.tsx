import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";
import { Leaf, Sun, Droplets, Building2 } from "lucide-react";
import hero from "@/assets/community-hills.jpg";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability — Golden Door Realty" },
      { name: "description", content: "Golden Door Realty's commitment to sustainable development — green communities, energy efficiency and responsible business practices." },
      { property: "og:title", content: "Sustainability — Golden Door Realty" },
      { property: "og:description", content: "Building a sustainable future for Noida." },
    ],
  }),
  component: SustainabilityPage,
});

const pillars = [
  { i: Leaf, t: "Green Communities", d: "Native landscaping, urban forests and walkable, mixed-use neighbourhoods." },
  { i: Sun, t: "Energy Efficiency", d: "Solar generation, smart-grid pilots and LEED-certified developments." },
  { i: Droplets, t: "Water Conservation", d: "Recycled greywater, smart irrigation and low-flow fixtures across our portfolio." },
  { i: Building2, t: "Responsible Build", d: "Sustainable materials, low-carbon concrete and zero-waste construction goals." },
];

function SustainabilityPage() {
  const settings = useSiteSettings();
  const content = settings?.page_content?.sustainability || {};
  const firstSection = content.sections?.[0] || {};

  return (
    <PageShell
      eyebrow={content.eyebrow || "Our Commitment"}
      title={content.title || "Sustainability"}
      intro={content.intro || "Designing communities that respect the environment and elevate quality of life."}
      heroImg={content.heroImg || hero}
    >
      <section className="py-24 bg-background">
        <div className="container-realty grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-brand mb-6">2030 Vision</p>
            <h2 className="text-3xl md:text-5xl text-ink mb-6">{firstSection.heading || "Building a Better Tomorrow"}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {firstSection.body || "Sustainability is at the heart of how we plan, build and operate. Aligned with the UN Sustainable Development Goals and the UAE Net Zero 2050 strategy, we're creating communities that prove luxury and responsibility can co-exist."}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-surface"><p className="text-3xl text-brand" style={{ fontFamily: "var(--font-serif)" }}>40%</p><p className="mt-2 text-xs tracking-widest uppercase text-muted-foreground">Carbon Cut</p></div>
            <div className="p-6 bg-surface"><p className="text-3xl text-brand" style={{ fontFamily: "var(--font-serif)" }}>30M+</p><p className="mt-2 text-xs tracking-widest uppercase text-muted-foreground">Litres Saved</p></div>
            <div className="p-6 bg-surface"><p className="text-3xl text-brand" style={{ fontFamily: "var(--font-serif)" }}>12</p><p className="mt-2 text-xs tracking-widest uppercase text-muted-foreground">LEED Towers</p></div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container-realty">
          <h2 className="text-3xl md:text-4xl text-ink text-center mb-14">Our Pillars</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p) => (
              <div key={p.t} className="bg-background p-8">
                <p.i className="w-8 h-8 text-brand mb-5" />
                <h3 className="text-xl text-ink mb-3">{p.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
