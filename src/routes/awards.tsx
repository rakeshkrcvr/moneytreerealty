import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/community-marina.jpg";

export const Route = createFileRoute("/awards")({
  head: () => ({ meta: [{ title: "Awards & Recognition — Golden Door Realty" }, { name: "description", content: "Awards, achievements and recognition earned by Golden Door Realty." }] }),
  component: () => (
    <InfoPage pageKey="awards" eyebrow="Recognition" title="Awards & Recognition" heroImg={hero}
      intro="A record of excellence across development, design, service and customer trust."
      sections={[
        { heading: "Industry Recognition", body: "Our projects and teams are recognised for quality, innovation and customer-first delivery." },
        { heading: "Design Excellence", body: "Golden Door Realty communities are shaped by thoughtful architecture, planning and placemaking." },
        { heading: "Customer Trust", body: "Awards matter most when they reflect the confidence of homebuyers, investors and partners." },
      ]} />
  ),
});
