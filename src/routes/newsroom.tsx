import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/launch-1.jpg";

export const Route = createFileRoute("/newsroom")({
  head: () => ({ meta: [{ title: "Newsroom — Emaar" }, { name: "description", content: "Latest news, press releases and media coverage from Emaar." }] }),
  component: () => (
    <InfoPage eyebrow="Press" title="Newsroom" heroImg={hero}
      intro="Press releases, announcements and stories from across Emaar."
      sections={[
        { heading: "Latest News", body: "Stay up to date with our launches, milestones and corporate announcements." },
        { heading: "Media Enquiries", body: "Journalists may contact our communications team at media@emaar.ae for interviews and information requests." },
        { heading: "Brand Assets", body: "Approved logos, imagery and brand guidelines are available on request from the press team." },
      ]} />
  ),
});
