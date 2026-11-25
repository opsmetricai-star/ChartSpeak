import type { Metadata } from "next";
import { ListPage } from "@/components/ListPage";

export const metadata: Metadata = { title: "Blog" };

export default function Page() {
  return (
    <ListPage
      title="Ideas on clinical workflow and AI"
      body="Practical writing for clinicians, informaticists and healthtech builders."
      sectionTitle="Latest articles"
      items={[
        { tag: "Workflow", title: "Why the note is only the beginning of ambient documentation", desc: "Structured data from a single conversation can power coding, instructions and orders.", meta: "Coming soon" },
        { tag: "Clinicians", title: "A practical guide to reviewing AI-drafted notes", desc: "A short checklist for catching the errors that matter before you sign.", meta: "Coming soon" },
        { tag: "Partners", title: "Embedding ambient AI: SDK or API?", desc: "How to choose an integration path based on your product and team.", meta: "Coming soon" },
      ]}
    />
  );
}
