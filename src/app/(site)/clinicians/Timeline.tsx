"use client";
import { useState } from "react";

const phases = [
  {
    k: "Pre-Visit",
    lead: "Get the patient context you need to prepare efficiently.",
    items: [
      { t: "Patient summaries", d: "A concise, actionable overview of the patient’s history before each visit." },
      { t: "Ask", d: "Clear answers to clinical questions, enriched with the context of the patient in front of you." },
      { t: "Voice-enabled pre-charting", d: "Dictate a head start and ChartSpeak shapes it into pre-charted content for the note." },
    ],
  },
  {
    k: "Encounter",
    lead: "Have more meaningful interactions with real-time support.",
    items: [
      { t: "Ambient documentation", d: "Capture the conversation and generate a structured, specialty-aware note." },
      { t: "Order staging", d: "Orders mentioned in the visit are drafted for your review and approval." },
      { t: "Coding", d: "Suggested ICD-10, CPT and E/M codes, each tied to supporting evidence." },
      { t: "Multiple ambient sessions", d: "Add sessions after labs or imaging and get one note that reflects everything." },
    ],
  },
  {
    k: "Post-Visit",
    lead: "Close out charts faster, and with confidence.",
    items: [
      { t: "Multilingual patient instructions", d: "Clear instructions in the patient’s language at a plain reading level." },
      { t: "Voice editing and personalisation", d: "Keep control of quality and tone, and shape notes to your style." },
      { t: "Order capture and staging", d: "Reviewed orders are packaged so nothing falls through the cracks." },
    ],
  },
];

export function ClinicianTimeline() {
  const [a, setA] = useState(0);
  const p = phases[a];
  return (
    <div>
      <div role="tablist" className="grid grid-cols-3 border-b-2 border-ink">
        {phases.map((x, k) => (
          <button key={x.k} role="tab" aria-selected={k === a} onClick={() => setA(k)} className={`py-5 text-[clamp(1rem,2vw,1.5rem)] font-semibold tracking-tight transition-colors ${k === a ? "bg-ink text-white" : "hover:bg-mist"}`}>
            {x.k}
          </button>
        ))}
      </div>
      <div key={p.k} className="animate-[fadeIn_0.5s_ease_both] pt-10">
        <p className="max-w-xl text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-tight tracking-tight">{p.lead}</p>
        <div className="mt-10 grid gap-px bg-ink/15 md:grid-cols-2 lg:grid-cols-3">
          {p.items.map((i) => (
            <div key={i.t} className="bg-white p-8">
              <h3 className="text-[1.35rem] font-semibold tracking-tight">{i.t}</h3>
              <p className="mt-3 text-[17px] leading-relaxed text-ink/75">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
