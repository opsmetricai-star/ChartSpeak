import type { Metadata } from "next";
import { PageHero, Section, FeatureGrid, SplitFeature, CtaBand, Panel } from "@/components/blocks";
import { Accordion } from "@/components/Accordion";
import { faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "Platform",
  description: "ChartSpeak is an AI engine that turns clinical encounters into structured notes, evidence-linked codes and patient instructions.",
};

export default function Platform() {
  return (
    <>
      <PageHero
        tone="olive"
        title="An AI engine that turns encounters into decisions"
        body="ChartSpeak analyzes the full clinical conversation and produces the note, the codes and the patient instructions in a single governed pass."
        signup
      />

      <SplitFeature
        title="Ambient Documentation"
        body="The model reads an uploaded recording or a transcript and drafts a complete note in the structure the service line requires. It records what the encounter did not establish, so gaps surface before signature and nothing is invented."
      >
        <Panel>
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest opacity-60">Model output</p>
          <div className="space-y-3 text-[15px]">
            <div className="bg-white p-4 shadow-sm"><strong>Assessment.</strong> Tension-type headache, possibly worsened by frequent analgesic use.</div>
            <div className="bg-ink p-4 text-white"><strong>Not established.</strong> Analgesic dose, allergy history, neurological exam detail.</div>
          </div>
        </Panel>
      </SplitFeature>

      <Section bg="bg-mist" title="What the engine produces from every encounter">
        <FeatureGrid
          cols={4}
          items={[
            { t: "Structured notes", d: "SOAP, history and physical, and progress note formats, generated against a strict schema and validated before display." },
            { t: "Missing-information flags", d: "An explicit list of facts the encounter never stated, returned with every note." },
            { t: "Evidence-linked codes", d: "ICD-10, CPT and E/M suggestions, each with the quoted passage that supports it." },
            { t: "Patient instructions", d: "Plain-language follow-up guidance in more than a dozen languages, aligned with the plan of care." },
          ]}
        />
      </Section>

      <SplitFeature
        reverse
        bg="bg-sun-soft"
        title="Revenue Integrity"
        body="Codes are proposed only where the encounter supports them. Every suggestion carries its source quote, so revenue cycle teams verify in seconds and defend claims with a clear audit trail."
      >
        <Panel tone="ink">
          {[["ICD-10 G44.209", "Tension-type headache", "\"This sounds like a tension-type headache\""], ["ICD-10 G44.40", "Medication overuse headache", "\"possibly worsened by frequent ibuprofen use\""]].map(([c, d, q]) => (
            <div key={c} className="mb-3 border border-white/20 p-4 last:mb-0">
              <div className="font-mono text-xs text-sun">{c}</div>
              <div className="mt-1 font-semibold">{d}</div>
              <div className="mt-1 text-[14px] italic text-white/65">{q}</div>
            </div>
          ))}
        </Panel>
      </SplitFeature>

      <Section title="Governance that production AI requires" intro="Operators control who sees what, how much the AI runs, and what leaves the system.">
        <FeatureGrid
          cols={3}
          items={[
            { t: "Mandatory clinician review", d: "AI output is a draft. Clinicians edit and approve before anything is exported." },
            { t: "Account-level isolation", d: "Row-level security in the database confines every record to its owner." },
            { t: "Metered usage", d: "Monthly volume is enforced on the server. Failed generations return their credit." },
          ]}
        />
      </Section>

      <Section bg="bg-mist" title="Frequently asked questions">
        <Accordion items={faqs} />
      </Section>

      <CtaBand title="See the engine on your own encounters" body="Create an account and run a note in minutes." />
    </>
  );
}
