"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TEMPLATES } from "@/lib/ai/schema";
import { languages } from "@/content/site";
import { useHydrated } from "@/lib/useHydrated";

const input = "mt-2 w-full border border-ink/30 bg-white px-4 py-3.5 text-[16px] font-normal outline-none focus:border-ink";
const MAX_AUDIO = 18 * 1024 * 1024;

export function NewNoteForm({ defaultSpecialty }: { defaultSpecialty: string }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const [busy, setBusy] = useState<"" | "uploading" | "generating">("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const transcript = String(fd.get("transcript") || "").trim();
    const file = fd.get("audio") as File | null;
    const hasAudio = !!file && file.size > 0;
    if (!transcript && !hasAudio) return setError("Paste a transcript or upload an audio file.");
    if (hasAudio && file.size > MAX_AUDIO) return setError("Audio must be 18 MB or smaller.");
    if (hasAudio && !file.type.startsWith("audio/")) return setError("Please upload an audio file.");

    const supabase = createClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return router.push("/login");

    setBusy("uploading");
    let audio_path: string | null = null;
    if (hasAudio) {
      const ext = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").slice(0, 5) || "audio";
      audio_path = `${auth.user.id}/${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from("audio").upload(audio_path, file, { contentType: file.type });
      if (up.error) { setBusy(""); return setError("Upload failed. Please try again."); }
    }

    const { data: note, error: insErr } = await supabase
      .from("notes")
      .insert({
        user_id: auth.user.id,
        title: String(fd.get("title") || "Untitled visit").slice(0, 200),
        patient_label: String(fd.get("patient_label") || "").slice(0, 100) || null,
        template: String(fd.get("template")),
        specialty: String(fd.get("specialty") || "").slice(0, 120) || null,
        language: String(fd.get("language") || "English"),
        transcript: transcript || null,
        audio_path,
      })
      .select("id")
      .single();
    if (insErr || !note) { setBusy(""); return setError("Could not create the note."); }

    setBusy("generating");
    const res = await fetch("/api/notes/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ noteId: note.id }) });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setBusy("");
      setError(j.error || "Generation failed.");
      if (res.status === 402) return; // stay here so the upgrade message is visible
      return router.push(`/dashboard/notes/${note.id}`);
    }
    router.push(`/dashboard/notes/${note.id}`);
    router.refresh();
  }

  return (
    <form method="post" onSubmit={onSubmit} className="mt-8 space-y-6 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[14px] font-semibold">Title<input name="title" required defaultValue="Office visit" className={input} /></label>
        <label className="block text-[14px] font-semibold">Patient label (no real names)<input name="patient_label" placeholder="e.g. Patient A" className={input} /></label>
        <label className="block text-[14px] font-semibold">Template
          <select name="template" className={input}>{Object.entries(TEMPLATES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select>
        </label>
        <label className="block text-[14px] font-semibold">Specialty<input name="specialty" defaultValue={defaultSpecialty} placeholder="e.g. Family Medicine" className={input} /></label>
        <label className="block text-[14px] font-semibold sm:col-span-2">Patient instructions language
          <select name="language" defaultValue="English" className={input}>{["English", ...languages].map((l) => <option key={l}>{l}</option>)}</select>
        </label>
      </div>
      <label className="block text-[14px] font-semibold">Transcript
        <textarea name="transcript" rows={9} placeholder="Paste the encounter transcript here…" className={input} />
      </label>
      <label className="block text-[14px] font-semibold">…or upload a recording (max 18 MB)
        <input name="audio" type="file" accept="audio/*" className="mt-2 block w-full text-[15px] font-normal file:mr-4 file:border-0 file:bg-ink file:px-5 file:py-3 file:font-semibold file:text-white" />
        <span className="mt-1 block text-[13px] font-normal opacity-60">If you provide both, the transcript is used.</span>
      </label>
      {error && <p role="alert" className="text-[15px] font-semibold text-red-700">{error} {error.includes("Upgrade") && <a href="/dashboard/billing" className="underline">View plans</a>}</p>}
      <button disabled={!!busy || !hydrated} className="bg-ink px-8 py-4 text-[14px] font-semibold text-white disabled:opacity-60">
        {busy === "uploading" ? "Uploading…" : busy === "generating" ? "Drafting your note… this can take up to a minute" : "Generate note"}
      </button>
    </form>
  );
}
