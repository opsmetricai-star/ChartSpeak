import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, FeatureGrid, Chips, CtaBand } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { specialties } from "@/content/site";

export const metadata: Metadata = { title: "For Partners" };

export default function Partners() {
  return (
    <>
      <PageHero
        tone="olive"
        title="Seamlessly integrated. Undeniably effective."
        body="Add ambient clinical intelligence to your product through our APIs and SDKs."
        cta={{ label: "Request access", href: "/contact-us?topic=partner" }}
      />

      <Section title="Speed up your AI roadmap without the heavy lift" intro="From EHRs and telehealth to care management and revenue cycle, ChartSpeak helps you embed documentation intelligence in your application quickly.">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest opacity-50">Why partners choose ChartSpeak</h3>
        <FeatureGrid cols={4} items={[
          { t: "Faster roadmap", d: "Skip long build cycles and ship AI-powered features sooner." },
          { t: "Better adoption", d: "Reduce clinician burnout and see stronger usage and retention." },
          { t: "Clear differentiation", d: "Stand out with ambient capabilities your users can feel." },
          { t: "Future-proof stack", d: "An evolving AI layer that keeps pace so you do not have to." },
        ]} />
      </Section>

      <Section bg="bg-sun-soft" title="Developer tools">
        <div className="grid gap-px bg-ink/20 lg:grid-cols-2">
          {[
            { t: "Software development kits", d: "Embed ambient capture and a pre-built interface for a quick, consistent integration.", best: "Best for a faster path with ready-made UI.", cta: "Request SDK access" },
            { t: "Application programming interfaces", d: "Secure endpoints for note generation, retrieval, personalisation and more.", best: "Best for full control of your own UI and workflows.", cta: "Request API access" },
          ].map((c) => (
            <Reveal key={c.t} className="flex min-h-[340px] flex-col justify-between bg-white p-8 lg:p-12">
              <div>
                <h3 className="display display-sm">{c.t}</h3>
                <p className="mt-4 max-w-md text-[18px] leading-snug">{c.d}</p>
                <p className="mt-4 text-[15px] font-semibold opacity-60">{c.best}</p>
              </div>
              <Link href="/contact-us?topic=partner" className="mt-8 w-fit bg-ink px-7 py-4 text-[14px] font-semibold text-white">{c.cta}</Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Key capabilities">
        <FeatureGrid cols={3} items={[
          { t: "Ambient documentation", d: "Capture encounters and return structured, specialty-aware notes into your app." },
          { t: "Voice editing and personalisation", d: "Let users shape output to their style and cut editing time." },
          { t: "Multilingual support", d: "Conversations in many languages produce an English note." },
          { t: "Problem-based charting", d: "Organise plans around the patient’s problems." },
          { t: "Speaker separation", d: "Tell clinician and patient voices apart during the encounter." },
          { t: "Patient summaries", d: "Concise history overviews ahead of each visit." },
          { t: "Order staging", d: "Propose orders from the encounter to reduce clicks." },
        ]} />
      </Section>

      <Section bg="bg-ink text-white" title="Built for breadth and depth across specialties">
        <Reveal><Chips items={[...specialties.slice(0, 25), "+ More"]} /></Reveal>
      </Section>

      <Section title="ChartSpeak for Nurses" intro="We are working with health systems and healthtech leaders to build AI that lifts the administrative burden on nurses, and that partners can embed in their platforms.">
        <Link href="/contact-us?topic=nursing" className="inline-block bg-ink px-7 py-4 text-[14px] font-semibold text-white">Learn more →</Link>
      </Section>

      <Section bg="bg-mist" title="Helpful resources">
        <FeatureGrid cols={3} items={[
          { t: "Developer documentation overview", d: "Authentication, sessions, note retrieval and webhooks at a glance." },
          { t: "Integration guide", d: "Choose between SDK and API, and plan a rollout." },
          { t: "Partner program", d: "Co-marketing, support and onboarding for integration partners." },
        ]} />
      </Section>

      <CtaBand title="Let’s build ambient AI into your product" primary={{ label: "Contact our partner team", href: "/contact-us?topic=partner" }} />
    </>
  );
}
