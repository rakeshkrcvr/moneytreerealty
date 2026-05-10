import { useSiteSettings } from "./SiteSettingsContext";

export function Intro() {
  const settings = useSiteSettings();
  const content = settings?.page_content?.home || {};
  
  const introSubtitle = content.intro_subtitle || "The Leading Developer in Dubai";
  const introTitle = content.intro_title || "Premium Properties in the Best Locations";
  const introDesc1 = content.intro_desc_1 || "We define the skyline and the standard for luxury living, offering an exceptional portfolio of apartments, villas, and townhouses across the city's most sought-after districts. From iconic Downtown to vibrant Marina, our master-planned communities represent the absolute pinnacle of real estate.";
  const introDesc2 = content.intro_desc_2 || "Beyond an unparalleled lifestyle, we offer a secure path for investment — combining architectural excellence with world-class amenities, ensuring high capital appreciation and strong rental yields.";

  return (
    <section className="py-24 bg-background">
      <div className="container-realty max-w-4xl text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-brand mb-6">
          {introSubtitle}
        </p>
        <h2 className="text-3xl md:text-5xl leading-tight text-ink text-balance">
          {introTitle}
        </h2>
        <div className="mt-8 h-px w-16 bg-gold mx-auto" />
        <p className="mt-8 text-muted-foreground leading-relaxed text-base md:text-lg">
          {introDesc1}
        </p>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          {introDesc2}
        </p>
      </div>
    </section>
  );
}
