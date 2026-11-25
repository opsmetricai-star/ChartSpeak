import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string; email: string | null; full_name: string | null; specialty: string | null; organization: string | null;
  plan: "trial" | "starter" | "professional" | "practice"; credits_total: number; credits_used: number; period_start: string; is_admin: boolean;
};

export async function requireUser() {
  await connection(); // always request-time: depends on the signed-in user
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single<Profile>();
  if (!profile) redirect("/login?error=1");
  return { supabase, user: data.user, profile };
}
