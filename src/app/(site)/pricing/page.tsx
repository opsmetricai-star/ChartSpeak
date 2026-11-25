import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, CtaBand } from "@/components/blocks";
import { Accordion } from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";
import { faqs, plans } from "@/content/site";

export const metadata: Metadata = { title: "Pricing" };

export default function Pricing() {
  return (
    <>
      <PageHero tone="sun" title="Simple plans that scale with your practice" body="Start with a free trial. Upgrade when you are ready. Cancel whenever you like." />
      <Section>
        <div className="grid gap-px bg-ink/15 lg:grid-cols-3">
          {plans.map((p, k) => (
            <Reveal key={p.id} delay={k * 100} className={`flex flex-col p-8 lg:p-10 ${p.popular ? "bg-ink text-white" : "bg-white"}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
                {p.popular && <span className="bg-sun px-3 py-1 text-xs font-semibold text-ink">Most popular</span>}
              </div>
              <p className={`mt-3 min-h-[3.2rem] text-[16px] leading-snug ${p.popular ? "text-white/70" : "text-ink/70"}`}>{p.blurb}</p>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="display text-6xl">${p.price}</span>
                <span className="opacity-60">/ month</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3 text-[16px]">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3"><span className="text-sun-soft mix-blend-normal">✓</span><span>{f}</span></li>
                ))}
              </ul>
              <Link href={`/signup?plan=${p.id}`} className={`mt-10 block px-6 py-4 text-center text-[14px] font-semibold transition-transform hover:-translate-y-0.5 ${p.popular ? "bg-sun text-ink" : "bg-ink text-white"}`}>
                Get {p.name}
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-[14px] opacity-60">Payments are processed securely by Selar. After checkout your plan is activated once the payment is confirmed. Usage resets monthly.</p>
      </Section>
      <Section bg="bg-mist" title="Pricing questions">
        <Accordion items={faqs} />
      </Section>
      <CtaBand title="Need volume pricing or a pilot for your organisation?" primary={{ label: "Talk to sales", href: "/contact-us" }} />
    </>
  );
}
