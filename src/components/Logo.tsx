export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-[-0.06em] leading-none ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
        <rect x="1" y="9" width="3.5" height="8" rx="1.75" fill="currentColor" />
        <rect x="7.5" y="4" width="3.5" height="18" rx="1.75" fill="currentColor" />
        <rect x="14" y="1" width="3.5" height="24" rx="1.75" fill="currentColor" />
        <rect x="20.5" y="7" width="3.5" height="12" rx="1.75" fill="currentColor" />
      </svg>
      <span className="text-[1.65rem]">ChartSpeak</span>
    </span>
  );
}
