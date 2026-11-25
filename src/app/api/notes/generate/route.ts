import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateNote } from "@/lib/ai/gemini";
import { TEMPLATES } from "@/lib/ai/schema";

export const maxDuration = 120;

const body = z.object({
  noteId: z.string().uuid(),
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  const uid = auth.user.id;

  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // RLS guarantees this note belongs to the caller.
  const { data: note } = await supabase.from("notes").select("*").eq("id", parsed.data.noteId).single();
  if (!note) return NextResponse.json({ error: "Note not found." }, { status: 404 });
  if (note.status === "generating") return NextResponse.json({ error: "Already generating." }, { status: 409 });
  if (!note.transcript?.trim() && !note.audio_path) return NextResponse.json({ error: "Add a transcript or audio first." }, { status: 400 });
  if (note.transcript && note.transcript.length > 60_000) return NextResponse.json({ error: "Transcript is too long (60,000 characters max)." }, { status: 400 });

  const admin = createAdminClient();
  const { data: ok, error: creditErr } = await admin.rpc("consume_credit", { uid });
  if (creditErr) return NextResponse.json({ error: "Could not check your plan." }, { status: 500 });
  if (!ok) return NextResponse.json({ error: "You have used all your note generations for this period. Upgrade your plan to continue.", code: "no_credits" }, { status: 402 });

  await supabase.from("notes").update({ status: "generating", error: null }).eq("id", note.id);

  try {
    let audio: { mime: string; base64: string } | undefined;
    if (note.audio_path && !note.transcript?.trim()) {
      const { data: file, error } = await supabase.storage.from("audio").download(note.audio_path);
      if (error || !file) throw new Error("Could not read the uploaded audio.");
      if (file.size > 18 * 1024 * 1024) throw new Error("Audio is too large for direct processing (18 MB max).");
      audio = { mime: file.type || "audio/mpeg", base64: Buffer.from(await file.arrayBuffer()).toString("base64") };
    }

    const template = (note.template in TEMPLATES ? note.template : "soap") as keyof typeof TEMPLATES;
    const result = await generateNote({ template, specialty: note.specialty, language: note.language, transcript: note.transcript ?? undefined, audio });

    await supabase.from("notes").update({
      status: "ready",
      content: { sections: result.sections, missing_information: result.missing_information },
      codes: result.codes,
      instructions: result.patient_instructions,
      updated_at: new Date().toISOString(),
    }).eq("id", note.id);
    await admin.from("usage_events").insert({ user_id: uid, note_id: note.id, kind: "note_generated" });
    return NextResponse.json({ ok: true });
  } catch (e) {
    await admin.rpc("refund_credit", { uid }); // failed generations do not cost a credit
    const message = e instanceof Error ? e.message : "Generation failed.";
    await supabase.from("notes").update({ status: "failed", error: message }).eq("id", note.id);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
