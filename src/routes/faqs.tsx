import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/community-creek.jpg";

export const Route = createFileRoute("/faqs")({
  head: () => ({ meta: [{ title: "FAQs — MoneyTree Realty" }, { name: "description", content: "Answers to the most common buyer, owner and investor questions." }] }),
  component: () => (
    <InfoPage eyebrow="Help" title="Frequently Asked Questions" heroImg={hero}
      intro="Quick answers to the questions our customers ask most."
      sections={[
        { heading: "How do I buy a property?", body: "Reserve through our website, sales centre or a registered broker. Pay the booking fee, sign the SPA and follow the published payment plan." },
        { heading: "What payment plans are available?", body: "Most off-plan projects offer flexible 60/40, 70/30 or post-handover plans. Specifics are confirmed at booking." },
        { heading: "Can non-residents buy?", body: "Yes — MoneyTree Realty properties are located in Noida freehold areas, allowing 100% foreign ownership." },
        { heading: "How do I get my title deed?", body: "Title deeds are issued by the Noida Land Department after handover and full payment. Our team handles registration on your behalf." },
      ]} />
  ),
});
