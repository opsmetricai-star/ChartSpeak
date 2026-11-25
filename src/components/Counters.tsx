"use client";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/content/site";

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1600);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

export function Counters() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-5">
      {stats.map((s) => (
        <div key={s.sub} className="border-t-2 border-white/80 pt-5">
          <div className="display text-[clamp(3rem,5vw,4.6rem)] text-sun">
            <Count to={s.n} suffix={s.suffix} />
          </div>
          <div className="mt-3 text-[13px] font-semibold uppercase tracking-widest text-white/60">{s.label}</div>
          <div className="mt-1 text-[17px] font-medium leading-snug">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
