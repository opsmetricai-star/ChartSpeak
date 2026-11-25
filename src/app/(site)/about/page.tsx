import type { Metadata } from "next";
import { PageHero, Section, CtaBand } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "About" };

const values = [
  { t: "Every output serves the clinician.", d: "We build for people who make high-stakes decisions under time pressure. If a feature does not save them attention, it does not ship." },
  { t: "Evidence over assertion.", d: "AI that cannot show its source does not belong in a medical record. Every suggestion we make points back to the encounter." },
  { t: "Speed with discipline.", d: "We move fast on the model and slow on the controls. Validation, review and isolation are never the part we cut." },
  { t: "Integrity in the record.", d: "The medical record carries legal and clinical weight. We design so that clinicians stay accountable for every word in it." },
  { t: "Operators first.", d: "Healthcare organizations buy outcomes and governance. We measure ourselves on both." },
];

export default function About() {
  return (
    <>
      <PageHero tone="olive" title="Building the AI layer for clinical operations" body="ChartSpeak exists to remove administrative load from clinical work, so every encounter is captured completely and every decision is backed by evidence." />

      <Section title="The problem we are solving">
        <Reveal>
          <p className="max-w-3xl text-[clamp(1.2rem,2vw,1.6rem)] leading-snug">
            Clinical documentation consumes hours that organizations pay for twice: once in clinician time, and again in revenue lost to missed specificity and unsupported codes. We replace that manual work with an AI engine that analyzes the encounter once and delivers every downstream artifact.
          </p>
        </Reveal>
      </Section>

      <Section bg="bg-ink text-white" title="Principles">
        <ol className="divide-y divide-white/20 border-y border-white/20">
          {values.map((v, k) => (
            <Reveal as="li" key={v.t} className="grid gap-4 py-8 md:grid-cols-[80px_1fr_1.2fr]">
              <span className="font-mono text-sm text-sun">0{k + 1}</span>
              <h3 className="text-[1.6rem] font-semibold leading-tight tracking-tight">{v.t}</h3>
              <p className="text-[17px] leading-relaxed text-white/70">{v.d}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand title="Deploy the engine in your organization" />
    </>
  );
}
