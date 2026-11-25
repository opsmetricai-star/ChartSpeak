import type { Metadata } from "next";
import { LegalPage } from "@/components/ListPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="2026"
      sections={[
        { h: "Information we collect", p: "Account details such as name and email, content you submit such as audio or text for note generation, and usage data such as plan credits consumed." },
        { h: "How we use information", p: "To provide and improve the service, generate notes you request, enforce plan limits, and communicate with you about your account." },
        { h: "AI processing", p: "Content you submit is sent to an AI provider to produce drafts. Do not submit identifiable patient information unless the required agreements are in place." },
        { h: "Retention and deletion", p: "You can delete your notes and account. Deleted content is removed from active systems within a reasonable period." },
        { h: "Your rights", p: "Depending on where you live you may have rights to access, correct, export or delete your data. Contact us to exercise them." },
        { h: "Contact", p: "Use the contact form on this site for privacy questions." },
      ]}
    />
  );
}
