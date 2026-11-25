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
      <PageHero tone="sun" title="Priced by encounter volume. Priced to pay for itself." body="Each plan sets monthly AI note generations. Every plan includes the full engine: notes, evidence-linked codes and multilingual patient instructions." />
      <Section>
        <div className="grid gap-px bg-ink/15 lg:grid-cols-3">
          {plans.map((p, k) => (
            <Reveal key={p.id} delay={k * 100} className={`flex flex-col p-8 lg:p-10 ${p.popular ? "bg-ink text-white" : "bg-white"}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
                {p.popular && <span className="bg-sun px-3 py-1 text-xs font-semibold text-ink">Most selected</span>}
              </div>
              <p className={`mt-3 min-h-[3.2rem] text-[16px] leading-snug ${p.popular ? "text-white/70" : "text-ink/70"}`}>{p.blurb}</p>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="display text-6xl">${p.price}</span>
                <span className="opacity-60">per month</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3 text-[16px]">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden className={`mt-[0.6em] h-[2px] w-3 shrink-0 ${p.popular ? "bg-sun" : "bg-ink"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/signup?plan=${p.id}`} className={`mt-10 block px-6 py-4 text-center text-[14px] font-semibold transition-transform hover:-translate-y-0.5 ${p.popular ? "bg-sun text-ink" : "bg-ink text-white"}`}>
                Sign up
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-[14px] leading-relaxed opacity-70">
          Checkout runs through Selar after sign up. Plans activate when payment is confirmed, never on redirect alone. Monthly volume resets 30 days after activation.
        </p>
      </Section>
      <Section bg="bg-mist" title="Pricing questions">
        <Accordion items={faqs} />
      </Section>
      <CtaBand title="Start with a trial that includes five encounters" body="No card required to create an account." />
    </>
  );
}
