import Link from "next/link";
import { requireUser } from "@/lib/data";
import { markNotificationsRead } from "./actions";

export default async function Overview() {
  const { supabase, user, profile } = await requireUser();
  const [{ data: notes }, { data: notifs }, { count }] = await Promise.all([
    supabase.from("notes").select("id,title,status,created_at,template").order("created_at", { ascending: false }).limit(5),
    supabase.from("notifications").select("id,title,body,read,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
    supabase.from("notes").select("id", { count: "exact", head: true }),
  ]);
  const left = Math.max(profile.credits_total - profile.credits_used, 0);
  const pct = Math.min(100, Math.round((profile.credits_used / Math.max(profile.credits_total, 1)) * 100));
  const unread = notifs?.filter((n) => !n.read).length ?? 0;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="display display-sm">Welcome{profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6">
          <div className="text-xs font-semibold uppercase tracking-widest opacity-50">Notes remaining</div>
          <div className="mt-2 text-5xl font-semibold tracking-tight">{left}</div>
          <div className="mt-4 h-2 bg-mist"><div className="h-full bg-ink" style={{ width: `${pct}%` }} /></div>
          <div className="mt-2 text-[13px] opacity-60">{profile.credits_used} of {profile.credits_total} used</div>
        </div>
        <div className="bg-white p-6">
          <div className="text-xs font-semibold uppercase tracking-widest opacity-50">Total notes</div>
          <div className="mt-2 text-5xl font-semibold tracking-tight">{count ?? 0}</div>
        </div>
        <div className="bg-sun p-6">
          <div className="text-xs font-semibold uppercase tracking-widest opacity-60">Plan</div>
          <div className="mt-2 text-3xl font-semibold capitalize tracking-tight">{profile.plan}</div>
          <Link href="/dashboard/billing" className="mt-4 inline-block text-[14px] font-semibold underline underline-offset-4">Manage plan</Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Recent notes</h2>
            <Link href="/dashboard/notes/new" className="bg-ink px-4 py-2.5 text-[13px] font-semibold text-white">New note</Link>
          </div>
          {notes?.length ? (
            <ul className="divide-y divide-line">
              {notes.map((n) => (
                <li key={n.id}>
                  <Link href={`/dashboard/notes/${n.id}`} className="flex items-center justify-between gap-4 py-3.5 hover:opacity-70">
                    <span className="font-medium">{n.title}</span>
                    <span className="text-[13px] opacity-60">{n.status} · {new Date(n.created_at).toLocaleDateString()}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-8 text-[16px] opacity-70">No notes yet. Create your first one and see a draft in under a minute.</p>
          )}
        </section>

        <section className="bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Notifications {unread > 0 && <span className="ml-2 bg-sun px-2 py-0.5 text-xs">{unread}</span>}</h2>
            {unread > 0 && <form action={markNotificationsRead}><button className="text-[13px] font-semibold underline">Mark read</button></form>}
          </div>
          <ul className="space-y-4">
            {notifs?.map((n) => (
              <li key={n.id} className={n.read ? "opacity-60" : ""}>
                <div className="text-[15px] font-semibold">{n.title}</div>
                <div className="text-[14px] text-ink/70">{n.body}</div>
              </li>
            ))}
            {!notifs?.length && <li className="text-[15px] opacity-60">Nothing new.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
