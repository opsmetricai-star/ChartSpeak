import { requireUser } from "@/lib/data";
import { SettingsForm } from "./SettingsForm";

export const metadata = { title: "Settings" };

export default async function Settings() {
  const { profile } = await requireUser();
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="display display-sm">Settings</h1>
      <div className="mt-8 bg-white p-6 sm:p-8">
        <div className="mb-6 text-[14px] opacity-70">Signed in as <strong>{profile.email}</strong></div>
        <SettingsForm name={profile.full_name ?? ""} specialty={profile.specialty ?? ""} organization={profile.organization ?? ""} />
      </div>
    </div>
  );
}
