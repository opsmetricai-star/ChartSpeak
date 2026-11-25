import { PageHero, Section } from "./blocks";
import { Reveal } from "./Reveal";

export type Item = { tag?: string; title: string; desc: string; meta?: string };

export function ListPage({ title, body, tone = "dark", sectionTitle, items, empty }: { title: string; body: string; tone?: "dark" | "olive" | "sun"; sectionTitle: string; items: Item[]; empty?: string }) {
  return (
    <>
      <PageHero tone={tone} title={title} body={body} />
      <Section title={sectionTitle}>
        {items.length === 0 ? (
          <p className="text-[19px] opacity-70">{empty}</p>
        ) : (
          <div className="grid gap-px bg-ink/15 md:grid-cols-2 lg:grid-cols-3">
            {items.map((i, k) => (
              <Reveal key={i.title} delay={(k % 3) * 80} className="flex min-h-[280px] flex-col justify-between bg-white p-8">
                <div>
                  {i.tag && <span className="mb-5 inline-block bg-sun-soft px-3 py-1 text-xs font-semibold">{i.tag}</span>}
                  <h3 className="text-[1.5rem] font-semibold leading-tight tracking-tight">{i.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink/70">{i.desc}</p>
                </div>
                {i.meta && <div className="mt-6 text-[14px] font-medium opacity-60">{i.meta}</div>}
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHero tone="sun" title={title} body={`Last updated ${updated}`} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="mb-10 border-l-4 border-ink bg-mist p-5 text-[15px]">
            Draft for review. This text is a starting template and must be reviewed by qualified legal counsel before launch, especially because ChartSpeak may process health information.
          </p>
          {sections.map((s) => (
            <div key={s.h} className="mb-10">
              <h2 className="text-2xl font-semibold tracking-tight">{s.h}</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink/80">{s.p}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
