"use client";
import { useActionState } from "react";
import { updateProfile } from "../actions";

const input = "mt-2 w-full border border-ink/30 bg-white px-4 py-3.5 text-[16px] font-normal outline-none focus:border-ink";

export function SettingsForm({ name, specialty, organization }: { name: string; specialty: string; organization: string }) {
  const [state, action, pending] = useActionState(updateProfile, undefined);
  return (
    <form action={action} className="space-y-5">
      <label className="block text-[14px] font-semibold">Full name<input name="full_name" defaultValue={name} required className={input} /></label>
      <label className="block text-[14px] font-semibold">Specialty<input name="specialty" defaultValue={specialty} className={input} /></label>
      <label className="block text-[14px] font-semibold">Organization<input name="organization" defaultValue={organization} className={input} /></label>
      {state?.error && <p role="alert" className="font-semibold text-red-700">{state.error}</p>}
      {state?.message && <p role="status" className="font-semibold">{state.message}</p>}
      <button disabled={pending} className="bg-ink px-7 py-3.5 text-[14px] font-semibold text-white disabled:opacity-60">{pending ? "Saving…" : "Save"}</button>
    </form>
  );
}
