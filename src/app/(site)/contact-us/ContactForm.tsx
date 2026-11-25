"use client";
import { useState } from "react";
import { useHydrated } from "@/lib/useHydrated";

const field = "w-full border border-ink/30 bg-white px-4 py-3.5 text-[16px] outline-none transition-colors focus:border-ink";

export function ContactForm({ topic }: { topic?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const hydrated = useHydrated();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Something went wrong");
      setState("done");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div className="bg-sun-soft p-10">
        <h3 className="display display-sm">Thank you.</h3>
        <p className="mt-3 text-[18px]">We received your message and will reply shortly.</p>
      </div>
    );

  return (
    <form method="post" onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[14px] font-semibold">First name<input name="first_name" required className={`${field} mt-2 font-normal`} /></label>
        <label className="block text-[14px] font-semibold">Last name<input name="last_name" required className={`${field} mt-2 font-normal`} /></label>
      </div>
      <label className="block text-[14px] font-semibold">Work email<input name="email" type="email" required className={`${field} mt-2 font-normal`} /></label>
      <label className="block text-[14px] font-semibold">Organisation<input name="organization" className={`${field} mt-2 font-normal`} /></label>
      <fieldset>
        <legend className="mb-2 text-[14px] font-semibold">Does your organisation already use ChartSpeak?</legend>
        <div className="flex gap-6 text-[16px]">
          <label className="flex items-center gap-2"><input type="radio" name="existing_customer" value="yes" /> Yes</label>
          <label className="flex items-center gap-2"><input type="radio" name="existing_customer" value="no" defaultChecked /> No</label>
        </div>
      </fieldset>
      <label className="block text-[14px] font-semibold">Topic
        <select name="topic" defaultValue={topic ?? "sales"} className={`${field} mt-2 font-normal`}>
          <option value="sales">Sales</option>
          <option value="partner">Partner / API access</option>
          <option value="ehr">EHR integration</option>
          <option value="nursing">Nursing</option>
          <option value="support">Support</option>
        </select>
      </label>
      <label className="block text-[14px] font-semibold">How can we help?<textarea name="message" rows={5} required className={`${field} mt-2 font-normal`} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state === "error" && <p role="alert" className="text-[15px] font-semibold text-red-700">{msg}</p>}
      <button disabled={state === "sending" || !hydrated} className="bg-ink px-9 py-4 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
