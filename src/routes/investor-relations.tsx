import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/community-marina.jpg";

export const Route = createFileRoute("/investor-relations")({
  head: () => ({ meta: [{ title: "Investor Relations — Golden Door Realty" }, { name: "description", content: "Financial reports, disclosures and shareholder information." }] }),
  component: () => (
    <InfoPage pageKey="investor-relations" eyebrow="Shareholders" title="Investor Relations" heroImg={hero}
      intro="Transparent reporting and value creation for our shareholders."
      sections={[
        { heading: "Financial Highlights", body: "Golden Door Realty continues to deliver record revenue and profitability driven by strong real estate sales and recurring income." },
        { heading: "Annual Reports", body: "Access annual reports, quarterly results, investor presentations and audited financial statements." },
        { heading: "Corporate Governance", body: "Our governance framework ensures accountability, transparency and ethical conduct at every level." },
      ]} />
  ),
});
