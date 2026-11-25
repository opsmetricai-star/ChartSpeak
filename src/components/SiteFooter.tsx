import Link from "next/link";
import { footerCols } from "@/content/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 lg:px-10 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo className="text-white" />
            <p className="mt-6 max-w-sm text-[17px] leading-snug text-white/75">
              The intelligence layer that lets clinicians look up from the screen and back at the patient.
            </p>
            <Link href="/contact-us" className="mt-8 inline-block bg-sun px-7 py-3.5 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-0.5">
              Contact us
            </Link>
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
        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-8 text-[13px] text-white/55 sm:flex-row sm:justify-between">
          <p>© 2026 ChartSpeak. All rights reserved.</p>
          <p className="max-w-xl">
            ChartSpeak assists with documentation and is not a medical device. Clinicians remain responsible for reviewing all generated content.
          </p>
        </div>
      </div>
    </footer>
  );
}
