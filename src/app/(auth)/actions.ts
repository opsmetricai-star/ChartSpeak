"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string } | undefined;

const creds = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Always derive the origin from the incoming request, so emailed links point at the live site the user is on.
async function origin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

function safeNext(v: FormDataEntryValue | null) {
  const s = typeof v === "string" ? v : "";
  return s.startsWith("/dashboard") && !s.startsWith("//") ? s : "/dashboard";
}

function planNext(v: FormDataEntryValue | null) {
  return typeof v === "string" && ["starter", "professional", "practice"].includes(v) ? `/dashboard/billing?plan=${v}` : "/dashboard";
}

export async function login(_: AuthState, fd: FormData): Promise<AuthState> {
  const p = creds.safeParse({ email: fd.get("email"), password: fd.get("password") });
  if (!p.success) return { error: p.error.issues[0].message };
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(p.data);
  if (error) return { error: "Incorrect email or password." };
  redirect(safeNext(fd.get("next")));
}

export async function signup(_: AuthState, fd: FormData): Promise<AuthState> {
  const p = creds.extend({ full_name: z.string().trim().min(2, "Enter your name") }).safeParse({
    email: fd.get("email"),
    password: fd.get("password"),
    full_name: fd.get("full_name"),
  });
  if (!p.success) return { error: p.error.issues[0].message };
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: p.data.email,
    password: p.data.password,
    options: { data: { full_name: p.data.full_name }, emailRedirectTo: `${await origin()}/auth/callback?next=${encodeURIComponent(planNext(fd.get("plan")))}` },
  });
  if (error) return { error: error.message };
  if (data.session) redirect(planNext(fd.get("plan")));
  return { message: "Confirmation sent. Open the link in your email to activate your account, then log in." };
}

export async function forgotPassword(_: AuthState, fd: FormData): Promise<AuthState> {
  const email = z.string().trim().email().safeParse(fd.get("email"));
  if (!email.success) return { error: "Enter a valid email address" };
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email.data, { redirectTo: `${await origin()}/auth/callback?next=/reset-password` });
  // Same message either way so accounts cannot be enumerated.
  return { message: "If that email has an account, a reset link is on its way." };
}

export async function resetPassword(_: AuthState, fd: FormData): Promise<AuthState> {
  const pw = creds.shape.password.safeParse(fd.get("password"));
  if (!pw.success) return { error: pw.error.issues[0].message };
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: pw.data });
  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
