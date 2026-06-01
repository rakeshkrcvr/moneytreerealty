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
import { NewsTicker, SocialSidebar } from "@/components/site/ExtraUI";

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
      { title: "Golden Door Realty | Top Real Estate Consultant in India" },
      { name: "description", content: "Golden Door Realty is India's leading real estate consultant, offering premium property investments, luxury apartments, and commercial spaces in Noida, Gurugram, and Mumbai." },
      { name: "author", content: "Golden Door Realty" },
      { property: "og:title", content: "Golden Door Realty | Top Real Estate Consultant in India" },
      { property: "og:description", content: "Explore premium real estate projects and luxury investments with Golden Door Realty - India's most trusted property consultant." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Golden Door Realty" },
      { name: "twitter:description", content: "Leading Real Estate Consultant in India for Luxury Apartments & Commercial Projects." },
      { property: "og:image", content: "https://goldendoorrealty.com/assets/img/logo.png" },
      { name: "twitter:image", content: "https://goldendoorrealty.com/assets/img/logo.png" },
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
  const router = useRouter();
  const isAdmin = router.state.location.pathname.startsWith("/admin");

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
        {!isAdmin && (
          <>
            <SocialSidebar />
          </>
        )}
        <div className={isAdmin ? "" : "pt-[128px]"}>
          <Outlet />
        </div>
        <Toaster richColors position="top-center" />
      </ContactDialogProvider>
      </SiteSettingsProvider>
    </QueryClientProvider>
  );
}
