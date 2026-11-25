"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteNote, saveNote } from "../../actions";

type Section = { title: string; body: string };
type Code = { system: string; code: string; description: string; evidence: string };

export function Retry({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  return (
    <div className="mt-6">
      <button
        disabled={busy}
        onClick={async () => {
          setBusy(true); setErr("");
          const r = await fetch("/api/notes/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ noteId: id }) });
          const j = await r.json().catch(() => ({}));
          setBusy(false);
          if (!r.ok) setErr(j.error || "Generation failed."); else router.refresh();
        }}
        className="bg-ink px-6 py-3.5 text-[14px] font-semibold text-white disabled:opacity-60"
      >{busy ? "Generating…" : "Generate note"}</button>
      {err && <p role="alert" className="mt-3 font-semibold text-red-700">{err}</p>}
    </div>
  );
}

export function NoteEditor({ id, title: t0, sections: s0, missing, codes, instructions: i0, language }: {
  id: string; title: string; sections: Section[]; missing: string[]; codes: Code[]; instructions: string; language: string;
}) {
  const [title, setTitle] = useState(t0);
  const [sections, setSections] = useState(s0);
  const [instructions, setInstructions] = useState(i0);
  const [msg, setMsg] = useState("");
  const [pending, start] = useTransition();

  const asText = () => `${title}\n\n${sections.map((s) => `${s.title.toUpperCase()}\n${s.body}`).join("\n\n")}`;

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-white p-6 sm:p-8">
        <input value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Note title" className="display display-sm w-full bg-transparent outline-none" />
        <p className="mt-2 text-[13px] opacity-60">AI-drafted. Review every statement before using it in a patient record.</p>
        {missing.length > 0 && (
          <div className="mt-5 border-l-4 border-ink bg-sun-soft p-4 text-[15px]">
            <strong>Not found in the encounter:</strong> {missing.join("; ")}
          </div>
        )}
        <div className="mt-6 space-y-6">
          {sections.map((s, k) => (
            <label key={k} className="block">
              <span className="text-xs font-semibold uppercase tracking-widest opacity-60">{s.title}</span>
              <textarea
                value={s.body}
                rows={Math.max(3, Math.ceil(s.body.length / 70) + 1)}
                onChange={(e) => setSections(sections.map((x, j) => (j === k ? { ...x, body: e.target.value } : x)))}
                className="mt-2 w-full border border-line bg-white p-4 text-[16px] leading-relaxed outline-none focus:border-ink"
              />
            </label>
          ))}
        </div>
      </div>

      {codes.length > 0 && (
        <div className="bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">Suggested codes</h2>
          <p className="mt-1 text-[13px] opacity-60">Suggestions only. A clinician or coder must verify each one.</p>
          <ul className="mt-4 divide-y divide-line">
            {codes.map((c, k) => (
              <li key={k} className="py-3">
                <span className="mr-3 bg-ink px-2 py-1 font-mono text-xs text-sun">{c.system} {c.code}</span>
                <span className="font-medium">{c.description}</span>
                <div className="mt-1 text-[14px] italic opacity-70">“{c.evidence}”</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight">Patient instructions ({language})</h2>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={6} className="mt-3 w-full border border-line p-4 text-[16px] leading-relaxed outline-none focus:border-ink" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          disabled={pending}
          onClick={() => start(async () => { const r = await saveNote(id, sections, instructions, title); setMsg(r.error ?? "Saved."); })}
          className="bg-ink px-6 py-3.5 text-[14px] font-semibold text-white disabled:opacity-60"
        >Save changes</button>
        <button onClick={async () => { await navigator.clipboard.writeText(asText()); setMsg("Copied to clipboard."); }} className="border border-ink px-6 py-3.5 text-[14px] font-semibold">Copy note</button>
        <button
          onClick={() => {
            const url = URL.createObjectURL(new Blob([asText()], { type: "text/plain" }));
            const a = document.createElement("a"); a.href = url; a.download = `${title.replace(/[^\w-]+/g, "_")}.txt`; a.click(); URL.revokeObjectURL(url);
          }}
          className="border border-ink px-6 py-3.5 text-[14px] font-semibold"
        >Download .txt</button>
        <button onClick={() => window.print()} className="border border-ink px-6 py-3.5 text-[14px] font-semibold">Print / PDF</button>
        <button
          onClick={() => { if (confirm("Delete this note permanently? This cannot be undone.")) start(async () => { await deleteNote(id); }); }}
          className="ml-auto px-4 py-3.5 text-[14px] font-semibold text-red-700 underline underline-offset-4"
        >Delete</button>
        <span role="status" className="text-[14px] font-medium">{msg}</span>
      </div>
    </div>
  );
}
