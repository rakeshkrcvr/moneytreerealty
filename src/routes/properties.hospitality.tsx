import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/community-creek.jpg";

export const Route = createFileRoute("/properties/hospitality")({
  head: () => ({ meta: [{ title: "Hospitality — Emaar" }, { name: "description", content: "Address Hotels + Resorts and Vida Hotels — Emaar's hospitality portfolio." }] }),
  component: () => (
    <InfoPage eyebrow="Stay" title="Hospitality" heroImg={hero}
      intro="Award-winning hotels and resorts under the Address, Vida and Palace brands."
      sections={[
        { heading: "Address Hotels + Resorts", body: "Premium luxury hospitality redefining the art of stay across Dubai and beyond." },
        { heading: "Vida Hotels", body: "Upscale, contemporary hotels for the next generation of urban travellers." },
        { heading: "Palace Hotels", body: "Inspired by Arabian heritage — refined, elegant and unmistakably local." },
      ]} />
  ),
});
