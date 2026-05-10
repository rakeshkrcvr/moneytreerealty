import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageShellProps {
  eyebrow: string;
  title: string;
  intro?: string;
  heroImg: string;
  children: React.ReactNode;
}

export function PageShell({ eyebrow, title, intro, heroImg, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative h-[70vh] min-h-[480px] flex items-end">
        <div className="absolute inset-0">
          <img src={heroImg} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        </div>
        <div className="container-realty relative pb-16 text-white">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">{eyebrow}</p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl tracking-wide max-w-3xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {title}
          </h1>
          {intro && <p className="mt-6 max-w-xl text-white/80">{intro}</p>}
        </div>
      </section>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
