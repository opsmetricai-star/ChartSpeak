import type { Metadata } from "next";
import { PageHero, Section, FeatureGrid, Chips, CtaBand } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { careSettings, languages, specialties } from "@/content/site";

export const metadata: Metadata = {
  title: "Teams",
  description: "How clinical operations, revenue cycle and practice leadership deploy ChartSpeak across the organization.",
};

export default function Teams() {
  return (
    <>
      <PageHero
        title="Deploy AI documentation across your clinical organization"
        body="ChartSpeak gives clinical operations, revenue cycle and practice leadership one engine and one audit trail."
        signup
      />

      <Section title="Built for the people who run care delivery">
        <FeatureGrid
          cols={3}
          items={[
            { k: "Clinical operations", t: "Return hours to the clinical day", d: "Drafts are ready minutes after the visit, which removes after-hours charting from the schedule." },
            { k: "Revenue cycle", t: "Verify codes against source evidence", d: "Each suggested code arrives with the quoted passage behind it, so reviewers confirm instead of searching." },
            { k: "Practice leadership", t: "Scale volume without scaling headcount", d: "Plans meter monthly note volume per account, so capacity planning is a number, not a guess." },
          ]}
        />
      </Section>

      <Section bg="bg-mist" title="The workflow, end to end">
        <FeatureGrid
          cols={4}
          items={[
            { t: "Capture", d: "Upload a recording up to 18 MB or paste a transcript." },
            { t: "Draft", d: "The engine returns a structured note, codes and instructions." },
            { t: "Review", d: "Clinicians edit every section and every instruction." },
            { t: "Export", d: "Copy, download or print the approved note." },
          ]}
        />
      </Section>

      <Section bg="bg-sun-soft" title="Specialty-aware across the service line" intro="Set the specialty on any encounter and the engine drafts in that context.">
        <Reveal><Chips items={specialties} /></Reveal>
      </Section>

      <Section title="Deployed in every care setting">
        <Reveal><Chips items={careSettings} /></Reveal>
      </Section>

      <Section bg="bg-ink text-white" title="Patient instructions in the language of the patient">
        <Reveal>
          <p className="mb-8 max-w-2xl text-[19px] leading-snug text-white/75">The clinical record stays in English. Instructions are generated in any of these languages from the same encounter.</p>
          <Chips items={languages} />
        </Reveal>
      </Section>

      <CtaBand title="Bring your team onto one documentation engine" />
    </>
  );
}
