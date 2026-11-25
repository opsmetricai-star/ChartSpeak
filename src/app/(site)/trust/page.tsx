import type { Metadata } from "next";
import { PageHero, Section, FeatureGrid, CtaBand } from "@/components/blocks";

export const metadata: Metadata = { title: "Trust" };

export default function Page() {
  return (
    <>
      <PageHero title="Security and governance, stated precisely" body="Controls that are enforced in the product today, and the conditions under which protected health information may be processed." />
      <Section title="Controls in the product">
        <FeatureGrid
          cols={3}
          items={[
            { t: "Row-level data isolation", d: "The database confines every note, usage record and payment to its owner. Cross-account access is rejected at the data layer." },
            { t: "Private audio storage", d: "Recordings live in a private bucket, scoped to the uploading account, and are never publicly addressable." },
            { t: "Server-side AI execution", d: "Model credentials and requests stay on the server. The browser never holds an AI key." },
            { t: "Encryption in transit", d: "All traffic is served over HTTPS." },
            { t: "Metered, logged usage", d: "Plan limits are enforced on the server and every generation is recorded against the account." },
            { t: "Mandatory clinician review", d: "AI output is a draft. Nothing is exported until a clinician has reviewed it." },
          ]}
        />
      </Section>
      <Section bg="bg-sun-soft" title="Compliance posture">
        <ul className="max-w-3xl space-y-4 text-[18px] leading-snug">
          <li>ChartSpeak holds no third-party security certification at this time, and makes no HIPAA or SOC 2 claim.</li>
          <li>Processing protected health information requires executed business associate agreements with each infrastructure and AI provider in the chain.</li>
          <li>Until those agreements are in place for your deployment, use de-identified or synthetic encounter data only.</li>
        </ul>
      </Section>
      <CtaBand title="Evaluate the platform on de-identified data" />
    </>
  );
}
