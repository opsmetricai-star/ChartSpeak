"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const path = usePathname();
  const [mobile, setMobile] = useState(false);
  const [lastPath, setLastPath] = useState(path);
  if (lastPath !== path) {
    // Close the menu when the route changes (adjusting state during render, not in an effect).
    setLastPath(path);
    setMobile(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex h-[62px] max-w-[1440px] items-stretch justify-between px-5 lg:px-6">
        <Link href="/" aria-label="ChartSpeak home" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden items-stretch lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center whitespace-nowrap px-5 text-[14px] font-medium text-[#444] transition-colors hover:bg-mist xl:px-7 ${active ? "border-b-4 border-ink bg-mist/60 text-ink" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden whitespace-nowrap px-4 text-[14px] font-medium sm:block">Log in</Link>
          <Link href="/signup" className="hidden whitespace-nowrap bg-sun px-6 py-3.5 text-[14px] font-semibold transition-transform hover:-translate-y-0.5 hover:bg-[#ffd91a] sm:block">
            Sign up
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
              {mobile ? <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" /> : <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" />}
            </svg>
          </button>
        </div>
      </div>

      {mobile && (
        <div className="fixed inset-x-0 bottom-0 top-[62px] overflow-y-auto bg-white px-5 pb-10 lg:hidden">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block border-b border-line py-5 text-xl font-semibold tracking-tight">
              {item.label}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/signup" className="bg-sun py-4 text-center font-semibold">Sign up</Link>
            <Link href="/login" className="border border-ink py-4 text-center font-semibold">Log in</Link>
          </div>
        </div>
      )}
    </header>
  );
}
