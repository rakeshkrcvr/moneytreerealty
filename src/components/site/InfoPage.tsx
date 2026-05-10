import { PageShell } from "./PageShell";

interface InfoPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  heroImg: string;
  sections: { heading: string; body: string }[];
}

export function InfoPage({ eyebrow, title, intro, heroImg, sections }: InfoPageProps) {
  return (
    <PageShell eyebrow={eyebrow} title={title} intro={intro} heroImg={heroImg}>
      <section className="py-24 bg-background">
        <div className="container-realty max-w-3xl space-y-12">
          {sections.map((s) => (
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
