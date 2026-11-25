import { notFound } from "next/navigation";
import { requireUser } from "@/lib/data";
import { createAdminClient } from "@/lib/supabase/admin";
import { PaymentForm } from "./PaymentForm";

export const metadata = { title: "Admin" };

export default async function Admin() {
  const { profile } = await requireUser();
  if (!profile.is_admin) notFound();
  const admin = createAdminClient();
  const [{ data: payments }] = await Promise.all([
    admin.from("payments").select("*").order("created_at", { ascending: false }).limit(15),
  ]);
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <h1 className="display display-sm">Admin</h1>
      <section className="bg-white p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight">Confirm a payment</h2>
        <p className="mb-5 mt-1 text-[14px] opacity-70">After checking the order in your Selar dashboard, activate the plan for that customer’s account email.</p>
        <PaymentForm />
      </section>
      <section className="bg-white p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Recent payments</h2>
        <ul className="divide-y divide-line text-[14px]">
          {payments?.map((p) => <li key={p.id} className="flex justify-between py-2.5"><span>{p.email} · {p.plan}</span><span className="opacity-60">{p.reference}</span></li>)}
          {!payments?.length && <li className="opacity-60">None yet.</li>}
        </ul>
      </section>
    </div>
  );
}

// Signed-in screens render per request; they block on the server rather than prerendering.
export const instant = false;
