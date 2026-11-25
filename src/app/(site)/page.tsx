import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CapabilityTabs } from "@/components/CapabilityTabs";
import { AudioBars } from "@/components/AudioBars";
import { Counters } from "@/components/Counters";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { Reveal } from "@/components/Reveal";
import { builtDifferent, careSettings, specialties } from "@/content/site";

export default function Home() {
  return (
    <>
      <HeroCarousel />

      {/* 2. Comprehensive solution */}
      <section className="bg-white px-5 py-20 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-14 max-w-4xl">
            <h2 className="display display-md">One solution that ends endless admin</h2>
          </Reveal>
          <Reveal>
            <CapabilityTabs />
          </Reveal>
        </div>
      </section>

      {/* 3. Presence band */}
      <section className="overflow-hidden bg-sun-soft">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 lg:min-h-[640px] lg:grid-cols-[480px_1fr] lg:px-10 lg:py-0">
          <Reveal className="flex flex-col justify-center lg:border-r-2 lg:border-ink lg:pr-10">
            <div className="rule-left">
              <h2 className="display display-md">Presence is powerful</h2>
              <p className="mt-5 max-w-sm text-[19px] font-medium leading-snug">Stay in the moment of patient care. ChartSpeak handles the rest.</p>
            </div>
          </Reveal>
          <div className="relative h-[320px] lg:h-auto lg:pt-24">
            <AudioBars />
          </div>
        </div>
      </section>

      {/* 4. Available and adaptable */}
      <section className="bg-white px-5 py-20 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-6 max-w-3xl">
            <h2 className="display display-md">Readily available. Always adaptable.</h2>
          </Reveal>
          <Reveal>
            <p className="max-w-3xl text-[19px] leading-[1.45] text-ink/80">
              ChartSpeak runs on desktop and on iOS and Android devices, across more than 100 planned specialty templates. It adapts to the setting where you work and is designed to sit beside the EHR you already use, plus healthtech partners across telehealth, care management and more.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px bg-ink/15 lg:grid-cols-2">
            {[
              { t: "ChartSpeak for Clinicians", d: "A single assistant that covers pre-charting, documentation and clinical reasoning in a first-party app built for the person in the exam room.", href: "/clinicians", bg: "bg-mist" },
              { t: "ChartSpeak for Partners", d: "A developer toolkit that lets healthtech companies add ambient AI directly into their own applications for a smooth, integrated experience.", href: "/partners", bg: "bg-sun" },
            ].map((c, k) => (
              <Reveal key={c.t} delay={k * 120} className={`${c.bg} group flex min-h-[380px] flex-col justify-between p-8 lg:p-12`}>
                <div>
                  <h3 className="display display-sm">{c.t}</h3>
                  <p className="mt-5 max-w-md text-[18px] leading-snug">{c.d}</p>
                </div>
                <Link href={c.href} className="mt-10 inline-flex w-fit items-center gap-3 bg-ink px-7 py-4 text-[14px] font-semibold text-white transition-all group-hover:gap-5">
                  Learn more <span aria-hidden>→</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <div className="flex flex-wrap gap-3">
              {careSettings.map((c) => (
                <span key={c} className="border border-ink/30 px-4 py-2 text-[15px] font-medium">{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Built different */}
      <section className="bg-ink px-5 py-20 text-white lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="display display-md">Built different</h2>
                <p className="mt-6 max-w-md text-[19px] leading-snug text-white/75">
                  One ambient platform powers every workflow, which gives you flexibility and room to connect with the tools you already use.
                </p>
              </div>
            </Reveal>
            <ol className="divide-y divide-white/20 border-y border-white/20">
              {builtDifferent.map((b, k) => (
                <Reveal as="li" key={b.t} delay={k * 60} className="grid gap-4 py-8 sm:grid-cols-[70px_1fr]">
                  <span className="font-mono text-sm text-sun">0{k + 1}</span>
                  <div>
                    <h3 className="text-[clamp(1.4rem,2.2vw,2rem)] font-semibold tracking-tight">{b.t}</h3>
                    <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-white/70">{b.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 6. Numbers */}
      <section className="bg-ink px-5 pb-20 text-white lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1440px] border-t border-white/20 pt-20">
          <Reveal className="mb-14 max-w-3xl">
            <h2 className="display display-md">The goals we measure ourselves against</h2>
            <p className="mt-4 text-[15px] text-white/50">Targets shown while we collect results from early users. Real figures will replace these.</p>
          </Reveal>
          <Counters />
        </div>
      </section>

      {/* 7. Specialties marquee */}
      <section className="overflow-hidden bg-white py-16 lg:py-24">
        <Reveal className="mx-auto mb-10 max-w-[1440px] px-5 lg:px-12">
          <h2 className="display display-sm">Note templates for every specialty</h2>
        </Reveal>
        <div className="flex w-max marquee-track gap-3">
          {[...specialties, ...specialties].map((s, k) => (
            <span key={k} className="whitespace-nowrap border border-ink/25 px-6 py-3 text-[17px] font-medium">{s}</span>
          ))}
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="bg-mist px-5 py-20 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-12">
            <h2 className="display display-md">Trusted by clinicians like you</h2>
          </Reveal>
          <Reveal>
            <TestimonialSlider />
          </Reveal>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="bg-sun px-5 py-24 lg:px-12 lg:py-36">
        <Reveal className="mx-auto max-w-[1440px]">
          <h2 className="display display-lg max-w-4xl">Intelligence that is undeniably effective</h2>
          <p className="mt-6 max-w-xl text-[20px] font-medium leading-snug">Talk with our team to see what ChartSpeak can do for your practice.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact-us" className="bg-ink px-9 py-4 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5">Contact us</Link>
            <Link href="/pricing" className="border border-ink px-9 py-4 text-[15px] font-semibold transition-colors hover:bg-ink hover:text-white">See pricing</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
