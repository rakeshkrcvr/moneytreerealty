import { ShieldCheck, Users, Cpu } from "lucide-react";

export function TrustSection() {
  const trustItems = [
    {
      title: "Why Trust Golden Door Realty?",
      desc: "Golden Door Realty is the best real estate consultant in India with a record number of sales, sustaining quality service with the help of our dedicated property consultants.",
      icon: (
        <div className="w-24 h-24 bg-[#004037] rounded-full flex items-center justify-center relative shadow-xl overflow-hidden group">
           <div className="absolute inset-0 border-4 border-[#c5a35d] rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
           <div className="text-center">
              <p className="text-[10px] font-black text-[#c5a35d] uppercase tracking-tighter leading-none">Trusted</p>
              <div className="h-[1px] w-12 bg-[#c5a35d] my-1 mx-auto" />
              <p className="text-[12px] font-black text-white uppercase tracking-wider">Partner</p>
              <div className="h-[1px] w-12 bg-[#c5a35d] my-1 mx-auto" />
              <p className="text-[10px] font-black text-[#c5a35d] uppercase tracking-tighter leading-none">Trusted</p>
           </div>
        </div>
      )
    },
    {
      title: "Customer Oriented",
      desc: "Our client-centric approach ensures properties tailored to your unique style, budget, and preferences – our promise as India's trusted property advisors.",
      icon: (
        <div className="w-24 h-24 bg-[#004037] rounded-full flex items-center justify-center shadow-xl">
           <Users className="w-12 h-12 text-[#c5a35d]" />
        </div>
      )
    },
    {
      title: "Tech Enabled",
      desc: "Discover your dream property with listings matching your lifestyle and budget, guided by experts who understand India's real estate market.",
      icon: (
        <div className="w-24 h-24 bg-[#004037] rounded-full flex items-center justify-center shadow-xl">
           <div className="relative">
              <Cpu className="w-12 h-12 text-[#c5a35d]" />
              <div className="absolute -top-1 -right-1 bg-white text-[#004037] text-[8px] px-1 font-black rounded border border-[#c5a35d]">AI</div>
           </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6 tracking-tight">
            Why <span className="text-[#004037]">250+ Families</span> Choose Golden Door
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Others may compete on price. We stand apart with our promise of <span className="font-bold text-slate-800">complete satisfaction</span>—from your first meeting to the day you step into your new home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {trustItems.map((item, i) => (
            <div key={i} className="text-center flex flex-col items-center">
              <div className="mb-8 transform transition-transform duration-500 hover:scale-110">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
