import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/launch-1.jpg";

export const Route = createFileRoute("/properties/apartments")({
  head: () => ({ meta: [{ title: "Apartments — Golden Door Realty" }, { name: "description", content: "Premium apartments across Noida's most sought-after addresses." }] }),
  component: () => (
    <InfoPage pageKey="properties-apartments" eyebrow="Residences" title="Apartments" heroImg={hero}
      intro="One- to four-bedroom residences in landmark towers across Noida."
      sections={[
        { heading: "Iconic Addresses", body: "From Downtown Noida to Golden Door Realty Beachfront, our apartments offer breathtaking views and best-in-class amenities." },
        { heading: "Smart Investment", body: "Strong rental yields and sustained capital appreciation make our apartments a premier investment choice." },
      ]} />
  ),
});
