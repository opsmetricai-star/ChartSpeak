export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="h-9 w-64 bg-ink/10" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="h-36 bg-white" />
        <div className="h-36 bg-white" />
        <div className="h-36 bg-white" />
      </div>
      <div className="mt-6 h-64 bg-white" />
    </div>
  );
}
