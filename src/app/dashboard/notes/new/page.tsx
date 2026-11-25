import { requireUser } from "@/lib/data";
import { NewNoteForm } from "./NewNoteForm";

export const metadata = { title: "New note" };

export default async function Page() {
  const { profile } = await requireUser();
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="display display-sm">New note</h1>
      <p className="mt-3 max-w-xl text-[16px] text-ink/70">Submit an encounter transcript or recording. The engine returns a structured note, evidence-linked codes and patient instructions for clinician review. Use de-identified or synthetic data until business associate agreements are in place.</p>
      <NewNoteForm defaultSpecialty={profile.specialty ?? ""} />
    </div>
  );
}

// Signed-in screens render per request; they block on the server rather than prerendering.
export const instant = false;
