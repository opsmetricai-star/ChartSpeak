"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/data";
import { createAdminClient } from "@/lib/supabase/admin";

export async function markNotificationsRead() {
  const { supabase, user } = await requireUser();
  await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
  revalidatePath("/dashboard");
}

export type FormState = { error?: string; message?: string } | undefined;

export async function updateProfile(_: FormState, fd: FormData): Promise<FormState> {
  const { supabase, user } = await requireUser();
  const p = z.object({
    full_name: z.string().trim().min(2).max(120),
    specialty: z.string().trim().max(120),
    organization: z.string().trim().max(160),
  }).safeParse(Object.fromEntries(fd));
  if (!p.success) return { error: "Please enter a valid name." };
  const { error } = await supabase.from("profiles").update(p.data).eq("id", user.id);
  if (error) return { error: "Could not save your settings." };
  revalidatePath("/dashboard", "layout");
  return { message: "Saved." };
}

export async function deleteNote(id: string) {
  const { supabase } = await requireUser();
  const { data: note } = await supabase.from("notes").select("audio_path").eq("id", id).single();
  if (note?.audio_path) await supabase.storage.from("audio").remove([note.audio_path]);
  await supabase.from("notes").delete().eq("id", id);
  revalidatePath("/dashboard/notes");
  redirect("/dashboard/notes");
}

export async function saveNote(id: string, sections: { title: string; body: string }[], instructions: string, title: string) {
  const { supabase } = await requireUser();
  const parsed = z.object({
    title: z.string().trim().min(1).max(200),
    instructions: z.string().max(20000),
    sections: z.array(z.object({ title: z.string().max(200), body: z.string().max(50000) })).max(30),
  }).safeParse({ title, instructions, sections });
  if (!parsed.success) return { error: "Invalid note content." };
  const { data: existing } = await supabase.from("notes").select("content").eq("id", id).single();
  const { error } = await supabase.from("notes").update({
    title: parsed.data.title,
    instructions: parsed.data.instructions,
    content: { ...(existing?.content ?? {}), sections: parsed.data.sections },
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  return error ? { error: "Could not save." } : { ok: true };
}

// Admin-only manual payment confirmation (the trusted fallback to the webhook).
export async function confirmPayment(_: FormState, fd: FormData): Promise<FormState> {
  const { profile } = await requireUser();
  if (!profile.is_admin) return { error: "Not allowed." };
  const p = z.object({
    email: z.string().email(),
    plan: z.enum(["starter", "professional", "practice"]),
    reference: z.string().min(3).max(200),
  }).safeParse(Object.fromEntries(fd));
  if (!p.success) return { error: "Check the email, plan and Selar order reference." };
  const { data, error } = await createAdminClient().rpc("apply_payment", {
    p_email: p.data.email, p_plan: p.data.plan, p_amount: null, p_ref: p.data.reference, p_raw: { source: "admin" },
  });
  if (error) return { error: "Could not record payment." };
  const msg: Record<string, string> = { applied: "Plan activated.", duplicate: "That reference was already used.", no_user: "Payment recorded, but no account has that email yet.", bad_plan: "Unknown plan." };
  return data === "applied" ? { message: msg.applied } : { error: msg[data as string] ?? "Unexpected result." };
}
