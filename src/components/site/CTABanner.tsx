import { Phone, Home, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CTABanner() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#003029] via-[#004037] to-[#003029] rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c5a35d]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Ready to <span className="text-[#c5a35d]">Stop Dreaming</span> and <span className="text-[#c5a35d]">Start Living</span>?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 font-medium">
              Join <span className="text-white font-bold underline decoration-[#c5a35d] underline-offset-4">25,000+ families</span> who found their dream homes with Golden Door Realty.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <button className="w-full sm:w-auto bg-white text-[#004037] px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-slate-50 transition-all hover:-translate-y-1">
                <Phone className="w-5 h-5" />
                Get Free Property Consultation
              </button>
              <Link 
                to="/properties"
                className="w-full sm:w-auto border-2 border-white/30 text-white px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                <Home className="w-5 h-5" />
                View Premium Properties
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-xs font-bold uppercase tracking-[0.2em]">
               <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#c5a35d]" />
                  RERA verified projects only
               </div>
               <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
               <div>100% free consultation</div>
               <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
               <div>99.99% satisfaction rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
