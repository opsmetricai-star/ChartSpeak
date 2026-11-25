"use client";
import { useState } from "react";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-ink/20 border-y border-ink/20">
      {items.map((it, k) => {
        const o = open === k;
        return (
          <div key={it.q}>
            <button
              type="button"
              aria-expanded={o}
              onClick={() => setOpen(o ? null : k)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(1.15rem,1.8vw,1.6rem)] font-semibold tracking-tight"
            >
              {it.q}
              <span className={`text-3xl font-light transition-transform ${o ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className={`grid transition-all duration-300 ${o ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"}`}>
              <p className="overflow-hidden max-w-3xl text-[17px] leading-relaxed text-ink/80">{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
