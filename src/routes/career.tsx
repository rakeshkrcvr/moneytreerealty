import { createFileRoute } from "@tanstack/react-router";
import { CareerPage } from "@/components/site/CareerPage";

export const Route = createFileRoute("/career")({
  head: () => ({ meta: [{ title: "Career — Golden Door Realty" }, { name: "description", content: "Apply for career opportunities at Golden Door Realty." }] }),
  component: CareerPage,
});
