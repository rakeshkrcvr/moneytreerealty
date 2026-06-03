import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/launch-2.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Events — Golden Door Realty" }, { name: "description", content: "Upcoming launches, open houses and Golden Door Realty events." }] }),
  component: () => (
    <InfoPage pageKey="events" eyebrow="What's On" title="Events" heroImg={hero}
      intro="Explore upcoming project launches, open houses, investor meets and community experiences."
      sections={[
        { heading: "Project Launches", body: "Join our launch events to preview new residences, payment plans and inventory before public release." },
        { heading: "Open Houses", body: "Visit ready-to-move homes and sample apartments with our property consultants." },
        { heading: "Investor Meets", body: "Attend curated sessions on market trends, high-growth locations and portfolio planning." },
      ]} />
  ),
});
