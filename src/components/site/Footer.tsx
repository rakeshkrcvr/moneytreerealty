import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Phone, Mail, MapPin, Eye, ChevronRight } from "lucide-react";
import { useSiteSettings } from "./SiteSettingsContext";

export function Footer() {
  const settings = useSiteSettings();
  
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Properties", to: "/properties" },
    { label: "Our Services", to: "/services" },
    { label: "Contact", to: "/contact" },
    { label: "Careers", to: "/careers" },
    { label: "Latest News", to: "/blogs" },
    { label: "Events", to: "/events" },
    { label: "Awards & Recognition", to: "/awards" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms & Conditions", to: "/terms" },
    { label: "CSR Policy", to: "/csr" },
    { label: "Sitemap", to: "/sitemap" },
    { label: "PinCode Finder", to: "/pincode-finder" },
  ];

  return (
    <footer className="bg-[#003029] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Background Pattern (Simple cross pattern in CSS) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-8">
            <Link to="/">
               <img src={settings?.logo_url || "https://moneytreerealty.com/assets/img/logo.png"} alt="MoneyTree" className="h-16 w-auto object-contain" />
            </Link>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-[#c5a35d] shrink-0 mt-1" />
                <p className="text-sm text-white/70 leading-relaxed">
                  Floor No-2, Tower B, Tapasya Corp Heights, Sector 126, Noida, Uttar Pradesh - 201303
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-[#c5a35d] shrink-0" />
                <a href="tel:+919732300007" className="text-sm font-bold hover:text-[#c5a35d] transition-colors">+91-9732 300 007</a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-[#c5a35d] shrink-0" />
                <a href="mailto:customercare@moneytreerealty.com" className="text-sm hover:text-[#c5a35d] transition-colors">customercare@moneytreerealty.com</a>
              </div>
            </div>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#c5a35d] hover:border-[#c5a35d] transition-all group">
                  <Icon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              Quick Links
              <span className="h-[2px] w-12 bg-[#c5a35d] inline-block" />
            </h4>
            <ul className="space-y-4">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to as any} className="text-sm text-white/60 hover:text-white hover:pl-2 transition-all flex items-center gap-2">
                     <ChevronRight className="w-3 h-3 text-[#c5a35d]" />
                     {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Info */}
          <div>
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              Legal & Info
              <span className="h-[2px] w-12 bg-[#c5a35d] inline-block" />
            </h4>
            <ul className="space-y-4">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to as any} className="text-sm text-white/60 hover:text-white hover:pl-2 transition-all flex items-center gap-2">
                     <ChevronRight className="w-3 h-3 text-[#c5a35d]" />
                     {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Visitor */}
          <div className="space-y-10">
            {/* Visitor Counter */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-4 h-4 text-[#c5a35d]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">Visitor No.</span>
               </div>
               <div className="flex gap-1.5 justify-center">
                  {"000944288".split('').map((num, i) => (
                    <div key={i} className="w-7 h-10 bg-white text-[#003029] rounded-lg flex items-center justify-center font-black text-xl shadow-inner">
                      {num}
                    </div>
                  ))}
               </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold mb-2">Stay Updated</h4>
                <p className="text-xs text-white/50 leading-relaxed">Get exclusive property insights, market trends & investment opportunities delivered to your inbox.</p>
              </div>
              <div className="space-y-3">
                <input type="email" placeholder="Enter your email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[#c5a35d] transition-all" />
                <button className="w-full bg-[#f37e01] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95">
                  Subscribe
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-white/30 text-center">We respect your privacy. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col items-center gap-6 text-center">
           <p className="text-sm text-white/60">
              © {new Date().getFullYear()}, All rights reserved. <span className="font-bold text-white">Moneytree Realty Services Limited</span>
           </p>
           <p className="text-[10px] text-white/40 max-w-4xl leading-relaxed uppercase tracking-widest">
              RERA: UP - UPRERAAGT25048 | Haryana - RC/HARERA/GGM/2569/2164/2024/282 | Maharashtra - A041172401062
           </p>
        </div>
      </div>
    </footer>
  );
}
