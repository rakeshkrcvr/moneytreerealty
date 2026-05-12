import { UserCheck, HeartHandshake, Map, ChevronDown } from "lucide-react";

export function Intro() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-[900] text-[#1a365d] mb-8 leading-tight">
            Your <span className="text-[#004037]">Trusted Property Investment Partner</span> in India
          </h2>
          <div className="space-y-6 text-slate-600 leading-relaxed max-w-4xl mx-auto text-sm md:text-base">
            <p>
              Buying or investing in property isn't easy. Between <span className="italic">hidden charges, legal complexities, shifting prices, and market noise</span>, most people feel overwhelmed – and unsure if they’re making the right move. That's why you need a trusted property consultant.
            </p>
            <p>
              At <span className="font-bold text-[#004037]">MoneyTree Realty</span>, the best real estate consultant in India, we turn that chaos into clarity. Backed by seasoned market experts, we protect you from costly mistakes, and unlock exclusive pre-launch deals, VIP pricing, and strategic insights that the normal buyer never gets access to.
            </p>
          </div>
          
          <button className="mt-8 flex items-center gap-2 mx-auto px-6 py-2.5 rounded-full border border-slate-200 text-[#004037] font-bold text-sm hover:bg-slate-50 transition-all">
            Read more <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-[#1a365d] to-[#004037] rounded-[32px] p-10 text-center text-white shadow-2xl transform hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <div className="mb-6 relative">
              <div className="w-20 h-20 bg-gradient-to-tr from-[#c5a35d] to-[#efd391] rounded-full mx-auto flex items-center justify-center shadow-lg shadow-[#c5a35d]/20">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-[900] mb-4 text-[#efd391]">15+ Years Market Expertise</h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Deep insights into big cities like Noida, Gurugram, Mumbai and more...
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-[#1a365d] to-[#004037] rounded-[32px] p-10 text-center text-white shadow-2xl transform hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <div className="mb-6 relative">
              <div className="w-20 h-20 bg-gradient-to-tr from-[#c5a35d] to-[#efd391] rounded-full mx-auto flex items-center justify-center shadow-lg shadow-[#c5a35d]/20">
                <HeartHandshake className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-[900] mb-4 text-[#efd391]">Thousands of Happy Investors</h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Trusted by families across India
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-[#1a365d] to-[#004037] rounded-[32px] p-10 text-center text-white shadow-2xl transform hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <div className="mb-6 relative">
              <div className="w-20 h-20 bg-gradient-to-tr from-[#c5a35d] to-[#efd391] rounded-full mx-auto flex items-center justify-center shadow-lg shadow-[#c5a35d]/20">
                <Map className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-[900] mb-4 text-[#efd391]">Pan-India Presence</h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Strategic locations: Noida | Gurugram | Lucknow | Mumbai | Pune | Ghaziabad
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
