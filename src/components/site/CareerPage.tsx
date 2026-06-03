import { useState } from "react";
import { Briefcase, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import hero from "@/assets/community-downtown.jpg";
import { createLead } from "@/lib/server-functions";
import { PageShell } from "./PageShell";
import { useSiteSettings } from "./SiteSettingsContext";

const defaultSections = [
  { heading: "Why Golden Door Realty", body: "We attract and retain the best talent by offering meaningful work, world-class projects, and an environment where creativity and entrepreneurship thrive." },
  { heading: "Open Roles", body: "Explore opportunities across Real Estate, Hospitality, Retail, Technology, Design and Corporate functions." },
  { heading: "Graduate Programme", body: "Our structured programme accelerates high-potential graduates into leadership tracks across the group." },
];

export function CareerPage() {
  const settings = useSiteSettings();
  const content = settings?.page_content?.careers || {};
  const sections = Array.isArray(content.sections) && content.sections.length > 0 ? content.sections : defaultSections;
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);

    try {
      await createLead({
        data: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          source: "Career Application",
          message: [
            `Position: ${formData.get("position") || "-"}`,
            `Experience: ${formData.get("experience") || "-"}`,
            `Message: ${formData.get("message") || "-"}`,
          ].join("\n"),
        },
      });
      toast.success("Application submitted successfully.");
      form.reset();
    } catch (err) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell
      eyebrow={content.eyebrow || "Join Us"}
      title={content.title || "Careers"}
      intro={content.intro || "Build your career with the company shaping the world's most iconic destinations."}
      heroImg={content.heroImg || hero}
    >
      <section className="py-24 bg-background">
        <div className="container-realty grid lg:grid-cols-[1fr_420px] gap-14 items-start">
          <div className="space-y-12">
            {sections.map((section: { heading: string; body: string }) => (
              <div key={section.heading}>
                <h2 className="text-2xl md:text-3xl text-ink mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                  {section.heading}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.body}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-surface border border-border p-8 rounded-lg space-y-5 sticky top-28">
            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-brand mb-3">Apply Now</p>
              <h3 className="text-2xl text-ink" style={{ fontFamily: "var(--font-serif)" }}>Career Form</h3>
            </div>

            <label className="relative block">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input required name="name" type="text" placeholder="Full Name" className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-4 text-sm outline-none focus:border-brand" />
            </label>
            <label className="relative block">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input required name="phone" type="tel" placeholder="Phone Number" className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-4 text-sm outline-none focus:border-brand" />
            </label>
            <label className="relative block">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input required name="email" type="email" placeholder="Email Address" className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-4 text-sm outline-none focus:border-brand" />
            </label>
            <label className="relative block">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input name="position" type="text" placeholder="Position Applied For" className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-4 text-sm outline-none focus:border-brand" />
            </label>
            <input name="experience" type="text" placeholder="Experience" className="w-full bg-background border border-border rounded-xl px-4 py-4 text-sm outline-none focus:border-brand" />
            <textarea name="message" rows={4} placeholder="Tell us about yourself" className="w-full bg-background border border-border rounded-xl px-4 py-4 text-sm outline-none focus:border-brand resize-none" />

            <button disabled={isSubmitting} type="submit" className="w-full bg-brand text-white font-bold uppercase tracking-[0.2em] text-xs py-4 rounded-xl hover:opacity-90 transition disabled:opacity-60">
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
