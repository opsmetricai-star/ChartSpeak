import type { Metadata } from "next";
import { PageHero, Section, FeatureGrid, Chips, CtaBand, Panel } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";
import { careSettings, languages, specialties, testimonials } from "@/content/site";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { ClinicianTimeline } from "./Timeline";

export const metadata: Metadata = { title: "For Clinicians" };

export default function Clinicians() {
  return (
    <>
      <PageHero
        title="An AI clinical assistant that handles busywork, so you have more time for everything else."
        body="ChartSpeak stays in the background so patient care stays in front."
        cta={{ label: "Start free trial", href: "/signup" }}
      />

      <Section title="Help across the whole clinical workflow" intro="From preparing for a visit to finishing the chart afterwards, ChartSpeak works alongside you and takes the most tedious parts of practice off your plate.">
        <ClinicianTimeline />
      </Section>

      <Section bg="bg-sun-soft" title={`${specialties.length}+ specialties, one assistant`} intro="Pick a template for your specialty and adapt it to how you practise.">
        <Reveal><Chips items={[...specialties.slice(0, 24), "+ More"]} /></Reveal>
      </Section>

      <Section title="Adaptable to any care setting">
        <Reveal><Chips items={careSettings} /></Reveal>
        <div className="mt-14 grid gap-px bg-ink/15 md:grid-cols-2">
          <Panel tone="mist"><h3 className="text-2xl font-semibold tracking-tight">For web</h3><ul className="mt-4 space-y-2 text-[17px]"><li>Web app</li><li>Browser extension (planned)</li></ul></Panel>
          <Panel tone="mist"><h3 className="text-2xl font-semibold tracking-tight">For mobile devices</h3><ul className="mt-4 space-y-2 text-[17px]"><li>iOS</li><li>Android</li></ul></Panel>
        </div>
      </Section>

      <Section bg="bg-ink text-white" title="Conversations in many languages">
        <Reveal>
          <p className="mb-8 max-w-2xl text-[19px] leading-snug text-white/75">Speak with patients in their language, or in several at once, and ChartSpeak drafts the note in English. No manual translation step.</p>
          <Chips items={languages} />
        </Reveal>
      </Section>

      <Section bg="bg-mist" title="What clinicians tell us">
        <TestimonialSlider />
        <p className="sr-only">{testimonials.length} sample quotes</p>
      </Section>

      <Section title="Built for the way you chart">
        <FeatureGrid cols={3} items={[
          { t: "Voice editing", d: "Say what to change and the note changes. Keep your hands off the keyboard." },
          { t: "Personalisation", d: "Tune length, tone and structure so notes read like yours." },
          { t: "Multiple sessions", d: "Combine several recordings for one patient into a single, complete note." },
        ]} />
      </Section>

      <CtaBand title="Try ChartSpeak on your next visit" body="Start with a free trial and generate your first note in minutes." primary={{ label: "Start free trial", href: "/signup" }} secondary={{ label: "View pricing", href: "/pricing" }} />
    </>
  );
}
