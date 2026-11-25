import Link from "next/link";
import { requireUser } from "@/lib/data";

export const metadata = { title: "Notes" };

export default async function Notes({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const { supabase } = await requireUser();
  let query = supabase.from("notes").select("id,title,patient_label,status,template,created_at").order("created_at", { ascending: false }).limit(100);
  if (q) query = query.ilike("title", `%${q.replace(/[%_]/g, "")}%`);
  const { data: notes } = await query;
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="display display-sm">Notes</h1>
        <Link href="/dashboard/notes/new" className="bg-ink px-5 py-3 text-[14px] font-semibold text-white">New note</Link>
      </div>
      <form className="mt-6"><input name="q" defaultValue={q} placeholder="Search by title" className="w-full max-w-sm border border-ink/30 bg-white px-4 py-3 outline-none focus:border-ink" /></form>
      <div className="mt-6 bg-white">
        {notes?.length ? (
          <ul className="divide-y divide-line">
            {notes.map((n) => (
              <li key={n.id}>
                <Link href={`/dashboard/notes/${n.id}`} className="grid gap-1 px-6 py-4 transition-colors hover:bg-mist sm:grid-cols-[1fr_auto] sm:items-center">
                  <span>
                    <span className="font-semibold">{n.title}</span>
                    {n.patient_label && <span className="ml-3 text-[14px] opacity-60">{n.patient_label}</span>}
                  </span>
                  <span className="text-[13px] opacity-60">
                    <span className={`mr-3 px-2 py-0.5 text-xs font-semibold ${n.status === "ready" ? "bg-sun" : n.status === "failed" ? "bg-red-100 text-red-800" : "bg-mist"}`}>{n.status}</span>
                    {new Date(n.created_at).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-10 text-[17px] opacity-70">{q ? "No notes match that search." : "No notes yet."}</p>
        )}
      </div>
    </div>
  );
}

// Signed-in screens render per request; they block on the server rather than prerendering.
export const instant = false;
