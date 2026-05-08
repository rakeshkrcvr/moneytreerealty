import hero from "@/assets/community-hills.jpg";
import { Play } from "lucide-react";

export function TourBanner() {
  return (
    <section className="py-24 bg-ink">
      <div className="container-emaar">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">
              Virtual Experience
            </p>
            <h2 className="text-3xl md:text-5xl mb-6 text-balance">
              Communities 360° Tour
            </h2>
            <p className="text-white/70 leading-relaxed max-w-md mb-8">
              Experience our communities and amenities from the comfort of your
              home — from vibrant cities to serene waterfronts.
            </p>
            <button className="inline-flex items-center gap-3 bg-white text-ink px-8 py-4 hover:bg-gold hover:text-white transition">
              <Play className="w-4 h-4 fill-current" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase">
                Start the Tour
              </span>
            </button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={hero}
              alt="360 Tour preview"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="w-7 h-7 text-ink fill-current ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
