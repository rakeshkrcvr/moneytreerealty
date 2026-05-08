import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/community-hills.jpg";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Use — Emaar" }, { name: "description", content: "Terms governing the use of Emaar websites and digital services." }] }),
  component: () => (
    <InfoPage eyebrow="Legal" title="Terms of Use" heroImg={hero}
      intro="Please read these terms carefully before using our digital services."
      sections={[
        { heading: "Acceptance", body: "By accessing this website you agree to be bound by these Terms of Use and all applicable laws." },
        { heading: "Intellectual Property", body: "All content, trademarks and designs on this site are owned by or licensed to Emaar Properties PJSC." },
        { heading: "Limitation of Liability", body: "Information is provided as-is without warranty. Emaar is not liable for indirect or consequential damages arising from website use." },
      ]} />
  ),
});
