import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  MapPin, BedDouble, Building2, PlayCircle, Calculator, User, Star,
  Calendar, Clock, Phone, Mail, Waves, Dumbbell, TreePine,
  ShieldCheck, Car, Sparkles, Utensils, Store, ChevronRight,
  FileText, Compass, Info, MessageCircle, ArrowRight
} from "lucide-react";
import { getLaunchBySlug, getAllLaunches, getAllCommunities, createLead } from "@/lib/server-functions";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Icon Map for Dynamic Amenities
const IconMap: Record<string, any> = {
  Waves, Dumbbell, TreePine, ShieldCheck, Car, Sparkles, Utensils, Store, Building2
};

export const Route = createFileRoute("/launches/$slug")({
  loader: async ({ params }) => {
    const l = await getLaunchBySlug(params.slug);
    if (!l) throw notFound();
    const allL = await getAllLaunches();
    const allC = await getAllCommunities();
    return { 
      l, 
      others: allL.filter(p => p.slug !== params.slug).slice(0, 3),
      nearbyCommunities: allC.slice(0, 2)
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { l, others } = Route.useLoaderData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFloorPlan, setActiveFloorPlan] = useState(l.floor_plans?.[0]?.type || "Default");

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [tenure, setTenure] = useState(25);
  
  const monthlyEMI = useMemo(() => {
    const principal = loanAmount * (1 - downPayment / 100);
    const rate = interestRate / 100 / 12;
    const months = tenure * 12;
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return Math.round(emi);
  }, [loanAmount, downPayment, interestRate, tenure]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    setIsSubmitting(true);
    try {
      await createLead({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        property_slug: l.slug
      });
      toast.success("Enquiry submitted successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Failed to submit enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-20 font-sans selection:bg-brand selection:text-white">
      <Header />

      {/* 1. Property Gallery (Hero Slider Style) */}
      <section className="relative h-[85vh] overflow-hidden group">
         <img src={l.gallery?.[0] || l.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
         <div className="absolute bottom-20 left-0 w-full">
            <div className="container-emaar">
               <p className="text-brand font-bold uppercase tracking-[0.5em] text-[10px] mb-6 animate-fade-in">{l.category} Series</p>
               <h1 className="text-6xl md:text-9xl text-white uppercase tracking-tighter mb-8" style={{ fontFamily: "var(--font-serif)" }}>{l.title}</h1>
               <div className="flex gap-10 items-center text-white/70 text-[11px] uppercase tracking-widest font-bold">
                  <span className="flex items-center gap-3"><MapPin className="w-5 h-5 text-brand" /> {l.location}</span>
                  <span className="flex items-center gap-3 border-l border-white/20 pl-10"><Building2 className="w-5 h-5 text-brand" /> {l.type}</span>
                  <span className="flex items-center gap-3 border-l border-white/20 pl-10"><Star className="w-5 h-5 text-gold fill-gold" /> 4.9 (120 Reviews)</span>
               </div>
            </div>
         </div>
      </section>

      <div className="container-emaar grid lg:grid-cols-3 gap-24 py-24 relative">
        <div className="lg:col-span-2 space-y-32">
          
          {/* 3. Property Description */}
          <section id="description" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
               <div className="h-[1px] w-12 bg-brand"></div>
               <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-brand">The Residence</h2>
            </div>
            <div className="prose max-w-none">
               <p className="text-2xl md:text-3xl text-slate-700 leading-relaxed font-light font-serif">{l.description}</p>
            </div>
          </section>

          {/* 2. Video Tour */}
          {l.video_url && (
            <section id="video" className="scroll-mt-32">
               <h2 className="text-2xl uppercase tracking-widest mb-10 font-serif">Video Presentation</h2>
               <div className="relative aspect-video group overflow-hidden rounded-sm shadow-2xl">
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src={l.video_url} 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
               </div>
            </section>
          )}

          {/* 4. Amenities */}
          <section id="amenities" className="scroll-mt-32">
             <h2 className="text-2xl uppercase tracking-widest mb-12 font-serif">Luxury Amenities</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                {l.amenities?.map((a: any, i: number) => {
                  const Icon = IconMap[a.icon] || Sparkles;
                  return (
                    <div key={i} className="flex flex-col items-center gap-4 p-10 bg-white border border-slate-100 hover:bg-brand hover:text-white transition-all duration-500 group">
                      <Icon className="w-8 h-8 text-brand group-hover:text-white transition-colors" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-center">{a.label}</span>
                    </div>
                  );
                })}
             </div>
          </section>

          {/* 5. Floor Plans */}
          <section id="floorplans" className="scroll-mt-32">
             <h2 className="text-2xl uppercase tracking-widest mb-12 font-serif">Floor Plans</h2>
             <div className="bg-white border border-slate-100 p-2">
                <div className="flex bg-slate-50 border-b border-slate-100 overflow-x-auto">
                   {l.floor_plans?.map((f: any) => (
                      <button 
                        key={f.type} 
                        onClick={() => setActiveFloorPlan(f.type)}
                        className={`px-10 py-6 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all ${activeFloorPlan === f.type ? "bg-brand text-white shadow-lg" : "text-slate-400 hover:text-slate-600 hover:bg-white"}`}
                      >
                        {f.type}
                      </button>
                   ))}
                </div>
                <div className="p-16 flex items-center justify-center min-h-[500px]">
                   <img 
                      src={l.floor_plans?.find((f: any) => f.type === activeFloorPlan)?.img || l.img} 
                      className="max-h-[600px] object-contain animate-fade-in" 
                    />
                </div>
             </div>
          </section>

          {/* 6. Pricing Details */}
          <section id="pricing" className="scroll-mt-32 bg-brand p-16 text-white rounded-sm">
             <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                   <h2 className="text-3xl uppercase tracking-widest mb-6 font-serif">Pricing & Availability</h2>
                   <p className="text-white/70 text-sm leading-relaxed mb-10 uppercase tracking-widest">Pricing starts from {l.price} with flexible payment plans available directly from the developer.</p>
                   <div className="space-y-4">
                      <div className="flex justify-between py-4 border-b border-white/10 uppercase tracking-widest text-[11px] font-bold"><span>Booking Fee</span> <span>10%</span></div>
                      <div className="flex justify-between py-4 border-b border-white/10 uppercase tracking-widest text-[11px] font-bold"><span>Handover</span> <span>Q4 2026</span></div>
                   </div>
                </div>
                <div className="bg-white/10 p-10 rounded-sm backdrop-blur-md">
                   <p className="text-[10px] uppercase font-bold tracking-widest mb-2">Estimated Price</p>
                   <h3 className="text-5xl font-serif mb-8">{l.price}</h3>
                   <button className="w-full bg-white text-brand py-4 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-gold hover:text-white transition-colors">Request Price List</button>
                </div>
             </div>
          </section>

          {/* 7. EMI Calculator */}
          <section id="calculator" className="scroll-mt-32">
             <h2 className="text-2xl uppercase tracking-widest mb-10 font-serif">Financial Overview</h2>
             <div className="bg-white border border-slate-100 p-12 rounded-sm shadow-sm grid md:grid-cols-2 gap-16">
                <div className="space-y-10">
                   <div className="space-y-4">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest"><span>Property Value</span> <span>${loanAmount.toLocaleString()}</span></div>
                      <input type="range" min="1000000" max="10000000" step="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-1 bg-slate-100 accent-brand appearance-none rounded-full cursor-pointer" />
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest"><span>Down Payment (%)</span> <span>{downPayment}%</span></div>
                      <input type="range" min="5" max="50" step="5" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full h-1 bg-slate-100 accent-brand appearance-none rounded-full cursor-pointer" />
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest"><span>Tenure (Years)</span> <span>{tenure}Y</span></div>
                      <input type="range" min="5" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-1 bg-slate-100 accent-brand appearance-none rounded-full cursor-pointer" />
                   </div>
                </div>
                <div className="bg-slate-50 p-12 flex flex-col items-center justify-center text-center">
                   <Calculator className="w-10 h-10 text-brand mb-6" />
                   <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">Estimated Monthly EMI</p>
                   <h2 className="text-5xl font-serif text-slate-800">${monthlyEMI.toLocaleString()}</h2>
                   <p className="text-[9px] uppercase font-bold text-slate-400 mt-6 tracking-widest">*Subject to bank approval and current rates (4.5%)</p>
                </div>
             </div>
          </section>

          {/* 8. Location & 9. Nearby */}
          <section id="location" className="scroll-mt-32">
             <h2 className="text-2xl uppercase tracking-widest mb-12 font-serif">The Neighborhood</h2>
             <div className="grid md:grid-cols-2 gap-1 grid-bg">
                <div className="aspect-square bg-slate-50 relative overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800" className="w-full h-full object-cover grayscale opacity-60" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse"><MapPin className="w-6 h-6" /></div>
                   </div>
                </div>
                <div className="bg-white p-12 flex flex-col justify-center border border-slate-100">
                   <h3 className="text-lg font-serif mb-8 tracking-widest uppercase">Nearby Landmarks</h3>
                   <div className="space-y-6">
                      {l.nearby_places?.map((it: any, i: number) => (
                         <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-4">
                            <span className="text-[11px] text-slate-400 uppercase tracking-widest">{it.place}</span>
                            <span className="text-sm font-bold font-serif">{it.distance}</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* 13. Similar Properties */}
          <section id="similar" className="scroll-mt-32 pt-20 border-t border-slate-100">
             <h2 className="text-2xl uppercase tracking-widest mb-12 font-serif">Similar Properties</h2>
             <div className="grid md:grid-cols-3 gap-8">
                {others.map((p: any) => (
                   <Link key={p.slug} to={`/launches/${p.slug}`} className="group space-y-4">
                      <div className="aspect-[3/4] overflow-hidden rounded-sm relative">
                         <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute bottom-6 left-6 text-white">
                            <p className="text-[9px] uppercase font-bold tracking-[0.3em] mb-1">{p.location}</p>
                            <h4 className="text-lg font-serif uppercase tracking-widest">{p.title}</h4>
                         </div>
                      </div>
                   </Link>
                ))}
             </div>
          </section>

          {/* 14. Reviews */}
          <section id="reviews" className="scroll-mt-32">
             <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl uppercase tracking-widest font-serif">Reviews & Ratings</h2>
                <div className="flex items-center gap-4 text-brand font-bold text-sm">
                   <Star className="w-5 h-5 fill-brand" /> 4.9 Average
                </div>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                {l.reviews?.map((r: any, i: number) => (
                  <div key={i} className="p-10 bg-white border border-slate-100 rounded-sm hover:shadow-xl transition-all">
                     <div className="flex gap-1 mb-6 text-gold">
                        {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                     </div>
                     <p className="text-lg text-slate-600 font-light font-serif leading-relaxed mb-8">"{r.text}"</p>
                     <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">— {r.user}</p>
                  </div>
                ))}
             </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="space-y-10">
           {/* 11. Inquiry Form & 12. Schedule Visit */}
           <div className="bg-ink text-white p-12 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.3)] sticky top-32 z-10 border border-white/5">
              <div className="flex items-center gap-3 mb-8">
                 <div className="h-[1px] w-8 bg-brand"></div>
                 <p className="text-[10px] uppercase tracking-[0.4em] text-brand font-bold">Register Interest</p>
              </div>
              <h3 className="text-4xl font-serif mb-10 tracking-tight">{l.price}</h3>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                    <input name="name" required className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:outline-none focus:border-brand transition" placeholder="John Smith" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                    <input name="email" required className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:outline-none focus:border-brand transition" placeholder="john@example.com" type="email" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Phone Number</label>
                    <input name="phone" required className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:outline-none focus:border-brand transition" placeholder="+971 00 000 0000" type="tel" />
                 </div>
                 
                 <div className="pt-6 space-y-4">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-brand text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all duration-500 shadow-xl shadow-brand/20">
                       {isSubmitting ? "Submitting..." : "Inquiry Now"}
                    </button>
                    <button type="button" className="w-full bg-white/5 border border-white/10 text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                       <Calendar className="w-4 h-4 text-brand" /> Schedule Visit
                    </button>
                 </div>
              </form>
              
              <div className="mt-10 pt-10 border-t border-white/10 flex items-center gap-6 justify-center">
                 <div className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand transition-all"><Phone className="w-4 h-4" /></div>
                    <span className="text-[8px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Call</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand transition-all"><MessageCircle className="w-4 h-4" /></div>
                    <span className="text-[8px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">WhatsApp</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand transition-all"><Mail className="w-4 h-4" /></div>
                    <span className="text-[8px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Brochure</span>
                 </div>
              </div>
           </div>

           {/* 10. Agent Information */}
           {l.agent_info && (
             <div className="bg-white p-10 border border-slate-100 shadow-sm rounded-sm">
                <div className="flex items-center gap-5 mb-8">
                   <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden shadow-inner">
                      <img src="https://i.pravatar.cc/200?u=admin" className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Official Agent</h4>
                      <p className="text-lg font-serif uppercase tracking-widest text-slate-800">{l.agent_info.name}</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <button className="w-full flex items-center justify-center gap-4 py-5 bg-slate-50 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition"><Phone className="w-4 h-4 text-brand" /> {l.agent_info.phone}</button>
                   <button className="w-full flex items-center justify-center gap-4 py-5 bg-slate-50 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition"><Mail className="w-4 h-4 text-brand" /> Contact Agent</button>
                </div>
             </div>
           )}
        </aside>
      </div>

      <Footer />

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 1s ease-out both; }
        .grid-bg { background-image: radial-gradient(#E2E8F0 1px, transparent 1px); background-size: 20px 20px; }
      `}</style>
    </div>
  );
}
