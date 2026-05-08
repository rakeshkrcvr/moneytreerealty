import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/community-hills.jpg";

export const Route = createFileRoute("/customer-service")({
  head: () => ({ meta: [{ title: "Customer Service — Emaar" }, { name: "description", content: "Owner services, maintenance requests and after-sales support." }] }),
  component: () => (
    <InfoPage eyebrow="Owners" title="Customer Service" heroImg={hero}
      intro="Dedicated support throughout your ownership journey."
      sections={[
        { heading: "Owner Portal", body: "Manage payments, raise service requests and access community updates through the Emaar One app." },
        { heading: "Maintenance", body: "24/7 maintenance support for snagging, repairs and community facilities." },
        { heading: "Handover & Move-In", body: "End-to-end handover support including key collection, snagging walkthroughs and utilities setup." },
      ]} />
  ),
});
