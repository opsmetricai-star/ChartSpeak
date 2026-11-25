import type { Metadata } from "next";
import { PageHero, Section, FeatureGrid } from "@/components/blocks";

export const metadata: Metadata = { title: "Trust Center" };

export default function Page() {
  return (
    <>
      <PageHero title="Trust Center" body="A plain account of how we protect data today, and what is still ahead of us." />
      <Section title="What is in place" intro="These controls are part of the product architecture.">
        <FeatureGrid
          cols={3}
          items={[
            { t: "Row-level data isolation", d: "Each user can read and write only their own records, enforced in the database." },
            { t: "Private file storage", d: "Audio and uploads live in private storage and are served through short-lived signed links." },
            { t: "Server-side AI calls", d: "Model credentials never reach the browser. Requests are made from the server only." },
            { t: "Encryption in transit", d: "All traffic uses HTTPS." },
            { t: "Usage limits and logging", d: "Plan limits are enforced on the server, and generation activity is recorded per account." },
            { t: "Clinician review required", d: "AI output is a draft. It is never exported without review." },
          ]}
        />
      </Section>
      <Section bg="bg-sun-soft" title="What is not yet in place">
        <ul className="max-w-3xl list-disc space-y-3 pl-6 text-[18px] leading-snug">
          <li>ChartSpeak has not completed SOC 2 or any other third-party audit.</li>
          <li>ChartSpeak is not represented as HIPAA compliant. Handling protected health information requires business associate agreements with each infrastructure and AI provider, plus organisational safeguards.</li>
          <li>Until those are signed, use only de-identified or synthetic data.</li>
        </ul>
      </Section>
    </>
  );
}
