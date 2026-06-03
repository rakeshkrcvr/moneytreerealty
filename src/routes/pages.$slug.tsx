import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";

export const Route = createFileRoute("/pages/$slug")({
  component: CustomPage,
});

function CustomPage() {
  const { slug } = Route.useParams();
  const settings = useSiteSettings();
  const pageEntry = Object.entries(settings?.page_content || {}).find(([, page]: [string, any]) => {
    return page?.customPage && !page?.deleted && page?.slug === slug;
  });

  if (!pageEntry) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <p className="mt-4 text-muted-foreground">This page is not available.</p>
          <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Go home
          </Link>
        </div>
      </div>
    );
  }

  const [pageKey, page] = pageEntry as [string, any];

  return (
    <InfoPage
      pageKey={pageKey}
      eyebrow={page.eyebrow || "Info"}
      title={page.title || page.label || "Page"}
      intro={page.intro || ""}
      heroImg={page.heroImg || ""}
      sections={Array.isArray(page.sections) ? page.sections : []}
    />
  );
}
