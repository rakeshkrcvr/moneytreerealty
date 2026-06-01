import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Phone, Mail, MapPin, Eye, ChevronRight } from "lucide-react";
import { useSiteSettings } from "./SiteSettingsContext";
import { useEffect, useState } from "react";
import { createLead } from "../../lib/server-functions";
import { toast } from "sonner";

export function Footer() {
  const settings = useSiteSettings();
  const [logoFailed, setLogoFailed] = useState(false);
  const logoUrl = settings?.logo_url || "";

  useEffect(() => {
    setLogoFailed(false);
  }, [logoUrl]);
  
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
              {logoUrl && !logoFailed ? (
                <img
                  src={logoUrl}
                  alt="Golden Door"
                  className="h-16 w-auto max-w-[220px] object-contain"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <span className="text-xl font-semibold tracking-tight text-white">
                  Golden Door
                </span>
              )}
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
                <a href="mailto:customercare@goldendoorrealty.com" className="text-sm hover:text-[#c5a35d] transition-colors">customercare@goldendoorrealty.com</a>
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


            {/* Lead Form */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold mb-2">Get Expert Advice</h4>
                <p className="text-xs text-white/50 leading-relaxed">Leave your details and our property experts will contact you shortly.</p>
              </div>
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  try {
                    await createLead({
                      data: {
                        name: formData.get("name") as string,
                        phone: formData.get("phone") as string,
                        email: formData.get("email") as string,
                        source: "Footer Form"
                      }
                    });
                    toast.success("Thank you! Our experts will call you soon.");
                    form.reset();
                  } catch (err) {
                    toast.error("Failed to send enquiry. Please try again.");
                  }
                }}
                className="space-y-3"
              >
                <input required name="name" type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-[#c5a35d] transition-all" />
                <input required name="phone" type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-[#c5a35d] transition-all" />
                <input required name="email" type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-[#c5a35d] transition-all" />
                <button type="submit" className="w-full bg-[#f37e01] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95">
                  Send Enquiry
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-white/30 text-center uppercase tracking-widest">Expert consultation is just a click away</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col items-center gap-6 text-center">
           <p className="text-sm text-white/60">
              © {new Date().getFullYear()}, All rights reserved. <span className="font-bold text-white">Golden Door Realty Services Limited</span>
           </p>
           <p className="text-[10px] text-white/40 max-w-4xl leading-relaxed uppercase tracking-widest">
              RERA: UP - UPRERAAGT25048 | Haryana - RC/HARERA/GGM/2569/2164/2024/282 | Maharashtra - A041172401062
           </p>
        </div>
      </div>
    </footer>
  );
}
