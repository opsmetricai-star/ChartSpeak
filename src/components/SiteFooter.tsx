import Link from "next/link";
import { footerCols } from "@/content/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 lg:px-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo className="text-white" />
            <p className="mt-6 max-w-sm text-[17px] leading-snug text-white/75">
              The AI engine for clinical documentation and revenue intelligence.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerCols.map((c) => (
              <div key={c.title}>
                <h3 className="mb-5 text-[13px] font-semibold uppercase tracking-widest text-white/50">{c.title}</h3>
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[15px] text-white/90 transition-colors hover:text-sun">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-8 text-[13px] text-white/55 sm:flex-row sm:justify-between">
          <p>© 2026 ChartSpeak. All rights reserved.</p>
          <p className="max-w-xl">ChartSpeak drafts documentation for clinician review. It is not a medical device, and clinicians remain responsible for all content they approve.</p>
        </div>
      </div>
    </footer>
  );
}
