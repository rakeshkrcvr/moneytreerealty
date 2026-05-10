import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/community-marina.jpg";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Cookie Policy — Golden Door Realty" }, { name: "description", content: "How and why Golden Door Realty uses cookies on its websites." }] }),
  component: () => (
    <InfoPage eyebrow="Legal" title="Cookie Policy" heroImg={hero}
      intro="We use cookies to improve your experience. You can manage preferences at any time."
      sections={[
        { heading: "What are cookies?", body: "Cookies are small text files stored on your device that help websites remember your preferences and usage." },
        { heading: "How we use them", body: "We use essential, performance, functional and marketing cookies to deliver, measure and personalise our services." },
        { heading: "Managing cookies", body: "You can accept, reject or customise cookie categories using our consent banner or your browser settings." },
      ]} />
  ),
});
