"use client";
import { useState } from "react";
import { capabilityTabs } from "@/content/site";

function Mock({ k }: { k: string }) {
  // Original UI illustrations built in CSS, one per capability.
  if (k === "revenue")
    return (
      <div className="space-y-3">
        {[["E11.9", "Type 2 diabetes, no complications"], ["I10", "Essential hypertension"], ["99214", "Established patient, moderate complexity"]].map(([c, d]) => (
          <div key={c} className="flex items-center gap-4 rounded-sm bg-white p-4 shadow-sm">
            <span className="rounded-sm bg-ink px-2.5 py-1 font-mono text-sm text-sun">{c}</span>
            <span className="text-[15px] font-medium">{d}</span>
          </div>
        ))}
      </div>
    );
  if (k === "reasoning")
    return (
      <div className="space-y-3 text-[15px]">
        <div className="ml-10 rounded-sm bg-ink p-4 text-white">Summarise this patient’s last three visits.</div>
        <div className="mr-10 rounded-sm bg-white p-4 shadow-sm">Stable A1c trend, new complaint of fatigue, metformin dose increased in March. Labs pending from last visit.</div>
        <div className="flex gap-2 text-xs"><span className="rounded-full bg-ink/10 px-3 py-1">Decision support only</span></div>
      </div>
    );
  return (
    <div className="space-y-3">
      {["Subjective", "Objective", "Assessment", "Plan"].map((h, n) => (
        <div key={h} className="rounded-sm bg-white p-4 shadow-sm">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink/50">{h}</div>
          <div className="h-2 rounded bg-ink/15" style={{ width: `${92 - n * 11}%` }} />
          <div className="mt-2 h-2 rounded bg-ink/10" style={{ width: `${70 - n * 8}%` }} />
        </div>
      ))}
    </div>
  );
}

export function CapabilityTabs() {
  const [a, setA] = useState(0);
  const t = capabilityTabs[a];
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-x-10 gap-y-3 border-b border-ink/20">
        {capabilityTabs.map((c, k) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={k === a}
            onClick={() => setA(k)}
            className={`-mb-px border-b-4 pb-4 text-[17px] font-semibold transition-colors ${k === a ? "border-ink" : "border-transparent text-ink/50 hover:text-ink"}`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-12 lg:grid-cols-2" key={t.key}>
        <div className="animate-[fadeIn_0.5s_ease_both]">
          <p className="max-w-xl text-[19px] leading-[1.45]">{t.body}</p>
          <ol className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            {t.points.map((p, k) => (
              <li key={p} className="flex items-start gap-6 py-5">
                <span className="font-mono text-sm text-ink/50">0{k + 1}</span>
                <span className="text-[18px] font-medium leading-snug">{p}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="animate-[fadeIn_0.5s_ease_both] bg-sun-soft p-6 lg:p-10">
          <Mock k={t.key} />
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
