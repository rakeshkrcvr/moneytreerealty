import { PageShell } from "./PageShell";
import { useSiteSettings } from "./SiteSettingsContext";

interface InfoPageProps {
  pageKey?: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroImg: string;
  sections: { heading: string; body: string }[];
}

export function InfoPage({ pageKey, eyebrow, title, intro, heroImg, sections }: InfoPageProps) {
  const settings = useSiteSettings();
  const content = pageKey ? settings?.page_content?.[pageKey] : null;
  const pageSections = Array.isArray(content?.sections) && content.sections.length > 0 ? content.sections : sections;

  return (
    <PageShell
      eyebrow={content?.eyebrow || eyebrow}
      title={content?.title || title}
      intro={content?.intro || intro}
      heroImg={content?.heroImg || heroImg}
    >
      <section className="py-24 bg-background">
        <div className="container-realty max-w-3xl space-y-12">
          {pageSections.map((s: { heading: string; body: string }) => (
            <div key={s.heading}>
              <h2 className="text-2xl md:text-3xl text-ink mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                {s.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
