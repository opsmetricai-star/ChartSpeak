"use client";
import { useActionState } from "react";
import { confirmPayment } from "../actions";

const input = "mt-2 w-full border border-ink/30 bg-white px-4 py-3 text-[16px] font-normal outline-none focus:border-ink";

export function PaymentForm() {
  const [state, action, pending] = useActionState(confirmPayment, undefined);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-3">
      <label className="block text-[14px] font-semibold">Customer email<input name="email" type="email" required className={input} /></label>
      <label className="block text-[14px] font-semibold">Plan
        <select name="plan" className={input}><option value="starter">Starter</option><option value="professional">Professional</option><option value="practice">Practice</option></select>
      </label>
      <label className="block text-[14px] font-semibold">Selar order reference<input name="reference" required className={input} /></label>
      <div className="sm:col-span-3">
        <button disabled={pending} className="bg-ink px-7 py-3.5 text-[14px] font-semibold text-white disabled:opacity-60">{pending ? "Working…" : "Activate plan"}</button>
        {state?.error && <span role="alert" className="ml-4 font-semibold text-red-700">{state.error}</span>}
        {state?.message && <span role="status" className="ml-4 font-semibold">{state.message}</span>}
      </div>
    </form>
  );
}
