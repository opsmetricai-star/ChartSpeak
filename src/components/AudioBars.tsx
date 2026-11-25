// Stacked horizontal-line equalizer, echoing the reference's "presence" band.
export function AudioBars() {
  const cols = 14;
  const rows = 22;
  const heights = [6, 10, 18, 9, 5, 7, 12, 16, 8, 6, 14, 19, 9, 5];
  return (
    <div className="flex h-full items-end gap-[2px]" aria-hidden>
      {Array.from({ length: cols }).map((_, c) => (
        <div
          key={c}
          className="audio-bar flex w-[clamp(34px,7vw,104px)] flex-col justify-end gap-[3px]"
          style={{ animationDelay: `${(c % 7) * -0.45}s`, animationDuration: `${2.6 + (c % 5) * 0.5}s` }}
        >
          {Array.from({ length: heights[c] }).map((_, r) => (
            <span key={r} className="block h-[1.5px] w-full bg-ink" style={{ opacity: 0.18 + (r / rows) * 0.85 }} />
          ))}
        </div>
      ))}
    </div>
  );
}
