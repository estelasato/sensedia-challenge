export default function UsersPageLoading() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Carregando usuários">
      <header className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="h-7 w-32 rounded bg-muted" />
          <div className="h-10 w-full max-w-md rounded-md bg-muted" />
        </div>
        <div className="h-10 w-36 shrink-0 rounded-lg bg-muted" />
      </header>

      <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
        <div className="border-b border-border bg-surface px-4 py-3">
          <div className="flex gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-24 rounded bg-muted" />
            ))}
          </div>
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-4 px-4 py-3">
              <div className="h-4 flex-1 rounded bg-muted" />
              <div className="h-4 w-40 rounded bg-muted" />
              <div className="h-4 w-28 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-4 w-40 rounded bg-muted" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="size-9 rounded-md bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
