"use client";
import { useState } from "react";
import { testimonials } from "@/content/site";

export function TestimonialSlider() {
  const [i, setI] = useState(0);
  const n = testimonials.length;
  const t = testimonials[i];
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
      <div className="flex aspect-[4/5] max-h-[460px] items-end bg-olive p-6">
        <div className="text-ink">
          <div className="text-xl font-semibold">{t.name}</div>
          <div className="text-[15px]">{t.role}</div>
          <div className="mt-3 inline-block rounded-full bg-white/60 px-3 py-1 text-xs font-semibold">Sample quote, to be replaced</div>
        </div>
      </div>
      <div className="flex flex-col justify-between" key={i}>
        <blockquote className="animate-[fadeIn_0.5s_ease_both] text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.15] tracking-tight">
          “{t.quote}”
        </blockquote>
        <div className="mt-10 flex items-center justify-between">
          <span className="font-mono text-sm">0{i + 1} / 0{n}</span>
          <div className="flex gap-3">
            <button aria-label="Previous quote" onClick={() => setI((i - 1 + n) % n)} className="flex h-12 w-12 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-white">←</button>
            <button aria-label="Next quote" onClick={() => setI((i + 1) % n)} className="flex h-12 w-12 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-white">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
