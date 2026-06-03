import { PageShell } from "./PageShell";
import { useSiteSettings } from "./SiteSettingsContext";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface InfoPageProps {
  pageKey?: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroImg: string;
  sections: { heading: string; body: string }[];
  galleryImages?: string[];
}

export function InfoPage({ pageKey, eyebrow, title, intro, heroImg, sections, galleryImages = [] }: InfoPageProps) {
  const settings = useSiteSettings();
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const content = pageKey ? settings?.page_content?.[pageKey] : null;
  const pageSections = Array.isArray(content?.sections) && content.sections.length > 0 ? content.sections : sections;
  const pageGalleryImages = Array.isArray(content?.galleryImages) && content.galleryImages.length > 0
    ? content.galleryImages
    : galleryImages;
  const activeImage = activeImageIndex !== null ? pageGalleryImages[activeImageIndex] : null;

  const showPreviousImage = () => {
    setActiveImageIndex((current) => {
      if (current === null) return null;
      return current === 0 ? pageGalleryImages.length - 1 : current - 1;
    });
  };

  const showNextImage = () => {
    setActiveImageIndex((current) => {
      if (current === null) return null;
      return current === pageGalleryImages.length - 1 ? 0 : current + 1;
    });
  };

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

      {pageGalleryImages.length > 0 && (
        <section className="pb-24 bg-background">
          <div className="container-realty">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl text-ink" style={{ fontFamily: "var(--font-serif)" }}>
                Gallery
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pageGalleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className="group aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                  aria-label={`Open gallery image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeImage && (
        <div
          className="fixed inset-0 z-[2000] bg-black/90 p-4 md:p-8 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute right-4 top-4 md:right-8 md:top-8 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
            aria-label="Close gallery"
          >
            <X className="w-5 h-5" />
          </button>
          {pageGalleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPreviousImage();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNextImage();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <img
            src={activeImage}
            alt="Selected gallery image"
            className="max-h-[88vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </PageShell>
  );
}
