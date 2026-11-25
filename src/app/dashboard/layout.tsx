import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/data";
import { logout } from "../(auth)/actions";
import { Logo } from "@/components/Logo";
import { DashNav } from "./DashNav";

export const metadata: Metadata = { title: { default: "Dashboard", template: "%s | ChartSpeak" }, robots: { index: false } };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireUser();
  const left = Math.max(profile.credits_total - profile.credits_used, 0);
  return (
    <div className="min-h-screen bg-mist lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-line bg-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4 lg:block lg:py-7">
          <Link href="/dashboard"><Logo /></Link>
          <form action={logout} className="lg:hidden"><button className="text-[14px] font-semibold underline">Log out</button></form>
        </div>
        <DashNav admin={profile.is_admin} />
        <div className="hidden px-5 pb-6 lg:absolute lg:bottom-0 lg:block lg:w-full">
          <div className="mb-4 bg-sun-soft p-4">
            <div className="text-xs font-semibold uppercase tracking-widest opacity-60">{profile.plan} plan</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">{left} <span className="text-[14px] font-medium opacity-70">notes left</span></div>
          </div>
          <div className="mb-3 truncate text-[13px] opacity-70">{profile.email}</div>
          <form action={logout}><button className="text-[14px] font-semibold underline underline-offset-4">Log out</button></form>
        </div>
      </aside>
      <div className="min-w-0 p-5 sm:p-8 lg:p-12">{children}</div>
    </div>
  );
}
