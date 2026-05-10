import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Home, Key, Headset, Calculator, Building, Scale, ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Golden Door Realty" },
      { name: "description", content: "Explore premium real estate services offered by Golden Door Realty, including property management, mortgage advisory, and luxury concierge services." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: <Home className="w-8 h-8 text-brand" />,
    title: "Property Management",
    desc: "End-to-end property management ensuring high yields and peace of mind for landlords, including tenant screening, maintenance, and rent collection."
  },
  {
    icon: <Key className="w-8 h-8 text-brand" />,
    title: "Buying & Selling",
    desc: "Expert advisory for buyers and sellers of premium off-plan and secondary market properties across exclusive Dubai communities."
  },
  {
    icon: <Building className="w-8 h-8 text-brand" />,
    title: "Commercial Leasing",
    desc: "Strategic commercial property solutions including office spaces, retail units, and industrial leasing for global enterprises."
  },
  {
    icon: <Calculator className="w-8 h-8 text-brand" />,
    title: "Mortgage Advisory",
    desc: "Tailored financing solutions through our network of leading banks, offering competitive rates and seamless approval processes."
  },
  {
    icon: <Headset className="w-8 h-8 text-brand" />,
    title: "Luxury Concierge",
    desc: "Bespoke relocation and lifestyle management services for high-net-worth individuals moving to the UAE."
  },
  {
    icon: <Scale className="w-8 h-8 text-brand" />,
    title: "Legal & Conveyancing",
    desc: "Secure transaction management, SPA reviews, and complete conveyancing support through authorized legal partners."
  }
];

function ServicesPage() {
  const settings = useSiteSettings();
  const content = settings?.page_content?.services || {};

  const heroImage = content.hero_image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000";
  const heroSubtitle = content.hero_subtitle || "Premium Solutions";
  const heroTitle = content.hero_title || "OUR SERVICES";
  const overviewSubtitle = content.overview_subtitle || "What We Offer";
  const overviewTitle = content.overview_title || "COMPREHENSIVE REAL ESTATE EXPERTISE";
  const ctaTitle = content.cta_title || "READY TO GET STARTED?";
  const ctaDesc = content.cta_desc || "Speak with our property consultants today to discover how our tailored services can help you achieve your real estate goals.";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <img 
          src={heroImage} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="container-realty relative z-10 text-center text-white">
          <p className="text-xs tracking-[0.5em] uppercase mb-6 text-gold">{heroSubtitle}</p>
          <h1 className="text-5xl md:text-8xl tracking-tight uppercase" style={{ fontFamily: "var(--font-serif)" }}>
            {heroTitle}
          </h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-surface">
        <div className="container-realty">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.4em] uppercase text-brand mb-6">{overviewSubtitle}</p>
            <h2 className="text-3xl md:text-5xl text-ink uppercase max-w-3xl mx-auto" style={{ fontFamily: "var(--font-serif)" }}>
              {overviewTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-10 border border-border group hover:border-brand hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="text-xl uppercase tracking-wider text-ink mb-4">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                  {s.desc}
                </p>
                <div className="w-full h-[1px] bg-border mb-6 group-hover:bg-brand/20 transition-colors" />
                <button className="text-[10px] font-bold uppercase tracking-widest text-ink flex items-center gap-2 group-hover:gap-4 transition-all">
                  Learn More <ArrowRight className="w-4 h-4 text-brand" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-ink text-white text-center">
        <div className="container-realty max-w-3xl">
          <h2 className="text-3xl md:text-5xl uppercase mb-8" style={{ fontFamily: "var(--font-serif)" }}>
            {ctaTitle}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-12">
            {ctaDesc}
          </p>
          <button 
            className="bg-brand text-white px-10 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-ink transition duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Request Consultation
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
