import type { Metadata } from "next";
import { PageHero, Section, CtaBand } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "About ChartSpeak" };

const values = [
  { t: "Every pixel serves the clinician.", d: "Clinicians change lives. We build tools that fit how they work and make their day easier, not harder." },
  { t: "Always be learning.", d: "We stay curious, ask the extra question and learn from every clinician who uses the product." },
  { t: "Deliver quickly, think long term.", d: "We take on hard problems and move steadily, without trading away quality." },
  { t: "Walk the right path.", d: "Trust is everything in healthcare. We do the right thing even when a shortcut is available." },
  { t: "Be a team of champions.", d: "We keep our commitments to one another and protect the balance that lets people do their best work." },
];

export default function About() {
  return (
    <>
      <PageHero tone="olive" title="Building presence at the heart of care" body="Our mission is simple: ambient intelligence that assists clinicians so they can focus on what matters most." />

      <Section title="At ChartSpeak, presence is both product and promise">
        <Reveal>
          <p className="max-w-3xl text-[clamp(1.2rem,2vw,1.6rem)] leading-snug">
            Time is the scarcest resource in medicine, and too much of it disappears into paperwork. ChartSpeak gives clinicians end-to-end support so they can be fully present, during working hours and after them.
          </p>
        </Reveal>
      </Section>

      <Section bg="bg-mist" title="Our team">
        <Reveal>
          <p className="max-w-2xl text-[19px] leading-snug opacity-80">ChartSpeak is a new company. Our leadership page will list the clinicians, engineers and operators behind the product as the team is announced.</p>
        </Reveal>
        <div className="mt-10 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
          {["Founder & CEO", "Chief Medical Officer", "Chief Technology Officer"].map((r) => (
            <div key={r} className="bg-white p-8">
              <div className="mb-8 aspect-[4/3] bg-sun-soft" />
              <div className="font-semibold">To be announced</div>
              <div className="text-[15px] opacity-60">{r}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="bg-ink text-white" title="Values we live by" intro="Our core values guide what we do and how we do it.">
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

      <CtaBand title="Let’s build the future of healthcare together" body="Help us build technology that elevates the practice of medicine." primary={{ label: "Join the team", href: "/careers" }} />
    </>
  );
}
