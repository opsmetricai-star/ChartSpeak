"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides } from "@/content/site";

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = heroSlides.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 7000);
    return () => clearInterval(t);
  }, [paused, n]);

  const s = heroSlides[i];
  return (
    <section
      className="relative min-h-[560px] overflow-hidden text-white lg:h-[calc(100vh-62px)] lg:min-h-[600px] lg:max-h-[820px]"
      style={{ background: s.b, transition: "background 1.2s ease" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* blurred drifting color fields */}
      <div className="pointer-events-none absolute inset-0">
        <div className="blob-a absolute -left-[10%] top-[-20%] h-[80%] w-[70%] rounded-full opacity-90 blur-[90px]" style={{ background: s.a, transition: "background 1.2s ease" }} />
        <div className="blob-b absolute bottom-[-30%] right-[-5%] h-[85%] w-[60%] rounded-full opacity-70 blur-[110px]" style={{ background: s.a, transition: "background 1.2s ease" }} />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_90px,rgba(0,0,0,0.07)_90px_170px)]" />
      </div>

      <div className="relative mx-auto grid h-full max-w-[1440px] grid-cols-1 gap-10 px-5 py-14 lg:grid-cols-[1.5fr_1fr] lg:px-12 lg:py-14">
        {/* headline with left rule */}
        <div className="relative pl-6 lg:pl-10" key={`h-${i}`}>
          <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-white lg:bottom-auto lg:h-[160px]" />
          <h1 className="display animate-[fadeUp_0.9s_ease_both] text-[clamp(2.6rem,6.2vw,5.6rem)] [text-wrap:balance]">{s.title}</h1>
        </div>

        {/* right column */}
        <div className="relative flex flex-col justify-between lg:border-l lg:border-white lg:pl-8" key={`b-${i}`}>
          <div className="hidden items-center justify-end gap-3 lg:flex">
            <button aria-label="Previous slide" onClick={() => setI((i - 1 + n) % n)} className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 22 22"><path d="M19 11H3m6-6-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
            <button aria-label="Next slide" onClick={() => setI((i + 1) % n)} className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 11h16m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
          </div>
          <div className="animate-[fadeUp_1s_0.15s_ease_both] border-l-[3px] border-white pl-6 lg:pl-7">
            <p className="max-w-[420px] text-[19px] font-medium leading-[1.4]">{s.body}</p>
            <Link href={s.cta.href} className="mt-10 inline-block bg-white px-8 py-4 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-0.5">
              {s.cta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* mobile controls + dots */}
      <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-3 lg:bottom-8 lg:justify-start lg:pl-12">
        {heroSlides.map((_, k) => (
          <button key={k} aria-label={`Go to slide ${k + 1}`} onClick={() => setI(k)} className={`h-[3px] transition-all ${k === i ? "w-12 bg-white" : "w-6 bg-white/45"}`} />
        ))}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
