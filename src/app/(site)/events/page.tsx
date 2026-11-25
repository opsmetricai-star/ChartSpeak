import type { Metadata } from "next";
import { ListPage } from "@/components/ListPage";

export const metadata: Metadata = { title: "Events" };

export default function Page() {
  return (
    <ListPage
      title="Events and webinars"
      body="Meet the team and see ChartSpeak in action."
      sectionTitle="Upcoming events"
      items={[]}
      empty="No events are scheduled yet. Check back soon or contact us to arrange a live demo."
    />
  );
}
