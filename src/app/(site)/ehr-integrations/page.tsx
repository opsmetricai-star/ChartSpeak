import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, FeatureGrid, CtaBand } from "@/components/blocks";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "EHR Integrations" };

const ehrs = [
  { n: "Epic", s: "Roadmap" },
  { n: "Oracle Health", s: "Roadmap" },
  { n: "athenahealth", s: "Roadmap" },
  { n: "MEDITECH", s: "Roadmap" },
];

export default function Ehr() {
  return (
    <>
      <PageHero title="EHR integrations that connect wherever you work" body="Our integration approach is built around two-way exchange, so notes and context travel in both directions." />

      <Section title="See how ChartSpeak fits your EHR" intro="Direct integrations are delivered with partners. Until a direct connection is live for your system, notes export as structured text or PDF for copy-in.">
        <div className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {ehrs.map((e) => (
            <Reveal key={e.n} className="flex min-h-[220px] flex-col justify-between bg-white p-8">
              <div className="text-[1.8rem] font-semibold tracking-tight">{e.n}</div>
              <div>
                <span className="inline-block bg-sun-soft px-3 py-1 text-xs font-semibold">{e.s}</span>
                <Link href="/contact-us?topic=ehr" className="mt-4 block text-[15px] font-semibold underline underline-offset-4">Learn more</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="bg-sun-soft" title="Seamless integration, by design" intro="Real-time access to chart context lets ChartSpeak draft more accurate notes, surface relevant insights and return finished notes without copy and paste.">
        <FeatureGrid cols={4} items={[
          { t: "Quality you can trust", d: "Pull in the latest chart updates and include only what matters for the note." },
          { t: "Speed and precision", d: "Send the finished note back with a tap and update the right sections in seconds." },
          { t: "Flexibility", d: "Designed for different EHRs, care settings and modalities." },
          { t: "Simple rollout", d: "Minimal IT effort and clear onboarding with responsive support." },
        ]} />
      </Section>

      <Section bg="bg-ink text-white" title="Power your platform with third-party integrations">
        <Reveal>
          <p className="max-w-2xl text-[19px] leading-snug text-white/75">Our APIs and SDKs help EHRs and healthtech platforms accelerate their AI roadmap, create differentiated workflows and strengthen user retention.</p>
          <Link href="/partners" className="mt-8 inline-block bg-sun px-8 py-4 text-[14px] font-semibold text-ink">For partners</Link>
        </Reveal>
      </Section>

      <Section title="Need something that works with any EHR?">
        <Reveal>
          <p className="max-w-2xl text-[19px] leading-snug">The ChartSpeak web app produces structured notes you can paste into any system today.</p>
          <Link href="/download" className="mt-8 inline-block bg-ink px-8 py-4 text-[14px] font-semibold text-white">Get the app →</Link>
        </Reveal>
      </Section>
      <CtaBand title="Tell us which EHR you use" primary={{ label: "Contact us", href: "/contact-us?topic=ehr" }} />
    </>
  );
}
