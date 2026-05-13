import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/launch-3.jpg";

export const Route = createFileRoute("/properties/villas")({
  head: () => ({ meta: [{ title: "Villas — Golden Door Realty" }, { name: "description", content: "Luxury villas in Noida's most prestigious gated communities." }] }),
  component: () => (
    <InfoPage eyebrow="Family Living" title="Villas" heroImg={hero}
      intro="Spacious villas with private gardens, pools and resort-style amenities."
      sections={[
        { heading: "Premier Communities", body: "Villas across Arabian Ranches, Noida Hills Estate, Golden Door Realty South and The Valley." },
        { heading: "Designed for Family", body: "Open-plan layouts, smart home technology and easy access to schools, parks and golf." },
      ]} />
  ),
});
