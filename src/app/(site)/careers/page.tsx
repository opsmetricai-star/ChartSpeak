import type { Metadata } from "next";
import { ListPage } from "@/components/ListPage";

export const metadata: Metadata = { title: "Careers" };

export default function Page() {
  return (
    <ListPage
      tone="olive"
      title="Help clinicians look up from the screen"
      body="We are building a small team that cares about medicine, craft and quiet, reliable software."
      sectionTitle="Open roles"
      items={[]}
      empty="There are no open roles listed right now. Send a note through the contact form and tell us how you would like to help."
    />
  );
}
