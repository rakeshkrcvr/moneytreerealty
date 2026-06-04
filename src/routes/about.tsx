import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Golden Door Realty — Shaping the Future of Living" },
      { name: "description", content: "Discover Golden Door Realty's journey as Noida's leading master-developer of iconic real estate, retail, and hospitality destinations." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { v: "1997", l: "Founded" },
  { v: "$10B+", l: "Annual Revenue" },
  { v: "36+", l: "Markets Worldwide" },
  { v: "85K+", l: "Homes Delivered" },
];

function AboutPage() {
  const settings = useSiteSettings();
  const content = settings?.page_content?.about || {};

  const heroImage = content.hero_image || "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=2000";
  const heroSubtitle = content.hero_subtitle || "Shaping Skylines";
  const heroTitle = content.hero_title || "ABOUT GOLDEN DOOR REALTY";

  const overviewSubtitle = content.overview_subtitle || "Global Legacy";
  const overviewTitle = content.overview_title || "SHAPING THE FUTURE <br /> OF LIFESTYLES";
  const overviewDesc1 = content.overview_desc_1 || "Golden Door Realty is one of the world's most valuable and admired real estate development companies. With proven competencies in properties, shopping malls & retail and hospitality & leisure, Golden Door Realty shapes new lifestyles with a focus on design excellence, build quality and timely delivery.";
  const overviewDesc2 = content.overview_desc_2 || "Founded in 1997, Golden Door Realty has built an incredible legacy of building iconic landmarks in Noida and globally, most notably Burj Khalifa, the world's tallest building.";

  const missionTitle = content.mission_title || "Our Mission";
  const missionDesc = content.mission_desc || "To shape the future of urban living through innovative, premium and integrated lifestyle communities that redefine the standards of luxury and convenience.";
  const visionTitle = content.vision_title || "Our Vision";
  const visionDesc = content.vision_desc || "To be the most valuable lifestyle real estate developer globally, delivering sustainable value to our stakeholders and shaping the world of tomorrow.";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src={heroImage} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="container-realty relative z-10 text-center text-white">
          <p className="text-xs tracking-[0.5em] uppercase mb-6 text-gold">{heroSubtitle}</p>
          <h1 className="text-5xl md:text-8xl tracking-tight uppercase" style={{ fontFamily: "var(--font-serif)" }} dangerouslySetInnerHTML={{ __html: heroTitle }} />
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-background">
        <div className="container-realty grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-brand mb-6">{overviewSubtitle}</p>
            <h2 className="text-3xl md:text-5xl text-ink uppercase mb-8" style={{ fontFamily: "var(--font-serif)" }} dangerouslySetInnerHTML={{ __html: overviewTitle }} />
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>{overviewDesc1}</p>
              <p>{overviewDesc2}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {stats.map((s) => (
              <div key={s.l} className="bg-surface p-10 border border-border text-center">
                <p className="text-4xl text-brand mb-2" style={{ fontFamily: "var(--font-serif)" }}>{s.v}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-ink text-white">
        <div className="container-realty grid md:grid-cols-2 gap-16">
          <div className="p-12 border border-white/10 bg-white/5">
            <h3 className="text-3xl mb-6 text-gold uppercase" style={{ fontFamily: "var(--font-serif)" }}>{missionTitle}</h3>
            <p className="text-xl font-light leading-relaxed text-white/80">
              {missionDesc}
            </p>
          </div>
          <div className="p-12 border border-white/10 bg-white/5">
            <h3 className="text-3xl mb-6 text-gold uppercase" style={{ fontFamily: "var(--font-serif)" }}>{visionTitle}</h3>
            <p className="text-xl font-light leading-relaxed text-white/80">
              {visionDesc}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
