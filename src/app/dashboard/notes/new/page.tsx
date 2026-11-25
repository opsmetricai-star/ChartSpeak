import { requireUser } from "@/lib/data";
import { NewNoteForm } from "./NewNoteForm";

export const metadata = { title: "New note" };

export default async function Page() {
  const { profile } = await requireUser();
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="display display-sm">New note</h1>
      <p className="mt-3 max-w-xl text-[16px] text-ink/70">Paste a transcript or upload a recording. ChartSpeak drafts a structured note for you to review. Use de-identified or synthetic data only until your healthcare agreements are in place.</p>
      <NewNoteForm defaultSpecialty={profile.specialty ?? ""} />
    </div>
  );
}
