import type { Metadata } from "next";
import { PageHero, Section, FeatureGrid, SplitFeature, CtaBand, Panel } from "@/components/blocks";
import { Accordion } from "@/components/Accordion";
import { faqs } from "@/content/site";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Solutions" };

export default function Solutions() {
  return (
    <>
      <PageHero
        tone="olive"
        title="Less admin burden. More undivided attention."
        body="ChartSpeak combines an AI assistant for the visit with infrastructure that scales across your organisation and the wider healthcare ecosystem."
        cta={{ label: "Start free trial", href: "/signup" }}
      />

      <SplitFeature
        title="Ambient Documentation"
        body="ChartSpeak captures the encounter as it happens and turns it into a structured note. Customisable settings and support for many languages let clinicians shape the note before they export it. The result is saved time, lower cognitive load and better care."
      >
        <Panel>
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest opacity-60">Encounter in progress</p>
          <div className="space-y-3">
            {["Patient reports three weeks of headaches…", "Clinician: any change in vision?", "No vision changes, worse in the morning."].map((l, k) => (
              <div key={l} className={`rounded-sm bg-white p-4 text-[15px] shadow-sm ${k % 2 ? "ml-10" : "mr-10"}`}>{l}</div>
            ))}
          </div>
        </Panel>
      </SplitFeature>

      <Section bg="bg-mist" title="Everything the note needs" intro="Four capabilities that take documentation from a blank page to a reviewed draft.">
        <FeatureGrid
          cols={4}
          items={[
            { t: "High-quality notes", d: "Complete, specialty-aware notes that you can edit by typing or by voice before exporting." },
            { t: "Problem-based charting", d: "Tie each plan item to the problem it addresses so the note reads clearly." },
            { t: "Order staging", d: "Draft orders from the conversation and queue them for your approval." },
            { t: "Patient instructions", d: "Plain-language instructions generated in the patient’s language." },
          ]}
        />
      </Section>

      <SplitFeature
        reverse
        bg="bg-sun-soft"
        title="Automatic order capture and staging"
        body="Skip manual order entry. ChartSpeak drafts orders from the visit and stages them for review, which recovers time every shift and lowers the burden on clinicians and staff."
        href="/clinicians"
        label="See the clinician workflow"
      >
        <Panel tone="ink">
          {[["Order", "HbA1c, fasting lipid panel"], ["Order", "Referral: ophthalmology"], ["Rx", "Metformin 1000 mg, review dose"]].map(([a, b]) => (
            <div key={b} className="mb-3 flex items-center justify-between gap-4 border border-white/20 p-4 last:mb-0">
              <span><span className="mr-3 font-mono text-xs text-sun">{a}</span>{b}</span>
              <span className="text-xs text-white/60">Draft</span>
            </div>
          ))}
        </Panel>
      </SplitFeature>

      <SplitFeature
        title="Assisted Revenue Cycle"
        body="Data captured at the point of care becomes structured, billable information. Diagnosis suggestions improve specificity, while evidence links strengthen note quality and cut down on manual rework."
      >
        <Panel tone="mist">
          <div className="grid grid-cols-2 gap-3">
            {[["ICD-10", "Diagnosis codes from the encounter"], ["HCC", "Risk-adjustment hints"], ["CPT", "Procedure suggestions"], ["E/M", "Level-of-service support"]].map(([a, b]) => (
              <div key={a} className="bg-white p-5 shadow-sm">
                <div className="text-2xl font-semibold tracking-tight">{a}</div>
                <div className="mt-1 text-[14px] opacity-70">{b}</div>
              </div>
            ))}
          </div>
        </Panel>
      </SplitFeature>

      <SplitFeature
        reverse
        bg="bg-mist"
        title="Clinical Reasoning"
        body="Instant context helps decisions. ChartSpeak answers questions and builds patient summaries inside the workflow. It is decision support only, and the clinician always decides."
      >
        <Panel>
          <div className="rounded-sm bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-widest opacity-50">Patient summary</div>
            <p className="mt-3 text-[16px] leading-relaxed">58-year-old with type 2 diabetes and hypertension. Last A1c 7.4. New fatigue reported at the previous visit. Labs pending.</p>
          </div>
        </Panel>
      </SplitFeature>

      <section className="bg-ink px-5 py-20 text-white lg:px-12 lg:py-28">
        <Reveal className="mx-auto max-w-[1440px]">
          <h2 className="display display-md max-w-4xl">Flexible dictation for any workflow</h2>
          <p className="mt-6 max-w-2xl text-[19px] leading-snug text-white/75">Use dictation on its own or together with ambient documentation. Choose what fits each clinician, and pay only for what you use.</p>
          <Link href="/pricing" className="mt-9 inline-block bg-sun px-8 py-4 text-[14px] font-semibold text-ink">View pricing</Link>
        </Reveal>
      </section>

      <Section title="Note quality that holds up" intro="We combine language models with deterministic checks and a clear review step, so every note is something you can verify.">
        <FeatureGrid
          cols={3}
          items={[
            { t: "Traceable output", d: "Statements in a note stay linked to the transcript that supports them." },
            { t: "Structured validation", d: "Generated notes are validated against a schema before they ever reach the screen." },
            { t: "Clinician in control", d: "Nothing is exported until a clinician has reviewed and approved the draft." },
          ]}
        />
      </Section>

      <Section bg="bg-mist" title="Frequently asked questions">
        <Accordion items={faqs} />
      </Section>

      <section className="bg-white px-5 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-px bg-ink/15 lg:grid-cols-2">
          {[
            { t: "ChartSpeak for Clinicians", d: "The assistant that spans your entire workflow, so you can cut back on busywork and mental load.", href: "/clinicians" },
            { t: "ChartSpeak for Partners", d: "A scalable developer toolkit that adds ambient AI to your own product.", href: "/partners" },
          ].map((c) => (
            <Reveal key={c.t} className="bg-white p-8 lg:p-12">
              <h3 className="display display-sm">{c.t}</h3>
              <p className="mt-4 max-w-md text-[18px] leading-snug">{c.d}</p>
              <Link href={c.href} className="mt-8 inline-block bg-ink px-7 py-4 text-[14px] font-semibold text-white">Learn more →</Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Ready to give clinicians their time back?" primary={{ label: "Start free trial", href: "/signup" }} secondary={{ label: "Talk to sales", href: "/contact-us" }} />
    </>
  );
}
