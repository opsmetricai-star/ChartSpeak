import { notFound } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { requireUser } from "@/lib/data";
import { NoteEditor, Retry } from "./NoteEditor";

export const metadata = { title: "Note" };

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!z.string().uuid().safeParse(id).success) notFound();
  const { supabase } = await requireUser();
  const { data: note } = await supabase.from("notes").select("*").eq("id", id).single();
  if (!note) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/dashboard/notes" className="text-[14px] font-semibold underline underline-offset-4">All notes</Link>
      {note.status === "ready" ? (
        <NoteEditor
          id={note.id}
          title={note.title}
          sections={note.content?.sections ?? []}
          missing={note.content?.missing_information ?? []}
          codes={note.codes ?? []}
          instructions={note.instructions ?? ""}
          language={note.language}
        />
      ) : (
        <div className="mt-6 bg-white p-8">
          <h1 className="display display-sm">{note.title}</h1>
          <p className="mt-4 text-[17px]">
            Status: <strong>{note.status}</strong>
            {note.error && <span className="mt-2 block font-semibold text-red-700">{note.error}</span>}
          </p>
          {(note.status === "failed" || note.status === "draft") && <Retry id={note.id} />}
        </div>
      )}
    </div>
  );
}

// Signed-in screens render per request; they block on the server rather than prerendering.
export const instant = false;
