import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/launch-2.jpg";

export const Route = createFileRoute("/properties/townhouses")({
  head: () => ({ meta: [{ title: "Townhouses — MoneyTree Realty" }, { name: "description", content: "Modern townhouses combining villa-style living with community amenities." }] }),
  component: () => (
    <InfoPage eyebrow="Modern Living" title="Townhouses" heroImg={hero}
      intro="Three- and four-bedroom townhouses set within green, walkable neighbourhoods."
      sections={[
        { heading: "Lifestyle Communities", body: "Curated parks, retail boulevards, schools and clinics within walking distance." },
        { heading: "Best of Both", body: "The privacy of a villa with the affordability and convenience of community living." },
      ]} />
  ),
});
