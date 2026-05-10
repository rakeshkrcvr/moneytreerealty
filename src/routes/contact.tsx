import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";
import hero from "@/assets/community-marina.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us — Golden Door Realty" }, { name: "description", content: "Get in touch with Golden Door Realty — sales, customer care and corporate enquiries." }] }),
  component: () => (
    <InfoPage eyebrow="Get in Touch" title="Contact Us" heroImg={hero}
      intro="We're here to help — reach our sales centres, customer care and corporate teams."
      sections={[
        { heading: "Sales", body: "Toll-free (UAE): 800 36227\nInternational: +971 4 366 1688\nEmail: contactus@goldendoorrealty.com" },
        { heading: "Head Office", body: "Golden Door Realty Square, Building 3\nSheikh Mohammed Bin Rashid Boulevard\nDowntown Dubai, United Arab Emirates" },
        { heading: "Hours", body: "Sunday – Thursday: 9:00 AM – 6:00 PM\nFriday – Saturday: Closed" },
      ]} />
  ),
});
