import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ContactDialogProvider } from "@/components/site/ContactDialog";
import { Toaster } from "sonner";
import { getSiteSettings } from "../lib/server-functions";
import { SiteSettingsProvider } from "@/components/site/SiteSettingsContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async () => {
    try {
      const settings = await getSiteSettings();
      return { settings: settings || {} };
    } catch (e) {
      return { settings: {} };
    }
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Golden Door Realty" },
      { name: "description", content: "A web application for Golden Door Realty, showcasing premium real estate projects and amenities in India." },
      { name: "author", content: "Golden Door Realty" },
      { property: "og:title", content: "Golden Door Realty" },
      { property: "og:description", content: "A web application for Golden Door Realty, showcasing premium real estate projects and amenities in India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@GoldenDoorRealty" },
      { name: "twitter:title", content: "Golden Door Realty" },
      { name: "twitter:description", content: "A web application for Golden Door Realty, showcasing premium real estate projects and amenities in India." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/70e189dd-f3ed-424a-b759-469d2593b751/id-preview-726928e1--e609add8-929e-43c9-8df2-4bf0f0b64cf5.lovable.app-1778222462340.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/70e189dd-f3ed-424a-b759-469d2593b751/id-preview-726928e1--e609add8-929e-43c9-8df2-4bf0f0b64cf5.lovable.app-1778222462340.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { settings } = Route.useLoaderData();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteSettingsProvider settings={settings}>
        <ContactDialogProvider>
        {settings?.theme_color && (
          <style>{`
            :root {
              --brand: ${settings.theme_color} !important;
              --primary: ${settings.theme_color} !important;
              --color-brand: ${settings.theme_color} !important;
              --color-primary: ${settings.theme_color} !important;
            }
          `}</style>
        )}
        <Outlet />
        <Toaster richColors position="top-center" />
      </ContactDialogProvider>
      </SiteSettingsProvider>
    </QueryClientProvider>
  );
}
