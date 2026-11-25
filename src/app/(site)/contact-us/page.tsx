import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact us" };

export default async function Contact({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  return (
    <>
      <section className="bg-sun-soft px-5 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2">
          <div>
            <div className="rule-left">
              <h1 className="display display-lg">The intelligence layer for healthcare</h1>
              <p className="mt-6 max-w-md text-[20px] font-medium leading-snug">Complete the form and someone from our team will get back to you shortly.</p>
            </div>
          </div>
          <div className="bg-white p-6 sm:p-10">
            <ContactForm topic={topic} />
          </div>
        </div>
      </section>
      <section id="support" className="bg-white px-5 py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="display display-md mb-10">Already using ChartSpeak?</h2>
          <div className="grid gap-px bg-ink/15 md:grid-cols-3">
            {[
              { t: "Support", d: "Current customers can reach support through the form above (choose Support) or in-app help.", a: "", href: "" },
              { t: "Help Center", d: "Sign in to find answers and step-by-step guides.", a: "Log in", href: "/login" },
              { t: "Address", d: "Mailing address to be published at launch.", a: "", href: "" },
            ].map((c) => (
              <div key={c.t} className="bg-white p-8">
                <h3 className="text-2xl font-semibold tracking-tight">{c.t}</h3>
                <p className="mt-3 text-[17px] leading-snug text-ink/75">{c.d}</p>
                {c.a && <a href={c.href} className="mt-5 inline-block font-semibold underline underline-offset-4">{c.a}</a>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
