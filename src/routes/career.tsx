import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/community-downtown.jpg";

export const Route = createFileRoute("/career")({
  head: () => ({ meta: [{ title: "Career — Golden Door Realty" }, { name: "description", content: "Join Golden Door Realty and help shape the future of premium living." }] }),
  component: () => (
    <InfoPage pageKey="careers" eyebrow="Join Us" title="Careers" heroImg={hero}
      intro="Build your career with the company shaping the world's most iconic destinations."
      sections={[
        { heading: "Why Golden Door Realty", body: "We attract and retain the best talent by offering meaningful work, world-class projects, and an environment where creativity and entrepreneurship thrive." },
        { heading: "Open Roles", body: "Explore opportunities across Real Estate, Hospitality, Retail, Technology, Design and Corporate functions." },
        { heading: "Graduate Programme", body: "Our two-year structured programme accelerates high-potential graduates into leadership tracks across the group." },
      ]} />
  ),
});
