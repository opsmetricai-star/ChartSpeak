import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, CtaBand } from "@/components/blocks";

export const metadata: Metadata = { title: "Download" };

const items = [
  { t: "Web app", s: "Available", d: "Works in any modern browser on desktop and mobile.", href: "/signup" },
  { t: "Browser extension", s: "Planned", d: "Capture notes beside your EHR tab.", href: "" },
  { t: "iOS", s: "Planned", d: "Record visits from your phone.", href: "" },
  { t: "Android", s: "Planned", d: "Record visits from your phone.", href: "" },
];

export default function Page() {
  return (
    <>
      <PageHero title="Get ChartSpeak where you work" body="Start in the browser today. Native apps and the browser extension are on the roadmap." />
      <Section>
        <div className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.t} className="flex min-h-[260px] flex-col justify-between bg-white p-8">
              <div>
                <span className={`inline-block px-3 py-1 text-xs font-semibold ${i.s === "Available" ? "bg-sun" : "bg-mist"}`}>{i.s}</span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{i.t}</h3>
                <p className="mt-2 text-[16px] text-ink/70">{i.d}</p>
              </div>
              {i.href && <Link href={i.href} className="font-semibold underline underline-offset-4">Open →</Link>}
            </div>
          ))}
        </div>
      </Section>
      <CtaBand title="Ready to try it?" primary={{ label: "Start free trial", href: "/signup" }} />
    </>
  );
}
