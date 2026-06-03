import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/launch-2.jpg";

export const Route = createFileRoute("/brokers")({
  head: () => ({ meta: [{ title: "Brokers — Golden Door Realty" }, { name: "description", content: "Become a registered Golden Door Realty broker — programme details and registration." }] }),
  component: () => (
    <InfoPage pageKey="brokers" eyebrow="Partners" title="Brokers" heroImg={hero}
      intro="Partner with Noida's leading developer and unlock unmatched commission structures."
      sections={[
        { heading: "Broker Registration", body: "Register your agency to gain exclusive access to project launches, inventory and marketing materials." },
        { heading: "Commissions & Incentives", body: "Industry-leading commission tiers, performance bonuses and quarterly broker awards." },
        { heading: "Training & Support", body: "Dedicated relationship managers, project briefings and showroom access for registered partners." },
      ]} />
  ),
});
