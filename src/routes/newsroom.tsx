import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/launch-1.jpg";

export const Route = createFileRoute("/newsroom")({
  head: () => ({ meta: [{ title: "Newsroom — Golden Door Realty" }, { name: "description", content: "Latest news, press releases and media coverage from Golden Door Realty." }] }),
  component: () => (
    <InfoPage pageKey="newsroom" eyebrow="Press" title="Newsroom" heroImg={hero}
      intro="Press releases, announcements and stories from across Golden Door Realty."
      sections={[
        { heading: "Latest News", body: "Stay up to date with our launches, milestones and corporate announcements." },
        { heading: "Media Enquiries", body: "Journalists may contact our communications team at media@goldendoorrealty.com for interviews and information requests." },
        { heading: "Brand Assets", body: "Approved logos, imagery and brand guidelines are available on request from the press team." },
      ]} />
  ),
});
