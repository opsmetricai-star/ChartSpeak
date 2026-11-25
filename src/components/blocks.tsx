import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({ title, body, tone = "dark", signup = false }: { title: string; body?: string; tone?: "dark" | "olive" | "sun"; signup?: boolean }) {
  const tones = { dark: "bg-ink text-white", olive: "bg-olive-deep text-white", sun: "bg-sun-soft text-ink" } as const;
  const rule = tone === "sun" ? "bg-ink" : "bg-white";
  return (
    <section className={`${tones[tone]} relative overflow-hidden px-5 py-16 lg:px-12 lg:py-28`}>
      {tone === "olive" && (
        <div className="pointer-events-none absolute inset-0">
          <div className="blob-a absolute -left-[10%] -top-[30%] h-[90%] w-[60%] rounded-full bg-olive opacity-80 blur-[100px]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_90px,rgba(0,0,0,0.07)_90px_170px)]" />
        </div>
      )}
      <div className="relative mx-auto max-w-[1440px]">
        <div className={`mb-10 h-[2px] w-full ${rule}`} />
        <h1 className="display display-lg max-w-5xl [text-wrap:balance]">{title}</h1>
        {body && <p className="mt-8 max-w-2xl text-[clamp(1.1rem,1.6vw,1.4rem)] leading-snug opacity-90">{body}</p>}
        {signup && (
          <Link href="/signup" className={`mt-10 inline-block px-8 py-4 text-[14px] font-semibold transition-transform hover:-translate-y-0.5 ${tone === "sun" ? "bg-ink text-white" : "bg-sun text-ink"}`}>
            Sign up
          </Link>
        )}
        <div className={`mt-12 h-[2px] w-full ${rule}`} />
      </div>
    </section>
  );
}

export function Section({ children, bg = "bg-white", title, intro }: { children: ReactNode; bg?: string; title?: string; intro?: string }) {
  return (
    <section className={`${bg} px-5 py-16 lg:px-12 lg:py-28`}>
      <div className="mx-auto max-w-[1440px]">
        {title && (
          <Reveal className="mb-12 max-w-4xl">
            <h2 className="display display-md">{title}</h2>
            {intro && <p className="mt-5 max-w-2xl text-[19px] leading-[1.45] opacity-80">{intro}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function FeatureGrid({ items, cols = 3, dark = false }: { items: { t: string; d: string; k?: string }[]; cols?: 2 | 3 | 4; dark?: boolean }) {
  const c = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`grid gap-px ${dark ? "bg-white/15" : "bg-ink/15"} ${c}`}>
      {items.map((f, k) => (
        <Reveal key={f.t} delay={(k % 3) * 80} className={`${dark ? "bg-ink" : "bg-white"} p-8 lg:p-10`}>
          <div className={`mb-6 font-mono text-sm uppercase ${dark ? "text-sun" : "text-ink/50"}`}>{f.k ?? `0${k + 1}`}</div>
          <h3 className="text-[1.45rem] font-semibold leading-tight tracking-tight">{f.t}</h3>
          <p className={`mt-3 text-[17px] leading-relaxed ${dark ? "text-white/70" : "text-ink/75"}`}>{f.d}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function SplitFeature({ title, body, reverse, bg = "bg-white", children }: { title: string; body: string; reverse?: boolean; bg?: string; children?: ReactNode }) {
  return (
    <section className={`${bg} px-5 py-16 lg:px-12 lg:py-28`}>
      <div className={`mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <h2 className="display display-md">{title}</h2>
          <p className="mt-6 max-w-xl text-[19px] leading-[1.45] opacity-85">{body}</p>
        </Reveal>
        <Reveal delay={100}>{children}</Reveal>
      </div>
    </section>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((s) => (
        <span key={s} className="border border-current/30 px-4 py-2 text-[15px] font-medium">{s}</span>
      ))}
    </div>
  );
}

export function CtaBand({ title, body }: { title: string; body?: string }) {
  return (
    <section className="bg-sun px-5 py-16 lg:px-12 lg:py-28">
      <Reveal className="mx-auto max-w-[1440px]">
        <h2 className="display display-md max-w-3xl">{title}</h2>
        {body && <p className="mt-5 max-w-xl text-[19px] font-medium leading-snug">{body}</p>}
        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="/signup" className="bg-ink px-8 py-4 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5">Sign up</Link>
          <Link href="/login" className="border border-ink px-8 py-4 text-[14px] font-semibold transition-colors hover:bg-ink hover:text-white">Log in</Link>
        </div>
      </Reveal>
    </section>
  );
}

export function Panel({ children, tone = "sun" }: { children: ReactNode; tone?: "sun" | "mist" | "ink" }) {
  const t = { sun: "bg-sun-soft", mist: "bg-mist", ink: "bg-ink text-white" }[tone];
  return <div className={`${t} p-6 lg:p-10`}>{children}</div>;
}

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHero tone="sun" title={title} body={`Last updated ${updated}`} />
      <Section>
        <div className="mx-auto max-w-3xl">
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
