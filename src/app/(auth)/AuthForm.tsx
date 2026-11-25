"use client";
import { useActionState } from "react";
import type { AuthState } from "./actions";

export type Field = { name: string; label: string; type?: string; autoComplete?: string };

export function AuthForm({
  action,
  fields,
  submit,
  hidden,
}: {
  action: (s: AuthState, fd: FormData) => Promise<AuthState>;
  fields: Field[];
  submit: string;
  hidden?: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className="space-y-5">
      {hidden && Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      {fields.map((f) => (
        <label key={f.name} className="block text-[14px] font-semibold">
          {f.label}
          <input
            name={f.name}
            type={f.type ?? "text"}
            autoComplete={f.autoComplete}
            required
            className="mt-2 w-full border border-ink/30 bg-white px-4 py-3.5 text-[16px] font-normal outline-none focus:border-ink"
          />
        </label>
      ))}
      {state?.error && <p role="alert" className="text-[15px] font-semibold text-red-700">{state.error}</p>}
      {state?.message && <p role="status" className="bg-sun-soft p-4 text-[15px] font-medium">{state.message}</p>}
      <button disabled={pending} className="w-full bg-ink px-6 py-4 text-[14px] font-semibold text-white disabled:opacity-60">
        {pending ? "Please wait…" : submit}
      </button>
    </form>
  );
}
