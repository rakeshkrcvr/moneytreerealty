import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/community-downtown.jpg";

export const Route = createFileRoute("/properties/commercial")({
  head: () => ({ meta: [{ title: "Commercial Properties — Golden Door Realty" }, { name: "description", content: "Grade-A commercial offices and retail in Noida's premier districts." }] }),
  component: () => (
    <InfoPage eyebrow="Business" title="Commercial Properties" heroImg={hero}
      intro="Premium office and retail spaces in Noida's most prestigious business hubs."
      sections={[
        { heading: "Boulevard Plaza & Burj Vista", body: "Iconic Grade-A towers in Downtown Noida with unmatched connectivity and prestige." },
        { heading: "Retail & F&B", body: "High-footfall retail spaces in landmark destinations like The Noida Mall and Noida Marina." },
      ]} />
  ),
});
