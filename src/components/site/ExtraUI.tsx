import { Instagram, Youtube, Linkedin, Phone as Whatsapp, Heart } from "lucide-react";

export function NewsTicker() {
  return (
    <div className="fixed top-[72px] left-0 w-full bg-[#002a24] text-white py-1.5 z-[999] overflow-hidden whitespace-nowrap border-y border-white/5">
      <div className="inline-block animate-marquee px-4">
        <span className="text-[11px] font-bold uppercase tracking-widest mr-12 inline-flex items-center gap-2">
          🔥 SE EXTENSION ROAD • ULTRA-LUXURY 3 & 4 BHK STARTING ₹5.69 CR* • Prime Location • Exclusive & Limited Units • <button className="bg-white text-[#002a24] px-3 py-0.5 rounded text-[9px] hover:bg-white/90 transition-colors">GRAB THE DEAL</button>
        </span>
        <span className="text-[11px] font-bold uppercase tracking-widest mr-12 inline-flex items-center gap-2">
          🔥 NOIDA SECTOR 150 • PREMIUM RESIDENTIAL PROJECTS • SPECIAL OFFERS FOR NEW LAUNCHES • <button className="bg-white text-[#002a24] px-3 py-0.5 rounded text-[9px] hover:bg-white/90 transition-colors">ENQUIRE NOW</button>
        </span>
        <span className="text-[11px] font-bold uppercase tracking-widest mr-12 inline-flex items-center gap-2">
          🔥 GURUGRAM SECTOR 71 • SIGNATURE GLOBAL CLOVERDALE • STARTING ₹3.88 CR* • <button className="bg-white text-[#002a24] px-3 py-0.5 rounded text-[9px] hover:bg-white/90 transition-colors">BOOK NOW</button>
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

export function SocialSidebar() {
  const socials = [
    { icon: Heart, color: "bg-slate-400", path: "#" },
    { icon: Instagram, color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600", path: "#" },
    { icon: Youtube, color: "bg-red-600", path: "#" },
    { icon: Linkedin, color: "bg-blue-600", path: "#" },
    { icon: Whatsapp, color: "bg-green-500", path: "https://wa.me/919732300007" },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[1001] flex flex-col gap-3">
      {socials.map((s, i) => (
        <a 
          key={i} 
          href={s.path} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`w-10 h-10 ${s.color} text-white flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95`}
        >
          <s.icon className="w-5 h-5" />
        </a>
      ))}
      <div className="w-10 h-10 bg-[#004037] text-white flex items-center justify-center rounded-full shadow-lg border-2 border-white/20 animate-bounce cursor-pointer">
        <img src="https://moneytreerealty.com/assets/img/logo.png" className="w-6 h-6 object-contain brightness-0 invert" alt="logo" />
      </div>
    </div>
  );
}
