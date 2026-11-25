"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Overview", exact: true },
  { href: "/dashboard/notes", label: "Notes" },
  { href: "/dashboard/notes/new", label: "New note", exact: true },
  { href: "/dashboard/billing", label: "Billing" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashNav({ admin }: { admin: boolean }) {
  const path = usePathname();
  const list = admin ? [...items, { href: "/dashboard/admin", label: "Admin" }] : items;
  return (
    <nav className="flex flex-wrap gap-1 px-3 pb-3 lg:block lg:px-3 lg:pb-0" aria-label="Dashboard">
      {list.map((i) => {
        const active = i.exact ? path === i.href : path.startsWith(i.href) && !(i.href === "/dashboard/notes" && path === "/dashboard/notes/new");
        return (
          <Link key={i.href} href={i.href} className={`block whitespace-nowrap px-4 py-3 text-[15px] font-medium transition-colors ${active ? "bg-ink text-white" : "hover:bg-mist"}`}>
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
