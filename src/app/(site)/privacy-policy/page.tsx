import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 2026"
      sections={[
        { h: "Information we collect", p: "Account details such as name and email address, content submitted for note generation such as audio and transcripts, and usage records such as note generations consumed." },
        { h: "How we use information", p: "To operate the platform, generate the notes you request, enforce plan limits, secure accounts and communicate about your account." },
        { h: "AI processing", p: "Submitted content is sent to a third-party AI provider to produce drafts. Do not submit identifiable patient information unless the required business associate agreements are in place for your deployment." },
        { h: "Storage and access", p: "Records are isolated per account in the database. Audio is held in private storage. Access to data is limited to the account that created it and to systems that operate the service." },
        { h: "Retention and deletion", p: "Notes and their audio can be deleted from the dashboard. Deleted content is removed from active systems." },
        { h: "Sharing", p: "We do not sell personal information. Data is shared only with infrastructure, AI and payment providers that process it on our behalf." },
      ]}
    />
  );
}
