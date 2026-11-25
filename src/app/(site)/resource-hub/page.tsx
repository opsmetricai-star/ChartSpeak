import type { Metadata } from "next";
import { ListPage } from "@/components/ListPage";

export const metadata: Metadata = { title: "Resource Hub" };

export default function Page() {
  return (
    <ListPage
      tone="olive"
      title="Resource hub"
      body="Guides, checklists and implementation material for clinical teams and partners."
      sectionTitle="Featured resources"
      items={[
        { tag: "Guide", title: "Getting started with ambient notes", desc: "Set up your first template, record a visit and review the draft.", meta: "In the app after sign-in" },
        { tag: "Checklist", title: "Reviewing an AI-drafted note", desc: "What to verify before you export a note to the chart.", meta: "Coming soon" },
        { tag: "Partners", title: "Integration overview", desc: "Authentication, sessions and note retrieval at a glance.", meta: "Available on request" },
      ]}
    />
  );
}
