import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="November 2026"
      sections={[
        { h: "Use of the service", p: "You may use ChartSpeak in line with these terms and applicable law. You are responsible for all activity on your account and for the content you submit." },
        { h: "Clinical responsibility", p: "ChartSpeak drafts documentation and coding suggestions for clinician review. It is not a medical device and does not replace professional judgment. Clinicians must review and approve all output before relying on it." },
        { h: "Plans and billing", p: "Paid plans are billed monthly through our payment processor and set the number of note generations per period. Access is activated after payment is confirmed. Failed generations do not consume volume." },
        { h: "Acceptable use", p: "Do not attempt to breach the security of the service, resell access, or submit content you have no right to submit." },
        { h: "Suspension and termination", p: "You may stop using the service at any time. We may suspend accounts that breach these terms." },
        { h: "Limitation of liability", p: "To the maximum extent permitted by law, ChartSpeak is not liable for indirect or consequential damages, and total liability is limited to the fees paid in the twelve months before the claim." },
      ]}
    />
  );
}
