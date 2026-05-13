import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Users, Briefcase, Newspaper, ArrowRight, CheckCircle2 } from "lucide-react";
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

const team = [
  { name: "Mohamed Alabbar", role: "Founder & Chairman", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
  { name: "Amit Jain", role: "Group CEO", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
  { name: "Sarah Al Qasimi", role: "Chief Strategy Officer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
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

      {/* Our Team */}
      <section className="py-24 bg-background">
        <div className="container-realty text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-brand mb-6">Leadership</p>
          <h2 className="text-3xl md:text-5xl text-ink uppercase mb-16" style={{ fontFamily: "var(--font-serif)" }}>MEET OUR TEAM</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {team.map((t) => (
              <div key={t.name} className="group">
                <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 mb-6">
                  <img src={t.img} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl text-ink uppercase tracking-widest">{t.name}</h4>
                <p className="text-xs uppercase tracking-widest text-brand mt-2">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container-realty grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl text-ink uppercase mb-8" style={{ fontFamily: "var(--font-serif)" }}>CAREERS AT GOLDEN DOOR REALTY</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Join a team of visionaries and innovators. We are always looking for passionate individuals who want to help us shape the future of real estate.
            </p>
            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-3 text-ink"><CheckCircle2 className="w-5 h-5 text-brand" /> Inclusive Work Environment</li>
              <li className="flex items-center gap-3 text-ink"><CheckCircle2 className="w-5 h-5 text-brand" /> Global Growth Opportunities</li>
              <li className="flex items-center gap-3 text-ink"><CheckCircle2 className="w-5 h-5 text-brand" /> Professional Development</li>
            </ul>
            <button className="bg-ink text-white px-10 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-brand transition flex items-center gap-2">
              Explore Openings <Briefcase className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
             <div className="aspect-video bg-muted">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-8 -left-8 bg-brand p-8 text-white">
                <p className="text-4xl font-light">500+</p>
                <p className="text-[10px] uppercase tracking-widest">Active Employees</p>
             </div>
          </div>
        </div>
      </section>

      {/* Press & Media */}
      <section className="py-24 bg-background">
        <div className="container-realty">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-brand mb-4">Latest Updates</p>
              <h2 className="text-3xl md:text-5xl text-ink uppercase" style={{ fontFamily: "var(--font-serif)" }}>PRESS & MEDIA</h2>
            </div>
            <button className="text-[11px] font-bold tracking-[0.18em] uppercase text-ink border-b border-ink pb-1 flex items-center gap-2 hover:text-brand hover:border-brand transition">
              Media Centre <Newspaper className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              { t: "Golden Door Realty Announces Record Revenue for Q1 2026", d: "A 15% increase compared to previous year, driven by strong international sales.", date: "May 12, 2026" },
              { t: "New Landmark Launch in Noida Creek Harbour", d: "The latest residential tower promises a new standard of luxury living.", date: "April 28, 2026" }
            ].map((n, i) => (
              <div key={i} className="p-10 border border-border hover:border-brand transition group cursor-pointer">
                <p className="text-[10px] uppercase text-brand mb-4">{n.date}</p>
                <h3 className="text-2xl text-ink uppercase tracking-wider mb-6 group-hover:text-brand transition-colors">{n.t}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{n.d}</p>
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink group-hover:gap-4 transition-all">Read More <ArrowRight className="w-4 h-4" /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
