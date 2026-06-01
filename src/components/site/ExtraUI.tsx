import { Instagram, Youtube, Linkedin, Phone as Whatsapp, Facebook, Twitter } from "lucide-react";
import { useSiteSettings } from "./SiteSettingsContext";

export function NewsTicker() {
  const content = (
    <>
      <span className="text-[11px] font-bold uppercase tracking-widest mr-12 inline-flex items-center gap-3">
        🔥 SE EXTENSION ROAD • ULTRA-LUXURY 3 & 4 BHK STARTING ₹5.69 CR* • Prime Location • Exclusive & Limited Units • <button className="bg-white text-[#002a24] px-3 py-1 rounded text-[9px] font-black hover:bg-white/90 transition-colors">GRAB THE DEAL</button>
      </span>
      <span className="text-[11px] font-bold uppercase tracking-widest mr-12 inline-flex items-center gap-3">
        🔥 NOIDA SECTOR 150 • PREMIUM RESIDENTIAL PROJECTS • SPECIAL OFFERS FOR NEW LAUNCHES • <button className="bg-white text-[#002a24] px-3 py-1 rounded text-[9px] font-black hover:bg-white/90 transition-colors">ENQUIRE NOW</button>
      </span>
      <span className="text-[11px] font-bold uppercase tracking-widest mr-12 inline-flex items-center gap-3">
        🔥 GURUGRAM SECTOR 71 • SIGNATURE GLOBAL CLOVERDALE • STARTING ₹3.88 CR* • <button className="bg-white text-[#002a24] px-3 py-1 rounded text-[9px] font-black hover:bg-white/90 transition-colors">BOOK NOW</button>
      </span>
    </>
  );

  return (
    <div className="fixed top-[84px] left-0 w-full bg-[#002a24] text-white py-2.5 z-[99] overflow-hidden whitespace-nowrap border-y border-white/10 flex items-center">
      <div className="flex animate-marquee shrink-0">
        <div className="flex shrink-0">{content}</div>
        <div className="flex shrink-0">{content}</div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export function SocialSidebar() {
  const settings = useSiteSettings();
  const socialLinks = settings?.page_content?.social_links || {};
  const whatsappNumber = (settings?.whatsapp || "919732300007").replace(/\D/g, "");
  const socials = [
    { icon: Facebook, path: socialLinks.facebook || "#", color: "#1877F2" },
    { icon: Twitter, path: socialLinks.twitter || "#", color: "#1DA1F2" },
    { icon: Instagram, path: socialLinks.instagram || "#", color: "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #FCAF45 100%)" },
    { icon: Youtube, path: socialLinks.youtube || "#", color: "#FF0000" },
    { icon: Linkedin, path: socialLinks.linkedin || "#", color: "#0A66C2" },
    { icon: Whatsapp, path: socialLinks.whatsapp || `https://wa.me/${whatsappNumber}`, color: "#25D366" },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[1001] flex flex-col gap-3">
      {socials.map((s, i) => (
        <a 
          key={i} 
          href={s.path} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 backdrop-blur-md text-white flex items-center justify-center rounded-full border border-white/10 hover:scale-110 transition-all group shadow-xl"
          style={{ background: s.color }}
        >
          <s.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </a>
      ))}
    </div>
  );
}
