// ChartSpeak mark: a "C" speech bubble holding three ascending bars.
// The bubble follows the surrounding text color (ink on light, white on dark); the bars use the brand yellow.
export function LogoMark({ size = 30, bars = "#ffd400" }: { size?: number; bars?: string }) {
  return (
    <svg width={size} height={Math.round(size * 1.09)} viewBox="0 0 44 48" aria-hidden className="shrink-0">
      <path
        fill="currentColor"
        d="M34.86 6.68A20 20 0 1 0 34.86 37.32L30.68 32.34A13.5 13.5 0 1 1 30.68 11.66Z"
      />
      <path fill="currentColor" d="M18.5 41.2 31.5 36.6 26.2 47.6Z" />
      <rect x="18.2" y="22" width="4.4" height="8.5" rx="1.4" fill={bars} />
      <rect x="24.6" y="16.6" width="4.4" height="13.9" rx="1.4" fill={bars} />
      <rect x="31" y="10.6" width="4.4" height="19.9" rx="1.4" fill={bars} />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold leading-none tracking-[-0.06em] ${className}`}>
      <LogoMark />
      <span className="text-[1.65rem]">ChartSpeak</span>
    </span>
  );
}
