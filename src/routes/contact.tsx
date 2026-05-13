import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { createLead } from "@/lib/server-functions";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ 
    meta: [
      { title: "Contact Us — Golden Door Realty" }, 
      { name: "description", content: "Get in touch with Golden Door Realty — sales, customer care and corporate enquiries." }
    ] 
  }),
  component: ContactPage,
});

function ContactPage() {
  const settings = useSiteSettings();
  const content = settings?.page_content?.contact || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const heroImage = content.hero_image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000";
  const heroSubtitle = content.hero_subtitle || "Get in Touch";
  const heroTitle = content.hero_title || "CONTACT US";
  const address = content.address || "Golden Door Realty Square, Building 3\nSheikh Mohammed Bin Rashid Boulevard\nDowntown Noida, United Arab Emirates";
  const phone = content.phone || "+971 4 366 1688";
  const email = content.email || "contactus@goldendoorrealty.com";
  const hours = content.hours || "Sunday – Thursday: 9:00 AM – 6:00 PM";
  const mapUrl = content.map_iframe_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1785100234475!2d55.27138287607738!3d25.19719693170799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4334adcc6279%3A0xc3c5443e0160b73b!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1715360000000!5m2!1sen!2sae";
  const formTitle = content.form_title || "Send us a Message";
  const formDesc = content.form_desc || "Our team will get back to you within 24 hours.";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await createLead({
        data: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          message: formData.get("message") as string,
          property_slug: "Contact Page",
        }
      });
      setIsSuccess(true);
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} className="w-full h-full object-cover brightness-[0.4]" alt="Contact Hero" />
        </div>
        <div className="container-realty relative z-10 text-center text-white">
          <p className="text-[10px] tracking-[0.4em] uppercase text-brand mb-4 font-bold animate-fade-up">{heroSubtitle}</p>
          <h1 className="text-4xl md:text-7xl uppercase mb-6 animate-fade-up" style={{ fontFamily: "var(--font-serif)" }}>{heroTitle}</h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container-realty">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            <div className="p-8 bg-surface border border-border rounded-2xl space-y-4 hover:border-brand transition-colors">
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-bold uppercase tracking-widest text-xs">Our Office</h4>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{address}</p>
            </div>

            <div className="p-8 bg-surface border border-border rounded-2xl space-y-4 hover:border-brand transition-colors">
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="font-bold uppercase tracking-widest text-xs">Call Us</h4>
              <p className="text-muted-foreground text-sm">{phone}</p>
            </div>

            <div className="p-8 bg-surface border border-border rounded-2xl space-y-4 hover:border-brand transition-colors">
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-bold uppercase tracking-widest text-xs">Email Us</h4>
              <p className="text-muted-foreground text-sm">{email}</p>
            </div>

            <div className="p-8 bg-surface border border-border rounded-2xl space-y-4 hover:border-brand transition-colors">
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold uppercase tracking-widest text-xs">Working Hours</h4>
              <p className="text-muted-foreground text-sm">{hours}</p>
            </div>
          </div>
        </div>

        {/* Full Width Map */}
        <div className="w-full h-[500px] border-y border-border grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src={mapUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Small Centered Form */}
        <div className="container-realty py-24">
          <div className="max-w-2xl mx-auto bg-surface border border-border rounded-[40px] p-10 md:p-16 shadow-2xl relative z-10 -mt-32 bg-white">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. Our team will contact you shortly.</p>
                <button onClick={() => setIsSuccess(false)} className="px-8 py-3 bg-ink text-white rounded-full font-bold uppercase tracking-widest text-[10px]">Send Another Message</button>
              </div>
            ) : (
              <>
                <div className="mb-12 text-center">
                  <h2 className="text-3xl uppercase mb-4" style={{ fontFamily: "var(--font-serif)" }}>{formTitle}</h2>
                  <p className="text-muted-foreground">{formDesc}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</label>
                      <input name="name" required className="w-full bg-slate-50 border border-transparent rounded-xl px-6 py-4 text-sm focus:border-brand focus:bg-white outline-none transition" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</label>
                      <input type="email" name="email" required className="w-full bg-slate-50 border border-transparent rounded-xl px-6 py-4 text-sm focus:border-brand focus:bg-white outline-none transition" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Phone Number</label>
                    <input type="tel" name="phone" required className="w-full bg-slate-50 border border-transparent rounded-xl px-6 py-4 text-sm focus:border-brand focus:bg-white outline-none transition" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Message</label>
                    <textarea name="message" rows={4} required className="w-full bg-slate-50 border border-transparent rounded-xl px-6 py-4 text-sm focus:border-brand focus:bg-white outline-none transition resize-none" placeholder="How can we help you?" />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full py-5 bg-ink text-white rounded-xl font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-brand transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : (
                      <>
                        Submit Enquiry <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
