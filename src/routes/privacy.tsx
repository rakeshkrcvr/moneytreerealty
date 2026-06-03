import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/community-downtown.jpg";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Golden Door Realty" }, { name: "description", content: "How Golden Door Realty collects, uses and protects your personal data." }] }),
  component: () => (
    <InfoPage pageKey="privacy" eyebrow="Legal" title="Privacy Policy" heroImg={hero}
      intro="Your privacy is important to us. This policy explains how we handle personal data."
      sections={[
        { heading: "Information We Collect", body: "We collect contact information, property preferences, transaction history and website usage data to provide our services." },
        { heading: "How We Use Data", body: "Personal data is used to fulfil contracts, provide customer support, send marketing (with consent) and meet legal obligations." },
        { heading: "Your Rights", body: "You have the right to access, correct, delete or restrict processing of your personal data. Contact privacy@goldendoorrealty.com to exercise these rights." },
      ]} />
  ),
});
