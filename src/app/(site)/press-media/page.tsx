import type { Metadata } from "next";
import { ListPage } from "@/components/ListPage";

export const metadata: Metadata = { title: "Press & Media" };

export default function Page() {
  return (
    <ListPage
      tone="sun"
      title="Press and media"
      body="News, announcements and brand assets for journalists and partners."
      sectionTitle="Latest news"
      items={[]}
      empty="No press releases yet. For media enquiries, please use the contact form and choose Sales."
    />
  );
}
