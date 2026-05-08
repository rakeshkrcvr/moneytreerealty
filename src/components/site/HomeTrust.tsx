import { Star, Quote } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Testimonials({ reviews }: { reviews: any[] }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-24 bg-ink text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 opacity-5">
        <Quote className="w-96 h-96 -mr-24 -mt-24" />
      </div>

      <div className="container-emaar relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">Voices of Trust</p>
          <h2 className="text-3xl md:text-5xl uppercase" style={{ fontFamily: "var(--font-serif)" }}>
            What Our <span className="text-gold">Clients Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white/5 p-10 border border-white/10 hover:border-gold/50 transition-colors">
              <div className="flex gap-1 mb-6 text-gold">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-lg font-light leading-relaxed mb-8 italic">"{r.text}"</p>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest">{r.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFAQ({ items }: { items: any[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 bg-background">
      <div className="container-emaar max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-brand mb-4">Questions</p>
          <h2 className="text-3xl md:text-5xl text-ink uppercase" style={{ fontFamily: "var(--font-serif)" }}>
            Frequently Asked <br /> <span className="text-muted-foreground/40 italic">Questions</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {items.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-ink text-left uppercase tracking-widest text-sm py-6 hover:text-brand transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
