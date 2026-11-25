import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CapabilityTabs } from "@/components/CapabilityTabs";
import { AudioBars } from "@/components/AudioBars";
import { Reveal } from "@/components/Reveal";
import { CtaBand, FeatureGrid } from "@/components/blocks";
import { builtDifferent, careSettings, outcomes, pipeline, specialties } from "@/content/site";

export default function Home() {
  return (
    <>
      <HeroCarousel />

      {/* Engine */}
      <section className="bg-white px-5 py-16 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-14 max-w-4xl">
            <h2 className="display display-md">One AI engine replaces three administrative workflows</h2>
          </Reveal>
          <Reveal>
            <CapabilityTabs />
          </Reveal>
        </div>
      </section>

      {/* Presence band */}
      <section className="overflow-hidden bg-sun-soft">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 lg:min-h-[640px] lg:grid-cols-[480px_1fr] lg:px-10 lg:py-0">
          <Reveal className="flex flex-col justify-center lg:border-r-2 lg:border-ink lg:pr-10">
            <div className="rule-left">
              <h2 className="display display-md">Every encounter, analyzed in full</h2>
              <p className="mt-5 max-w-sm text-[19px] font-medium leading-snug">Clinicians keep their attention on the patient. The engine handles the record.</p>
            </div>
          </Reveal>
          <div className="relative h-[320px] lg:h-auto lg:pt-24">
            <AudioBars />
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="bg-white px-5 py-16 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-12 max-w-3xl">
            <h2 className="display display-md">From conversation to decision in four stages</h2>
          </Reveal>
          <FeatureGrid cols={4} items={pipeline} />
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-ink px-5 py-16 text-white lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-12 max-w-4xl">
            <h2 className="display display-md">Built around four business outcomes</h2>
          </Reveal>
          <FeatureGrid dark cols={4} items={outcomes} />
        </div>
      </section>

      {/* Audience */}
      <section className="bg-white px-5 py-16 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-10 max-w-3xl">
            <h2 className="display display-md">One platform, deployed across the organization</h2>
            <p className="mt-5 max-w-2xl text-[19px] leading-[1.45] text-ink/80">Operates across ambulatory, inpatient, emergency, urgent care, telehealth and home health settings.</p>
          </Reveal>
          <div className="grid gap-px bg-ink/15 lg:grid-cols-2">
            {[
              { t: "Platform", d: "The AI engine: how encounters become structured notes, evidence-linked codes and patient instructions.", href: "/platform", bg: "bg-mist" },
              { t: "Teams", d: "How clinical operations, revenue cycle and practice leadership put the engine to work.", href: "/teams", bg: "bg-sun" },
            ].map((c, k) => (
              <Reveal key={c.t} delay={k * 120} className={c.bg}>
                <Link href={c.href} className="flex min-h-[320px] flex-col justify-between p-8 transition-opacity hover:opacity-80 lg:p-12">
                  <h3 className="display display-sm">{c.t}</h3>
                  <p className="mt-10 max-w-md text-[18px] leading-snug">{c.d}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <div className="flex flex-wrap gap-3">
              {careSettings.map((c) => (
                <span key={c} className="border border-ink/30 px-4 py-2 text-[15px] font-medium">{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section className="bg-mist px-5 py-16 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="display display-md">Why operators choose ChartSpeak</h2>
            </div>
          </Reveal>
          <ol className="divide-y divide-ink/20 border-y border-ink/20">
            {builtDifferent.map((b, k) => (
              <Reveal as="li" key={b.t} delay={k * 60} className="grid gap-4 py-8 sm:grid-cols-[70px_1fr]">
                <span className="font-mono text-sm text-ink/50">0{k + 1}</span>
                <div>
                  <h3 className="text-[clamp(1.4rem,2.2vw,2rem)] font-semibold tracking-tight">{b.t}</h3>
                  <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-ink/75">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Specialties */}
      <section className="overflow-hidden bg-white py-16 lg:py-24">
        <Reveal className="mx-auto mb-10 max-w-[1440px] px-5 lg:px-12">
          <h2 className="display display-sm">Specialty-aware drafting across every service line</h2>
        </Reveal>
        <div className="marquee-track flex w-max gap-3">
          {[...specialties, ...specialties].map((s, k) => (
            <span key={k} className="whitespace-nowrap border border-ink/25 px-6 py-3 text-[17px] font-medium">{s}</span>
          ))}
        </div>
      </section>

      <CtaBand title="Put an AI engine behind every encounter" body="Create an account and generate your first note today." />
    </>
  );
}
