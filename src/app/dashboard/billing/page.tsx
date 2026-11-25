import { requireUser } from "@/lib/data";
import { plans } from "@/content/site";

export const metadata = { title: "Billing" };

export default async function Billing() {
  const { supabase, profile } = await requireUser();
  const { data: payments } = await supabase.from("payments").select("id,plan,amount,reference,created_at").order("created_at", { ascending: false }).limit(10);
  const left = Math.max(profile.credits_total - profile.credits_used, 0);
  const renews = new Date(new Date(profile.period_start).getTime() + 30 * 864e5).toLocaleDateString();

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="display display-sm">Billing</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6"><div className="text-xs font-semibold uppercase tracking-widest opacity-50">Current plan</div><div className="mt-2 text-3xl font-semibold capitalize tracking-tight">{profile.plan}</div></div>
        <div className="bg-white p-6"><div className="text-xs font-semibold uppercase tracking-widest opacity-50">Notes left</div><div className="mt-2 text-3xl font-semibold tracking-tight">{left} / {profile.credits_total}</div></div>
        <div className="bg-white p-6"><div className="text-xs font-semibold uppercase tracking-widest opacity-50">{profile.plan === "trial" ? "Trial" : "Usage resets"}</div><div className="mt-2 text-3xl font-semibold tracking-tight">{profile.plan === "trial" ? "No expiry" : renews}</div></div>
      </div>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">Upgrade</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <div key={p.id} className={`flex flex-col p-6 ${p.popular ? "bg-ink text-white" : "bg-white"}`}>
            <div className="text-xl font-semibold">{p.name}</div>
            <div className="mt-2"><span className="display text-4xl">${p.price}</span> <span className="opacity-60">/ month</span></div>
            <div className="mt-2 text-[15px] opacity-75">{p.credits} notes per month</div>
            {profile.plan === p.id ? (
              <div className="mt-6 bg-sun px-5 py-3 text-center text-[14px] font-semibold text-ink">Current plan</div>
            ) : (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className={`mt-6 px-5 py-3 text-center text-[14px] font-semibold ${p.popular ? "bg-sun text-ink" : "bg-ink text-white"}`}>Pay with Selar</a>
            )}
          </div>
        ))}
      </div>
      <p className="mt-5 max-w-2xl text-[14px] leading-relaxed opacity-70">
        Use the same email address ({profile.email}) at checkout. Your plan activates after we receive confirmation of payment from Selar, which is not instant on redirect. If it has not updated within a few hours, contact support with your Selar order reference.
      </p>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">Payment history</h2>
      <div className="mt-4 bg-white">
        {payments?.length ? (
          <ul className="divide-y divide-line">
            {payments.map((p) => (
              <li key={p.id} className="flex justify-between px-6 py-4 text-[15px]"><span className="font-medium capitalize">{p.plan}</span><span className="opacity-60">{p.reference} · {new Date(p.created_at).toLocaleDateString()}</span></li>
            ))}
          </ul>
        ) : <p className="p-6 opacity-60">No confirmed payments yet.</p>}
      </div>
    </div>
  );
}
