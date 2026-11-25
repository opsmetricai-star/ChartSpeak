import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "../AuthForm";
import { resetPassword } from "../actions";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Choose a new password" };

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login?error=1");
  return (
    <>
      <h1 className="display display-sm mb-8">Choose a new password</h1>
      <AuthForm action={resetPassword} submit="Update password" fields={[{ name: "password", label: "New password (8+ characters)", type: "password", autoComplete: "new-password" }]} />
    </>
  );
}
