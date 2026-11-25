"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
      <path d="M2 4.5 7 9.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  const [lastPath, setLastPath] = useState(path);
  if (lastPath !== path) {
    // Close menus when the route changes (adjusting state during render, not in an effect).
    setLastPath(path);
    setMobile(false);
    setOpen(null);
  }

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  return (
    <header className="sticky top-0 z-50 bg-white" onMouseLeave={() => setOpen(null)}>
      <div className="mx-auto flex h-[62px] max-w-[1440px] items-stretch justify-between px-5 lg:px-6">
        <Link href="/" aria-label="ChartSpeak home" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden items-stretch lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = path === item.href || item.children?.some((c) => path === c.href);
            const isOpen = open === item.label;
            return (
              <div key={item.label} className="relative flex items-stretch" onMouseEnter={() => setOpen(item.children ? item.label : null)}>
                {item.children ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : item.label)}
                    className={`flex items-center gap-1.5 whitespace-nowrap px-3 text-[14px] font-medium text-[#444] xl:px-6 transition-colors hover:bg-mist ${active ? "border-b-4 border-ink text-ink" : ""}`}
                  >
                    {item.label}
                    <Chevron open={isOpen} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center whitespace-nowrap px-3 text-[14px] font-medium text-[#444] xl:px-6 transition-colors hover:bg-mist ${active ? "border-b-4 border-ink bg-mist/60 text-ink" : ""}`}
                  >
                    {item.label}
                  </Link>
                )}
                {item.children && isOpen && (
                  <div className="absolute left-0 top-full w-[300px] border border-line bg-white p-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className="block px-4 py-3 transition-colors hover:bg-mist">
                        <span className="block text-[14px] font-semibold">{c.label}</span>
                        <span className="block text-[12.5px] text-[#666]">{c.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden whitespace-nowrap px-4 text-[14px] font-medium sm:block">Log in</Link>
          <Link href="/contact-us" className="hidden whitespace-nowrap rounded-[2px] bg-sun px-6 py-3.5 text-[14px] font-semibold transition-transform hover:-translate-y-0.5 hover:bg-[#ffd91a] sm:block">
            Contact us
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
              {mobile ? (
                <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobile && (
        <div className="fixed inset-x-0 bottom-0 top-[62px] overflow-y-auto bg-white px-5 pb-10 lg:hidden">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b border-line">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-5 text-left text-xl font-semibold tracking-tight"
                  onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                  aria-expanded={mobileSub === item.label}
                >
                  {item.label}
                  <Chevron open={mobileSub === item.label} />
                </button>
                {mobileSub === item.label && (
                  <div className="pb-4">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className="block py-2.5 pl-3 text-[16px] text-[#444]">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.label} href={item.href} className="block border-b border-line py-5 text-xl font-semibold tracking-tight">
                {item.label}
              </Link>
            ),
          )}
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/contact-us" className="bg-sun py-4 text-center font-semibold">Contact us</Link>
            <Link href="/login" className="border border-ink py-4 text-center font-semibold">Log in</Link>
          </div>
        </div>
      )}
    </header>
  );
}
