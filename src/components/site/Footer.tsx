import { Link } from "@tanstack/react-router";
import { useSiteSettings } from "./SiteSettingsContext";

const cols = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Sustainability", to: "/sustainability" },
      { label: "Careers", to: "/careers" },
      { label: "Investor Relations", to: "/investor-relations" },
      { label: "Newsroom", to: "/newsroom" },
    ],
  },
  {
    title: "Properties",
    links: [
      { label: "Apartments", to: "/properties/apartments" },
      { label: "Villas", to: "/properties/villas" },
      { label: "Townhouses", to: "/properties/townhouses" },
      { label: "Commercial", to: "/properties/commercial" },
      { label: "Hospitality", to: "/properties/hospitality" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "Customer Service", to: "/customer-service" },
      { label: "Brokers", to: "/brokers" },
      { label: "FAQs", to: "/faqs" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
] as const;

export function Footer() {
  const settings = useSiteSettings();
  return (
    <footer className="bg-ink text-white/80 pt-20 pb-8">
      <div className="container-realty">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="text-3xl font-bold tracking-[0.15em] text-white" style={{ fontFamily: "var(--font-serif)" }}>
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt="Logo" className="h-16 w-auto object-contain mb-4" />
              ) : (
                <>E<span className="text-brand">M</span>AAR</>
              )}
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-white/60 max-w-xs">
              Shaping skylines and lifestyles since 1997 — Dubai's leading
              master-developer.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4
                className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {c.title}
              </h4>
              <ul className="space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="hover:text-white transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Golden Door Realty. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
