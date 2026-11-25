import type { Metadata } from "next";
import { LegalPage } from "@/components/ListPage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="2026"
      sections={[
        { h: "Using the service", p: "You may use ChartSpeak only in line with these terms and applicable law. You are responsible for activity on your account." },
        { h: "Not medical advice", p: "ChartSpeak drafts documentation and offers decision support. It is not a medical device and does not replace professional judgment. You must review all output before relying on it." },
        { h: "Plans and billing", p: "Paid plans are billed through our payment processor. Usage limits apply per billing period. Access is activated after payment is confirmed." },
        { h: "Acceptable use", p: "Do not misuse the service, attempt to break its security, or submit content you have no right to submit." },
        { h: "Termination", p: "You may stop using the service at any time. We may suspend accounts that breach these terms." },
        { h: "Liability", p: "The service is provided as is to the extent permitted by law. Limits of liability will be set out in the final reviewed terms." },
      ]}
    />
  );
}
